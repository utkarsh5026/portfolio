import React from "react";
import {
  FaCode,
  FaFolder,
  FaFolderOpen,
  FaGithub,
  FaTerminal,
  FaLinkedin,
  FaEye,
} from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useEditorContext } from "../context/explorerContext";
import GhostButton from "@/components/utils/GhostButton";

/**
 * SideBar component renders a vertical sidebar for navigation in the editor.
 * It provides buttons for various sections such as Home, Projects, GitHub, LinkedIn, and Terminal.
 * The sidebar can be toggled for mobile view and includes visual indicators for active states.
 *
 * @component
 * @returns {JSX.Element} The rendered SideBar component.
 */
const SideBar: React.FC = () => {
  const {
    mobileMenuOpen,
    setActiveSection,
    explorerOpen,
    setExplorerOpen,
    terminalOpen,
    setTerminalOpen,
  } = useEditorContext();

  return (
    <div
      className={cn(
        "editor-sidebar w-14 bg-[#181825] border-r border-[#313244] flex flex-col items-center py-4 z-50fixed inset-y-0 left-0 transition-transform duration-200",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <GhostButton
        icon={<FaCode className="w-5 h-5 text-ctp-green" />}
        label="Home"
        onClick={() => setActiveSection("home")}
        className="mb-6"
      />

      <GhostButton
        icon={<BsLayoutSidebarInset className="w-5 h-5" />}
        label={explorerOpen ? "Hide Explorer" : "Show Explorer"}
        onClick={() => setExplorerOpen(!explorerOpen)}
        isActive={explorerOpen}
      />

      <GhostButton
        icon={<FaFolder className="w-5 h-5" />}
        label="Projects"
        onClick={() => setActiveSection("projects")}
      />

      <GhostButton
        icon={<FaGithub className="w-4 h-4" />}
        label="GitHub"
        onClick={() => window.open("https://github.com/utkarsh5026", "_blank")}
        className="text-ctp-lavender hover:text-ctp-blue"
      />

      <GhostButton
        icon={<FaLinkedin className="w-4 h-4" />}
        label="LinkedIn"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
            "_blank"
          )
        }
        className="text-ctp-sapphire hover:text-ctp-blue"
      />

      <GhostButton
        icon={<FaEye className="w-5 h-5 text-ctp-red" />}
        label="View Resume"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing"
          )
        }
      />

      <div className="flex-1"></div>

      <GhostButton
        icon={<FaFolderOpen className="w-5 h-5 text-ctp-mauve" />}
        label="Github Repo for Portfolio"
        onClick={() => window.open("https://github.com/utkarsh5026/Portfolio")}
      />

      <GhostButton
        icon={<FaTerminal className="w-5 h-5 text-ctp-peach" />}
        label="Terminal"
        onClick={() => setTerminalOpen(!terminalOpen)}
        isActive={terminalOpen}
      />
    </div>
  );
};

export default SideBar;
