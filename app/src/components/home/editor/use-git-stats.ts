import { useState, useEffect } from "react";
import type { SectionType } from "./context/explorer-context";

// ─── Types ──────────────────────────────────────────────────────────────────

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

interface GitStatsJson {
  generatedAt: string;
  sections: Partial<Record<SectionType, SectionGitStats>>;
}

interface UseGitStatsResult {
  stats: GitStatsJson | null;
  loading: boolean;
  getSectionStats: (section: SectionType) => SectionGitStats | null;
}

export function relativeTime(isoDate: string): string {
  if (!isoDate) return "—";
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function stalenessColor(isoDate: string): { dot: string; text: string } {
  if (!isoDate) return { dot: "bg-ctp-overlay0", text: "text-ctp-overlay0" };
  const days = (Date.now() - new Date(isoDate).getTime()) / 86_400_000;
  if (days < 7) return { dot: "bg-ctp-green", text: "text-ctp-green" };
  if (days < 30) return { dot: "bg-ctp-yellow", text: "text-ctp-yellow" };
  return { dot: "bg-ctp-red", text: "text-ctp-red" };
}

let cachedStats: GitStatsJson | null = null;

export function useGitStats(): UseGitStatsResult {
  const [stats, setStats] = useState<GitStatsJson | null>(cachedStats);
  const [loading, setLoading] = useState(!cachedStats);

  useEffect(() => {
    if (cachedStats) return;
    let cancelled = false;

    fetch("/git-stats.json")
      .then((r) => r.json())
      .then((data: GitStatsJson) => {
        if (!cancelled) {
          cachedStats = data;
          setStats(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const getSectionStats = (section: SectionType): SectionGitStats | null =>
    stats?.sections?.[section] ?? null;

  return { stats, loading, getSectionStats };
}
