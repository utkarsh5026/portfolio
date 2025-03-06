import { SiJavascript, SiCss3, SiReact } from "react-icons/si";

interface SideBarProps {
  file: string;
}

const SideBar: React.FC<SideBarProps> = ({ file }) => {
  return (
    <div className="w-60 bg-[#252526] flex-shrink-0 flex flex-col border-r border-[#1a1a1a]">
      <div className="h-9 px-4 flex items-center justify-between text-[#cccccc] text-xs uppercase tracking-wide font-semibold border-b border-[#1a1a1a]">
        <span>Explorer: portfolio</span>
        <span className="text-lg">...</span>
      </div>

      {/* Open editors section */}
      <div className="px-2 py-1">
        <div className="flex items-center justify-between px-2 py-1 text-[#cccccc] text-xs">
          <span>OPEN EDITORS</span>
          <span className="text-lg">...</span>
        </div>
        <div
          className={`flex items-center px-2 py-1 text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded ${
            file === "reactComponent" ? "bg-[#37373d]" : ""
          }`}
        >
          <SiReact className="mr-1.5 text-blue-400" />
          <span>Portfolio.jsx</span>
        </div>
        <div
          className={`flex items-center px-2 py-1 text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded ${
            file === "cssStyles" ? "bg-[#37373d]" : ""
          }`}
        >
          <SiCss3 className="mr-1.5 text-blue-500" />
          <span>Portfolio.css</span>
        </div>
        <div
          className={`flex items-center px-2 py-1 text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded ${
            file === "animation" ? "bg-[#37373d]" : ""
          }`}
        >
          <SiJavascript className="mr-1.5 text-yellow-400" />
          <span>Animation.js</span>
        </div>
      </div>

      {/* Project files */}
      <div className="px-2 py-1">
        <div className="flex items-center justify-between px-2 py-1 text-[#cccccc] text-xs">
          <span>PORTFOLIO</span>
          <span className="text-lg">...</span>
        </div>
        <div className="px-2">
          <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
            <span className="mr-1">▶</span>
            <span>node_modules</span>
          </div>
          <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
            <span className="mr-1">▶</span>
            <span>public</span>
          </div>
          <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
            <span className="mr-1">▼</span>
            <span>src</span>
          </div>
          <div className="ml-4">
            <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
              <span className="mr-1">▶</span>
              <span>components</span>
            </div>
            <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
              <span className="mr-1">▶</span>
              <span>styles</span>
            </div>
            <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
              <SiReact className="mr-1.5 text-blue-400" />
              <span>Portfolio.jsx</span>
            </div>
            <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
              <SiCss3 className="mr-1.5 text-blue-500" />
              <span>Portfolio.css</span>
            </div>
            <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
              <SiJavascript className="mr-1.5 text-yellow-400" />
              <span>Animation.js</span>
            </div>
          </div>
          <div className="flex items-center text-[#cccccc] text-xs hover:bg-[#2a2d2e] rounded py-1">
            <SiJavascript className="mr-1.5 text-yellow-400" />
            <span>package.json</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
