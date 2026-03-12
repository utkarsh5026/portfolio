import React from "react";
import { FiCode, FiGitCommit, FiRefreshCw, FiX } from "react-icons/fi";
import { VscPulse, VscRepo } from "react-icons/vsc";

import useGitActivity, { ACTIVITY_ALL } from "@/hooks/use-git-activity";
import { cn, relativeTime } from "@/lib/utils";

import CommitSkeleton from "../shared/commit-skeleton";
import { COMMIT_TYPES } from "../shared/commit-type-utils";
import PanelShell from "../shared/panel-shell";
import ActivityCommitRow from "./activity-commit-row";

const StatsSkeleton: React.FC = () => (
  <div className="flex gap-3 px-4 py-2.5 border-b border-ctp-surface0/50 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 h-8 bg-ctp-surface0/60 rounded-md" />
    ))}
  </div>
);

interface FilterChipProps {
  label: string;
  isActive: boolean;
  color?: string;
  activeBg?: string;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive,
  color,
  activeBg,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-shrink-0 px-2.5 py-1 rounded-full border text-[10px] font-medium font-source transition-all duration-150",
      isActive
        ? cn(
            "border-transparent",
            activeBg ?? "bg-ctp-mauve/15 border-ctp-mauve/40",
            color ?? "text-ctp-mauve"
          )
        : cn(
            "border-ctp-surface0/60 text-ctp-overlay1 hover:border-ctp-surface1 hover:text-ctp-subtext0",
            color && !isActive ? "" : ""
          )
    )}
  >
    {label}
  </button>
);

interface StatTileProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}

const StatTile: React.FC<StatTileProps> = ({ icon, value, label, color }) => (
  <div
    className={cn(
      "flex-1 flex items-center gap-2 px-3 py-2 rounded-md bg-ctp-surface0/20 border border-ctp-surface0/40"
    )}
  >
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
    presentTypes,
    grouped,
    totalCommits,
    visibleCommits,
    isFiltered,
    activeRepo,
    activeType,
    setActiveRepo,
    setActiveType,
    clearFilters,
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
                icon={<FiCode className="w-3.5 h-3.5" />}
                value={topLanguage}
                label="top lang"
                color="text-ctp-peach"
              />
            )}
          </div>
        )
      )}

      {/* ── Repo filter chips ── */}
      {!loading && projects.length > 0 && (
        <div className="flex-shrink-0 border-b border-ctp-surface0/40">
          <div className="px-3 pt-2 pb-0.5">
            <span className="text-[9px] text-ctp-overlay0 uppercase tracking-widest font-medium">
              Repos
            </span>
          </div>
          <div className="flex gap-1.5 px-3 pb-2 pt-1 overflow-x-auto scrollbar-none">
            <FilterChip
              label="All"
              isActive={activeRepo === ACTIVITY_ALL}
              activeBg="bg-ctp-mauve/15"
              color="text-ctp-mauve"
              onClick={() => setActiveRepo(ACTIVITY_ALL)}
            />
            {projects.map((p) => (
              <FilterChip
                key={p.name}
                label={p.name}
                isActive={activeRepo === p.name}
                activeBg="bg-ctp-blue/15"
                color={activeRepo === p.name ? "text-ctp-blue" : undefined}
                onClick={() =>
                  setActiveRepo(activeRepo === p.name ? ACTIVITY_ALL : p.name)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Type filter chips ── */}
      {!loading && presentTypes.length > 0 && (
        <div className="flex-shrink-0 border-b border-ctp-surface0/40">
          <div className="px-3 pt-2 pb-0.5">
            <span className="text-[9px] text-ctp-overlay0 uppercase tracking-widest font-medium">
              Type
            </span>
          </div>
          <div className="flex gap-1.5 px-3 pb-2 pt-1 overflow-x-auto scrollbar-none">
            <FilterChip
              label="All"
              isActive={activeType === ACTIVITY_ALL}
              activeBg="bg-ctp-mauve/15"
              color="text-ctp-mauve"
              onClick={() => setActiveType(ACTIVITY_ALL)}
            />
            {presentTypes.map((t) => {
              const ts = COMMIT_TYPES[t];
              return (
                <FilterChip
                  key={t}
                  label={t}
                  isActive={activeType === t}
                  activeBg={ts?.activeBg}
                  color={activeType === t ? ts?.color : undefined}
                  onClick={() =>
                    setActiveType(activeType === t ? ACTIVITY_ALL : t)
                  }
                />
              );
            })}
          </div>
        </div>
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
            <p className="text-xs">
              {isFiltered ? "No commits match filters" : "No activity found"}
            </p>
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="text-[10px] text-ctp-blue hover:underline"
              >
                Clear filters
              </button>
            )}
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
                <ActivityCommitRow
                  key={`${commit.repo}-${commit.hash}`}
                  commit={commit}
                  index={i}
                  showRepo={activeRepo === ACTIVITY_ALL}
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
        {isFiltered && (
          <button
            onClick={clearFilters}
            className="text-[9px] text-ctp-blue hover:text-ctp-lavender transition-colors"
          >
            clear filters
          </button>
        )}
      </div>
    </PanelShell>
  );
};

export default ActivityPanel;
