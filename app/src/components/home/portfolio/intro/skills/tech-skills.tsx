import React, { useState, useEffect } from "react";
import { FloatingElement } from "@/components/animations";
import { Folder } from "lucide-react";
import { FileItem, projectStructure } from "./project-structure";
import FileExplorer from "./file-explorer";

const getAllItems = (
  items: FileItem[],
  parentPath = ""
): Array<{ path: string; delay: number }> => {
  const result: Array<{ path: string; delay: number }> = [];
  items.forEach((item) => {
    const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    result.push({ path: itemPath, delay: item.delay });
    if (!item.children) return;

    result.push(...getAllItems(item.children, itemPath));
  });
  return result;
};

const TechSkillsComponent = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  useEffect(() => {
    const allItems = getAllItems(projectStructure);

    allItems.forEach(({ path, delay }) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, path]);
        // Auto-expand folders after they become visible
        if (
          projectStructure.some(
            (item) => item.name === path && item.type === "folder"
          )
        ) {
          setTimeout(() => {
            setExpandedFolders((prev) => [...prev, path]);
          }, 300);
        }
      }, delay);
    });
  }, []);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <div className="w-full  mx-auto">
      <FloatingElement intensity="low" delay={0}>
        <div className="bg-gradient from-ctp-crust/80 to-ctp-mantle/80 backdrop-blur-sm rounded-lg border-none  overflow-hidden shadow-2xl">
          {/* Explorer Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-ctp-crust/80 border-b border-ctp-surface0">
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-ctp-blue" />
              <span className="text-ctp-text text-sm font-mono uppercase tracking-wide">
                Explorer
              </span>
            </div>
            <span className="text-ctp-text text-xs">tech-stack</span>
          </div>

          <div className="py-2 min-h-[400px] max-h-[500px] overflow-y-auto">
            <FileExplorer
              items={projectStructure}
              visibleItems={visibleItems}
              expandedFolders={expandedFolders}
              onToggleFolder={toggleFolder}
            />
          </div>
        </div>
      </FloatingElement>
    </div>
  );
};

const TechSkills = React.memo(TechSkillsComponent);
export default TechSkills;
