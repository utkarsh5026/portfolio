import React, { useEffect, useRef } from "react";
import MacosTrafficController from "../../../macos/macos-traffic-controller";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebug,
  VscExtensions,
  VscAccount,
} from "react-icons/vsc";
import { codeContent, type CodeType } from "../code";
import StatusBar from "./StatusBar";
import SideBar from "./SideBar";
import VsCodeTabs from "./VsCodeTabs";
import { getFileInfo } from "./syntax";
import "./VsCodeAnimation.css";
import VsCodeEditor from "./VsCodeEditor";

interface VsCodeProps {
  filename: CodeType;
  typingProgress: Record<CodeType, number>;
  isActive?: boolean;
}

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
] as const;

/**
 * VsCode is a React component that simulates a Visual Studio Code editor interface.
 * It displays code with syntax highlighting and simulates typing progress.
 *
 * @param {VsCodeProps} props - The component props.
 * @param {CodeType} props.filename - The type of file being displayed.
 * @param {Record<CodeType, number>} props.typingProgress - Object tracking typing progress for each file.
 * @param {boolean} [props.isActive=false] - Whether this editor is currently active.
 *
 * @returns {React.ReactElement} The VsCode component.
 */
const VsCode: React.FC<VsCodeProps> = ({
  filename,
  typingProgress,
  isActive = false,
}) => {
  const { language, filename: fileType, problems } = getFileInfo(filename);
  const codeEditorRef = useRef<HTMLDivElement>(null);

  /**
   * Effect hook to handle auto-scrolling of the editor as typing progresses.
   * Scrolls to keep the current line in view when the component is active.
   */
  useEffect(() => {
    if (codeEditorRef.current && isActive && typingProgress[filename] > 0) {
      const lineHeight = 24;
      const currentLine = typingProgress[filename] - 1;
      const scrollTarget = currentLine * lineHeight;

      codeEditorRef.current.scrollTo({
        top: Math.max(0, scrollTarget - 100),
        behavior: "smooth",
      });
    }
  }, [typingProgress, filename, isActive]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#1e1e1e]">
      <MacosTrafficController
        appIcon={<BiLogoVisualStudio className="text-[#0066b8]" />}
        appName={fileType}
      />

      <div className="h-6 bg-[#252526] px-4 flex items-center text-[#cccccc] text-xs border-b border-[#1a1a1a] vscode-menu-appear">
        <div className="flex items-center space-x-4">
          {menuItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
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
          <VsCodeTabs filename={filename} />

          <VsCodeEditor
            ref={codeEditorRef}
            filename={filename}
            typingProgress={typingProgress}
            isActive={isActive}
            codeContent={codeContent}
            language={language}
          />

          {/* Status bar */}
          <StatusBar
            problems={problems}
            language={language}
            typingProgress={typingProgress[filename] || 0}
            totalLines={codeContent[filename].length}
            timeRemaining={isActive}
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
