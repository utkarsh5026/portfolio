/**
 * Focused editor action hooks — replace the old useEditorContext shim.
 *
 * useSectionNav   — router-aware navigation: setActiveSection, openProject, closeProject
 * useTabActions   — router-aware tab management: openTab, closeTab, close variants
 * useEditorToggles — pure store toggles: setExplorerOpen, setTerminalOpen, setMobileMenuOpen
 *
 * For reading state, use useEditorStore selectors directly:
 *   useEditorStore((s) => s.openTabs)
 *   useEditorStore(selectActiveSection)
 *   useEditorStore(selectActiveProjectId)
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import {
  type SectionType,
  type Tab,
  useEditorStore,
} from "@/components/home/editor/context/editor-store";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { _setActiveSection, _openProject, _closeProject } = useEditorStore(
    useShallow((s) => ({
      _setActiveSection: s.setActiveSection,
      _openProject: s.openProject,
      _closeProject: s.closeProject,
    }))
  );

  return {
    setActiveSection: (section: SectionType) =>
      _setActiveSection(section, navigate, pathname),
    openProject: (project: Project) => {
      _openProject(project, navigate, pathname);
      useProjectStore.getState().prefetchMarkdown(project.name);
    },
    closeProject: (projectId: string) => _closeProject(projectId, navigate),
  };
}

export function useTabActions() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    openTab,
    closeTab,
    closeAllTabs,
    closeTabsToLeft,
    closeTabsToRight,
    closeAllProjects,
  } = useEditorStore(
    useShallow((s) => ({
      openTab: s.openTab,
      closeTab: s.closeTab,
      closeAllTabs: s.closeAllTabs,
      closeTabsToLeft: s.closeTabsToLeft,
      closeTabsToRight: s.closeTabsToRight,
      closeAllProjects: s.closeAllProjects,
    }))
  );

  return {
    openTab: (tab: Tab) => openTab(tab, navigate, pathname),
    closeTab: (id: string) => closeTab(id, navigate),
    closeAllTabs: () => closeAllTabs(navigate),
    closeTabsToLeft: (id: string) => closeTabsToLeft(id, navigate),
    closeTabsToRight: (id: string) => closeTabsToRight(id, navigate),
    closeAllProjects: () => closeAllProjects(navigate),
  };
}

export function useEditorToggles() {
  return useEditorStore(
    useShallow((s) => ({
      setExplorerOpen: s.setExplorerOpen,
      setTerminalOpen: s.setTerminalOpen,
      setMobileMenuOpen: s.setMobileMenuOpen,
      setActiveProjectId: s.setActiveProjectId,
    }))
  );
}
