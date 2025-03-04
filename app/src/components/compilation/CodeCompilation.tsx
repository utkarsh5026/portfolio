import React, { useEffect, useState, useRef, useCallback } from "react";
import anime from "animejs";
import { codeSnippets, COMPILE_STAGES } from "./content";

import MatrixEffect from "../animations/MatrixEffect";
import Code from "./Code";
import AfterBuild from "./AfterBuild";

interface CodeCompilationProps {
  onLoadComplete: () => void;
}

// Reduce the total duration to make it feel snappier
const TOTAL_DURATION_MS = 9000; // 6 seconds total (half the original time)
// Process multiple lines per update to speed things up
const LINES_PER_UPDATE = 2;

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate delay between batches - much shorter than original
  const BATCH_DELAY =
    TOTAL_DURATION_MS / Math.ceil(codeSnippets.length / LINES_PER_UPDATE);

  const finishTypingAnimation = useCallback(() => {
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
          duration: 300, // Even faster exit animation
          easing: "easeInOutQuad",
          complete: () => {
            setShowCompilation(false);
            setTimeout(() => {
              onLoadComplete();
            }, 500); // Reduced delay here too
          },
        });
      }
    }, 150); // Shorter glitch effect
  }, [onLoadComplete]);

  const processBatch = useCallback(() => {
    const startLine = cursorPosition.lineIndex;
    const endLine = Math.min(startLine + LINES_PER_UPDATE, codeSnippets.length);

    // Update multiple lines at once for faster animation
    setTypedText((prev) => {
      const newTypedText = [...prev];
      for (let i = startLine; i < endLine; i++) {
        newTypedText[i] = codeSnippets[i];
      }
      return newTypedText;
    });

    if (endLine < codeSnippets.length) {
      setCursorPosition({
        lineIndex: endLine,
        charIndex: 0,
      });

      // Schedule next batch with a short delay
      timerRef.current = setTimeout(processBatch, BATCH_DELAY);
    } else {
      // Finish animation immediately when all lines are processed
      finishTypingAnimation();
    }

    // Update progress and stage
    const progress = (endLine / codeSnippets.length) * 100;
    setCompilationProgress(progress);

    const stageIndex = Math.floor((progress / 100) * COMPILE_STAGES.length);
    if (stageIndex < COMPILE_STAGES.length && stageIndex !== currentStage) {
      setCurrentStage(stageIndex);
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 50); // Shorter glitch effect
    }
  }, [cursorPosition, currentStage, finishTypingAnimation, BATCH_DELAY]);

  useEffect(() => {
    if (!showCompilation) return;

    // Start processing immediately
    processBatch();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [processBatch, showCompilation]);

  // Terminal visual effects
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
