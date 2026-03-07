import React from "react";
import { VscGitCommit } from "react-icons/vsc";

import { type ComponentMeta } from "@/hooks/use-git-meta";
import { cn, relativeTime } from "@/lib/utils";

interface GitBlameTooltipProps {
  meta: ComponentMeta | null;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps children with a VS Code GitLens-style hover tooltip showing
 * per-component git blame info (author, relative time, commit message, hash).
 *
 * Uses pure CSS group-hover — no JS state needed.
 */
const GitBlameTooltip: React.FC<GitBlameTooltipProps> = ({
  meta,
  children,
  className,
}) => {
  if (!meta) return <>{children}</>;

  const timeAgo = relativeTime(meta.date);
  const shortMsg =
    meta.message.length > 52 ? meta.message.slice(0, 52) + "…" : meta.message;

  // Derive author initials for the avatar
  const initials = meta.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("relative group/blame", className)}>
      {children}

      {/* Tooltip — shown on group hover, positioned below */}
      <div
        className={cn(
          "absolute left-0 top-full mt-1 z-50",
          "hidden group-hover/blame:flex flex-col",
          "min-w-[280px] max-w-[360px]",
          "bg-ctp-surface0 border border-ctp-surface2",
          "rounded-md shadow-lg shadow-ctp-crust/60",
          "px-3 py-2 font-mono text-xs",
          "pointer-events-none select-none"
        )}
      >
        {/* Row 1: avatar + author + time */}
        <div className="flex items-center gap-2 text-ctp-subtext1">
          <span className="w-5 h-5 rounded-full bg-ctp-mauve/30 text-ctp-mauve flex items-center justify-center text-[9px] font-bold flex-shrink-0">
            {initials}
          </span>
          <span className="font-medium text-ctp-text truncate">
            {meta.author}
          </span>
          <span className="text-ctp-overlay0 flex-shrink-0">{timeAgo}</span>
        </div>

        {/* Row 2: commit icon + message + hash */}
        <div className="flex items-center gap-1.5 mt-1 text-ctp-subtext0">
          <VscGitCommit className="w-3 h-3 text-ctp-green flex-shrink-0" />
          <span className="truncate">{shortMsg}</span>
          <span className="text-ctp-surface2 flex-shrink-0 ml-auto pl-2">
            ({meta.shortHash})
          </span>
        </div>

        {/* Row 3: file + line range */}
        <div className="mt-1 text-[10px] text-ctp-overlay0 truncate">
          {meta.file.split("/").pop()}:{meta.lines[0]}–{meta.lines[1]}
        </div>
      </div>
    </div>
  );
};

export default GitBlameTooltip;
