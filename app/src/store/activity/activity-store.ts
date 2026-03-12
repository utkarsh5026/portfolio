import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { relativeTime } from "@/lib/utils";

export interface ActivityCommit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  authorLogin: string;
  avatarUrl: string;
  date: string;
  url: string;
}

export interface TimelineCommit extends ActivityCommit {
  repo: string;
  repoFullName: string;
  repoUrl: string;
  repoLanguage: string;
}

export interface LanguageShare {
  language: string;
  percent: number;
  color: string;
}

export interface ProjectActivity {
  name: string;
  fullName: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  defaultBranch: string;
  updatedAt: string;
  languages: LanguageShare[];
  commitCount: number;
  latestCommit: ActivityCommit | null;
}

export interface ActivityFeedJson {
  generatedAt: string;
  githubUser: string;
  projects: Record<string, ProjectActivity>;
  timeline: TimelineCommit[];
}

export type ActivityTimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

interface ActivityState {
  feed: ActivityFeedJson | null;
  loading: boolean;
  error: string | null;

  fetchActivity: () => Promise<void>;
  getTimeline: () => TimelineCommit[];
  getTimelineGrouped: () => Map<ActivityTimeGroup, TimelineCommit[]>;
  getCommitsByRepo: () => Map<string, TimelineCommit[]>;
  getRelativeTime: (date: string) => string;
}

function groupByTime(
  commits: TimelineCommit[]
): Map<ActivityTimeGroup, TimelineCommit[]> {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const yesterdayStart = todayStart - 86_400_000;
  const weekStart = todayStart - new Date(now).getDay() * 86_400_000;

  const groups = new Map<ActivityTimeGroup, TimelineCommit[]>();

  for (const commit of commits) {
    const ts = new Date(commit.date).getTime();
    let group: ActivityTimeGroup;
    if (ts >= todayStart) group = "Today";
    else if (ts >= yesterdayStart) group = "Yesterday";
    else if (ts >= weekStart) group = "This Week";
    else group = "Earlier";

    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(commit);
  }

  return groups;
}

const useActivityStore = create<ActivityState>((set, get) => ({
  feed: null,
  loading: false,
  error: null,

  fetchActivity: async () => {
    const { feed, loading } = get();
    if (feed !== null || loading) return;

    set({ loading: true, error: null });

    try {
      const data: ActivityFeedJson = await fetch(
        "/data/activity-feed.json"
      ).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      });
      set({ feed: data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load activity",
      });
    }
  },

  getTimeline: () => get().feed?.timeline ?? [],

  getTimelineGrouped: () => groupByTime(get().feed?.timeline ?? []),

  getCommitsByRepo: () => {
    const timeline = get().feed?.timeline ?? [];
    const map = new Map<string, TimelineCommit[]>();
    for (const commit of timeline) {
      if (!map.has(commit.repo)) map.set(commit.repo, []);
      map.get(commit.repo)!.push(commit);
    }
    return map;
  },

  getRelativeTime: (date) => relativeTime(date),
}));

// ── Hooks (selector pattern, same as git-commits-store) ───────────────────────

export const useActivityState = () =>
  useActivityStore(
    useShallow((s) => ({
      feed: s.feed,
      loading: s.loading,
      error: s.error,
    }))
  );

export const useActivityActions = () =>
  useActivityStore(
    useShallow((s) => ({
      fetchActivity: s.fetchActivity,
      getTimeline: s.getTimeline,
      getTimelineGrouped: s.getTimelineGrouped,
      getCommitsByRepo: s.getCommitsByRepo,
      getRelativeTime: s.getRelativeTime,
    }))
  );

export default useActivityStore;
