import { SiReact, SiCss3, SiJavascript } from "react-icons/si";
import { type CodeType } from "../code";

interface VsCodeTabsProps {
  filename: CodeType;
}

/**
 * VsCodeTabs is a React component that displays a set of tabs for different file types in a VSCode-like interface.
 * It dynamically highlights the active tab based on the filename prop.
 *
 * @param {VsCodeTabsProps} props - The component props.
 * @param {CodeType} props.filename - The type of file being displayed.
 *
 * @returns {React.ReactElement} The VsCodeTabs component.
 */
const VsCodeTabs: React.FC<VsCodeTabsProps> = ({ filename }) => {
  return (
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
  );
};

export default VsCodeTabs;
