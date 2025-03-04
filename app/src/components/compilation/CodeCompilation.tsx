import React, { useEffect, useState, useRef, useCallback } from "react";
import anime from "animejs";
import { codeSnippets, COMPILE_STAGES } from "./content";

import MatrixEffect from "../animations/MatrixEffect";
import Code from "./Code";
import AfterBuild from "./AfterBuild";
import "./style.css";

interface CodeCompilationProps {
  onLoadComplete: () => void;
}

const TOTAL_DURATION_MS = 3000;
const BATCH_SIZE = 4;

const CodeCompilation: React.FC<CodeCompilationProps> = ({
  onLoadComplete,
}) => {
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

  // Store batch delay in a ref so it doesn't change
  const batchDelayRef = useRef(
    TOTAL_DURATION_MS / Math.ceil(codeSnippets.length / BATCH_SIZE)
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Store key values in refs to stabilize dependencies
  const cursorPositionRef = useRef(cursorPosition);
  cursorPositionRef.current = cursorPosition;

  const currentStageRef = useRef(currentStage);
  currentStageRef.current = currentStage;

  const finishTypingAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setCompilationProgress(100);
    setCurrentStage(COMPILE_STAGES.length - 1);
    setGlitchEffect(true);

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
              onLoadComplete();
            }, 1000);
          },
        });
      }
    }, 200);
  }, [onLoadComplete]);

  // Stabilize processBatch with minimal dependencies
  const processBatch = useCallback(() => {
    // Use ref values to avoid dependency changes
    const position = cursorPositionRef.current;
    const startLine = position.lineIndex;
    const endLine = Math.min(startLine + BATCH_SIZE, codeSnippets.length);

    // Process multiple lines at once for speed
    setTypedText((prev) => {
      const newTypedText = [...prev];
      for (let i = startLine; i < endLine; i++) {
        newTypedText[i] = codeSnippets[i];
      }
      return newTypedText;
    });

    // Update cursor position
    setCursorPosition({
      lineIndex: endLine,
      charIndex: 0,
    });

    // Calculate and update progress
    const progress = (endLine / codeSnippets.length) * 100;
    setCompilationProgress(progress);

    // Update stage if needed
    const stageIndex = Math.floor((progress / 100) * COMPILE_STAGES.length);
    if (
      stageIndex < COMPILE_STAGES.length &&
      stageIndex !== currentStageRef.current
    ) {
      setCurrentStage(stageIndex);
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 100);
    }

    // Schedule next batch or finish
    if (endLine < codeSnippets.length) {
      // Important: use the ref value to maintain consistent timing
      timerRef.current = setTimeout(processBatch, batchDelayRef.current);
    } else {
      finishTypingAnimation();
    }
  }, [finishTypingAnimation]); // Only depend on finishTypingAnimation

  // Initialize the animation
  useEffect(() => {
    if (!showCompilation) return;

    // Start the first batch after a short delay
    timerRef.current = setTimeout(processBatch, 100);

    // Clean up any timers when component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [processBatch, showCompilation]);

  // Terminal visual effects setup
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

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1e2e] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Matrix-like code rain */}
        {showCompilation && (
          <MatrixEffect isActive={true} glowAccent="#89b4fa" icon="🚀" />
        )}

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] via-[#181825] to-[#11111b] opacity-70"></div>
      </div>

      {showCompilation ? (
        <div
          className={`max-w-4xl w-full px-6 transition-all duration-1000 ${
            glitchEffect ? "glitch" : ""
          }`}
          ref={containerRef}
        >
          {/* Terminal header */}
          <div className="bg-[#11111b] border border-[#313244] rounded-t-lg px-4 py-2 flex items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f38ba8]"></div>
              <div className="w-3 h-3 rounded-full bg-[#f9e2af]"></div>
              <div className="w-3 h-3 rounded-full bg-[#a6e3a1]"></div>
            </div>
            <div className="mx-auto text-[#cdd6f4] text-sm font-mono tracking-wide">
              utkarsh.me | portfolio build
            </div>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="terminal border border-t-0 border-[#313244] bg-[#181825] rounded-b-lg p-6 font-mono text-sm shadow-[0_0_10px_rgba(139,233,253,0.3)]"
          >
            <div className="mb-6 flex items-center">
              <span className="text-[#cba6f7] font-bold">$</span>
              <span className="text-[#cdd6f4] ml-2">
                npm run build:production --optimize
              </span>
              <div className="ml-2 h-4 w-2 bg-[#cba6f7] animate-blink"></div>
            </div>

            <Code typedText={typedText} cursorPosition={cursorPosition} />

            {/* Compilation status and details */}
            <div className="space-y-3">
              <div className="text-[#cdd6f4] flex justify-between">
                <span className="text-[#89b4fa] font-bold">
                  {COMPILE_STAGES[currentStage]}
                </span>
                <span className="text-[#a6e3a1]">
                  {Math.floor(compilationProgress)}%
                </span>
              </div>

              <div className="w-full h-2 bg-[#313244] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] transition-all duration-300 ease-out"
                  style={{ width: `${compilationProgress}%` }}
                ></div>
              </div>

              {/* Build details */}
              <div className="mt-6 text-[#6c7086] text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Bundle size:</span>
                  <span className="text-[#f9e2af]">142.8 KB</span>
                </div>
                <div className="flex justify-between">
                  <span>Optimization level:</span>
                  <span className="text-[#a6e3a1]">production</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="text-[#89b4fa]">node v18.17.1</span>
                </div>
              </div>

              {/* Terminal animations */}
              <div className="mt-4 space-y-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="glow-line h-3 bg-gradient-to-r from-[#313244] to-transparent opacity-0 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AfterBuild />
      )}
    </div>
  );
};

export default CodeCompilation;
