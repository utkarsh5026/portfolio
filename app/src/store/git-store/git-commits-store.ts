import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { relativeTime } from "@/lib/utils";

export interface GitCommit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  email: string;
  date: string;
  avatarUrl: string;
  insertions: number;
  deletions: number;
  filesChanged: number;
}

export interface LanguageStat {
  language: string;
  count: number;
  color: string;
}

interface GitCommitsJson {
  generatedAt: string;
  commits: GitCommit[];
  commitsByDate?: Record<string, number>;
  languageStats?: LanguageStat[];
}

export type TimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

interface GitCommitsState {
  commits: GitCommit[];
  loading: boolean;
  generatedAt: string | null;
  commitsByDate: Record<string, number>;
  languageStats: LanguageStat[];

  fetchCommits: () => Promise<void>;
  getCommitsByTimeGroup: () => Map<TimeGroup, GitCommit[]>;
  getRelativeTime: (date: string) => string;
}

const useGitCommitsStore = create<GitCommitsState>((set, get) => ({
  commits: [],
  loading: false,
  generatedAt: null,
  commitsByDate: {},
  languageStats: [],

  fetchCommits: async () => {
    const { commits, loading } = get();
    if (commits.length > 0 || loading) return;

    set({ loading: true });

    try {
      const response = await fetch("/git-commits.json");
      const data: GitCommitsJson = await response.json();

      set({
        commits: data.commits ?? [],
        generatedAt: data.generatedAt ?? null,
        commitsByDate: data.commitsByDate ?? {},
        languageStats: data.languageStats ?? [],
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  getCommitsByTimeGroup: () => {
    const { commits } = get();
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const yesterdayStart = todayStart - 86_400_000;
    const weekStart = todayStart - new Date(now).getDay() * 86_400_000;

    const groups = new Map<TimeGroup, GitCommit[]>();

    for (const commit of commits) {
      const ts = new Date(commit.date).getTime();
      let group: TimeGroup;
      if (ts >= todayStart) group = "Today";
      else if (ts >= yesterdayStart) group = "Yesterday";
      else if (ts >= weekStart) group = "This Week";
      else group = "Earlier";

      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(commit);
    }

    return groups;
  },

  getRelativeTime: (date) => relativeTime(date),
}));

export const useGitCommitsState = () =>
  useGitCommitsStore(
    useShallow((state) => ({
      commits: state.commits,
      loading: state.loading,
      generatedAt: state.generatedAt,
      commitsByDate: state.commitsByDate,
      languageStats: state.languageStats,
    }))
  );

export const useGitCommitsActions = () =>
  useGitCommitsStore(
    useShallow((state) => ({
      fetchCommits: state.fetchCommits,
      getCommitsByTimeGroup: state.getCommitsByTimeGroup,
      getRelativeTime: state.getRelativeTime,
    }))
  );

export default useGitCommitsStore;
