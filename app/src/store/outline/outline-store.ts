import type React from "react";
import { create } from "zustand";

import type { AppColor } from "@/lib/ctp-colors";

export interface OutlineItem {
  id: string;
  label: string;
  level: number;
  icon?: React.ReactNode;
  iconColor?: AppColor;
  parentId: string | null;
}

interface OutlineStore {
  items: Map<string, OutlineItem>;
  activeSection: string | null;
  activeHighlightId: string | null;

  register: (item: OutlineItem) => void;
  unregister: (id: string) => void;
  setActiveSection: (id: string | null) => void;
  highlightNode: (id: string) => void;
}

const useOutlineStore = create<OutlineStore>((set) => ({
  items: new Map(),
  activeSection: null,
  activeHighlightId: null,

  register: (item) =>
    set((state) => {
      const next = new Map(state.items);
      next.set(item.id, item);
      return { items: next };
    }),

  unregister: (id) =>
    set((state) => {
      const next = new Map(state.items);
      next.delete(id);
      return { items: next };
    }),

  setActiveSection: (id) => set({ activeSection: id }),

  highlightNode: (id) => {
    set({ activeHighlightId: id });
    setTimeout(() => set({ activeHighlightId: null }), 1000);
  },
}));

export default useOutlineStore;
