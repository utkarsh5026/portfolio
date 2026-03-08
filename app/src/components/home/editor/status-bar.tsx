import React, { useEffect, useMemo } from "react";
import {
  FaBriefcase,
  FaCodeBranch,
  FaEnvelope,
  FaGitAlt,
  FaGraduationCap,
  FaHome,
  FaLaptopCode,
  FaNewspaper,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { GoFileCode } from "react-icons/go";
import { VscGitCommit, VscMarkdown } from "react-icons/vsc";

import { cn, relativeTime } from "@/lib/utils";
import { type SectionGitStats, useGitStore } from "@/store";

import { type SectionType, useEditorContext } from "./context/explorer-context";

function stalenessColor(isoDate: string): { dot: string; text: string } {
  if (!isoDate) return { dot: "bg-ctp-overlay0", text: "text-ctp-overlay0" };

  const days = (Date.now() - new Date(isoDate).getTime()) / 86_400_000;
  if (days < 7) {
    return { dot: "bg-ctp-green", text: "text-ctp-green" };
  }

  if (days < 30) {
    return { dot: "bg-ctp-yellow", text: "text-ctp-yellow" };
  }

  return { dot: "bg-ctp-red", text: "text-ctp-red" };
}

interface SectionMeta {
  icon: React.ReactNode;
  branchLabel: string;
  fileLabel: string;
}

const SECTION_META: Record<SectionType, SectionMeta> = {
  home: {
    icon: <FaHome className="w-3 h-3" />,
    branchLabel: "main",
    fileLabel: "home.tsx",
  },
  about: {
    icon: <FaUser className="w-3 h-3" />,
    branchLabel: "about",
    fileLabel: "about.tsx",
  },
  skills: {
    icon: <FaStar className="w-3 h-3" />,
    branchLabel: "skills",
    fileLabel: "skills.tsx",
  },
  projects: {
    icon: <FaLaptopCode className="w-3 h-3" />,
    branchLabel: "projects",
    fileLabel: "projects.tsx",
  },
  experience: {
    icon: <FaBriefcase className="w-3 h-3" />,
    branchLabel: "experience",
    fileLabel: "work.tsx",
  },
  contact: {
    icon: <FaEnvelope className="w-3 h-3" />,
    branchLabel: "contact",
    fileLabel: "contact.tsx",
  },
  learning: {
    icon: <FaGraduationCap className="w-3 h-3" />,
    branchLabel: "learning",
    fileLabel: "learning.tsx",
  },
  articles: {
    icon: <FaNewspaper className="w-3 h-3" />,
    branchLabel: "articles",
    fileLabel: "articles.tsx",
  },
  resume: {
    icon: <GoFileCode className="w-3 h-3" />,
    branchLabel: "resume",
    fileLabel: "resume.pdf",
  },
};

function truncate(str: string, maxLen: number): string {
  if (!str) return "—";
  return str.length <= maxLen ? str : str.slice(0, maxLen - 1) + "…";
}

function diffLabel(added: number, deleted: number): string {
  if (!added && !deleted) return "no changes";
  return `+${added} / -${deleted}`;
}

const StatusBarComponent: React.FC = () => {
  const { activeSection, activeProjectId, openTabs } = useEditorContext();
  const { fetchGitStats, getSectionStats, loading } = useGitStore();

  useEffect(() => {
    void fetchGitStats();
  }, [fetchGitStats]);

  const currentSection: SectionType = activeSection;

  const meta: SectionMeta = useMemo(() => {
    if (activeProjectId !== null) {
      const tab = openTabs.find(
        (t) => t.type === "project" && t.id === activeProjectId
      );
      const slug = tab?.fileName ?? `${activeProjectId}.tsx`;
      return {
        icon: <VscMarkdown className="w-3 h-3" />,
        branchLabel: `projects/${slug.replace(".md", "")}`,
        fileLabel: slug,
      };
    }
    return SECTION_META[currentSection];
  }, [activeProjectId, openTabs, currentSection]);

  const gitStats: SectionGitStats | null = useMemo(() => {
    if (activeProjectId !== null) return getSectionStats("projects");
    return getSectionStats(currentSection);
  }, [activeProjectId, currentSection, getSectionStats]);

  const branchDisplay = meta.branchLabel;
  const hashDisplay = gitStats?.lastCommitHash ?? "";
  const commitMsg = truncate(gitStats?.lastCommitMessage ?? "", 42);
  const commitCount = gitStats?.commitCount ?? null;
  const fileCount = gitStats?.fileCount ?? null;
  const recentDiff = gitStats
    ? diffLabel(gitStats.linesAdded, gitStats.linesDeleted)
    : null;
  const timeAgo = gitStats ? relativeTime(gitStats.lastCommitDate) : null;
  const colors = gitStats
    ? stalenessColor(gitStats.lastCommitDate)
    : { dot: "bg-ctp-overlay0", text: "text-ctp-subtext0" };

  return (
    <div className="bg-ctp-base border-t border-ctp-surface0 text-ctp-text text-xs flex items-center justify-between min-h-[28px] px-2 md:px-4 py-1 font-source">
      {/* ── Left: branch + commit message ──────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0 overflow-hidden">
        {/* Branch + hash */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <FaGitAlt className="w-3 h-3 text-ctp-peach" />
          <span className="font-medium text-ctp-peach">{branchDisplay}</span>
          {hashDisplay && (
            <span className="text-ctp-overlay1 font-source hidden sm:inline">
              #{hashDisplay}
            </span>
          )}
        </div>

        {/* Last commit message — hidden on small screens */}
        {!loading && commitMsg && (
          <div className="hidden md:flex items-center gap-1 min-w-0">
            <VscGitCommit className="w-3 h-3 text-ctp-lavender flex-shrink-0" />
            <span className="text-ctp-subtext1 truncate italic">
              {commitMsg}
            </span>
          </div>
        )}

        {/* File icon + filename */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          {meta.icon}
          <span className="text-ctp-subtext0">{meta.fileLabel}</span>
        </div>
      </div>

      {/* ── Right: stats + status ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* Commit count */}
        {!loading && commitCount !== null && (
          <div className="hidden lg:flex items-center gap-1 text-ctp-subtext1">
            <FaCodeBranch className="w-3 h-3" />
            <span>{commitCount} commits</span>
          </div>
        )}

        {/* Diff stats from last commit */}
        {!loading && recentDiff && (
          <div className="hidden md:flex items-center gap-1 text-ctp-subtext1">
            <span className="font-source">{recentDiff}</span>
          </div>
        )}

        {/* File count */}
        {!loading && fileCount !== null && (
          <div className="hidden lg:flex items-center gap-1 text-ctp-subtext1">
            <GoFileCode className="w-3 h-3" />
            <span>{fileCount} files</span>
          </div>
        )}

        {/* Staleness dot + relative time */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-500",
              colors.dot
            )}
          />
          <span
            className={cn(
              "font-medium transition-colors duration-500",
              colors.text
            )}
          >
            {loading ? "…" : (timeAgo ?? "Ready")}
          </span>
        </div>

        {/* UTF-8 encoding — hidden on mobile */}
        <span className="hidden md:inline text-ctp-subtext1 flex-shrink-0">
          UTF-8
        </span>
      </div>
    </div>
  );
};

const StatusBar = React.memo(StatusBarComponent);
export default StatusBar;
