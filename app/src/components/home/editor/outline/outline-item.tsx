import React from "react";
import type { OutlineItem } from "./context/outline-context";
import { ChevronRight } from "lucide-react";

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
  const children = getChildren(item.id);
  const hasChildren = children.length > 0;
  const isOpen = openItems.has(item.id);
  const indent = depth * 16;

  return (
    <div>
      <div
        className="relative flex items-center h-[22px] text-[13px] cursor-pointer select-none
          hover:bg-ctp-surface0/60 text-ctp-subtext0 hover:text-ctp-text pr-2"
        style={{ paddingLeft: `${indent + 4}px` }}
        onClick={() => {
          if (hasChildren) onToggle(item.id);
          onClick(item);
        }}
      >
        {/* Tree guide lines for each ancestor level */}
        {Array.from({ length: depth }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 bottom-0 border-l border-ctp-surface1/40"
            style={{ left: `${i * 16 + 12}px` }}
          />
        ))}

        {/* Chevron or leaf spacer */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0 mr-0.5">
          {hasChildren && (
            <ChevronRight
              className={`w-3.5 h-3.5 text-ctp-subtext1 transition-transform duration-150 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          )}
        </span>

        {/* Optional icon */}
        {item.icon && (
          <span className="mr-1.5 flex items-center text-ctp-subtext1">
            {item.icon}
          </span>
        )}

        {/* Label */}
        <span className="truncate">{item.label}</span>
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
