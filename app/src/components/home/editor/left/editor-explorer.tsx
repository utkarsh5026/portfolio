import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  VscMarkdown,
  VscFolder,
  VscFolderOpened,
  VscChevronRight,
  VscChevronDown,
} from "react-icons/vsc";
import { useEditorContext, SectionType } from "../context/explorer-context";
import Logo from "@/components/home/appbar/Logo";
import OutlinePanel from "../outline/outline-panel";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

// ─── helpers ────────────────────────────────────────────────────────────────

const getProjectFileName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".md";

// ─── tree primitives ─────────────────────────────────────────────────────────

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
    style={{ paddingLeft: `${12 + depth * 12}px` }}
    className={cn(
      "w-full text-left py-0.5 pr-2 text-sm flex items-center gap-1.5 rounded-sm transition-colors",
      isActive
        ? "bg-ctp-surface1 text-ctp-text"
        : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/60",
    )}
  >
    <VscMarkdown
      className={cn(
        "w-3.5 h-3.5 flex-shrink-0",
        isActive ? "text-ctp-blue" : "text-ctp-overlay0",
      )}
    />
    <span className="truncate font-mono text-xs">{name}</span>
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
  <div>
    <button
      onClick={onToggle}
      style={{ paddingLeft: `${depth * 12}px` }}
      className="w-full text-left py-0.5 pr-2 text-sm flex items-center gap-1 rounded-sm text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0/60 transition-colors"
    >
      {isOpen ? (
        <VscChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-ctp-overlay1" />
      ) : (
        <VscChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-ctp-overlay1" />
      )}
      {isOpen ? (
        <VscFolderOpened className="w-3.5 h-3.5 flex-shrink-0 text-ctp-yellow" />
      ) : (
        <VscFolder className="w-3.5 h-3.5 flex-shrink-0 text-ctp-yellow" />
      )}
      <span className="font-mono text-xs">{name}</span>
    </button>
    {isOpen && <div>{children}</div>}
  </div>
);

// ─── main explorer ────────────────────────────────────────────────────────────

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

  const sectionFiles = files.filter((f) => f.section !== "projects");

  const handleProjectClick = (project: Project) => {
    openProject(project);
  };

  return (
    <div
      className={cn(
        "editor-explorer w-56 bg-ctp-crust border-r border-ctp-surface1 py-4 overflow-y-auto z-40 h-screen max-h-screen flex flex-col",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Logo */}
      <div className="px-4 text-ctp-text text-sm mb-3">
        <Logo />
      </div>

      {/* Section label */}
      <div className="text-ctp-subtext0 text-[10px] font-semibold uppercase tracking-widest px-4 pb-1">
        Explorer
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        <TreeFolder
          name="portfolio"
          isOpen={rootOpen}
          onToggle={() => setRootOpen((o) => !o)}
        >
          {/* Section .md files */}
          {sectionFiles.map((file) => (
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
                style={{ paddingLeft: "36px" }}
                className="text-[10px] text-ctp-overlay0 py-1 font-mono"
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
      <div className="mt-2 border-t border-ctp-surface1 pt-2">
        <OutlinePanel />
      </div>
    </div>
  );
};

export default Explorer;
