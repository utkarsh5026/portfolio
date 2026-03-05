import React, { useCallback, useEffect,useMemo } from "react";

import { type OutlineItem,useOutline } from "./context/outline-context";
import OutlineItemComponent from "./outline-item";

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

const OutlinePanel: React.FC = () => {
  const { outlineItems, currentSection, highlightNode } = useOutline();
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  useEffect(() => {
    setOpenItems(
      new Set([currentSection, ...outlineItems.map((item) => item.id)]),
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
    [outlineItems],
  );

  const rootItems = useMemo(
    () =>
      outlineItems
        .filter(
          (item) => item.id.startsWith(currentSection) && item.level === 0,
        )
        .sort((a, b) => outlineItems.indexOf(a) - outlineItems.indexOf(b)),
    [outlineItems, currentSection],
  );

  const handleItemClick = useCallback(
    (item: OutlineItem) => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
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
            if (element.contains(popup)) {
              element.removeChild(popup);
            }
            element.style.transition = originalTransition;
            element.style.borderRadius = originalBorderRadius;
          }, 400);
        }, 2000);
      }
    },
    [highlightNode],
  );

  if (!currentSection || rootItems.length === 0) {
    return (
      <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 w-64">
        <div className="flex items-center px-4 h-6 text-[11px] uppercase tracking-wider text-ctp-subtext0 font-semibold hover:text-ctp-text cursor-pointer transition-colors duration-200">
          OUTLINE
        </div>
        <div className="flex items-center justify-center h-full text-[13px] text-ctp-subtext0 px-4 text-center">
          No outline information available.
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-ctp-mantle border-r border-ctp-surface0 w-64 select-none">
      <div className="flex items-center px-4 h-6 text-[11px] uppercase tracking-wider text-ctp-subtext0 font-semibold hover:text-ctp-text cursor-pointer transition-colors duration-200">
        OUTLINE
      </div>

      <div className="overflow-y-auto flex-1 pb-2">
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
