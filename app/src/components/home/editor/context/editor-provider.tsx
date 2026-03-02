import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EditorContext,
  SectionType,
  sections,
  Tab,
  SectionTab,
} from "./explorer-context";
import type { Project } from "@/types";

interface ProviderProps {
  children: ReactNode;
}

const getProjectFileName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".md";

const getSectionPath = (section: SectionType) =>
  section === "home" ? "/" : `/${section}`;

export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSectionFromPath = useCallback((pathname: string): SectionType => {
    const section = pathname.replace(/^\//, "") || "home";
    return sections.includes(section as SectionType)
      ? (section as SectionType)
      : "home";
  }, []);

  const initialSection = getSectionFromPath(location.pathname);

  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { type: "section", id: initialSection, fileName: `${initialSection}.md` },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(initialSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Sync URL → tab when the user navigates back/forward
  useEffect(() => {
    const section = getSectionFromPath(location.pathname);
    setOpenTabs((prev) => {
      if (prev.some((t) => t.id === section)) return prev;
      return [
        ...prev,
        { type: "section" as const, id: section, fileName: `${section}.md` },
      ];
    });
    setActiveTabId(section);
  }, [location.pathname, getSectionFromPath]);

  // ── Core tab actions ──────────────────────────────────────────────────────

  const openTab = useCallback(
    (tab: Tab) => {
      setOpenTabs((prev) => {
        if (prev.some((t) => t.id === tab.id)) return prev;
        return [...prev, tab];
      });
      setActiveTabId(tab.id);
      if (tab.type === "section") {
        const path = getSectionPath(tab.id);
        if (location.pathname !== path) navigate(path, { replace: false });
      }
    },
    [navigate, location.pathname],
  );

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => {
        const idx = prev.findIndex((t) => t.id === id);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.id !== id);

        setActiveTabId((current) => {
          if (current !== id) return current;
          // Pick the tab to the right, then left, then whatever's left
          const nextTab = next[idx] ?? next[idx - 1] ?? next[0] ?? null;
          if (nextTab) {
            if (nextTab.type === "section") {
              navigate(getSectionPath(nextTab.id), { replace: false });
            }
            return nextTab.id;
          }
          return current;
        });

        return next;
      });
    },
    [navigate],
  );

  // ── Derived state (backward compat for CodeContent, StatusBar, Explorer) ──

  const activeTab = useMemo(
    () => openTabs.find((t) => t.id === activeTabId) ?? null,
    [openTabs, activeTabId],
  );

  const activeSection: SectionType = useMemo(() => {
    if (activeTab?.type === "section") return activeTab.id;
    // Fall back to the last open section tab
    for (let i = openTabs.length - 1; i >= 0; i--) {
      if (openTabs[i].type === "section") return (openTabs[i] as SectionTab).id;
    }
    return "home";
  }, [activeTab, openTabs]);

  const activeProjectId: string | null =
    activeTab?.type === "project" ? activeTab.id : null;

  // ── Backward-compat wrappers ──────────────────────────────────────────────

  const setActiveSection = useCallback(
    (section: SectionType) => {
      openTab({ type: "section", id: section, fileName: `${section}.md` });
    },
    [openTab],
  );

  const openProject = useCallback(
    (project: Project) => {
      const fileName = getProjectFileName(project.name);
      openTab({ type: "project", id: project.name, fileName, project });
    },
    [openTab],
  );

  const closeProject = useCallback(
    (projectId: string) => {
      closeTab(projectId);
    },
    [closeTab],
  );

  const setActiveProjectId = useCallback((id: string | null) => {
    if (id !== null) setActiveTabId(id);
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "\\" ||
        (e.key.toLowerCase() === "e" && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        setExplorerOpen((prev) => !prev);
      } else if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Static data ───────────────────────────────────────────────────────────

  const files = useMemo(
    () => [
      { name: "home.md", section: "home" as SectionType },
      { name: "about.md", section: "about" as SectionType },
      { name: "skills.md", section: "skills" as SectionType },
      { name: "projects.md", section: "projects" as SectionType },
      { name: "experience.md", section: "experience" as SectionType },
      { name: "contact.md", section: "contact" as SectionType },
      { name: "learning.md", section: "learning" as SectionType },
      { name: "articles.md", section: "articles" as SectionType },
    ],
    [],
  );

  const editorValue = useMemo(
    () => ({
      // Unified tabs
      openTabs,
      activeTabId,
      openTab,
      closeTab,
      // Derived
      activeSection,
      activeProjectId,
      setActiveSection,
      openProject,
      closeProject,
      setActiveProjectId,
      // Other state
      mobileMenuOpen,
      explorerOpen,
      files,
      terminalOpen,
      setTerminalOpen,
      setMobileMenuOpen,
      setExplorerOpen,
    }),
    [
      openTabs,
      activeTabId,
      openTab,
      closeTab,
      activeSection,
      activeProjectId,
      setActiveSection,
      openProject,
      closeProject,
      setActiveProjectId,
      mobileMenuOpen,
      explorerOpen,
      files,
      terminalOpen,
    ],
  );

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};
