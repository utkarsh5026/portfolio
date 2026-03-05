import React, { useEffect, useState } from "react";

import Logo from "@/components/home/appbar/Logo";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";
import { getProjectFileName } from "@/utils/project-slug";

import { SectionType, useEditorContext } from "../context/explorer-context";
import OutlinePanel from "../outline/outline-panel";
import { TreeFile, TreeFolder } from "../shared/editor-tree";

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
                className="text-[11px] text-ctp-overlay0 py-1.5 font-source animate-pulse"
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
