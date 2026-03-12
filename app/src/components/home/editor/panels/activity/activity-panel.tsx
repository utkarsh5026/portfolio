import React from "react";
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
import { cn, relativeTime } from "@/lib/utils";

import CommitRow from "../shared/commit-row";
import CommitSkeleton from "../shared/commit-skeleton";
import PanelShell from "../shared/panel-shell";

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
  color: string;
}

const StatTile: React.FC<StatTileProps> = ({ icon, value, label, color }) => (
  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md bg-ctp-surface0/20 border border-ctp-surface0/40">
    <span className={cn("flex-shrink-0", color)}>{icon}</span>
    <div className="min-w-0">
      <div
        className={cn("text-xs font-semibold font-source leading-none", color)}
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
              color="text-ctp-teal"
            />
            <StatTile
              icon={<VscRepo className="w-3.5 h-3.5" />}
              value={projects.length}
              label="repos"
              color="text-ctp-blue"
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
                color="text-ctp-peach"
              />
            )}
          </div>
        )
      )}

      {/* ── Commit list ── */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-ctp-surface0 scrollbar-track-transparent">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <CommitSkeleton key={i} />)
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
          Array.from(grouped.entries()).map(([group, commits]) => (
            <React.Fragment key={group}>
              <div className="sticky top-0 z-10 bg-ctp-mantle/95 backdrop-blur-sm px-4 py-1.5 border-b border-ctp-surface0/30 flex items-center justify-between">
                <span className="text-[10px] text-ctp-overlay1 uppercase tracking-widest font-medium">
                  {group}
                </span>
                <span className="text-[9px] text-ctp-overlay0 bg-ctp-surface0/50 px-1.5 py-0.5 rounded-full">
                  {commits.length}
                </span>
              </div>
              {commits.map((commit, i) => (
                <CommitRow
                  key={`${commit.repo}-${commit.hash}`}
                  commit={commit}
                  index={i}
                />
              ))}
            </React.Fragment>
          ))
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
