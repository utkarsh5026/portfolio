import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { useOutline } from "../outline/context/outlineContext";
import { useEditorContext, type SectionType } from "../context/explorerContext";
import styles from "./TabAnimations.module.css";
import { useTabDrag } from "./useTabDrag";

interface EditorTabsProps {
  sections: Record<SectionType, ReactNode>;
}

/**
 * EditorTabs component renders a set of tabs for the editor section.
 * It handles tab dragging, reordering, and selection with subtle glass effects.
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  /* Extract section keys from the sections object */
  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  /* Initialize the useTabDrag hook with section keys */
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

  /*
   Updates the current section in the outline context when the active section changes
  */
  useEffect(
    () => setCurrentSection(activeSection),
    [activeSection, setCurrentSection]
  );

  /**
   * Gets icon color based on section type
   */
  const getIconColor = (section: SectionType): string => {
    switch (section) {
      case "home":
        return "text-ctp-red";
      case "projects":
        return "text-ctp-green";
      case "skills":
        return "text-ctp-yellow";
      case "about":
        return "text-ctp-blue";
      case "experience":
        return "text-ctp-mauve";
      case "contact":
        return "text-ctp-pink";
      case "articles":
        return "text-ctp-teal";
      case "learning":
        return "text-ctp-sapphire";
      default:
        return "text-ctp-blue";
    }
  };

  /**
   * Gets bottom border color for active tab
   */
  const getActiveTabBorder = (section: SectionType): string => {
    switch (section) {
      case "home":
        return "border-ctp-red";
      case "projects":
        return "border-ctp-green";
      case "skills":
        return "border-ctp-yellow";
      case "about":
        return "border-ctp-blue";
      case "experience":
        return "border-ctp-mauve";
      case "contact":
        return "border-ctp-pink";
      case "articles":
        return "border-ctp-teal";
      case "learning":
        return "border-ctp-sapphire";
      default:
        return "border-ctp-blue";
    }
  };

  /**
   * Generates classes for a tab based on its state
   */
  const getTabClasses = (tab: SectionType) => {
    const isActiveTab = activeSection === tab;

    const baseClasses = cn(
      styles.editorTab,
      "h-full px-4 whitespace-nowrap text-sm flex items-center gap-2 relative",
      "transition-all duration-200",
      isActiveTab
        ? `bg-ctp-base border-b-2 ${getActiveTabBorder(tab)}`
        : "border-r border-ctp-surface0/60 bg-ctp-surface0/80 hover:bg-ctp-base/90"
    );

    const stateClasses = cn({
      [styles.active]: isActiveTab,
      [styles.tabDragging]: draggedTab === tab,
      [styles.tabDragOver]: dragOverTab === tab,
      [styles.tabMoved]: recentlyMovedTab === tab,
      [styles.tabInsertLeft]: dragOverTab === tab && dragDirection === "left",
      [styles.tabInsertRight]: dragOverTab === tab && dragDirection === "right",
    });

    return cn(baseClasses, stateClasses);
  };

  return (
    <div
      className={cn(
        "bg-ctp-mantle border-b border-ctp-surface0 font-roboto-mono sticky top-0 z-30 overflow-x-auto scrollbar-hide md:h-9",
        styles.tabsContainer
      )}
      ref={containerRef}
    >
      <div className="flex items-center h-full">
        {tabOrder.map((id) => (
          <button
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            className={getTabClasses(id)}
            onClick={() => setActiveSection(id)}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, id)}
            onDragEnter={(e) => e.preventDefault()}
            data-section={id}
          >
            <FaCode className={cn("w-3 h-3", getIconColor(id))} />
            <span>{id}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1 text-ctp-surface2 hover:text-ctp-red">
              ×
            </span>
          </button>
        ))}

        <div className="flex-1 border-b border-ctp-surface0"></div>
      </div>
    </div>
  );
};

export default EditorTabs;
