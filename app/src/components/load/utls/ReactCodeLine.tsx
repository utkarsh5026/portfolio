import React from "react";

interface ReactCodeLineProps {
  line: string;
}

const ReactCodeLine: React.FC<ReactCodeLineProps> = ({ line }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: (line || "")
          .replace(
            /import|from|function|return|export default|const|let|var|<|>|\/\/|\{|\}|=>|;|,/g,
            (match) => `<span class="text-ctp-mauve">${match}</span>`
          )
          .replace(
            /useState|useEffect|useRef|lazy|Suspense|ThemeProvider/g,
            (match) => `<span class="text-ctp-sky">${match}</span>`
          )
          .replace(
            /'[^']*'/g,
            (match) => `<span class="text-ctp-green">${match}</span>`
          )
          .replace(
            /React|PersonalHeader|NavigationBar|InfiniteVoid|Skills|Projects|WorkExperience|Articles|ContactMe/g,
            (match) => `<span class="text-ctp-yellow">${match}</span>`
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
  );
};

export default ReactCodeLine;
