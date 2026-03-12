import { create } from "zustand";

import type { SectionType } from "@/components/home/editor/context/editor-store";

export interface SectionGitStats {
  lastCommitHash: string;
  lastCommitDate: string;
  lastCommitMessage: string;
  lastAuthor: string;
  commitCount: number;
  /** Lines changed in the most recent commit touching this section */
  linesAdded: number;
  linesDeleted: number;
  /** Cumulative lines added/deleted across all history */
  totalAdded: number;
  totalDeleted: number;
  /** Number of tracked source files in the directory */
  fileCount: number;
}

export interface GitStatsJson {
  generatedAt: string;
  sections: Partial<Record<SectionType, SectionGitStats>>;
}

interface GitState {
  stats: GitStatsJson | null;
  loading: boolean;

  fetchGitStats: () => Promise<void>;
  getSectionStats: (section: SectionType) => SectionGitStats | null;
}

const useGitStore = create<GitState>((set, get) => ({
  stats: null,
  loading: false,

  fetchGitStats: async () => {
    if (get().stats !== null || get().loading) return;

    set({ loading: true });

    try {
      const response = await fetch("/git-stats.json");
      const data: GitStatsJson = await response.json();
      set({ stats: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  getSectionStats: (section) => get().stats?.sections?.[section] ?? null,
}));

export default useGitStore;
