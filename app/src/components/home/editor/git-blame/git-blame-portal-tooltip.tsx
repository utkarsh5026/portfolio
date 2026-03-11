import React from "react";
import { createPortal } from "react-dom";
import { FaReact } from "react-icons/fa";
import { SiMarkdown } from "react-icons/si";
import { VscGitCommit } from "react-icons/vsc";

import { relativeTime } from "@/lib/utils";
import {
  type AuthorMeta,
  type ComponentMeta,
} from "@/store/git-store/git-meta-store";

import styles from "./git-blame-portal-tooltip.module.css";

interface GitBlamePortalTooltipProps {
  meta: ComponentMeta | null;
  authorMeta: AuthorMeta | null;
  x: number;
  y: number;
  visible: boolean;
}

const TOOLTIP_W = 420;
const TOOLTIP_H = 110;
const OFFSET_X = 18;
const OFFSET_Y = 14;

/**
 * A React portal tooltip rendered at document.body, positioned near the cursor.
 * Flips left/up if too close to the viewport edge.
 */
const GitBlamePortalTooltip: React.FC<GitBlamePortalTooltipProps> = ({
  meta,
  authorMeta,
  x,
  y,
  visible,
}) => {
  if (!meta) return null;

  const left =
    x + OFFSET_X + TOOLTIP_W > window.innerWidth
      ? x - TOOLTIP_W - OFFSET_X
      : x + OFFSET_X;

  const top =
    y + OFFSET_Y + TOOLTIP_H > window.innerHeight
      ? y - TOOLTIP_H - OFFSET_Y
      : y + OFFSET_Y;

  const initials = meta.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarUrl = authorMeta?.avatar ?? null;

  const shortMsg =
    meta.message.length > 80 ? meta.message.slice(0, 80) + "…" : meta.message;

  const fileName = meta.file.split("/").pop() ?? meta.file;

  if (!visible) return null;

  return createPortal(
    <div
      key="git-blame-portal"
      style={{
        position: "fixed",
        left,
        top,
        width: TOOLTIP_W,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className={`bg-ctp-base/80 border border-ctp-surface1 rounded-md shadow-xl shadow-ctp-crust/70 px-3 py-2.5 font-source text-xs select-none ${styles.tooltip} backdrop-blur-lg`}
    >
      {/* Component name badge */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-ctp-blue">
          {meta.file.endsWith(".md") ? (
            <SiMarkdown className="w-3 h-3" />
          ) : (
            <FaReact className="w-3 h-3" />
          )}
          {meta.name}
        </span>
        <span className="text-ctp-surface2 text-[10px]">
          {fileName}:{meta.lines[0]}–{meta.lines[1]}
        </span>
      </div>

      {/* Author + time */}
      <div className="flex items-center gap-2 text-ctp-subtext1">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={meta.author}
            className="w-5 h-5 rounded-full flex-shrink-0 object-cover"
          />
        ) : (
          <span className="w-5 h-5 rounded-full bg-ctp-mauve/25 text-ctp-mauve flex items-center justify-center text-[9px] font-bold flex-shrink-0">
            {initials}
          </span>
        )}
        <span className="font-medium text-ctp-text truncate">
          {meta.author}
        </span>
        <span className="text-ctp-overlay0 flex-shrink-0 ml-auto">
          {relativeTime(meta.date)}
        </span>
      </div>

      {/* Commit message + hash */}
      <div className="flex items-center gap-1.5 mt-1 text-ctp-subtext0">
        <VscGitCommit className="w-3 h-3 text-ctp-green flex-shrink-0" />
        <span className="break-words leading-relaxed">{shortMsg}</span>
        <span className="text-ctp-surface2 flex-shrink-0 ml-auto pl-2">
          ({meta.shortHash})
        </span>
      </div>
    </div>,
    document.body
  );
};

export default GitBlamePortalTooltip;
