import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { NavigateFunction } from "react-router-dom";
import type { Project } from "@/types";

export const sections = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "learning",
  "articles",
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

export const getProjectFileName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".md";

export const getSectionPath = (section: SectionType) =>
  section === "home" ? "/" : `/${section}`;

export const getSectionFromPath = (pathname: string): SectionType => {
  const s = pathname.replace(/^\//, "") || "home";
  return sections.includes(s as SectionType) ? (s as SectionType) : "home";
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
];

export interface EditorState {
  openTabs: Tab[];
  activeTabId: string;
  mobileMenuOpen: boolean;
  explorerOpen: boolean;
  terminalOpen: boolean;
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
    currentPath: string,
  ) => void;
  openProject: (
    project: Project,
    navigate: NavigateFunction,
    currentPath: string,
  ) => void;
  closeProject: (projectId: string, navigate: NavigateFunction) => void;
  setActiveProjectId: (id: string | null) => void;

  setMobileMenuOpen: (open: boolean) => void;
  setExplorerOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
}

export type EditorStore = EditorState & EditorActions;

const initialSection: SectionType =
  typeof window !== "undefined"
    ? getSectionFromPath(window.location.pathname)
    : "home";

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      openTabs: [
        {
          type: "section",
          id: initialSection,
          fileName: `${initialSection}.ts`,
        },
      ],
      activeTabId: initialSection,
      mobileMenuOpen: false,
      explorerOpen: true,
      terminalOpen: false,

      openTab: (tab, navigate, currentPath) => {
        set((state) => ({
          openTabs: state.openTabs.some((t) => t.id === tab.id)
            ? state.openTabs
            : [...state.openTabs, tab],
          activeTabId: tab.id,
        }));
        if (tab.type === "section") {
          const path = getSectionPath(tab.id);
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
        const section = getSectionFromPath(pathname);
        set((state) => ({
          openTabs: state.openTabs.some((t) => t.id === section)
            ? state.openTabs
            : [
                ...state.openTabs,
                {
                  type: "section" as const,
                  id: section,
                  fileName: `${section}.ts`,
                },
              ],
          activeTabId: section,
        }));
      },

      setActiveSection: (section, navigate, currentPath) => {
        get().openTab(
          { type: "section", id: section, fileName: `${section}.ts` },
          navigate,
          currentPath,
        );
      },

      openProject: (project, navigate, currentPath) => {
        const fileName = getProjectFileName(project.name);
        get().openTab(
          { type: "project", id: project.name, fileName, project },
          navigate,
          currentPath,
        );
      },

      closeProject: (projectId, navigate) => {
        get().closeTab(projectId, navigate);
      },

      closeAllTabs: (navigate) => {
        navigate("/", { replace: false });
        set({
          openTabs: [{ type: "section", id: "home", fileName: "home.ts" }],
          activeTabId: "home",
        });
      },

      closeTabsToLeft: (id, navigate) => {
        set((state) => {
          const idx = state.openTabs.findIndex((t) => t.id === id);
          if (idx <= 0) return state;
          const next = state.openTabs.slice(idx);

          const activeStillOpen = next.some((t) => t.id === state.activeTabId);
          let nextActiveId = state.activeTabId;
          if (!activeStillOpen) {
            nextActiveId = next[0].id;
            const pivotTab = next[0];
            if (pivotTab.type === "section")
              navigate(getSectionPath(pivotTab.id), { replace: false });
          }
          return { openTabs: next, activeTabId: nextActiveId };
        });
      },

      closeTabsToRight: (id, navigate) => {
        set((state) => {
          const idx = state.openTabs.findIndex((t) => t.id === id);
          if (idx === -1 || idx === state.openTabs.length - 1) return state;
          const next = state.openTabs.slice(0, idx + 1);
          const activeStillOpen = next.some((t) => t.id === state.activeTabId);
          let nextActiveId = state.activeTabId;
          if (!activeStillOpen) {
            nextActiveId = next[next.length - 1].id;
            const lastTab = next[next.length - 1];
            if (lastTab.type === "section")
              navigate(getSectionPath(lastTab.id), { replace: false });
          }
          return { openTabs: next, activeTabId: nextActiveId };
        });
      },

      closeAllProjects: (navigate) => {
        set((state) => {
          const next = state.openTabs.filter((t) => t.type !== "project");
          if (next.length === state.openTabs.length) return state;
          const activeStillOpen = next.some((t) => t.id === state.activeTabId);
          let nextActiveId = state.activeTabId;
          if (!activeStillOpen) {
            nextActiveId = next[0]?.id ?? "home";
            const fallback = next[0];
            if (fallback?.type === "section")
              navigate(getSectionPath(fallback.id), { replace: false });
          }
          return {
            openTabs:
              next.length > 0
                ? next
                : [{ type: "section", id: "home", fileName: "home.ts" }],
            activeTabId: nextActiveId,
          };
        });
      },

      setActiveProjectId: (id) => {
        if (id !== null) set({ activeTabId: id });
      },

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setExplorerOpen: (open) => set({ explorerOpen: open }),
      setTerminalOpen: (open) => set({ terminalOpen: open }),
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
                "fileName" in t,
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
    },
  ),
);

export const selectActiveTab = (state: EditorStore): Tab | null =>
  state.openTabs.find((t) => t.id === state.activeTabId) ?? null;

export const selectActiveSection = (state: EditorStore): SectionType => {
  const activeTab = selectActiveTab(state);
  if (activeTab?.type === "section") return activeTab.id;
  for (let i = state.openTabs.length - 1; i >= 0; i--) {
    if (state.openTabs[i].type === "section")
      return (state.openTabs[i] as SectionTab).id;
  }
  return "home";
};

export const selectActiveProjectId = (state: EditorStore): string | null => {
  const activeTab = selectActiveTab(state);
  return activeTab?.type === "project" ? activeTab.id : null;
};
