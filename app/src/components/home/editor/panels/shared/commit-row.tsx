import React from "react";
import { FiClock, FiExternalLink, FiGitCommit } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, relativeTime } from "@/lib/utils";

import { COMMIT_TYPES, parseCommit } from "./commit-type-utils";
import styles from "./shared-panel.module.css";

export interface CommitRowData {
  /** Full commit URL (e.g. GitHub permalink) */
  url: string;
  message: string;
  author: string;
  avatarUrl: string;
  shortHash: string;
  date: string;

  /** Optional repo label — shown as a badge when provided */
  repo?: string;

  /** Optional diff stats */
  insertions?: number;
  deletions?: number;
  filesChanged?: number;
}

interface CommitRowProps {
  commit: CommitRowData;
  index: number;
  showAuthor?: boolean;
}

const CommitRow: React.FC<CommitRowProps> = ({
  commit,
  index,
  showAuthor = false,
}) => {
  const {
    url,
    message,
    author,
    avatarUrl,
    shortHash,
    date,
    repo,
    insertions,
    deletions,
    filesChanged,
  } = commit;
  const relTime = relativeTime(date);
  const { type, scope, body } = parseCommit(message);
  const typeStyle = type ? COMMIT_TYPES[type] : null;

  return (
    <a
      href={url}
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
          <AvatarImage src={avatarUrl} alt={author} />
          <AvatarFallback className="bg-ctp-surface0 text-[10px] text-ctp-subtext0 font-medium uppercase">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
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
          {showAuthor && (
            <span className="text-[10px] text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors truncate max-w-[110px]">
              {author}
            </span>
          )}

          <span className="font-source text-[10px] text-ctp-peach bg-ctp-surface0/50 group-hover:bg-ctp-surface0/80 px-1.5 py-0.5 rounded transition-colors flex-shrink-0">
            {shortHash}
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

          {repo && (
            <span className="flex items-center gap-0.5 text-[10px] text-ctp-sapphire bg-ctp-sapphire/10 px-1.5 py-0.5 rounded-full font-source flex-shrink-0 group-hover:bg-ctp-sapphire/20 transition-colors">
              {repo}
              <FiExternalLink className="w-2 h-2 ml-0.5" />
            </span>
          )}
        </div>

        {(insertions != null && insertions > 0) ||
        (deletions != null && deletions > 0) ||
        (filesChanged != null && filesChanged > 0) ? (
          <div className="mt-1 flex items-center gap-2.5">
            {insertions != null && insertions > 0 && (
              <span className="text-[10px] text-ctp-green font-source">
                +{insertions}
              </span>
            )}
            {deletions != null && deletions > 0 && (
              <span className="text-[10px] text-ctp-red font-source">
                -{deletions}
              </span>
            )}
            {filesChanged != null && filesChanged > 0 && (
              <span className="text-[10px] text-ctp-overlay1">
                {filesChanged} file{filesChanged !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Time */}
      <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
        <FiClock className="w-2.5 h-2.5 text-ctp-overlay0 group-hover:text-ctp-overlay1 transition-colors" />
        <span className="text-[10px] text-ctp-overlay0 group-hover:text-ctp-overlay1 whitespace-nowrap transition-colors">
          {relTime}
        </span>
      </div>
    </a>
  );
};

export default CommitRow;
