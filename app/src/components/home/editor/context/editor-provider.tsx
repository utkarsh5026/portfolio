import React, { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useProjectStore from "@/store/projects/projects-store";
import { getProjectSlug } from "@/utils/project-slug";

import { useEditorStore } from "./editor-store";

interface ProviderProps {
  children: ReactNode;
}

/**
 * EditorProvider
 *
 * Thin shell — the Zustand store owns all state.
 * This component only handles:
 *   1. URL ↔ tab synchronization (browser back/forward)
 *   2. Global keyboard shortcuts
 */
export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const location = useLocation();

  const syncRoute = useEditorStore((s) => s.syncRoute);
  const resolveProjectSlug = useEditorStore((s) => s.resolveProjectSlug);
  const pendingProjectSlug = useEditorStore((s) => s.pendingProjectSlug);
  const setExplorerOpen = useEditorStore((s) => s.setExplorerOpen);
  const explorerOpen = useEditorStore((s) => s.explorerOpen);
  const setTerminalOpen = useEditorStore((s) => s.setTerminalOpen);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);

  // Project store — needed to fetch + open project tabs from the deep-link URL
  const projects = useProjectStore((s) => s.projects);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const prefetchMarkdown = useProjectStore((s) => s.prefetchMarkdown);

  // Sync URL → tabs on browser back/forward
  useEffect(() => {
    syncRoute(location.pathname);
  }, [location.pathname, syncRoute]);

  // When a pending project slug is set, make sure projects are fetched
  useEffect(() => {
    if (pendingProjectSlug) {
      fetchProjects();
    }
  }, [pendingProjectSlug, fetchProjects]);

  // Once projects are available, resolve the pending slug into an open tab
  useEffect(() => {
    if (pendingProjectSlug && projects.length > 0) {
      resolveProjectSlug(projects);
      // Also kick off markdown prefetch for the deep-dive tab
      const match = projects.find(
        (p) => getProjectSlug(p.name) === pendingProjectSlug,
      );
      if (match) prefetchMarkdown(match.name);
    }
  }, [pendingProjectSlug, projects, resolveProjectSlug, prefetchMarkdown]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "\\" ||
        (e.key.toLowerCase() === "e" && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        setExplorerOpen(!explorerOpen);
      } else if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [explorerOpen, terminalOpen, setExplorerOpen, setTerminalOpen]);

  return <>{children}</>;
};
