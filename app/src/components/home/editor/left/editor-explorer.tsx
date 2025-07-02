import React from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useEditorContext, SectionType } from "../context/explorer-context";
import Logo from "@/components/home/appbar/Logo";
import OutlinePanel from "../outline/OutlinePanel";

const Explorer: React.FC = () => {
  const { activeSection, setActiveSection, files, mobileMenuOpen } =
    useEditorContext();
  return (
    <div
      className={cn(
        "editor-explorer w-52 bg-ctp-crust border-r border-ctp-surface1 py-4 overflow-y-auto z-40 h-screen max-h-screen",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="px-4 text-ctp-text text-sm mb-2">
        <Logo />
      </div>
      <div className="text-ctp-subtext0 text-xs px-4 pt-2 pb-1">PORTFOLIO</div>

      <PortfolioFiles
        files={files}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="mt-6 px-4 text-ctp-text text-sm">EXTENSIONS</div>
      <div className="mt-2 px-2 space-y-1">
        <div className="flex items-center text-ctp-subtext0 px-2 py-1 text-xs hover:text-ctp-text">
          <IoSettingsSharp className="w-3 h-3 mr-2" />
          Theme
        </div>
        <div className="flex items-center text-ctp-subtext0 px-2 py-1 text-xs hover:text-ctp-text">
          <IoSettingsSharp className="w-3 h-3 mr-2" />
          Preferences
        </div>
      </div>
    </div>
  );
};

interface PortfolioFilesProps {
  files: {
    name: string;
    section: SectionType;
  }[];
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}
const PortfolioFiles: React.FC<PortfolioFilesProps> = ({
  files,
  activeSection,
  setActiveSection,
}) => {
  return (
    <div className="space-y-1 px-2">
      <div className="mt-2">
        <div className="px-2 py-1 text-[#6c7086] text-xs font-semibold">
          SRC
        </div>

        {files.map((file) => (
          <button
            key={file.name}
            className={cn(
              "w-full text-left px-2 py-1 text-sm rounded-sm flex items-center relative",
              activeSection === file.section
                ? "bg-[#313244] text-[#cdd6f4]"
                : "text-[#6c7086] hover:text-[#cdd6f4]"
            )}
            onClick={() => setActiveSection(file.section)}
          >
            <FaCode className="w-3 h-3 mr-2" />
            <span>{file.name}</span>
          </button>
        ))}
      </div>

      <OutlinePanel />
    </div>
  );
};

export default Explorer;
