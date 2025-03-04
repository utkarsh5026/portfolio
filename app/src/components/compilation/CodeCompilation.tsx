import React from "react";
import { codeSnippets, COMPILE_STAGES } from "./content";

import MatrixEffect from "../animations/MatrixEffect";
import Code from "./Code";
import AfterBuild from "./AfterBuild";
import { useTerminalAnimation } from "./use-compilation";
import "./style.css";

interface CodeCompilationProps {
  onLoadComplete: () => void;
}

const CodeCompilation: React.FC<CodeCompilationProps> = ({
  onLoadComplete,
}) => {
  const {
    compilationProgress,
    currentStage,
    typedText,
    showCompilation,
    cursorPosition,
    glitchEffect,
    containerRef,
    terminalRef,
    shakeEffect,
  } = useTerminalAnimation({
    codeSnippets,
    compileStages: COMPILE_STAGES,
    totalDuration: 3000,
    batchSize: 4,
    onComplete: onLoadComplete,
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1e2e] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {showCompilation && (
          <MatrixEffect isActive={true} glowAccent="#89b4fa" icon="🚀" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] via-[#181825] to-[#11111b] opacity-70"></div>
      </div>

      {showCompilation ? (
        <div
          className={`max-w-4xl w-full px-6 transition-all duration-1000 ${
            glitchEffect ? "glitch" : ""
          } ${shakeEffect ? "screen-shake" : ""}`}
          ref={containerRef}
        >
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
