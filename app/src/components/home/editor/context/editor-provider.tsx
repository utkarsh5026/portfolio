import React, { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useEditorStore } from "./editor-store";

interface ProviderProps {
  children: ReactNode;
}

/**
 * EditorProvider
 *
 * Thin shell — the Zustand store owns all state.
 * This component only handles:
 *   1. URL ↔ tab synchronisation (browser back/forward)
 *   2. Global keyboard shortcuts
 */
export const EditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const location = useLocation();

  const syncRoute = useEditorStore((s) => s.syncRoute);
  const setExplorerOpen = useEditorStore((s) => s.setExplorerOpen);
  const explorerOpen = useEditorStore((s) => s.explorerOpen);
  const setTerminalOpen = useEditorStore((s) => s.setTerminalOpen);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);

  // Sync URL → tabs on browser back/forward
  useEffect(() => {
    syncRoute(location.pathname);
  }, [location.pathname, syncRoute]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "\\" ||
        (e.key.toLowerCase() === "e" && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        setExplorerOpen(!explorerOpen);
      } else if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [explorerOpen, terminalOpen, setExplorerOpen, setTerminalOpen]);

  return <>{children}</>;
};
