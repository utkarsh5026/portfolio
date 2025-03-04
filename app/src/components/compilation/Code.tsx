import { codeSnippets } from "./content";

interface CodeProps {
  typedText: string[];
  cursorPosition: {
    lineIndex: number;
    charIndex: number;
  };
}

const Code: React.FC<CodeProps> = ({ typedText, cursorPosition }) => {
  return (
    <div className="bg-[#11111b] p-4 rounded mb-6 h-[400px] overflow-y-auto terminal-scrollbar">
      {codeSnippets.map((line, index) => (
        <div key={line} className="flex mb-1 relative">
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
                    (match) => `<span class="text-[#6c7086]">${match}</span>`
                  ),
              }}
            />
            {cursorPosition.lineIndex === index && (
              <span className="inline-block w-2 h-4 ml-px bg-[#89b4fa] animate-blink"></span>
            )}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default Code;
