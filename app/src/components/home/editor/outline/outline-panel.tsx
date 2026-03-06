import { ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tree } from "@/components/ui/tree";
import { ctpColorClass } from "@/lib/ctp-colors";
import useOutlineStore, {
  type OutlineItem,
} from "@/store/outline/outline-store";

const messages = [
  { icon: "🎯", text: "Found it!" },
  { icon: "✨", text: "Here you go!" },
  { icon: "🔍", text: "Spotted!" },
  { icon: "🚀", text: "Zoomed in!" },
  { icon: "👀", text: "Look here!" },
  { icon: "🎉", text: "Ta-da!" },
  { icon: "📌", text: "Pinned down!" },
  { icon: "🎣", text: "Caught one!" },
  { icon: "🔦", text: "Illuminated!" },
  { icon: "🛸", text: "Beamed to it!" },
  { icon: "🪄", text: "Abracadabra!" },
];

function wrapIcon(icon?: React.ReactNode) {
  if (!icon) return undefined;
  return (
    <span className="w-3 h-3 flex items-center justify-center">{icon}</span>
  );
}

function renderOutlineTree(
  parentId: string,
  items: OutlineItem[],
  depth: number,
  onClick: (item: OutlineItem) => void,
) {
  const children = items.filter((item) => item.parentId === parentId);

  return children.map((item) => {
    const hasChildren = items.some((i) => i.parentId === item.id);
    const wrappedIcon = wrapIcon(item.icon);
    if (hasChildren) {
      return (
        <Tree.Group
          key={item.id}
          id={item.id}
          depth={depth}
          label={item.label}
          icon={wrappedIcon}
          iconOpen={wrappedIcon}
          iconColor={
            item.iconColor ? ctpColorClass("text", item.iconColor) : undefined
          }
          onClick={() => onClick(item)}
        >
          {renderOutlineTree(item.id, items, depth + 1, onClick)}
        </Tree.Group>
      );
    }
    return (
      <Tree.Item
        key={item.id}
        id={item.id}
        depth={depth}
        label={item.label}
        icon={wrappedIcon}
        iconColor={
          item.iconColor ? ctpColorClass("text", item.iconColor) : undefined
        }
        onClick={() => onClick(item)}
      />
    );
  });
}

const OutlinePanel: React.FC = () => {
  const itemsMap = useOutlineStore((s) => s.items);
  const activeSection = useOutlineStore((s) => s.activeSection);
  const activeHighlightId = useOutlineStore((s) => s.activeHighlightId);
  const highlightNode = useOutlineStore((s) => s.highlightNode);

  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(true);

  const items = useMemo(() => [...itemsMap.values()], [itemsMap]);

  const sectionRoot = useMemo(
    () => items.find((i) => i.parentId === null && i.id === activeSection),
    [items, activeSection],
  );

  useEffect(() => {
    if (!activeSection) return;
    setOpenItems(new Set([activeSection, ...items.map((i) => i.id)]));
  }, [items, activeSection]);

  const handleItemClick = useCallback(
    (item: OutlineItem) => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if (item.parentId === null) return;
        highlightNode(item.id);

        const msg = messages[Math.floor(Math.random() * messages.length)];

        const popup = document.createElement("div");
        if (window.getComputedStyle(element).position === "static") {
          element.style.position = "relative";
        }

        popup.className =
          "absolute -top-10 left-0 text-ctp-blue font-bold flex items-center gap-1.5 z-50 pointer-events-none animate-bounce bg-ctp-crust/90 px-2.5 py-1 rounded-md border border-ctp-surface1 shadow-lg text-xs whitespace-nowrap backdrop-blur-sm";
        popup.innerHTML = `<span class="text-base">${msg.icon}</span> ${msg.text}`;

        element.appendChild(popup);

        const originalBg = element.style.backgroundColor;
        const originalTransition = element.style.transition;
        const originalBorderRadius = element.style.borderRadius;
        element.style.transition = "background-color 0.2s ease";
        element.style.backgroundColor = "rgba(137, 180, 250, 0.15)";
        element.style.borderRadius = "6px";

        setTimeout(() => {
          popup.style.transition = "opacity 0.4s ease-out";
          popup.style.opacity = "0";
          element.style.backgroundColor = originalBg;

          setTimeout(() => {
            if (element.contains(popup)) element.removeChild(popup);
            element.style.transition = originalTransition;
            element.style.borderRadius = originalBorderRadius;
          }, 400);
        }, 2000);
      }
    },
    [highlightNode],
  );

  const header = (
    <CollapsibleTrigger className="flex items-center gap-1 px-4 h-6 w-full text-[11px] uppercase tracking-wider text-ctp-subtext0 font-semibold hover:text-ctp-text cursor-pointer transition-colors duration-200">
      <ChevronRight
        className="w-3 h-3 transition-transform duration-150 shrink-0"
        style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
      />
      OUTLINE
    </CollapsibleTrigger>
  );

  if (!activeSection || !sectionRoot) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 w-64"
      >
        {header}
        <CollapsibleContent className="flex items-center justify-center flex-1 text-[13px] text-ctp-subtext0 px-4 text-center">
          No outline information available.
        </CollapsibleContent>
      </Collapsible>
    );
  }

  const treeChildren = renderOutlineTree(
    sectionRoot.id,
    items,
    1,
    handleItemClick,
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 w-64 select-none"
    >
      {header}

      <CollapsibleContent className="overflow-y-auto flex-1 pb-2">
        <Tree
          activeId={activeHighlightId}
          expanded={openItems}
          onExpandedChange={setOpenItems}
          guideLines
          rowHeight={22}
        >
          {treeChildren.length > 0 ? (
            <Tree.Group
              key={sectionRoot.id}
              id={sectionRoot.id}
              depth={0}
              label={sectionRoot.label}
              icon={wrapIcon(sectionRoot.icon)}
              iconOpen={wrapIcon(sectionRoot.icon)}
              iconColor={
                sectionRoot.iconColor
                  ? ctpColorClass("text", sectionRoot.iconColor)
                  : undefined
              }
              onClick={() => handleItemClick(sectionRoot)}
            >
              {treeChildren}
            </Tree.Group>
          ) : (
            <Tree.Item
              key={sectionRoot.id}
              id={sectionRoot.id}
              depth={0}
              label={sectionRoot.label}
              icon={wrapIcon(sectionRoot.icon)}
              iconColor={
                sectionRoot.iconColor
                  ? ctpColorClass("text", sectionRoot.iconColor)
                  : undefined
              }
              onClick={() => handleItemClick(sectionRoot)}
            />
          )}
        </Tree>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OutlinePanel;
