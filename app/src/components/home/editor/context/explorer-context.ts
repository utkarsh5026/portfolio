import { createContext, useContext } from "react";

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

interface UseEditorReturnType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  explorerOpen: boolean;
  setExplorerOpen: (open: boolean) => void;
  loadingSection: boolean;
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
