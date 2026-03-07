import React, { useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import {
  FaEye,
  FaFolder,
  FaFolderOpen,
  FaGithub,
  FaLinkedin,
  FaTerminal,
} from "react-icons/fa";
import { VscSourceControl } from "react-icons/vsc";

import GhostButton from "@/components/ui/ghost-button";
import { cn } from "@/lib/utils";

import { useEditorContext } from "../context/explorer-context";
import GitCommitsPanel from "../git-commits/git-commits-panel";

const SideBar: React.FC = () => {
  const {
    mobileMenuOpen,
    setActiveSection,
    explorerOpen,
    setExplorerOpen,
    terminalOpen,
    setTerminalOpen,
  } = useEditorContext();

  const [gitPanelOpen, setGitPanelOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "editor-sidebar w-14 bg-ctp-mantle border-r border-ctp-surface0 flex flex-col items-center py-4 z-50 fixed inset-y-0 left-0 transition-transform duration-200",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Home — Avatar Button */}
        <button
          title="Home"
          onClick={() => setActiveSection("home")}
          className="mb-6 group relative flex items-center justify-center"
        >
          <img
            src="./personal.webp"
            alt="Utkarsh Priyadarshi"
            className="w-6 h-6 rounded-full object-cover ring-2 ring-ctp-mauve/60 transition-all duration-200 group-hover:ring-ctp-lavender group-hover:scale-110"
          />
        </button>

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
          onClick={() =>
            window.open("https://github.com/utkarsh5026", "_blank")
          }
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
          onClick={() =>
            window.open("https://github.com/utkarsh5026/Portfolio")
          }
        />

        {/* Source Control — opens the git commits panel */}
        <GhostButton
          icon={<VscSourceControl className="w-5 h-5 text-ctp-teal" />}
          label="Source Control"
          onClick={() => setGitPanelOpen((prev) => !prev)}
          isActive={gitPanelOpen}
        />

        <GhostButton
          icon={<FaTerminal className="w-5 h-5 text-ctp-peach" />}
          label="Terminal"
          onClick={() => setTerminalOpen(!terminalOpen)}
          isActive={terminalOpen}
        />
      </div>

      <GitCommitsPanel
        open={gitPanelOpen}
        onClose={() => setGitPanelOpen(false)}
      />
    </>
  );
};

export default SideBar;
