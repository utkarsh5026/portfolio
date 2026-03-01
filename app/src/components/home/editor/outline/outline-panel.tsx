import React, { useCallback, useMemo, useEffect } from "react";
import { useOutline, type OutlineItem } from "./context/outline-context";
import OutlineItemComponent from "./outline-item";

const OutlinePanel: React.FC = () => {
  const { outlineItems, currentSection, highlightNode } = useOutline();
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  useEffect(() => {
    setOpenItems(
      new Set([currentSection, ...outlineItems.map((item) => item.id)])
    );
  }, [outlineItems, currentSection]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const getChildren = useCallback(
    (itemId: string) =>
      outlineItems
        .filter((item) => item.parentId === itemId)
        .sort((a, b) => outlineItems.indexOf(a) - outlineItems.indexOf(b)),
    [outlineItems]
  );

  const rootItems = useMemo(
    () =>
      outlineItems
        .filter(
          (item) => item.id.startsWith(currentSection) && item.level === 0
        )
        .sort((a, b) => outlineItems.indexOf(a) - outlineItems.indexOf(b)),
    [outlineItems, currentSection]
  );

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
      <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0">
        <div className="px-4 py-1.5 text-[11px] uppercase tracking-widest text-ctp-subtext0 font-semibold border-b border-ctp-surface0">
          OUTLINE
        </div>
        <div className="flex items-center justify-center h-full text-xs text-ctp-subtext0 italic">
          No outline available
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 w-64">
      <div className="px-4 py-1.5 text-[11px] uppercase tracking-widest text-ctp-subtext0 font-semibold border-b border-ctp-surface0">
        OUTLINE
      </div>

      <div className="overflow-y-auto flex-1 py-1">
        {rootItems.map((item) => (
          <OutlineItemComponent
            key={item.id}
            item={item}
            depth={0}
            openItems={openItems}
            onToggle={toggleItem}
            onClick={handleItemClick}
            getChildren={getChildren}
          />
        ))}
      </div>
    </div>
  );
};

export default OutlinePanel;
