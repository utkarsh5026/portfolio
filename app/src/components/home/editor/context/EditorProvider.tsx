import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { EditorContext, SectionType } from "./explorerContext";

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

interface ProviderProps {
  children: ReactNode;
}

/**
 * EditorProvider Component
 *
 * This component is a provider for the editor context. It manages the state and functionality of the editor.
 * It utilizes React's context API to provide the editor state and functions to its children.
 *
 * The component includes:
 * - State for the active section, mobile menu open status, explorer open status, loading section status, loading text, notifications, and terminal open status.
 * - Functions to add notifications, handle key down events, and get notification icons.
 * - Data for the files and loading texts used in the editor.
 *
 * Usage:
 * <EditorProvider>
 *   ...children
 * </EditorProvider>
 *
 * Note: Ensure that the 'sections' array is defined and contains the relevant data.
 */
export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] =
    useState<(typeof sections)[number]>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [loadingSection, setLoadingSection] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleKeyyDownEvents = useCallback(() => {
    const toggleExplorer = () => {
      setExplorerOpen((prev) => !prev);
    };

    const toggleTerminal = () => {
      setTerminalOpen((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "\\" ||
        (e.key.toLowerCase() === "e" && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        toggleExplorer();
      } else if (e.key.toLowerCase() === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Simulates loading state when changing sections
  useEffect(() => {
    if (activeSection) {
      setLoadingSection(true);

      const timeoutId = setTimeout(() => {
        setLoadingSection(false);
      }, 3200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [activeSection]);

  useEffect(() => {
    const cleanup = handleKeyyDownEvents();
    return () => cleanup();
  }, [handleKeyyDownEvents]);

  const files = useMemo(
    () => [
      { name: "home.tsx", section: "home" as SectionType },
      { name: "about.md", section: "about" as SectionType },
      { name: "skills.json", section: "skills" as SectionType },
      { name: "projects.jsx", section: "projects" as SectionType },
      { name: "experience.log", section: "experience" as SectionType },
      { name: "contact.ts", section: "contact" as SectionType },
      { name: "learning.tsx", section: "learning" as SectionType },
      { name: "articles.md", section: "articles" as SectionType },
    ],
    []
  );

  const editorValue = useMemo(
    () => ({
      activeSection,
      mobileMenuOpen,
      explorerOpen,
      loadingSection,
      files,
      terminalOpen,
      setTerminalOpen,
      setActiveSection,
      setMobileMenuOpen,
      setExplorerOpen,
    }),
    [
      activeSection,
      mobileMenuOpen,
      explorerOpen,
      loadingSection,
      files,
      setActiveSection,
      setMobileMenuOpen,
      setExplorerOpen,
      terminalOpen,
      setTerminalOpen,
    ]
  );

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};
