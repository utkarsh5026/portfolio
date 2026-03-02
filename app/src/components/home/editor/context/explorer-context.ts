import { createContext, useContext } from "react";
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

// Unified tab types
export type SectionTab = {
  type: "section";
  id: SectionType;
  fileName: string;
};

export type ProjectTab = {
  type: "project";
  id: string; // project.name (unique key)
  fileName: string; // e.g. "stash-it.md"
  project: Project;
};

export type Tab = SectionTab | ProjectTab;

// Kept for backward compat
export type OpenProjectTab = {
  projectId: string;
  fileName: string;
  project: Project;
};

interface UseEditorReturnType {
  // Unified tab system
  openTabs: Tab[];
  activeTabId: string;
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;

  // Derived (backward compat — other components stay unchanged)
  activeSection: SectionType;
  activeProjectId: string | null;
  setActiveSection: (section: SectionType) => void;
  openProject: (project: Project) => void;
  closeProject: (projectId: string) => void;
  setActiveProjectId: (id: string | null) => void;

  // Other editor state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  explorerOpen: boolean;
  setExplorerOpen: (open: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  files: { name: string; section: SectionType }[];
}

export const EditorContext = createContext<UseEditorReturnType | undefined>(
  undefined
);

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
}
