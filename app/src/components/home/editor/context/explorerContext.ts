import { createContext, useContext } from "react";

export type NotificationType = "info" | "warning" | "error" | "success";
export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
};

const sections = [
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
  // State
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  explorerOpen: boolean;
  setExplorerOpen: (open: boolean) => void;
  loadingSection: boolean;
  loadingText: string;
  notifications: Notification[];

  // Functions
  addNotification: (type: NotificationType, message: string) => void;
  getNotificationIcon: (type: NotificationType) => string;

  // Data
  files: { name: string; section: SectionType }[];
  loadingTexts: string[];
}

// Create context with the type from useEditor hook
export const EditorContext = createContext<UseEditorReturnType | undefined>(
  undefined
);

// Custom hook to use the editor context
export function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
}
