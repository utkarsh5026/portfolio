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

/** Pending batch of registrations/unregistrations, flushed via microtask. */
let pendingRegistrations: OutlineItem[] = [];
let pendingUnregistrations: string[] = [];
let flushScheduled = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flushPending = (
  set: (fn: (state: OutlineStore) => Partial<OutlineStore>) => void
) => {
  if (flushScheduled) return;
  flushScheduled = true;
  queueMicrotask(() => {
    const toAdd = pendingRegistrations;
    const toRemove = pendingUnregistrations;
    pendingRegistrations = [];
    pendingUnregistrations = [];
    flushScheduled = false;
    set((state) => {
      const next = new Map(state.items);
      for (const item of toAdd) next.set(item.id, item);
      for (const id of toRemove) next.delete(id);
      return { items: next };
    });
  });
};

const useOutlineStore = create<OutlineStore>((set) => ({
  items: new Map(),
  activeSection: null,
  activeHighlightId: null,

  register: (item) => {
    pendingRegistrations.push(item);
    flushPending(set);
  },

  unregister: (id) => {
    pendingUnregistrations.push(id);
    flushPending(set);
  },

  setActiveSection: (id) => set({ activeSection: id }),

  highlightNode: (id) => {
    set({ activeHighlightId: id });
    setTimeout(() => set({ activeHighlightId: null }), 1000);
  },
}));

export default useOutlineStore;
