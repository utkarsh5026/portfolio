import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

interface LanguageBarItem {
  language?: string;
  color: string;
  count?: number;
  percent?: number;
}

interface LanguageBarProps {
  items: LanguageBarItem[];
  height?: "sm" | "md";
  showLegend?: boolean;
  className?: string;
}

const LanguageBar: React.FC<LanguageBarProps> = ({
  items,
  height = "md",
  showLegend = false,
  className,
}) => {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + (item.count ?? 0), 0),
    [items]
  );

  if (items.length === 0) return null;

  const getWidth = (item: LanguageBarItem): string => {
    if (item.percent !== undefined) return `${item.percent}%`;
    if (item.count !== undefined && total > 0)
      return `${(item.count / total) * 100}%`;
    return "0%";
  };

  const getPct = (item: LanguageBarItem): string => {
    if (item.percent !== undefined) return `${item.percent.toFixed(1)}%`;
    if (item.count !== undefined && total > 0)
      return `${((item.count / total) * 100).toFixed(1)}%`;
    return "0%";
  };

  const barHeight = height === "sm" ? "h-1" : "h-1.5";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn("flex rounded-full overflow-hidden gap-px", barHeight)}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.language ?? ""}-${idx}`}
            style={{ width: getWidth(item), backgroundColor: item.color }}
            className="min-w-[2px] first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      {showLegend && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
          {items.map((item, idx) => (
            <span
              key={`${item.language ?? ""}-${idx}`}
              className="flex items-center gap-1"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              {item.language && (
                <span className="text-[9px] text-ctp-subtext0 font-source">
                  {item.language}
                </span>
              )}
              <span className="text-[9px] text-ctp-overlay0 font-source">
                {getPct(item)}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageBar;
