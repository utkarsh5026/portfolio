import { useEffect, useMemo, useState } from "react";

import { parseCommitType } from "@/components/home/editor/panels/shared/commit-type-utils";
import type { TimelineCommit } from "@/store/activity/activity-store";
import {
  useActivityActions,
  useActivityState,
} from "@/store/activity/activity-store";

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

function useGitActivity() {
  const { feed, loading, error } = useActivityState();
  const { fetchActivity, getCommitsByRepo } = useActivityActions();

  const [activeRepo, setActiveRepo] = useState<string>(ALL);
  const [activeType, setActiveType] = useState<string>(ALL);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const projects = useMemo(() => Object.values(feed?.projects ?? {}), [feed]);

  const presentTypes = useMemo(() => {
    const timeline = feed?.timeline ?? [];
    const types = new Set<string>();
    for (const c of timeline) {
      const t = parseCommitType(c.message);
      if (t) types.add(t);
    }
    return Array.from(types).sort();
  }, [feed]);

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

  const isFiltered = activeRepo !== ALL || activeType !== ALL;

  const clearFilters = () => {
    setActiveRepo(ALL);
    setActiveType(ALL);
  };

  return {
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
  };
}

export { ALL as ACTIVITY_ALL };
export type { TimeGroup };
export default useGitActivity;
