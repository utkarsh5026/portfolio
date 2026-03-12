import React, { useMemo } from "react";
import { FiGitCommit, FiRefreshCw, FiX } from "react-icons/fi";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiRust,
  SiTypescript,
} from "react-icons/si";
import { VscPulse, VscRepo } from "react-icons/vsc";

import useGitActivity from "@/hooks/use-git-activity";
import { AppColor, ctpColorClass } from "@/lib/ctp-colors";
import { cn, relativeTime } from "@/lib/utils";

import {
  CommitRow,
  CommitSkeleton,
  GroupedCommitList,
  LanguageBar,
  PanelShell,
  SkeletonList,
} from "../shared";

const LANGUAGE_ICONS: Record<string, React.ReactNode> = {
  TypeScript: <SiTypescript className="w-3.5 h-3.5 text-ctp-blue" />,
  JavaScript: <SiJavascript className="w-3.5 h-3.5 text-ctp-yellow" />,
  Python: <SiPython className="w-3.5 h-3.5 text-ctp-peach" />,
  Go: <SiGo className="w-3.5 h-3.5 text-ctp-sky" />,
  Rust: <SiRust className="w-3.5 h-3.5 text-ctp-peach" />,
};

const StatsSkeleton: React.FC = () => (
  <div className="flex gap-3 px-4 py-2.5 border-b border-ctp-surface0/50 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 h-8 bg-ctp-surface0/60 rounded-md" />
    ))}
  </div>
);

interface StatTileProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: AppColor;
}

const StatTile: React.FC<StatTileProps> = ({ icon, value, label, color }) => (
  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md bg-ctp-surface0/20 border border-ctp-surface0/40">
    <span className={cn("flex-shrink-0", ctpColorClass("text", color))}>
      {icon}
    </span>
    <div className="min-w-0">
      <div
        className={cn(
          "text-xs font-semibold font-source leading-none",
          ctpColorClass("text", color)
        )}
      >
        {value}
      </div>
      <div className="text-[9px] text-ctp-overlay0 mt-0.5 leading-none truncate">
        {label}
      </div>
    </div>
  </div>
);

interface ActivityPanelProps {
  open: boolean;
  onClose: () => void;
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ open, onClose }) => {
  const {
    feed,
    loading,
    error,
    projects,
    topLanguage,
    grouped,
    totalCommits,
    visibleCommits,
  } = useGitActivity();

  const genTime = feed?.generatedAt ? relativeTime(feed.generatedAt) : null;

  // Accumulate language percentages weighted by each project's commit count
  const combinedLanguages = useMemo(() => {
    const totalCommitCount = projects.reduce((s, p) => s + p.commitCount, 0);
    if (totalCommitCount === 0) return [];

    const langMap = new Map<string, { color: string; weighted: number }>();
    for (const project of projects) {
      const weight = project.commitCount / totalCommitCount;
      for (const l of project.languages) {
        const existing = langMap.get(l.language);
        if (existing) {
          existing.weighted += l.percent * weight;
        } else {
          langMap.set(l.language, {
            color: l.color,
            weighted: l.percent * weight,
          });
        }
      }
    }

    return Array.from(langMap.entries())
      .map(([language, { color, weighted }]) => ({
        language,
        color,
        percent: Math.round(weighted * 10) / 10,
      }))
      .filter((l) => l.percent >= 0.5)
      .sort((a, b) => b.percent - a.percent);
  }, [projects]);

  return (
    <PanelShell open={open} onClose={onClose} width="w-80">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ctp-surface0 bg-ctp-base/80 flex-shrink-0">
        <div className="flex items-center gap-2">
          <VscPulse className="w-4 h-4 text-ctp-mauve" />
          <span className="text-xs font-semibold text-ctp-text uppercase tracking-wider">
            Activity Feed
          </span>
          {!loading && totalCommits > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-ctp-mauve/15 text-ctp-mauve text-[9px] font-semibold">
              {totalCommits}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {genTime && !loading && (
            <div className="flex items-center gap-1 text-[9px] text-ctp-overlay0">
              <FiRefreshCw className="w-2.5 h-2.5" />
              <span>{genTime}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="text-ctp-overlay1 hover:text-ctp-text transition-colors duration-150 rounded p-0.5 hover:bg-ctp-surface0"
            aria-label="Close activity panel"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        !error &&
        totalCommits > 0 && (
          <div className="flex gap-2 px-3 py-2.5 border-b border-ctp-surface0/50 flex-shrink-0">
            <StatTile
              icon={<FiGitCommit className="w-3.5 h-3.5" />}
              value={totalCommits}
              label="commits"
              color="teal"
            />
            <StatTile
              icon={<VscRepo className="w-3.5 h-3.5" />}
              value={projects.length}
              label="repos"
              color="blue"
            />
            {topLanguage && (
              <StatTile
                icon={
                  LANGUAGE_ICONS[topLanguage] ?? (
                    <span className="text-[10px] font-bold text-ctp-peach">
                      {topLanguage.slice(0, 2)}
                    </span>
                  )
                }
                value={topLanguage}
                label="top lang"
                color="peach"
              />
            )}
          </div>
        )
      )}

      {/* ── Language breakdown ── */}
      {!loading && !error && combinedLanguages.length > 0 && (
        <div className="flex-shrink-0 px-3 py-2.5 border-b border-ctp-surface0/50">
          <span className="text-[9px] uppercase tracking-wider text-ctp-overlay0 font-semibold">
            Languages across all commits
          </span>
          <LanguageBar
            items={combinedLanguages}
            height="md"
            showLegend
            className="mt-1.5"
          />
        </div>
      )}

      {/* ── Commit list ── */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-ctp-surface0 scrollbar-track-transparent">
        {loading ? (
          <SkeletonList component={CommitSkeleton} count={8} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-ctp-overlay0 px-6 text-center">
            <VscPulse className="w-8 h-8 text-ctp-red" />
            <p className="text-xs text-ctp-red">Failed to load activity</p>
            <p className="text-[10px] text-ctp-overlay0">{error}</p>
            <p className="text-[10px] text-ctp-overlay0 mt-1">
              Run <code className="text-ctp-peach">make gen-activity</code> to
              generate the data file.
            </p>
          </div>
        ) : visibleCommits === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-ctp-overlay0">
            <VscPulse className="w-8 h-8" />
            <p className="text-xs">No activity found</p>
          </div>
        ) : (
          <GroupedCommitList
            grouped={grouped}
            showCount
            getKey={(commit, i) => `${commit.repo}-${commit.hash}-${i}`}
            renderCommit={(commit, i) => (
              <CommitRow commit={commit} index={i} />
            )}
          />
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-ctp-surface0 bg-ctp-base/60 flex items-center justify-between">
        <p className="text-[9px] text-ctp-overlay0 tracking-wider">
          {feed?.githubUser ?? "utkarsh5026"} · github activity
        </p>
      </div>
    </PanelShell>
  );
};

export default ActivityPanel;
