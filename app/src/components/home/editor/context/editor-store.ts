import type { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Project } from "@/types";
import {
  getProjectFileName,
  getProjectPath,
  getProjectSlug,
  getProjectSlugFromPath,
} from "@/utils/project-slug";

export {
  getProjectFileName,
  getProjectPath,
  getProjectSlug,
  getProjectSlugFromPath,
};

export const sections = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "learning",
  "articles",
  "resume",
] as const;

export type SectionType = (typeof sections)[number];

export type SectionTab = {
  type: "section";
  id: SectionType;
  fileName: string;
};

export type ProjectTab = {
  type: "project";
  id: string;
  fileName: string;
  project: Project;
};

export type Tab = SectionTab | ProjectTab;

/** Kept for backward compat */
export type OpenProjectTab = {
  projectId: string;
  fileName: string;
  project: Project;
};

export const getSectionPath = (section: SectionType) =>
  section === "home" ? "/" : `/${section}`;

export const getSectionFromPath = (pathname: string): SectionType => {
  const s = pathname.replace(/^\//, "") || "home";
  return sections.includes(s as SectionType) ? (s as SectionType) : "home";
};

const makeSectionTab = (section: SectionType): SectionTab => ({
  type: "section",
  id: section,
  fileName: section === "resume" ? "resume.pdf" : `${section}.ts`,
});

const makeHomeTab = (): SectionTab => makeSectionTab("home");

const addTabIfMissing = (tabs: Tab[], tab: Tab): Tab[] =>
  tabs.some((t) => t.id === tab.id) ? tabs : [...tabs, tab];

/**
 * After slicing `openTabs` down to `next`, picks the new activeTabId and
 * navigates if the previously-active tab was removed.
 */
const resolveActiveAfterRemoval = (
  next: Tab[],
  currentActiveId: string,
  fallbackTab: Tab,
  navigate: NavigateFunction
): { openTabs: Tab[]; activeTabId: string } => {
  const activeStillOpen = next.some((t) => t.id === currentActiveId);
  if (!activeStillOpen && fallbackTab.type === "section") {
    navigate(getSectionPath(fallbackTab.id), { replace: false });
  }
  return {
    openTabs: next,
    activeTabId: activeStillOpen ? currentActiveId : fallbackTab.id,
  };
};

export const editorFiles: { name: string; section: SectionType }[] = [
  { name: "home.ts", section: "home" },
  { name: "about.ts", section: "about" },
  { name: "skills.ts", section: "skills" },
  { name: "projects.ts", section: "projects" },
  { name: "experience.ts", section: "experience" },
  { name: "contact.ts", section: "contact" },
  { name: "learning.ts", section: "learning" },
  { name: "articles.ts", section: "articles" },
  { name: "resume.pdf", section: "resume" },
];

export interface EditorState {
  openTabs: Tab[];
  activeTabId: string;
  mobileMenuOpen: boolean;
  explorerOpen: boolean;
  terminalOpen: boolean;
  /** Slug from /projects/:slug that needs to be resolved once projects load. */
  pendingProjectSlug: string | null;
}

export interface EditorActions {
  openTab: (tab: Tab, navigate: NavigateFunction, currentPath: string) => void;
  closeTab: (id: string, navigate: NavigateFunction) => void;
  /** Close every open tab and navigate home. */
  closeAllTabs: (navigate: NavigateFunction) => void;
  /** Close all tabs to the left of the given tab id. */
  closeTabsToLeft: (id: string, navigate: NavigateFunction) => void;
  /** Close all tabs to the right of the given tab id. */
  closeTabsToRight: (id: string, navigate: NavigateFunction) => void;
  /** Close all project (non-section) tabs. */
  closeAllProjects: (navigate: NavigateFunction) => void;
  /** Call on location.pathname change to keep URL ↔ tabs in sync. */
  syncRoute: (pathname: string) => void;

  setActiveSection: (
    section: SectionType,
    navigate: NavigateFunction,
    currentPath: string
  ) => void;
  openProject: (
    project: Project,
    navigate: NavigateFunction,
    currentPath: string
  ) => void;
  closeProject: (projectId: string, navigate: NavigateFunction) => void;
  setActiveProjectId: (id: string | null) => void;

  setMobileMenuOpen: (open: boolean) => void;
  setExplorerOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
  /**
   * Called by EditorProvider once projects have loaded.
   * Resolves any pendingProjectSlug into an open project tab.
   */
  resolveProjectSlug: (projects: Project[]) => void;
}

export type EditorStore = EditorState & EditorActions;

const initialSection: SectionType =
  typeof window !== "undefined"
    ? getSectionFromPath(window.location.pathname)
    : "home";

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      openTabs: [makeSectionTab(initialSection)],
      activeTabId: initialSection,
      mobileMenuOpen: false,
      explorerOpen: true,
      terminalOpen: false,
      pendingProjectSlug: getProjectSlugFromPath(
        typeof window !== "undefined" ? window.location.pathname : "/"
      ),

      openTab: (tab, navigate, currentPath) => {
        set((state) => ({
          openTabs: addTabIfMissing(state.openTabs, tab),
          activeTabId: tab.id,
        }));
        if (tab.type === "section") {
          const path = getSectionPath(tab.id);
          if (currentPath !== path) navigate(path, { replace: false });
        } else if (tab.type === "project") {
          const path = getProjectPath(tab.id);
          if (currentPath !== path) navigate(path, { replace: false });
        }
      },

      closeTab: (id, navigate) => {
        set((state) => {
          const idx = state.openTabs.findIndex((t) => t.id === id);
          if (idx === -1) return state;

          const next = state.openTabs.filter((t) => t.id !== id);
          let nextActiveId = state.activeTabId;

          if (state.activeTabId === id) {
            const nextTab = next[idx] ?? next[idx - 1] ?? next[0] ?? null;
            if (nextTab) {
              nextActiveId = nextTab.id;
              if (nextTab.type === "section") {
                navigate(getSectionPath(nextTab.id), { replace: false });
              }
            }
          }

          return { openTabs: next, activeTabId: nextActiveId };
        });
      },

      syncRoute: (pathname) => {
        const projectSlug = getProjectSlugFromPath(pathname);

        if (projectSlug) {
          set({ pendingProjectSlug: projectSlug });
          return;
        }

        set({ pendingProjectSlug: null });

        const section = getSectionFromPath(pathname);
        set((state) => ({
          openTabs: addTabIfMissing(state.openTabs, makeSectionTab(section)),
          activeTabId: section,
        }));
      },

      setActiveSection: (section, navigate, currentPath) => {
        get().openTab(makeSectionTab(section), navigate, currentPath);
      },

      openProject: (project, navigate, currentPath) => {
        const fileName = getProjectFileName(project.name);
        get().openTab(
          { type: "project", id: project.name, fileName, project },
          navigate,
          currentPath
        );
      },

      closeProject: (projectId, navigate) => {
        get().closeTab(projectId, navigate);
      },

      closeAllTabs: (navigate) => {
        navigate("/", { replace: false });
        set({ openTabs: [makeHomeTab()], activeTabId: "home" });
      },

      closeTabsToLeft: (id, navigate) => {
        set((state) => {
          const idx = state.openTabs.findIndex((t) => t.id === id);
          if (idx <= 0) return state;
          const next = state.openTabs.slice(idx);
          return resolveActiveAfterRemoval(
            next,
            state.activeTabId,
            next[0],
            navigate
          );
        });
      },

      closeTabsToRight: (id, navigate) => {
        set((state) => {
          const idx = state.openTabs.findIndex((t) => t.id === id);
          if (idx === -1 || idx === state.openTabs.length - 1) return state;
          const next = state.openTabs.slice(0, idx + 1);
          return resolveActiveAfterRemoval(
            next,
            state.activeTabId,
            next[next.length - 1],
            navigate
          );
        });
      },

      closeAllProjects: (navigate) => {
        set((state) => {
          const next = state.openTabs.filter((t) => t.type !== "project");
          if (next.length === state.openTabs.length) return state;
          const safeNext = next.length > 0 ? next : [makeHomeTab()];
          return resolveActiveAfterRemoval(
            safeNext,
            state.activeTabId,
            safeNext[0],
            navigate
          );
        });
      },

      setActiveProjectId: (id) => {
        if (id !== null) set({ activeTabId: id });
      },

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setExplorerOpen: (open) => set({ explorerOpen: open }),
      setTerminalOpen: (open) => set({ terminalOpen: open }),

      resolveProjectSlug: (projects) => {
        const { pendingProjectSlug } = get();
        if (!pendingProjectSlug) return;
        const match = projects.find(
          (p) => getProjectSlug(p.name) === pendingProjectSlug
        );
        if (!match) return;
        const fileName = getProjectFileName(match.name);
        set((state) => ({
          openTabs: addTabIfMissing(state.openTabs, {
            type: "project",
            id: match.name,
            fileName,
            project: match,
          }),
          activeTabId: match.name,
          pendingProjectSlug: null,
        }));
      },
    }),
    {
      name: "portfolio-editor-v1", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openTabs: state.openTabs,
        activeTabId: state.activeTabId,
        explorerOpen: state.explorerOpen,
        terminalOpen: state.terminalOpen,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<EditorStore>;
        const validTabs = Array.isArray(persisted.openTabs)
          ? persisted.openTabs.filter(
              (t) =>
                t &&
                typeof t === "object" &&
                "id" in t &&
                "type" in t &&
                "fileName" in t
            )
          : null;

        return {
          ...currentState,
          ...(validTabs && validTabs.length > 0
            ? {
                openTabs: validTabs,
                activeTabId:
                  persisted.activeTabId ??
                  validTabs[0]?.id ??
                  currentState.activeTabId,
              }
            : {}),
          explorerOpen: persisted.explorerOpen ?? currentState.explorerOpen,
          terminalOpen: persisted.terminalOpen ?? currentState.terminalOpen,
        };
      },
    }
  )
);

export const useActiveTab = () =>
  useEditorStore(
    ({ openTabs, activeTabId }) =>
      openTabs.find((t) => t.id === activeTabId) ?? null
  );

export const useActiveSection = () =>
  useEditorStore(({ openTabs, activeTabId }) => {
    const activeTab = openTabs.find((t) => t.id === activeTabId);

    if (activeTab?.type === "section") return activeTab.id;
    for (let i = openTabs.length - 1; i >= 0; i--) {
      if (openTabs[i].type === "section") return (openTabs[i] as SectionTab).id;
    }

    return "home";
  });

export const useActiveProjectId = () =>
  useEditorStore(({ openTabs, activeTabId }) => {
    const activeTab = openTabs.find((t) => t.id === activeTabId);
    if (activeTab === undefined) return null;

    return activeTab?.type === "project" ? activeTab.id : null;
  });
