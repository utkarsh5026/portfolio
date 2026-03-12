import React from "react";
import { FiClock, FiGitCommit } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, relativeTime } from "@/lib/utils";
import type { GitCommit } from "@/store";

import { COMMIT_TYPES, parseCommitType } from "../shared/commit-type-utils";
import styles from "../shared/shared-panel.module.css";

interface CommitRowProps {
  commit: GitCommit;
  index: number;
}

export const CommitRow: React.FC<CommitRowProps> = ({ commit, index }) => {
  const relTime = relativeTime(commit.date);

  const commitUrl = `https://github.com/utkarsh5026/portfolio/commit/${commit.hash}`;

  return (
    <a
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-start gap-3 px-4 py-3 border-b border-ctp-surface0/40 hover:bg-ctp-surface0/30 transition-all duration-200 cursor-pointer",
        styles.commitRow
      )}
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Avatar */}
      <div className="mt-0.5 flex-shrink-0 relative">
        <Avatar className="w-6 h-6 ring-1 ring-ctp-surface1 group-hover:ring-ctp-lavender transition-all duration-200">
          <AvatarImage src={commit.avatarUrl} alt={commit.author} />
          <AvatarFallback className="bg-ctp-surface0 text-[10px] text-ctp-subtext0 font-medium uppercase">
            {commit.author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-ctp-mantle group-hover:bg-ctp-base flex items-center justify-center transition-colors">
          <FiGitCommit className="w-1.5 h-1.5 text-ctp-teal" />
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-ctp-text font-medium leading-snug line-clamp-2 group-hover:text-ctp-lavender transition-colors duration-200">
          {commit.message}
        </p>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors truncate max-w-[110px]">
            {commit.author}
          </span>
          <span className="font-source text-[10px] text-ctp-peach bg-ctp-surface0/50 group-hover:bg-ctp-surface0/80 px-1.5 py-0.5 rounded transition-colors flex-shrink-0">
            {commit.shortHash}
          </span>
          <CommitTypeBadge message={commit.message} />
        </div>
        {(commit.insertions > 0 ||
          commit.deletions > 0 ||
          commit.filesChanged > 0) && (
          <div className="mt-1 flex items-center gap-2.5">
            {commit.insertions > 0 && (
              <span className="text-[10px] text-ctp-green font-source">
                +{commit.insertions}
              </span>
            )}
            {commit.deletions > 0 && (
              <span className="text-[10px] text-ctp-red font-source">
                -{commit.deletions}
              </span>
            )}
            {commit.filesChanged > 0 && (
              <span className="text-[10px] text-ctp-overlay1">
                {commit.filesChanged} file
                {commit.filesChanged !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Relative time */}
      <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
        <FiClock className="w-2.5 h-2.5 text-ctp-overlay0 group-hover:text-ctp-overlay1 transition-colors" />
        <span className="text-[10px] text-ctp-overlay0 group-hover:text-ctp-overlay1 whitespace-nowrap transition-colors">
          {relTime}
        </span>
      </div>
    </a>
  );
};

interface CommitTypeBadgeProps {
  message: string;
}

const CommitTypeBadge: React.FC<CommitTypeBadgeProps> = ({ message }) => {
  const type = parseCommitType(message);
  if (!type) return null;

  const { color, bg } = COMMIT_TYPES[type];

  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded-full text-[9px] font-source font-medium",
        color,
        bg
      )}
    >
      {type}
    </span>
  );
};
