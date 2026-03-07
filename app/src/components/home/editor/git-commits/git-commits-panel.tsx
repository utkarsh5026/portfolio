import React, { useMemo } from "react";
import { FiFilePlus, FiMinus, FiPlus, FiRefreshCw, FiX } from "react-icons/fi";
import { VscSourceControl } from "react-icons/vsc";

import { cn } from "@/lib/utils";

import type { GitCommit, LanguageStat } from "../use-git-commits";
import {
  groupCommitsByTime,
  relativeTime,
  useGitCommits,
} from "../use-git-commits";
import { CommitRow } from "./commit-row";
import ContributionHeatmap from "./contribution-heatmap";
import styles from "./git-commits.module.css";

const CommitSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 px-4 py-3 border-b border-ctp-surface0/60 animate-pulse">
    <div className="mt-0.5 w-6 h-6 rounded-full bg-ctp-surface0 flex-shrink-0" />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-3 bg-ctp-surface0 rounded w-4/5" />
      <div className="h-2.5 bg-ctp-surface0 rounded w-2/5" />
    </div>
    <div className="h-2 bg-ctp-surface0 rounded w-10 flex-shrink-0 mt-1" />
  </div>
);

interface LanguageBarProps {
  stats: LanguageStat[];
}

const LanguageBar: React.FC<LanguageBarProps> = ({ stats }) => {
  const total = useMemo(
    () => stats.reduce((sum, s) => sum + s.count, 0),
    [stats]
  );

  if (stats.length === 0 || total === 0) return null;

  return (
    <div className="flex-shrink-0 px-4 py-2 border-t border-ctp-surface0/40">
      {/* Stacked bar */}
      <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
        {stats.map((s, idx) => (
          <div
            key={`${s.language}-${idx}`}
            style={{
              width: `${(s.count / total) * 100}%`,
              backgroundColor: s.color,
            }}
            className="min-w-[2px] first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
        {stats.map((s, idx) => (
          <span
            key={`${s.language}-${idx}`}
            className="flex items-center gap-1"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[9px] text-ctp-subtext0 font-source">
              {s.language}
            </span>
            <span className="text-[9px] text-ctp-overlay0 font-source">
              {((s.count / total) * 100).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

interface SummaryStatsBarProps {
  commits: GitCommit[];
}

const SummaryStatsBar: React.FC<SummaryStatsBarProps> = ({ commits }) => {
  const { insertions, deletions, filesChanged } = useMemo(() => {
    let ins = 0,
      del = 0,
      files = 0;
    for (const c of commits) {
      ins += c.insertions;
      del += c.deletions;
      files += c.filesChanged;
    }
    return { insertions: ins, deletions: del, filesChanged: files };
  }, [commits]);

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-ctp-surface0/40 bg-ctp-surface0/20 flex-shrink-0">
      <span className="flex items-center gap-1 text-[10px] font-source text-ctp-green">
        <FiPlus className="w-2.5 h-2.5" />
        {insertions.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 text-[10px] font-source text-ctp-red">
        <FiMinus className="w-2.5 h-2.5" />
        {deletions.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 text-[10px] font-source text-ctp-overlay1">
        <FiFilePlus className="w-2.5 h-2.5" />
        {filesChanged} file{filesChanged !== 1 ? "s" : ""}
      </span>
    </div>
  );
};

interface GitCommitsPanelProps {
  open: boolean;
  onClose: () => void;
}

const GitCommitsPanel: React.FC<GitCommitsPanelProps> = ({ open, onClose }) => {
  const { commits, loading, generatedAt, commitsByDate, languageStats } =
    useGitCommits();

  const genTime = generatedAt ? relativeTime(generatedAt) : null;

  const grouped = useMemo(() => groupCommitsByTime(commits), [commits]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40",
          styles.backdrop,
          open && styles.backdropOpen
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed top-0 left-14 h-full w-72 z-50 flex flex-col bg-ctp-mantle border-r border-ctp-surface0 shadow-2xl font-source",
          styles.panel,
          open && styles.panelOpen
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-ctp-surface0 bg-ctp-base/80 flex-shrink-0">
          <div className="flex items-center gap-2">
            <VscSourceControl className="w-4 h-4 text-ctp-teal" />
            <span className="text-xs font-semibold text-ctp-text uppercase tracking-wider">
              Source Control
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-ctp-overlay1 hover:text-ctp-text transition-colors duration-150 rounded p-0.5 hover:bg-ctp-surface0"
            aria-label="Close source control panel"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sub-header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-ctp-surface0/50 bg-ctp-mantle flex-shrink-0">
          <span className="text-[10px] text-ctp-subtext0 uppercase tracking-widest font-medium">
            {loading ? "Loading…" : `${commits.length} Recent Commits`}
          </span>
          {genTime && !loading && (
            <div className="flex items-center gap-1 text-[10px] text-ctp-overlay0">
              <FiRefreshCw className="w-2.5 h-2.5" />
              <span>{genTime}</span>
            </div>
          )}
        </div>

        {/* Summary stats */}
        {!loading && commits.length > 0 && (
          <SummaryStatsBar commits={commits} />
        )}

        {/* Contribution heatmap */}
        {!loading && Object.keys(commitsByDate).length > 0 && (
          <ContributionHeatmap commitsByDate={commitsByDate} />
        )}

        {/* Commit list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-ctp-surface0 scrollbar-track-transparent">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <CommitSkeleton key={i} />)
          ) : commits.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-ctp-overlay0">
              <VscSourceControl className="w-8 h-8" />
              <p className="text-xs">No commits found</p>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, groupCommits]) => (
              <React.Fragment key={group}>
                <div className="sticky top-0 z-10 bg-ctp-mantle/90 backdrop-blur-sm px-4 py-1 border-b border-ctp-surface0/30">
                  <span className="text-[10px] text-ctp-overlay1 uppercase tracking-widest font-medium">
                    {group}
                  </span>
                </div>
                {groupCommits.map((commit, i) => (
                  <CommitRow key={commit.hash} commit={commit} index={i} />
                ))}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Language bar */}
        {!loading && languageStats.length > 0 && (
          <LanguageBar stats={languageStats} />
        )}

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-2 border-t border-ctp-surface0 bg-ctp-base/60">
          <p className="text-[9px] text-ctp-overlay0 text-center tracking-wider uppercase">
            utkarsh5026/portfolio
          </p>
        </div>
      </div>
    </>
  );
};

export default GitCommitsPanel;
