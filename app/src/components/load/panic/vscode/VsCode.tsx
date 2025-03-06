import React, { useEffect, useRef } from "react";
import MacosTrafficController from "../../macos/MacosTrafficController";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebug,
  VscExtensions,
  VscAccount,
} from "react-icons/vsc";
import { codeContent, type CodeType } from "./code";
import { SiReact, SiCss3, SiJavascript } from "react-icons/si";
import StatusBar from "./StatusBar";
import SideBar from "./SideBar";
import { getFileInfo, getSyntaxClass } from "./syntax";

interface VsCodeProps {
  filename: CodeType;
  typingProgress: Record<CodeType, number>;
  isActiveFile?: boolean; // New prop to indicate if this is the active file
}

const VsCode: React.FC<VsCodeProps> = ({
  filename,
  typingProgress,
  isActiveFile = false,
}) => {
  const { language, filename: fileType, problems } = getFileInfo(filename);
  const codeEditorRef = useRef<HTMLDivElement>(null);

  // Update scroll position as we type
  useEffect(() => {
    if (codeEditorRef.current && isActiveFile && typingProgress[filename] > 0) {
      const lineHeight = 24; // Height of each line in pixels
      const currentLine = typingProgress[filename] - 1;
      const scrollTarget = currentLine * lineHeight;

      // Scroll to keep the current line in view
      codeEditorRef.current.scrollTo({
        top: Math.max(0, scrollTarget - 100), // Offset to show some context
        behavior: "smooth",
      });
    }
  }, [typingProgress, filename, isActiveFile]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#1e1e1e]">
      {/* Title bar */}
      <MacosTrafficController
        appIcon={<BiLogoVisualStudio className="text-[#0066b8]" />}
        appName={fileType}
      />

      {/* VS Code top menu */}
      <div className="h-6 bg-[#252526] px-4 flex items-center text-[#cccccc] text-xs border-b border-[#1a1a1a] vscode-menu-appear">
        <div className="flex items-center space-x-4">
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-12 bg-[#252526] flex-shrink-0 flex flex-col items-center py-2 text-[#858585] border-r border-[#1a1a1a] vscode-sidebar-appear">
          <div className="flex flex-col space-y-6">
            <SideBarElement icon={<VscFiles size={24} />} />
            <SideBarElement icon={<VscSearch size={24} />} />
            <SideBarElement icon={<VscSourceControl size={24} />} />
            <SideBarElement icon={<VscDebug size={24} />} />
            <SideBarElement icon={<VscExtensions size={24} />} />
          </div>
          <div className="mt-auto">
            <SideBarElement icon={<VscAccount size={24} />} />
          </div>
        </div>

        <SideBar file={filename} />

        {/* Main editor */}
        <div className="flex-1 flex flex-col overflow-hidden vscode-editor-appear">
          {/* Editor tabs */}
          <div className="h-9 bg-[#252526] flex items-center text-[#969696] text-xs border-b border-[#1a1a1a] pl-1 vscode-tabs-appear">
            <div
              className={`flex h-9 items-center px-3 border-t-2 ${
                filename === "reactComponent"
                  ? "border-t-[#0066b8] bg-[#1e1e1e] text-white"
                  : "border-t-transparent"
              }`}
            >
              <SiReact className="mr-1.5 text-blue-400" />
              <span>Portfolio.jsx</span>
              {filename === "reactComponent" && (
                <span className="ml-2 w-4 h-4 flex items-center justify-center text-xs bg-[#252526] hover:bg-[#333333] rounded-sm">
                  ×
                </span>
              )}
            </div>
            <div
              className={`flex h-9 items-center px-3 border-t-2 ${
                filename === "cssStyles"
                  ? "border-t-[#0066b8] bg-[#1e1e1e] text-white"
                  : "border-t-transparent"
              }`}
            >
              <SiCss3 className="mr-1.5 text-blue-500" />
              <span>Portfolio.css</span>
              {filename === "cssStyles" && (
                <span className="ml-2 w-4 h-4 flex items-center justify-center text-xs bg-[#252526] hover:bg-[#333333] rounded-sm">
                  ×
                </span>
              )}
            </div>
            <div
              className={`flex h-9 items-center px-3 border-t-2 ${
                filename === "animation"
                  ? "border-t-[#0066b8] bg-[#1e1e1e] text-white"
                  : "border-t-transparent"
              }`}
            >
              <SiJavascript className="mr-1.5 text-yellow-400" />
              <span>Animation.js</span>
              {filename === "animation" && (
                <span className="ml-2 w-4 h-4 flex items-center justify-center text-xs bg-[#252526] hover:bg-[#333333] rounded-sm">
                  ×
                </span>
              )}
            </div>
          </div>

          {/* Code editor */}
          <div
            ref={codeEditorRef}
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
                      // Calculate a staggered delay for more natural typing appearance
                      const appearanceStyle = {
                        animationDelay: `${Math.min(i * 20, 300)}ms`,
                      };

                      return (
                        <div
                          key={i}
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
              </div>

              {/* Minimap */}
              <div className="w-[60px] bg-[#252526] flex-shrink-0 relative vscode-minimap-appear">
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                  {codeContent[filename].map((line, i) => (
                    <div
                      key={i}
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

          {/* Status bar */}
          <StatusBar
            problems={problems}
            language={language}
            typingProgress={typingProgress[filename] || 0}
            totalLines={codeContent[filename].length}
          />
        </div>
      </div>
    </div>
  );
};

interface SideBarElementProps {
  icon: React.ReactNode;
}
const SideBarElement: React.FC<SideBarElementProps> = ({ icon }) => {
  return (
    <span className="flex items-center justify-center h-10 w-10 hover:text-[#cccccc] text-[#cccccc]">
      {icon}
    </span>
  );
};

export default VsCode;
