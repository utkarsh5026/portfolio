import React, { useState } from "react";
import { FiClock, FiExternalLink, FiGitCommit } from "react-icons/fi";

import { cn, relativeTime } from "@/lib/utils";
import type { TimelineCommit } from "@/store/activity/activity-store";

import { COMMIT_TYPES, parseCommit } from "../shared/commit-type-utils";
import styles from "../shared/shared-panel.module.css";

interface ActivityCommitRowProps {
  commit: TimelineCommit;
  index: number;
  showRepo?: boolean;
}

const ActivityCommitRow: React.FC<ActivityCommitRowProps> = ({
  commit,
  index,
  showRepo = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const { type, scope, body } = parseCommit(commit.message);
  const typeStyle = type ? COMMIT_TYPES[type] : null;

  return (
    <a
      href={commit.url}
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
          {body}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
          <span className="font-source text-[10px] text-ctp-peach bg-ctp-surface0/50 group-hover:bg-ctp-surface0/80 px-1.5 py-0.5 rounded transition-colors flex-shrink-0">
            {commit.shortHash}
          </span>

          {typeStyle && type && (
            <span
              className={cn(
                "px-1.5 py-0.5 rounded-full text-[9px] font-source font-semibold",
                typeStyle.color,
                typeStyle.bg
              )}
            >
              {type}
            </span>
          )}

          {scope && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-source text-ctp-overlay2 bg-ctp-surface0/40 border border-ctp-surface0/60 flex-shrink-0">
              {scope}
            </span>
          )}

          {showRepo && (
            <span className="flex items-center gap-0.5 text-[10px] text-ctp-sapphire bg-ctp-sapphire/10 px-1.5 py-0.5 rounded-full font-source flex-shrink-0 group-hover:bg-ctp-sapphire/20 transition-colors">
              {commit.repo}
              <FiExternalLink className="w-2 h-2 ml-0.5" />
            </span>
          )}
        </div>
      </div>

      {/* Time */}
      <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
        <FiClock className="w-2.5 h-2.5 text-ctp-overlay0 group-hover:text-ctp-overlay1 transition-colors" />
        <span className="text-[10px] text-ctp-overlay0 group-hover:text-ctp-overlay1 whitespace-nowrap transition-colors">
          {relativeTime(commit.date)}
        </span>
      </div>
    </a>
  );
};

export default ActivityCommitRow;
