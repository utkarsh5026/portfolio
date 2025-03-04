import React from "react";
import type { OutlineItem } from "./context/outlineContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, File } from "lucide-react";

interface OutlineItemComponentProps {
  item: OutlineItem;
  openItems: Set<string>;
  toggleItem: (itemId: string) => void;
  getChildren: (itemId: string) => OutlineItem[];
  handleItemClick: (item: OutlineItem) => void;
}

const handleLevelColor = (level: number) => {
  if (level === 0) return "text-ctp-mauve/80";
  if (level === 1) return "text-ctp-green/80";
  return "text-ctp-peach/80";
};

const handleLevelIcon = (level: number) => {
  if (level === 0) return <File className="w-3.5 h-3.5" />;
  if (level === 1) return <ChevronRight className="w-3.5 h-3.5" />;
  return <span className="w-2 h-2 rounded-full bg-ctp-teal/70"></span>;
};

const OutlineItemComponent: React.FC<OutlineItemComponentProps> = ({
  item,
  openItems,
  toggleItem,
  getChildren,
  handleItemClick,
}: OutlineItemComponentProps) => {
  const children = getChildren(item.id);
  const hasChildItems = children.length > 0;

  return (
    <div className="w-full">
      {hasChildItems ? (
        <Collapsible
          open={openItems.has(item.id)}
          onOpenChange={() => toggleItem(item.id)}
          className="w-full"
        >
          <div
            className={`
                flex items-center px-2 py-1.5 text-xs
                hover:bg-ctp-surface0/70 transition-all duration-200 rounded mx-1 my-0.5
                relative group text-ctp-subtext0 hover:text-ctp-text
              `}
            style={{ paddingLeft: `${item.level * 12 + 8}px` }}
          >
            {item.level > 0 && (
              <div
                className="absolute left-0 h-full border-l-2 border-ctp-surface0 opacity-50"
                style={{
                  left: `${item.level * 12 - 4}px`,
                  top: "0",
                  height: "100%",
                }}
              />
            )}

            <CollapsibleTrigger asChild>
              <div
                className={`
                  mr-2 w-5 h-5 flex items-center justify-center rounded
                  ${handleLevelColor(item.level)}
                  group-hover:text-ctp-lavender transition-colors duration-200
                  cursor-pointer
                `}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openItems.has(item.id) ? "rotate-90" : ""
                  }`}
                />
              </div>
            </CollapsibleTrigger>

            <div
              className={`
                mr-2 w-5 h-5 flex items-center justify-center rounded
                ${handleLevelColor(item.level)}
                group-hover:text-ctp-lavender transition-colors duration-200
              `}
            >
              {item.icon || handleLevelIcon(item.level)}
            </div>

            <span
              role="button"
              tabIndex={0}
              className="truncate text-xs font-medium cursor-pointer flex-1"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </span>
          </div>

          <CollapsibleContent>
            <div className="w-full">
              {children.map((child) => (
                <OutlineItemComponent
                  key={child.id}
                  item={child}
                  openItems={openItems}
                  toggleItem={toggleItem}
                  getChildren={getChildren}
                  handleItemClick={handleItemClick}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div
          className={`
              flex items-center px-2 py-1.5 text-xs cursor-pointer
              hover:bg-ctp-surface0/70 transition-all duration-200 rounded mx-1 my-0.5
              relative group text-ctp-subtext0 hover:text-ctp-text
            `}
          style={{ paddingLeft: `${item.level * 12 + 8}px` }}
          onClick={() => handleItemClick(item)}
        >
          {/* Connection lines for hierarchy */}
          {item.level > 0 && (
            <div
              className="absolute left-0 h-full border-l-2 border-ctp-surface0 opacity-50 top-0"
              style={{
                left: `${item.level * 12 - 4}px`,
                top: "0",
                height: "100%",
              }}
            />
          )}

          {/* Node icon based on level */}
          <div
            className={`
              mr-2 w-5 h-5 flex items-center justify-center rounded
              ${handleLevelColor(item.level)}
              group-hover:text-ctp-lavender transition-colors duration-200
            `}
          >
            {item.icon || handleLevelIcon(item.level)}
          </div>

          <span className="truncate text-xs font-medium">{item.label}</span>
        </div>
      )}
    </div>
  );
};

export default OutlineItemComponent;
