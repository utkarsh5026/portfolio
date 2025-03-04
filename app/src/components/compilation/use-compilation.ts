import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";

interface TerminalAnimationOptions {
  codeSnippets: string[];
  compileStages: string[];
  totalDuration?: number;
  batchSize?: number;
  onComplete: () => void;
}

export function useTerminalAnimation({
  codeSnippets,
  compileStages,
  totalDuration = 3000,
  batchSize = 4,
  onComplete,
}: TerminalAnimationOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [typedText, setTypedText] = useState<string[]>(
    Array(codeSnippets.length).fill("")
  );
  const [showCompilation, setShowCompilation] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({
    lineIndex: 0,
    charIndex: 0,
  });
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);

  const batchDelayRef = useRef(
    totalDuration / Math.ceil(codeSnippets.length / batchSize)
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cursorPositionRef = useRef(cursorPosition);
  cursorPositionRef.current = cursorPosition;

  const currentStageRef = useRef(currentStage);
  currentStageRef.current = currentStage;

  // Function to trigger screen shake effect
  const triggerShakeEffect = useCallback((intensity = "medium") => {
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
    }

    setShakeEffect(true);

    if (containerRef.current) {
      containerRef.current.setAttribute("data-shake-intensity", intensity);
    }

    shakeTimeoutRef.current = setTimeout(() => {
      setShakeEffect(false);
    }, 500);
  }, []);

  // Finish typing animation
  const finishTypingAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setCompilationProgress(100);
    setCurrentStage(compileStages.length - 1);
    setGlitchEffect(true);

    triggerShakeEffect("strong");

    setTimeout(() => {
      setGlitchEffect(false);

      if (terminalRef.current) {
        anime({
          targets: terminalRef.current,
          translateY: [0, 20],
          opacity: [1, 0],
          duration: 500,
          easing: "easeInOutQuad",
          complete: () => {
            setShowCompilation(false);
            setTimeout(() => {
              onComplete();
            }, 2500);
          },
        });
      }
    }, 200);
  }, [onComplete, triggerShakeEffect, compileStages.length]);

  const processBatch = useCallback(() => {
    const position = cursorPositionRef.current;
    const startLine = position.lineIndex;
    const endLine = Math.min(startLine + batchSize, codeSnippets.length);
    let shakeIntensity = "light";

    const progress = (endLine / codeSnippets.length) * 100;
    if (progress > 75) {
      shakeIntensity = "medium";
    } else if (progress > 90) {
      shakeIntensity = "strong";
    }

    if (endLine > startLine) triggerShakeEffect(shakeIntensity);

    setTypedText((prev) => {
      const newTypedText = [...prev];
      for (let i = startLine; i < endLine; i++) {
        newTypedText[i] = codeSnippets[i];
      }
      return newTypedText;
    });

    setCursorPosition({
      lineIndex: endLine,
      charIndex: 0,
    });

    setCompilationProgress(progress);

    const stageIndex = Math.floor((progress / 100) * compileStages.length);
    if (
      stageIndex < compileStages.length &&
      stageIndex !== currentStageRef.current
    ) {
      setCurrentStage(stageIndex);
      setGlitchEffect(true);

      triggerShakeEffect("medium");

      setTimeout(() => setGlitchEffect(false), 100);
    }

    if (endLine < codeSnippets.length) {
      timerRef.current = setTimeout(processBatch, batchDelayRef.current);
    } else {
      finishTypingAnimation();
    }
  }, [
    finishTypingAnimation,
    triggerShakeEffect,
    batchSize,
    compileStages.length,
    codeSnippets,
  ]);

  // Initialize the animation
  useEffect(() => {
    if (!showCompilation) return;

    timerRef.current = setTimeout(processBatch, 100);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
        shakeTimeoutRef.current = null;
      }
    };
  }, [processBatch, showCompilation]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scanlines = () =>
      anime({
        targets: ".scanline",
        translateY: [0, 800],
        duration: 200,
        easing: "linear",
        loop: true,
      });

    const glowLines = () =>
      anime({
        targets: ".glow-line",
        opacity: [0.2, 0.5],
        translateX: [-10, 0],
        delay: anime.stagger(150),
        duration: 800,
        easing: "easeOutSine",
        loop: true,
        direction: "alternate",
      });

    const glow = () =>
      anime({
        targets: terminalRef.current,
        boxShadow: [
          "0 0 20px rgba(139, 233, 253, 0.3)",
          "0 0 20px rgba(139, 233, 253, 0.4)",
          "0 0 20px rgba(139, 233, 253, 0.3)",
        ],
        duration: 200,
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
      });

    scanlines();
    glowLines();
    glow();
  }, []);

  return {
    compilationProgress,
    currentStage,
    typedText,
    showCompilation,
    cursorPosition,
    glitchEffect,
    shakeEffect,
    containerRef,
    terminalRef,
  };
}
