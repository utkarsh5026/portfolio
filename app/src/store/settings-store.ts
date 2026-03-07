import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  gitBlameEnabled: boolean;
  toggleGitBlame: () => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      gitBlameEnabled: true,
      toggleGitBlame: () => set({ gitBlameEnabled: !get().gitBlameEnabled }),
    }),
    { name: "portfolio-settings" }
  )
);

export default useSettingsStore;
