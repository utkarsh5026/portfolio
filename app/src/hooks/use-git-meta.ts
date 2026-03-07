import { useEffect, useState } from "react";

export interface ComponentMeta {
  section: string;
  file: string;
  lines: [number, number];
  hash: string;
  shortHash: string;
  author: string;
  date: string | null;
  message: string;
}

interface GitMetaJson {
  generatedAt: string;
  components: Record<string, ComponentMeta>;
}

// Module-level cache — fetched once, shared across all hook instances
let cachedMeta: GitMetaJson | null = null;
let fetchPromise: Promise<GitMetaJson> | null = null;

function loadGitMeta(): Promise<GitMetaJson> {
  if (cachedMeta) return Promise.resolve(cachedMeta);
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/data/git-meta.json")
    .then((r) => r.json() as Promise<GitMetaJson>)
    .then((data) => {
      cachedMeta = data;
      return data;
    })
    .catch(() => ({ generatedAt: "", components: {} }));

  return fetchPromise;
}

export function useGitMeta() {
  const [meta, setMeta] = useState<GitMetaJson | null>(cachedMeta);

  useEffect(() => {
    if (cachedMeta) {
      setMeta(cachedMeta);
      return;
    }
    loadGitMeta().then(setMeta);
  }, []);

  function getByComponent(name: string): ComponentMeta | null {
    return meta?.components[name] ?? null;
  }

  /**
   * Returns the "primary" component for a section — the one with the widest
   * line range (most representative of the whole section file).
   */
  function getBySection(sectionId: string): ComponentMeta | null {
    if (!meta) return null;
    const matches = Object.values(meta.components).filter(
      (c) => c.section === sectionId
    );
    if (matches.length === 0) return null;
    return matches.reduce((best, c) =>
      c.lines[1] - c.lines[0] > best.lines[1] - best.lines[0] ? c : best
    );
  }

  return { getByComponent, getBySection };
}

/** Format a UTC ISO date string as a relative time string, e.g. "3 days ago" */
export function relativeTime(isoDate: string | null): string {
  if (!isoDate) return "unknown";
  const diff = Date.now() - new Date(isoDate).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
