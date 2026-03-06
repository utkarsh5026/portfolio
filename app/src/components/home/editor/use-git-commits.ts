import { useEffect, useState } from "react";

import { relativeTime } from "./use-git-stats";

type TimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

export function groupCommitsByTime(
  commits: GitCommit[]
): Map<TimeGroup, GitCommit[]> {
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
}

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

interface UseGitCommitsResult {
  commits: GitCommit[];
  loading: boolean;
  generatedAt: string | null;
  commitsByDate: Record<string, number>;
  languageStats: LanguageStat[];
}

let cachedData: GitCommitsJson | null = null;

export function useGitCommits(): UseGitCommitsResult {
  const [data, setData] = useState<GitCommitsJson | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) return;
    let cancelled = false;

    fetch("/git-commits.json")
      .then((r) => r.json())
      .then((json: GitCommitsJson) => {
        if (!cancelled) {
          cachedData = json;
          setData(json);
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

  return {
    commits: data?.commits ?? [],
    loading,
    generatedAt: data?.generatedAt ?? null,
    commitsByDate: data?.commitsByDate ?? {},
    languageStats: data?.languageStats ?? [],
  };
}

export { relativeTime };
