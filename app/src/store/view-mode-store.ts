import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * "editor" is the full VS Code style portfolio experience.
 * "simple" is the single page, skim friendly version aimed at recruiters.
 */
export type ViewMode = "editor" | "simple";

interface ViewModeState {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

const useViewModeStore = create<ViewModeState>()(
  persist(
    (set, get) => ({
      mode: "editor",
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set({ mode: get().mode === "editor" ? "simple" : "editor" }),
    }),
    { name: "portfolio-view-mode" }
  )
);

export default useViewModeStore;
