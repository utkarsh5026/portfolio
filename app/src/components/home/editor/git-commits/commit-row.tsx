import { motion } from "framer-motion";
import React, { useState } from "react";
import { FiClock, FiGitCommit } from "react-icons/fi";

import { cn } from "@/lib/utils";

import type { GitCommit } from "../use-git-commits";
import { relativeTime } from "../use-git-commits";

interface CommitRowProps {
  commit: GitCommit;
  index: number;
}

const MotionAnchor = motion.create("a");

export const CommitRow: React.FC<CommitRowProps> = ({ commit, index }) => {
  const [imgError, setImgError] = useState(false);
  const relTime = relativeTime(commit.date);

  const commitUrl = `https://github.com/utkarsh5026/portfolio/commit/${commit.hash}`;

  return (
    <MotionAnchor
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group flex items-start gap-3 px-4 py-3 border-b border-ctp-surface0/40 hover:bg-ctp-surface0/30 transition-all duration-200 cursor-pointer"
    >
      {/* Avatar */}
      <div className="mt-0.5 flex-shrink-0 relative">
        {!imgError ? (
          <img
            src={commit.avatarUrl}
            alt={commit.author}
            width={24}
            height={24}
            onError={() => setImgError(true)}
            className="w-6 h-6 rounded-full ring-1 ring-ctp-surface1 object-cover group-hover:ring-ctp-lavender transition-all duration-200"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-ctp-surface0 ring-1 ring-ctp-surface1 group-hover:ring-ctp-lavender flex items-center justify-center text-[10px] text-ctp-subtext0 font-medium uppercase select-none transition-all duration-200">
            {commit.author.charAt(0)}
          </div>
        )}
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
    </MotionAnchor>
  );
};

const COMMIT_TYPES: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  feat: { label: "feat", color: "text-ctp-green", bg: "bg-ctp-green/10" },
  fix: { label: "fix", color: "text-ctp-red", bg: "bg-ctp-red/10" },
  refactor: {
    label: "refactor",
    color: "text-ctp-mauve",
    bg: "bg-ctp-mauve/10",
  },
  style: { label: "style", color: "text-ctp-pink", bg: "bg-ctp-pink/10" },
  chore: {
    label: "chore",
    color: "text-ctp-overlay1",
    bg: "bg-ctp-surface0/60",
  },
  docs: { label: "docs", color: "text-ctp-blue", bg: "bg-ctp-blue/10" },
  build: { label: "build", color: "text-ctp-peach", bg: "bg-ctp-peach/10" },
  ci: { label: "ci", color: "text-ctp-teal", bg: "bg-ctp-teal/10" },
  perf: { label: "perf", color: "text-ctp-yellow", bg: "bg-ctp-yellow/10" },
  test: { label: "test", color: "text-ctp-sapphire", bg: "bg-ctp-sapphire/10" },
  revert: { label: "revert", color: "text-ctp-maroon", bg: "bg-ctp-maroon/10" },
  deps: { label: "deps", color: "text-ctp-lavender", bg: "bg-ctp-lavender/10" },
};

function parseCommitType(message: string): string | null {
  const match = message.match(/^(\w+)(\(.+?\))?!?:\s/);
  if (match && COMMIT_TYPES[match[1]]) return match[1];
  return null;
}

interface CommitTypeBadgeProps {
  message: string;
}

const CommitTypeBadge: React.FC<CommitTypeBadgeProps> = ({ message }) => {
  const type = parseCommitType(message);
  if (!type) return null;

  const { label, color, bg } = COMMIT_TYPES[type];

  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded-full text-[9px] font-source font-medium",
        color,
        bg
      )}
    >
      {label}
    </span>
  );
};
