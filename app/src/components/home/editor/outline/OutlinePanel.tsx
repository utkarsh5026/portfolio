import React, { useCallback, useMemo, useEffect } from "react";
import { useOutline, type OutlineItem } from "./context/outlineContext";
import OutlineItemComponent from "./OutlineItem";
/**
 * OutlinePanel Component
 *
 * This component displays the outline of a section in the editor. It includes the section header,
 * a list of outline items, and a status indicator. The outline items are collapsible, allowing
 * users to expand or collapse sections to view or hide their children.
 *
 * @returns The OutlinePanel component.
 */
const OutlinePanel: React.FC = () => {
  const { outlineItems, currentSection, highlightNode } = useOutline();
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  /**
   * Updates the openItems state based on the current section and outline items.
   *
   * This effect runs whenever the outlineItems or currentSection changes. It ensures that the
   * current section and all outline items are initially open.
   */
  useEffect(() => {
    setOpenItems(
      new Set([currentSection, ...outlineItems.map((item) => item.id)])
    );
  }, [outlineItems, currentSection]);

  /**
   * Toggles the open state of an outline item.
   *
   * @param itemId The ID of the outline item to toggle.
   */
  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(itemId)) newOpenItems.delete(itemId);
      else newOpenItems.add(itemId);
      return newOpenItems;
    });
  };

  /**
   * Retrieves the children of an outline item.
   *
   * @param itemId The ID of the outline item whose children are to be retrieved.
   * @returns An array of child outline items.
   */
  const getChildren = useCallback(
    (itemId: string) => {
      return outlineItems
        .filter((item) => item.parentId === itemId)
        .sort((a, b) => outlineItems.indexOf(a) - outlineItems.indexOf(b));
    },
    [outlineItems]
  );

  /**
   * Retrieves the root outline items for the current section.
   *
   * @returns An array of root outline items for the current section.
   */
  const rootItems = useMemo(() => {
    return outlineItems
      .filter((item) => item.id.startsWith(currentSection) && item.level === 0)
      .sort((a, b) => outlineItems.indexOf(a) - outlineItems.indexOf(b));
  }, [outlineItems, currentSection]);

  /**
   * Handles the click event on an outline item.
   * When the item is clicked, the item is highlighted and the element is scrolled into view.
   *
   * @param item The outline item that was clicked.
   */
  const handleItemClick = useCallback(
    (item: OutlineItem) => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        highlightNode(item.id);
      }
    },
    [highlightNode]
  );

  if (!currentSection || rootItems.length === 0) {
    return (
      <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 text-ctp-subtext0 p-2">
        <div className="py-2 px-4 text-xs uppercase tracking-wider border-b border-ctp-surface0 mb-2">
          OUTLINE
        </div>
        <div className="flex items-center justify-center h-full text-xs text-ctp-subtext0 italic">
          No outline available
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 text-ctp-subtext0 w-64">
      {/* Outline header */}
      <div className="py-2 px-4 text-xs uppercase tracking-wider border-b border-ctp-surface0 mb-2 flex items-center justify-between bg-ctp-surface0/50">
        <span className="font-medium text-ctp-text">
          OUTLINE: {currentSection.toUpperCase()}
        </span>
      </div>

      {/* Outline items */}
      <div className="overflow-y-auto flex-1 py-1">
        {rootItems.map((item) => (
          <OutlineItemComponent
            key={item.id}
            item={item}
            openItems={openItems}
            toggleItem={toggleItem}
            getChildren={getChildren}
            handleItemClick={handleItemClick}
          />
        ))}
      </div>

      <div className="py-1.5 px-3 text-xs border-t border-ctp-surface0 text-ctp-subtext1 flex items-center bg-ctp-surface0/30">
        <span className="w-2 h-2 rounded-full bg-ctp-green mr-2 shadow-sm shadow-ctp-green/20"></span>
        <span className="font-medium">Ready</span>
      </div>
    </div>
  );
};

export default OutlinePanel;
