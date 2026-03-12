import React, { useEffect } from "react";
import { SiTypescript } from "react-icons/si";
import {
  VscFilePdf,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
} from "react-icons/vsc";

import Logo from "@/components/home/appbar/Logo";
import { type SectionType } from "@/components/home/editor/context/editor-store";
import { Tree } from "@/components/ui/tree";
import { useSectionNav } from "@/hooks/use-editor-actions";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";
import { getProjectFileName } from "@/utils/project-slug";

import {
  editorFiles,
  useActiveProjectId,
  useActiveSection,
  useEditorStore,
} from "../context/editor-store";
import OutlinePanel from "../outline/outline-panel";

const folderIcon = <VscFolder className="w-[14px] h-[14px]" />;
const folderOpenIcon = <VscFolderOpened className="w-[14px] h-[14px]" />;
const tsIcon = <SiTypescript className="w-[14px] h-[14px]" />;
const mdIcon = <VscMarkdown className="w-[14px] h-[14px]" />;
const pdfIcon = <VscFilePdf className="w-[14px] h-[14px]" />;

function fileIcon(name: string) {
  if (name.endsWith(".pdf")) return pdfIcon;
  return name.endsWith(".ts") || name.endsWith(".tsx") ? tsIcon : mdIcon;
}

const Explorer: React.FC = () => {
  const activeSection = useActiveSection();
  const activeProjectId = useActiveProjectId();
  const mobileMenuOpen = useEditorStore((s) => s.mobileMenuOpen);
  const { setActiveSection, openProject } = useSectionNav();
  const files = editorFiles;

  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectClick = (project: Project) => {
    openProject(project);
  };

  const activeId =
    activeProjectId ?? (activeProjectId === null ? activeSection : null);

  return (
    <div
      className={cn(
        "editor-explorer w-64 bg-ctp-crust/95 shadow-[8px_0_30px_rgba(0,0,0,0.25)] border-r border-ctp-surface1/50 py-3 overflow-y-auto z-40 h-screen max-h-screen flex flex-col backdrop-blur-xl transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 "
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
        <Tree
          activeId={activeId}
          defaultExpanded={new Set(["portfolio", "projects"])}
        >
          <Tree.Group
            id="portfolio"
            label="portfolio"
            depth={0}
            icon={folderIcon}
            iconOpen={folderOpenIcon}
            iconColor="text-ctp-blue"
          >
            {files.map((file) => (
              <Tree.Item
                key={file.section}
                id={file.section}
                depth={1}
                label={file.name}
                icon={fileIcon(file.name)}
                iconColor="text-ctp-blue"
                onClick={() => setActiveSection(file.section as SectionType)}
              />
            ))}

            {/* projects/ folder */}
            <Tree.Group
              id="projects"
              label="projects"
              depth={1}
              icon={folderIcon}
              iconOpen={folderOpenIcon}
              iconColor="text-ctp-blue"
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
                <Tree.Item
                  key={project.name}
                  id={project.name}
                  depth={2}
                  label={getProjectFileName(project.name)}
                  icon={mdIcon}
                  iconColor="text-ctp-blue"
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </Tree.Group>
          </Tree.Group>
        </Tree>
      </div>

      {/* Outline panel */}
      <div className="mt-2 border-t border-ctp-surface1/60 pt-2 px-0 font-source">
        <OutlinePanel />
      </div>
    </div>
  );
};

export default Explorer;
