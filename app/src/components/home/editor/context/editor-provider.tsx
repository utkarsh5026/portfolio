import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { EditorContext, SectionType } from "./explorer-context";

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

export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] =
    useState<(typeof sections)[number]>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
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
