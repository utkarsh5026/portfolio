import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CatppuccinFlavor = "latte" | "frappe" | "macchiato" | "mocha";

interface SettingsState {
  gitBlameEnabled: boolean;
  toggleGitBlame: () => void;
  flavor: CatppuccinFlavor;
  setFlavor: (flavor: CatppuccinFlavor) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      gitBlameEnabled: true,
      toggleGitBlame: () => set({ gitBlameEnabled: !get().gitBlameEnabled }),
      flavor: "mocha",
      setFlavor: (flavor) => set({ flavor }),
    }),
    { name: "portfolio-settings" }
  )
);

export default useSettingsStore;
