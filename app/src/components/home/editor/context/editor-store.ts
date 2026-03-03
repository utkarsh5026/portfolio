import { create } from "zustand";
import type { NavigateFunction } from "react-router-dom";
import type { Project } from "@/types";

// ── Types (single source of truth) ───────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Static data ───────────────────────────────────────────────────────────────

export const editorFiles: { name: string; section: SectionType }[] = [
  { name: "home.md", section: "home" },
  { name: "about.md", section: "about" },
  { name: "skills.md", section: "skills" },
  { name: "projects.md", section: "projects" },
  { name: "experience.md", section: "experience" },
  { name: "contact.md", section: "contact" },
  { name: "learning.md", section: "learning" },
  { name: "articles.md", section: "articles" },
];

// ── Store interface ───────────────────────────────────────────────────────────

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
  /** Call on location.pathname change to keep URL ↔ tabs in sync. */
  syncRoute: (pathname: string) => void;

  // ── Backward-compat helpers ───────────────────────────────────────────────
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

  // ── UI toggles ────────────────────────────────────────────────────────────
  setMobileMenuOpen: (open: boolean) => void;
  setExplorerOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
}

export type EditorStore = EditorState & EditorActions;

// ── Initial state ─────────────────────────────────────────────────────────────

const initialSection: SectionType =
  typeof window !== "undefined"
    ? getSectionFromPath(window.location.pathname)
    : "home";

// ── Store ─────────────────────────────────────────────────────────────────────

export const useEditorStore = create<EditorStore>((set, get) => ({
  // ── Initial state ─────────────────────────────────────────────────────────
  openTabs: [
    {
      type: "section",
      id: initialSection,
      fileName: `${initialSection}.md`,
    },
  ],
  activeTabId: initialSection,
  mobileMenuOpen: false,
  explorerOpen: true,
  terminalOpen: false,

  // ── Tab actions ───────────────────────────────────────────────────────────

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
              fileName: `${section}.md`,
            },
          ],
      activeTabId: section,
    }));
  },

  // ── Backward-compat helpers ───────────────────────────────────────────────

  setActiveSection: (section, navigate, currentPath) => {
    get().openTab(
      { type: "section", id: section, fileName: `${section}.md` },
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

  setActiveProjectId: (id) => {
    if (id !== null) set({ activeTabId: id });
  },

  // ── UI toggles ────────────────────────────────────────────────────────────

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setExplorerOpen: (open) => set({ explorerOpen: open }),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
}));

// ── Derived selectors ─────────────────────────────────────────────────────────

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
