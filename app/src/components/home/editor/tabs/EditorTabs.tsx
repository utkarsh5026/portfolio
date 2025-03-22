import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { useOutline } from "../outline/context/outlineContext";
import { useEditorContext, type SectionType } from "../context/explorerContext";
import "./TabAnimations.css";
import { useTabDrag } from "./useTabDrag";

interface EditorTabsProps {
  sections: Record<SectionType, ReactNode>;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  const {
    draggedTab,
    dragOverTab,
    dragDirection,
    recentlyMovedTab,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    tabOrder,
    tabRefs,
  } = useTabDrag(sectionKeys);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => setCurrentSection(activeSection),
    [activeSection, setCurrentSection]
  );

  const getTabClasses = (tab: SectionType) => {
    const baseClasses =
      "editor-tab h-full px-4 whitespace-nowrap border-r border-ctp-surface2 hover:bg-ctp-surface1 text-sm flex items-center gap-2 relative";

    const stateClasses = [
      activeSection === tab ? "active" : "",
      draggedTab === tab ? "tab-dragging" : "",
      dragOverTab === tab ? "tab-drag-over" : "",
      recentlyMovedTab === tab ? "tab-moved" : "",
      dragOverTab === tab && dragDirection === "left" ? "tab-insert-left" : "",
      dragOverTab === tab && dragDirection === "right"
        ? "tab-insert-right"
        : "",
    ];

    return cn(baseClasses, ...stateClasses);
  };

  return (
    <div
      className="tabs-container bg-ctp-surface0 border-b border-ctp-surface2 font-roboto-mono sticky top-0 z-30 overflow-x-auto scrollbar-hide md:h-9"
      ref={containerRef}
    >
      <div className="flex items-center h-full">
        {tabOrder.map((id) => (
          <button
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            className={getTabClasses(id)}
            onClick={() => {
              setActiveSection(id);
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, id)}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
          >
            <FaCode
              className={cn("w-3 h-3", {
                "text-ctp-red": id === "home",
                "text-ctp-green": id === "projects",
                "text-ctp-yellow": id === "skills",
                "text-ctp-blue": id === "about",
                "text-ctp-mauve": id === "experience",
                "text-ctp-pink": id === "contact",
                "text-ctp-teal": id === "articles",
                "text-ctp-sapphire": id === "learning",
              })}
            />
            {id}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              ×
            </span>
          </button>
        ))}

        <div className="flex-1 border-b border-ctp-base"></div>
      </div>
    </div>
  );
};

export default EditorTabs;
