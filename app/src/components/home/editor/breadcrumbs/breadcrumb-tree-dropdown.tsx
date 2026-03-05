import React, { useState } from "react";

import useProjectStore from "@/store/projects/projects-store";

import {
  editorFiles,
  getProjectFileName,
  type SectionType,
} from "../context/editor-store";
import { TreeFile, TreeFolder } from "../shared/editor-tree";

export interface TreeDropdownProps {
  activeSection: SectionType;
  activeProjectId: string | null;
  variant: "portfolio" | "projects";
  onSelectSection: (section: SectionType) => void;
  onSelectProject: (projectId: string) => void;
}

const BreadcrumbTreeDropdown: React.FC<TreeDropdownProps> = ({
  activeSection,
  activeProjectId,
  variant,
  onSelectSection,
  onSelectProject,
}) => {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const projects = useProjectStore((s) => s.projects);

  const projectFiles = (
    <>
      {projects.map((p) => (
        <TreeFile
          key={p.name}
          name={getProjectFileName(p.name)}
          depth={variant === "projects" ? 1 : 2}
          isActive={activeProjectId === p.name}
          onClick={() => onSelectProject(p.name)}
        />
      ))}
    </>
  );

  if (variant === "portfolio") {
    return (
      <TreeFolder name="portfolio" isOpen={true} depth={0} onToggle={() => {}}>
        {editorFiles.map((f) => (
          <TreeFile
            key={f.section}
            name={f.name}
            depth={1}
            isActive={activeProjectId === null && activeSection === f.section}
            onClick={() => onSelectSection(f.section)}
          />
        ))}
        <TreeFolder
          name="projects"
          isOpen={projectsOpen}
          depth={1}
          onToggle={() => setProjectsOpen((v) => !v)}
        >
          {projectFiles}
        </TreeFolder>
      </TreeFolder>
    );
  }

  return (
    <TreeFolder name="projects" isOpen={true} depth={0} onToggle={() => {}}>
      {projectFiles}
    </TreeFolder>
  );
};

export default BreadcrumbTreeDropdown;
