import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";

interface TerminalAnimationOptions {
  codeSnippets: string[];
  compileStages: string[];
  totalDuration?: number;
  batchSize?: number;
  onComplete: () => void;
}

/**
 * A custom hook that creates an animated terminal-like code compilation effect.
 * This hook manages the state and animations for a terminal that displays code typing,
 * compilation progress, and visual effects like glitching and screen shaking.
 *
 * @param {TerminalAnimationOptions} options - Configuration options for the animation
 * @param {string[]} options.codeSnippets - Array of code lines to be displayed
 * @param {string[]} options.compileStages - Array of compilation stage messages
 * @param {number} [options.totalDuration=3000] - Total duration of the animation in milliseconds
 * @param {number} [options.batchSize=4] - Number of code lines to process in each batch
 * @param {Function} options.onComplete - Callback function to execute when animation completes
 * @returns {Object} Animation state and refs for controlling the terminal
 */
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

  /**
   * Triggers a screen shake effect with configurable intensity.
   * The effect automatically clears after a short duration.
   *
   * @param {string} intensity - The intensity of the shake effect ('light', 'medium', or 'strong')
   */
  const triggerShakeEffect = useCallback((intensity = "medium") => {
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);

    setShakeEffect(true);

    if (containerRef.current) {
      containerRef.current.setAttribute("data-shake-intensity", intensity);
    }

    shakeTimeoutRef.current = setTimeout(() => {
      setShakeEffect(false);
    }, 500);
  }, []);

  /**
   * Completes the typing animation with final effects and transitions.
   * Triggers a strong shake effect, glitch effect, and fades out the terminal
   * before calling the onComplete callback.
   */
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

  /**
   * Processes a batch of code lines to display in the terminal.
   * Updates the cursor position, compilation progress, and triggers
   * appropriate visual effects based on progress.
   */
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

  /**
   * Initializes the animation sequence when the component mounts.
   * Sets up timers and cleans them up on unmount.
   */
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

  /**
   * Sets up visual effects for the terminal including scanlines,
   * glowing lines, and pulsing box shadow effects.
   */
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
