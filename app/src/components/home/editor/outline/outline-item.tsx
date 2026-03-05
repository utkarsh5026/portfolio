import React from "react";
import { VscChevronRight } from "react-icons/vsc";

import { cn } from "@/lib/utils";

import type { OutlineItem } from "./context/outline-context";
import { useOutline } from "./context/outline-context";

interface Props {
  item: OutlineItem;
  depth: number;
  openItems: Set<string>;
  onToggle: (id: string) => void;
  onClick: (item: OutlineItem) => void;
  getChildren: (id: string) => OutlineItem[];
}

const OutlineItemComponent: React.FC<Props> = ({
  item,
  depth,
  openItems,
  onToggle,
  onClick,
  getChildren,
}) => {
  const { activeHighlightId } = useOutline();
  const children = getChildren(item.id);
  const hasChildren = children.length > 0;
  const isOpen = openItems.has(item.id);
  const indent = depth * 12; // Standard VS Code indentation step
  const isActive = activeHighlightId === item.id;

  return (
    <div>
      <div
        className={cn(
          "relative flex items-center h-[22px] text-[13px] cursor-pointer select-none pr-2 font-source outline-none",
          isActive
            ? "bg-ctp-surface1/60 text-ctp-text"
            : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50",
        )}
        style={{ paddingLeft: `${indent + 4}px` }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) onToggle(item.id);
          onClick(item);
        }}
      >
        {/* Tree guide lines for each ancestor level (optional, kept for clarity but made subtler) */}
        {Array.from({ length: depth }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 bottom-0 border-l border-ctp-surface1/30"
            style={{ left: `${i * 12 + 10}px` }}
          />
        ))}

        {/* Chevron or leaf spacer */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0 mr-0.5">
          {hasChildren && (
            <VscChevronRight
              className={cn(
                "w-[14px] h-[14px] transition-transform duration-150",
                isOpen ? "rotate-90 text-ctp-text" : "text-ctp-overlay0",
              )}
            />
          )}
        </span>

        {/* Optional icon */}
        {item.icon && (
          <span className="mr-1.5 flex items-center shrink-0">{item.icon}</span>
        )}

        {/* Label */}
        <span className="truncate whitespace-nowrap">{item.label}</span>
      </div>

      {/* Children */}
      {isOpen &&
        children.map((child) => (
          <OutlineItemComponent
            key={child.id}
            item={child}
            depth={depth + 1}
            openItems={openItems}
            onToggle={onToggle}
            onClick={onClick}
            getChildren={getChildren}
          />
        ))}
    </div>
  );
};

export default OutlineItemComponent;
