import React, { useEffect, useState } from "react";

import { useGitComponent } from "@/hooks/use-git-component";

import FileExplorer from "./file-explorer";
import { FileItem, projectStructure } from "./project-structure";

const collectPaths = (
  items: FileItem[],
  parentPath = ""
): { allPaths: Set<string>; folderPaths: Set<string> } => {
  const allPaths = new Set<string>();
  const folderPaths = new Set<string>();
  const walk = (nodes: FileItem[], prefix: string) => {
    nodes.forEach((item) => {
      const itemPath = prefix ? `${prefix}/${item.name}` : item.name;
      allPaths.add(itemPath);
      if (item.type === "folder") {
        folderPaths.add(itemPath);
        if (item.children) walk(item.children, itemPath);
      }
    });
  };
  walk(items, parentPath);
  return { allPaths, folderPaths };
};

const TechSkillsComponent = () => {
  const ref = useGitComponent(TechSkillsComponent);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const { allPaths, folderPaths } = collectPaths(projectStructure);
    setVisibleItems(allPaths);
    setExpandedFolders(folderPaths);
  }, []);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  return (
    <div ref={ref} className="w-full  mx-auto">
      <div className="bg-gradient from-ctp-crust/80 to-ctp-mantle/80 backdrop-blur-sm rounded-lg border-none  overflow-hidden shadow-2xl">
        {/* Explorer Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-ctp-crust/80 border-b border-ctp-surface0 font-source">
          <div className="flex items-center gap-2">
            <span className="text-ctp-text text-sm font-source tracking-wide">
              Tech stack I use 😃
            </span>
          </div>
          <span className="text-ctp-text text-xs">tech-stack</span>
        </div>

        <div className="py-2 min-h-[500px] max-h-[500px] overflow-y-auto">
          <FileExplorer
            items={projectStructure}
            visibleItems={visibleItems}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
          />
        </div>
      </div>
    </div>
  );
};

const TechSkills = React.memo(TechSkillsComponent);
export default TechSkills;
