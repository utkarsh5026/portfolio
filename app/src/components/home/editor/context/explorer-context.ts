/**
 * explorer-context.ts
 *
 * Backward-compat shim — all types and store logic now live in editor-store.ts.
 * Consumers that import from this file need zero changes.
 */

import { useLocation, useNavigate } from "react-router-dom";

import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

import {
  editorFiles,
  type SectionType,
  selectActiveProjectId,
  selectActiveSection,
  type Tab,
  useEditorStore,
} from "./editor-store";

// Re-export types for consumers that import them from here
export {
  type OpenProjectTab,
  type ProjectTab,
  sections,
  type SectionTab,
  type SectionType,
  type Tab,
} from "./editor-store";

// ── useEditorContext — identical return shape as before ───────────────────────

export function useEditorContext() {
  const location = useLocation();
  const navigate = useNavigate();

  const openTabs = useEditorStore((s) => s.openTabs);
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const mobileMenuOpen = useEditorStore((s) => s.mobileMenuOpen);
  const explorerOpen = useEditorStore((s) => s.explorerOpen);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);
  const activeSection = useEditorStore(selectActiveSection);
  const activeProjectId = useEditorStore(selectActiveProjectId);

  const _openTab = useEditorStore((s) => s.openTab);
  const _closeTab = useEditorStore((s) => s.closeTab);
  const _closeAllTabs = useEditorStore((s) => s.closeAllTabs);
  const _closeTabsToLeft = useEditorStore((s) => s.closeTabsToLeft);
  const _closeTabsToRight = useEditorStore((s) => s.closeTabsToRight);
  const _closeAllProjects = useEditorStore((s) => s.closeAllProjects);
  const _setActiveSection = useEditorStore((s) => s.setActiveSection);
  const _openProject = useEditorStore((s) => s.openProject);
  const _closeProject = useEditorStore((s) => s.closeProject);
  const setActiveProjectId = useEditorStore((s) => s.setActiveProjectId);
  const setMobileMenuOpen = useEditorStore((s) => s.setMobileMenuOpen);
  const setExplorerOpen = useEditorStore((s) => s.setExplorerOpen);
  const setTerminalOpen = useEditorStore((s) => s.setTerminalOpen);

  return {
    openTabs,
    activeTabId,
    openTab: (tab: Tab) => _openTab(tab, navigate, location.pathname),
    closeTab: (id: string) => _closeTab(id, navigate),
    closeAllTabs: () => _closeAllTabs(navigate),
    closeTabsToLeft: (id: string) => _closeTabsToLeft(id, navigate),
    closeTabsToRight: (id: string) => _closeTabsToRight(id, navigate),
    closeAllProjects: () => _closeAllProjects(navigate),

    activeSection,
    activeProjectId,
    setActiveSection: (section: SectionType) =>
      _setActiveSection(section, navigate, location.pathname),
    openProject: (project: Project) => {
      _openProject(project, navigate, location.pathname);
      useProjectStore.getState().prefetchMarkdown(project.name);
    },
    closeProject: (projectId: string) => _closeProject(projectId, navigate),
    setActiveProjectId,

    mobileMenuOpen,
    setMobileMenuOpen,
    explorerOpen,
    setExplorerOpen,
    terminalOpen,
    setTerminalOpen,
    files: editorFiles,
  };
}
