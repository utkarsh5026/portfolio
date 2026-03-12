import React from "react";

import { cn } from "@/lib/utils";

interface GroupedCommitListProps<T> {
  grouped: Map<string, T[]>;
  renderCommit: (commit: T, index: number) => React.ReactNode;
  getKey: (commit: T, index: number) => string;
  showCount?: boolean;
  className?: string;
}

function GroupedCommitList<T>({
  grouped,
  renderCommit,
  getKey,
  showCount = false,
  className,
}: GroupedCommitListProps<T>): React.ReactElement {
  return (
    <>
      {Array.from(grouped.entries()).map(([group, commits]) => (
        <React.Fragment key={group}>
          <div
            className={cn(
              "sticky top-0 z-10 bg-ctp-mantle/95 backdrop-blur-sm px-4 py-1.5 border-b border-ctp-surface0/30 flex items-center justify-between",
              className
            )}
          >
            <span className="text-[10px] text-ctp-overlay1 uppercase tracking-widest font-medium">
              {group}
            </span>
            {showCount && (
              <span className="text-[9px] text-ctp-overlay0 bg-ctp-surface0/50 px-1.5 py-0.5 rounded-full">
                {commits.length}
              </span>
            )}
          </div>
          {commits.map((commit, i) => (
            <React.Fragment key={getKey(commit, i)}>
              {renderCommit(commit, i)}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

export default GroupedCommitList;
