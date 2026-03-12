import React, { useEffect, useMemo, useState } from "react";
import { FiCode, FiGitCommit, FiRefreshCw, FiX } from "react-icons/fi";
import { VscPulse, VscRepo } from "react-icons/vsc";

import { cn, relativeTime } from "@/lib/utils";
import type { TimelineCommit } from "@/store/activity/activity-store";
import {
  useActivityActions,
  useActivityState,
} from "@/store/activity/activity-store";

import ActivityCommitRow from "./activity-commit-row";
import styles from "./activity-panel.module.css";

// ── Skeletons ──────────────────────────────────────────────────────────────────

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

const StatsSkeleton: React.FC = () => (
  <div className="flex gap-3 px-4 py-2.5 border-b border-ctp-surface0/50 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 h-8 bg-ctp-surface0/60 rounded-md" />
    ))}
  </div>
);

// ── Commit type config ─────────────────────────────────────────────────────────

const COMMIT_TYPES: Record<
  string,
  { color: string; bg: string; activeBg: string }
> = {
  feat: {
    color: "text-ctp-green",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-green/15 border-ctp-green/40",
  },
  fix: {
    color: "text-ctp-red",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-red/15 border-ctp-red/40",
  },
  refactor: {
    color: "text-ctp-mauve",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-mauve/15 border-ctp-mauve/40",
  },
  style: {
    color: "text-ctp-pink",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-pink/15 border-ctp-pink/40",
  },
  chore: {
    color: "text-ctp-overlay1",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-surface1 border-ctp-overlay0/40",
  },
  docs: {
    color: "text-ctp-blue",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-blue/15 border-ctp-blue/40",
  },
  build: {
    color: "text-ctp-peach",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-peach/15 border-ctp-peach/40",
  },
  ci: {
    color: "text-ctp-teal",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-teal/15 border-ctp-teal/40",
  },
  perf: {
    color: "text-ctp-yellow",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-yellow/15 border-ctp-yellow/40",
  },
  test: {
    color: "text-ctp-sapphire",
    bg: "bg-ctp-surface0/40",
    activeBg: "bg-ctp-sapphire/15 border-ctp-sapphire/40",
  },
};

function parseCommitType(message: string): string | null {
  const match = message.match(/^(\w+)(\(.+?\))?!?:\s/);
  if (match && COMMIT_TYPES[match[1]]) return match[1];
  return null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const ALL = "__all__";

type TimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

function groupCommits(
  commits: TimelineCommit[]
): Map<TimeGroup, TimelineCommit[]> {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const yesterdayStart = todayStart - 86_400_000;
  const weekStart = todayStart - new Date(now).getDay() * 86_400_000;

  const map = new Map<TimeGroup, TimelineCommit[]>();
  for (const c of commits) {
    const ts = new Date(c.date).getTime();
    const g: TimeGroup =
      ts >= todayStart
        ? "Today"
        : ts >= yesterdayStart
          ? "Yesterday"
          : ts >= weekStart
            ? "This Week"
            : "Earlier";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(c);
  }
  return map;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

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

// ── Main Panel ─────────────────────────────────────────────────────────────────

interface ActivityPanelProps {
  open: boolean;
  onClose: () => void;
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ open, onClose }) => {
  const { feed, loading, error } = useActivityState();
  const { fetchActivity, getCommitsByRepo } = useActivityActions();

  const [activeRepo, setActiveRepo] = useState<string>(ALL);
  const [activeType, setActiveType] = useState<string>(ALL);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const projects = useMemo(() => Object.values(feed?.projects ?? {}), [feed]);

  // Derive which commit types are actually present
  const presentTypes = useMemo(() => {
    const timeline = feed?.timeline ?? [];
    const types = new Set<string>();
    for (const c of timeline) {
      const t = parseCommitType(c.message);
      if (t) types.add(t);
    }
    return Array.from(types).sort();
  }, [feed]);

  // Top language across all repos
  const topLanguage = useMemo(() => {
    if (!projects.length) return null;
    const langMap = new Map<string, number>();
    for (const p of projects) {
      for (const l of p.languages) {
        langMap.set(l.language, (langMap.get(l.language) ?? 0) + l.percent);
      }
    }
    let best = "";
    let bestVal = 0;
    for (const [lang, val] of langMap) {
      if (val > bestVal) {
        bestVal = val;
        best = lang;
      }
    }
    return best || null;
  }, [projects]);

  // Filtered + grouped commits
  const grouped = useMemo(() => {
    let commits = feed?.timeline ?? [];

    if (activeRepo !== ALL) {
      const byRepo = getCommitsByRepo();
      commits = byRepo.get(activeRepo) ?? [];
    }

    if (activeType !== ALL) {
      commits = commits.filter(
        (c) => parseCommitType(c.message) === activeType
      );
    }

    return groupCommits(commits);
  }, [activeRepo, activeType, feed, getCommitsByRepo]);

  const totalCommits = feed?.timeline.length ?? 0;
  const visibleCommits = useMemo(
    () => Array.from(grouped.values()).reduce((s, arr) => s + arr.length, 0),
    [grouped]
  );
  const genTime = feed?.generatedAt ? relativeTime(feed.generatedAt) : null;
  const isFiltered = activeRepo !== ALL || activeType !== ALL;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40",
          styles.backdrop,
          open && styles.backdropOpen
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 left-14 h-full w-80 z-50 flex flex-col bg-ctp-mantle border-r border-ctp-surface0 shadow-2xl font-source",
          styles.panel,
          open && styles.panelOpen
        )}
      >
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
                isActive={activeRepo === ALL}
                activeBg="bg-ctp-mauve/15"
                color="text-ctp-mauve"
                onClick={() => setActiveRepo(ALL)}
              />
              {projects.map((p) => (
                <FilterChip
                  key={p.name}
                  label={p.name}
                  isActive={activeRepo === p.name}
                  activeBg="bg-ctp-blue/15"
                  color={activeRepo === p.name ? "text-ctp-blue" : undefined}
                  onClick={() =>
                    setActiveRepo((prev) => (prev === p.name ? ALL : p.name))
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
                isActive={activeType === ALL}
                activeBg="bg-ctp-mauve/15"
                color="text-ctp-mauve"
                onClick={() => setActiveType(ALL)}
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
                      setActiveType((prev) => (prev === t ? ALL : t))
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
                  onClick={() => {
                    setActiveRepo(ALL);
                    setActiveType(ALL);
                  }}
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
                    showRepo={activeRepo === ALL}
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
              onClick={() => {
                setActiveRepo(ALL);
                setActiveType(ALL);
              }}
              className="text-[9px] text-ctp-blue hover:text-ctp-lavender transition-colors"
            >
              clear filters
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityPanel;
