import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useViewModeStore, { type ViewMode } from "@/store/view-mode-store";

/**
 * Switches view mode and, when the visitor deep-linked to /simple, moves them
 * off that route so the URL doesn't force the simple view straight back.
 */
export const useViewSwitch = () => {
  const setMode = useViewModeStore((s) => s.setMode);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (mode: ViewMode) => {
      setMode(mode);
      if (mode === "editor" && pathname === "/simple") navigate("/");
    },
    [setMode, navigate, pathname]
  );
};

export default useViewSwitch;
