import React, { useEffect, useRef } from "react";
import { codeSnippets } from "./content";

interface CodeProps {
  typedText: string[];
  cursorPosition: {
    lineIndex: number;
    charIndex: number;
  };
}

const Code: React.FC<CodeProps> = ({ typedText, cursorPosition }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && activeLineRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;

      const containerHeight = container.clientHeight;
      const activeLineTop = activeLine.offsetTop;
      const activeLineHeight = activeLine.clientHeight;

      const idealScrollTop =
        activeLineTop - containerHeight / 2 + activeLineHeight;

      const scrollTop = Math.max(0, idealScrollTop);

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [typedText, cursorPosition]);

  return (
    <div
      ref={containerRef}
      className="bg-[#11111b] p-4 rounded mb-6 h-[400px] overflow-y-auto terminal-scrollbar"
    >
      {codeSnippets.map((line, index) => (
        <div
          key={line}
          className="flex mb-1 relative"
          ref={cursorPosition.lineIndex === index ? activeLineRef : null}
        >
          <span className="text-[#6c7086] w-10 text-right pr-4 select-none">
            {index + 1}
          </span>
          <pre className="text-[#cdd6f4] whitespace-pre">
            <span
              dangerouslySetInnerHTML={{
                __html: (typedText[index] || "")
                  .replace(
                    /import|from|function|return|export default|const|let|var|<|>|\/\/|\{|\}|=>|;|,/g,
                    (match) => `<span class="text-[#cba6f7]">${match}</span>`
                  )
                  .replace(
                    /useState|useEffect|useRef|lazy|Suspense|ThemeProvider/g,
                    (match) => `<span class="text-[#89b4fa]">${match}</span>`
                  )
                  .replace(
                    /'[^']*'/g,
                    (match) => `<span class="text-[#a6e3a1]">${match}</span>`
                  )
                  .replace(
                    /React|PersonalHeader|NavigationBar|InfiniteVoid|Skills|Projects|WorkExperience|Articles|ContactMe/g,
                    (match) => `<span class="text-[#f9e2af]">${match}</span>`
                  )
                  .replace(
                    /\([^)]*\)/g,
                    (match) => `<span class="text-[#cdd6f4]">${match}</span>`
                  )
                  .replace(
                    /(\/\/ .*$)/g,
                    (match) => `<span class="text-ctp-blue">${match}</span>`
                  ),
              }}
            />
            {cursorPosition.lineIndex === index && (
              <span className="inline-block w-2 h-4 ml-px bg-ctp-blue animate-blink"></span>
            )}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default Code;
