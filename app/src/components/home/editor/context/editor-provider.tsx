import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EditorContext, SectionType, sections } from "./explorer-context";

interface ProviderProps {
  children: ReactNode;
}

export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse section from URL hash
  const getSectionFromPath = useCallback((pathname: string): SectionType => {
    const section = pathname.replace(/^\//, "") || "home";
    return sections.includes(section as SectionType)
      ? (section as SectionType)
      : "home";
  }, []);

  const [activeSection, setActiveSection] = useState<SectionType>(() =>
    getSectionFromPath(location.pathname)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Sync URL with active section
  useEffect(() => {
    const section = getSectionFromPath(location.pathname);
    if (section !== activeSection) {
      setActiveSection(section);
    }
  }, [location.pathname, getSectionFromPath, activeSection]);

  // Custom setActiveSection that also updates URL
  const handleSetActiveSection = useCallback(
    (section: SectionType) => {
      setActiveSection(section);
      const path = section === "home" ? "/" : `/${section}`;
      if (location.pathname !== path) {
        navigate(path, { replace: false });
      }
    },
    [navigate, location.pathname]
  );

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
      setActiveSection: handleSetActiveSection,
      setMobileMenuOpen,
      setExplorerOpen,
    }),
    [
      activeSection,
      mobileMenuOpen,
      explorerOpen,
      files,
      handleSetActiveSection,
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
