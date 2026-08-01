import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * "editor" is the full VS Code style portfolio experience.
 * "simple" is the single page, skim friendly version aimed at recruiters.
 */
export type ViewMode = "editor" | "simple";

interface ViewModeState {
  mode: ViewMode;
  /** True once the visitor has noticed the simple-view button. */
  hintSeen: boolean;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
  markHintSeen: () => void;
}

const useViewModeStore = create<ViewModeState>()(
  persist(
    (set, get) => ({
      mode: "editor",
      hintSeen: false,
      setMode: (mode) => set({ mode, hintSeen: true }),
      toggleMode: () =>
        set({ mode: get().mode === "editor" ? "simple" : "editor" }),
      markHintSeen: () => set({ hintSeen: true }),
    }),
    { name: "portfolio-view-mode" }
  )
);

export default useViewModeStore;
