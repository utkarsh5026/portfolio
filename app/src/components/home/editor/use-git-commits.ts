import { useState, useEffect } from "react";
import { relativeTime } from "./use-git-stats";

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

interface GitCommitsJson {
  generatedAt: string;
  commits: GitCommit[];
}

interface UseGitCommitsResult {
  commits: GitCommit[];
  loading: boolean;
  generatedAt: string | null;
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
  };
}

export { relativeTime };
