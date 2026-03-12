import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import useProjectStore from "@/store/projects/projects-store";
import { getProjectSlug } from "@/utils/project-slug";

import { useEditorStore } from "./editor-store";

/**
 * Handles the three side-effect responsibilities previously owned by EditorProvider:
 *   1. URL ↔ tab synchronization (browser back/forward)
 *   2. Project slug resolution when navigating to /projects/:slug
 *   3. Global keyboard shortcuts (\ / Ctrl+E = explorer, Ctrl+` = terminal)
 */
export function useEditorSync() {
  const location = useLocation();

  const {
    syncRoute,
    resolveProjectSlug,
    pendingProjectSlug,
    setExplorerOpen,
    setTerminalOpen,
  } = useEditorStore(
    useShallow((s) => ({
      syncRoute: s.syncRoute,
      resolveProjectSlug: s.resolveProjectSlug,
      pendingProjectSlug: s.pendingProjectSlug,
      setExplorerOpen: s.setExplorerOpen,
      setTerminalOpen: s.setTerminalOpen,
    }))
  );

  const { projects, fetchProjects, prefetchMarkdown } = useProjectStore(
    useShallow((s) => ({
      projects: s.projects,
      fetchProjects: s.fetchProjects,
      prefetchMarkdown: s.prefetchMarkdown,
    }))
  );

  useEffect(() => {
    syncRoute(location.pathname);
  }, [location.pathname, syncRoute]);

  useEffect(() => {
    if (pendingProjectSlug) {
      fetchProjects();
    }
  }, [pendingProjectSlug, fetchProjects]);

  useEffect(() => {
    if (pendingProjectSlug && projects.length > 0) {
      resolveProjectSlug(projects);
      const match = projects.find(
        (p) => getProjectSlug(p.name) === pendingProjectSlug
      );
      if (match) prefetchMarkdown(match.name);
    }
  }, [pendingProjectSlug, projects, resolveProjectSlug, prefetchMarkdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "\\" ||
        (e.key.toLowerCase() === "e" && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        const { explorerOpen: current } = useEditorStore.getState();
        setExplorerOpen(!current);
      } else if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const { terminalOpen: current } = useEditorStore.getState();
        setTerminalOpen(!current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setExplorerOpen, setTerminalOpen]);
}
