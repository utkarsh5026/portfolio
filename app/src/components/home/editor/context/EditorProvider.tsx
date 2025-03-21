import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  EditorContext,
  NotificationType,
  Notification,
  SectionType,
} from "./explorerContext";

const loadingTexts = [
  "Importing dependencies...",
  "Compiling components...",
  "Initializing state...",
  "Setting up environment...",
  "Loading configuration...",
  "Optimizing render cycle...",
  "Running prettier...",
  "Checking for TypeScript errors...",
  "Resolving circular dependencies...",
  "Parsing JSX...",
];

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
  const [loadingText, setLoadingText] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const addNotification = useCallback(
    (type: NotificationType, message: string) => {
      const id = Math.random().toString(36).substring(2, 10);
      setNotifications((prev) => [...prev, { id, type, message }]);

      // Auto remove after 4 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    },
    []
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

  // Simulates loading state when changing sections
  useEffect(() => {
    if (activeSection) {
      setLoadingSection(true);
      const loadingInterval = setInterval(() => {
        setLoadingText(
          loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
        );
      }, 200);

      // Simulate a loading delay
      const timeoutId = setTimeout(() => {
        clearInterval(loadingInterval);
        setLoadingSection(false);

        // Show a notification after loading
        addNotification("info", `Section ${activeSection} loaded successfully`);
      }, 1200);

      // Proper cleanup to handle rapid section changes
      return () => {
        clearInterval(loadingInterval);
        clearTimeout(timeoutId);
      };
    }
  }, [activeSection, addNotification]);

  useEffect(() => {
    const cleanup = handleKeyyDownEvents();
    return () => cleanup();
  }, [handleKeyyDownEvents]);

  const getNotificationIcon = useCallback((type: NotificationType) => {
    switch (type) {
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "success":
        return "success";
      default:
        return "info";
    }
  }, []);

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
      loadingText,
      notifications,
      files,
      loadingTexts,
      terminalOpen,
      setTerminalOpen,
      setActiveSection,
      setMobileMenuOpen,
      setExplorerOpen,
      addNotification,
      getNotificationIcon,
    }),
    [
      activeSection,
      mobileMenuOpen,
      explorerOpen,
      loadingSection,
      loadingText,
      notifications,
      files,
      setActiveSection,
      setMobileMenuOpen,
      setExplorerOpen,
      addNotification,
      getNotificationIcon,
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
