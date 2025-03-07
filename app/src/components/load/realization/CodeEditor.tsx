import React from "react";
import { codeLines } from "./content";
import ReactCodeLine from "../utls/ReactCodeLine";

interface CodeEditorProps {
  codeProgress: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  codeProgress,
}: CodeEditorProps) => {
  return (
    <div className="code-window absolute top-[10%] left-[5%] w-[90%] md:w-[60%] md:left-[20%] h-[70%] bg-ctp-base rounded-lg overflow-hidden shadow-xl z-10 border border-ctp-surface0">
      <div className="window-header h-9 bg-ctp-mantle px-4 flex items-center border-b border-ctp-crust">
        <div className="window-controls flex gap-2 mr-4">
          <span className="window-control red w-3 h-3 rounded-full bg-ctp-red"></span>
          <span className="window-control yellow w-3 h-3 rounded-full bg-ctp-yellow"></span>
          <span className="window-control green w-3 h-3 rounded-full bg-ctp-green"></span>
        </div>
        <div className="file-title text-sm text-ctp-text font-mono flex items-center">
          <span className="text-ctp-red mr-1">*</span>Portfolio.jsx
        </div>
      </div>
      <div className="code-content flex h-[calc(100%-36px)] font-mono text-sm leading-relaxed overflow-y-auto">
        <div className="line-numbers w-[40px] flex-shrink-0 py-3 text-right bg-ctp-mantle text-ctp-overlay0 select-none">
          {codeLines.map((line, i) => (
            <div key={line} className="line-number px-2 py-0">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="code-lines flex-grow p-4 relative">
          {codeLines.slice(0, codeProgress).map((line) => (
            <div key={line} className="code-line whitespace-pre text-ctp-text">
              <ReactCodeLine line={line} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
