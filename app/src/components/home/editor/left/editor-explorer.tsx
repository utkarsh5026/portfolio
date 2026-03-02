import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  VscMarkdown,
  VscFolder,
  VscFolderOpened,
  VscChevronRight,
} from "react-icons/vsc";
import { useEditorContext, SectionType } from "../context/explorer-context";
import Logo from "@/components/home/appbar/Logo";
import OutlinePanel from "../outline/outline-panel";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

const getProjectFileName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".md";

interface TreeFileProps {
  name: string;
  isActive: boolean;
  depth?: number;
  onClick: () => void;
}

const TreeFile: React.FC<TreeFileProps> = ({
  name,
  isActive,
  depth = 0,
  onClick,
}) => (
  <button
    onClick={onClick}
    style={{ paddingLeft: `${16 + depth * 12}px` }}
    className={cn(
      "w-full text-left py-[3px] pr-3 text-[13px] flex items-center gap-1.5 transition-colors duration-75 font-roboto-mono",
      isActive
        ? "bg-ctp-surface1/60 text-ctp-text border-l-2 border-ctp-mauve shadow-[inset_1px_0_0_rgba(203,166,247,0.3)] font-medium"
        : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/40 border-l-2 border-transparent",
    )}
  >
    <VscMarkdown
      className={cn(
        "w-[15px] h-[15px] flex-shrink-0 transition-colors duration-75",
        isActive
          ? "text-ctp-blue drop-shadow-sm"
          : "text-ctp-overlay0 group-hover:text-ctp-overlay1",
      )}
    />
    <span className="truncate tracking-tight leading-none">{name}</span>
  </button>
);

interface TreeFolderProps {
  name: string;
  isOpen: boolean;
  depth?: number;
  onToggle: () => void;
  children: React.ReactNode;
}

const TreeFolder: React.FC<TreeFolderProps> = ({
  name,
  isOpen,
  depth = 0,
  onToggle,
  children,
}) => (
  <div className="mb-0">
    <button
      onClick={onToggle}
      style={{ paddingLeft: `${4 + depth * 12}px` }}
      className="group w-full text-left py-[3px] pr-3 text-[13px] flex items-center gap-1 text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0/40 transition-colors duration-75 border-l-2 border-transparent font-source"
    >
      <VscChevronRight
        className={cn(
          "w-[15px] h-[15px] flex-shrink-0 transition-transform duration-75",
          isOpen
            ? "rotate-90 text-ctp-overlay1"
            : "text-ctp-overlay0 group-hover:text-ctp-overlay1",
        )}
      />
      {isOpen ? (
        <VscFolderOpened className="w-[15px] h-[15px] flex-shrink-0 text-ctp-yellow ml-0.5 transition-colors duration-75" />
      ) : (
        <VscFolder className="w-[15px] h-[15px] flex-shrink-0 text-ctp-yellow/80 group-hover:text-ctp-yellow ml-0.5 transition-colors duration-75" />
      )}
      <span className="font-medium tracking-tight ml-1 leading-none">
        {name}
      </span>
    </button>
    {isOpen && <div className="mt-0">{children}</div>}
  </div>
);

const Explorer: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    files,
    mobileMenuOpen,
    activeProjectId,
    openProject,
  } = useEditorContext();

  const [rootOpen, setRootOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectClick = (project: Project) => {
    openProject(project);
  };

  return (
    <div
      className={cn(
        "editor-explorer w-64 bg-ctp-crust/95 shadow-[8px_0_30px_rgba(0,0,0,0.25)] border-r border-ctp-surface1/50 py-3 overflow-y-auto z-40 h-screen max-h-screen flex flex-col backdrop-blur-xl transition-transform duration-300",
        mobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0 ",
      )}
    >
      {/* Logo */}
      <div className="px-4 text-ctp-text text-sm mb-4 drop-shadow-sm">
        <Logo />
      </div>

      {/* Section label */}
      <div className="flex items-center px-4 pb-1 mb-0">
        <div className="text-[11px] font-bold uppercase tracking-widest text-ctp-subtext0">
          Explorer
        </div>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto px-0 pb-4 space-y-0 scrollbar-thin scrollbar-thumb-ctp-surface1 hover:scrollbar-thumb-ctp-surface2 scrollbar-track-transparent mt-1">
        <TreeFolder
          name="portfolio"
          isOpen={rootOpen}
          onToggle={() => setRootOpen((o) => !o)}
        >
          {files.map((file) => (
            <TreeFile
              key={file.section}
              name={file.name}
              depth={1}
              isActive={
                activeProjectId === null && activeSection === file.section
              }
              onClick={() => setActiveSection(file.section as SectionType)}
            />
          ))}

          {/* projects/ folder */}
          <TreeFolder
            name="projects"
            isOpen={projectsOpen}
            depth={1}
            onToggle={() => setProjectsOpen((o) => !o)}
          >
            {isLoading && (
              <p
                style={{ paddingLeft: "46px" }}
                className="text-[11px] text-ctp-overlay0 py-1.5 font-mono animate-pulse"
              >
                loading…
              </p>
            )}
            {projects.map((project) => (
              <TreeFile
                key={project.name}
                name={getProjectFileName(project.name)}
                depth={2}
                isActive={activeProjectId === project.name}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </TreeFolder>
        </TreeFolder>
      </div>

      {/* Outline panel */}
      <div className="mt-2 border-t border-ctp-surface1/60 pt-2 px-0">
        <OutlinePanel />
      </div>
    </div>
  );
};

export default Explorer;
