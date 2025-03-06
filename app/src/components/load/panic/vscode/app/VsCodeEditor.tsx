import React from "react";
import { CodeType } from "../code";
import { getSyntaxClass } from "./syntax";

interface VsCodeEditorProps {
  filename: CodeType;
  typingProgress: Record<CodeType, number>;
  isActive: boolean;
  codeContent: Record<CodeType, string[]>;
  language: string;
}

const VsCodeEditor = React.forwardRef<HTMLDivElement, VsCodeEditorProps>(
  ({ filename, typingProgress, isActive, codeContent, language }, ref) => {
    return (
      <div
        ref={ref}
        className="code-editor flex-1 overflow-auto bg-[#1e1e1e] vscode-content-appear"
      >
        <div className="flex font-mono text-sm leading-relaxed h-full">
          {/* Line numbers */}
          <div className="w-12 flex-shrink-0 py-2.5 text-right bg-[#1e1e1e] text-[#6e7681] select-none border-r border-[#323233]">
            {codeContent[filename].map((_, i) => (
              <div
                key={i}
                className={`h-6 px-2 hover:text-[#cccccc] ${
                  i < (typingProgress[filename] || 0)
                    ? "visible-line-number"
                    : "invisible-line-number"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-grow p-2.5 relative">
            <div className="space-y-0">
              {codeContent[filename]
                .slice(0, typingProgress[filename] || 0)
                .map((line, i) => {
                  // Calculate a very short staggered delay for more natural typing appearance
                  const appearanceStyle = {
                    animationDelay: `${Math.min(i * 10, 100)}ms`,
                  };

                  return (
                    <div
                      key={`${filename}-${i}`}
                      className="h-6 flex items-center text-[#abb2bf] whitespace-pre typed-line"
                      style={appearanceStyle}
                    >
                      {/* Simple token parsing for syntax highlighting */}
                      {line
                        .split(
                          /(\s+|[{}();,=><]|\/\/.*$|(['"])(?:(?=(\\?))\3.)*?\2)/
                        )
                        .filter(Boolean)
                        .map((token, j) => (
                          <span
                            key={j}
                            className={getSyntaxClass(token, language)}
                          >
                            {token}
                          </span>
                        ))}
                    </div>
                  );
                })}
            </div>

            {/* Only show cursor for active window */}
            {isActive && (
              <div
                className="code-cursor absolute w-0.5 h-[18px] bg-[#aeafad] opacity-60 animate-blink"
                style={{
                  top: `${Math.min(
                    (typingProgress[filename] || 0) * 24,
                    codeContent[filename].length * 24
                  )}px`,
                  left: "0px",
                }}
              ></div>
            )}
          </div>

          {/* Minimap */}
          <div className="w-[60px] bg-[#252526] flex-shrink-0 relative vscode-minimap-appear">
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              {codeContent[filename].map((line, i) => (
                <div
                  key={`${filename}-${i}`}
                  className="h-[2px] mx-1 my-[1px] bg-gray-400"
                  style={{
                    width: `${Math.min(line.length * 0.5, 50)}px`,
                    opacity: i < (typingProgress[filename] || 0) ? 1 : 0,
                    transition: "opacity 0.1s ease-in",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-[15px] h-[60px] bg-[#37373d] opacity-40"></div>
          </div>
        </div>
      </div>
    );
  }
);

export default VsCodeEditor;
