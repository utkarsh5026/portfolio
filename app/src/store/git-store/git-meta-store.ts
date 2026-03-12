import { create } from "zustand";

export interface DiffStat {
  added: number;
  deleted: number;
}

export interface ComponentMeta {
  name: string;
  section: string;
  file: string;
  lines: [number, number];
  hash: string;
  shortHash: string;
  author: string;
  date: string | null;
  message: string;
  diffStat?: DiffStat;
}

export interface AuthorMeta {
  github: string;
  avatar: string;
}

export interface GitMetaJson {
  generatedAt: string;
  authors: Record<string, AuthorMeta>;
  components: Record<string, ComponentMeta>;
}

interface GitMetaState {
  meta: GitMetaJson | null;
  loading: boolean;

  fetchGitMeta: () => Promise<void>;
  getByComponent: (name: string) => ComponentMeta | null;
  getBySection: (sectionId: string) => ComponentMeta | null;
  getAuthor: (authorName: string) => AuthorMeta | null;
}

const useGitMetaStore = create<GitMetaState>((set, get) => ({
  meta: null,
  loading: false,

  fetchGitMeta: async () => {
    if (get().meta !== null || get().loading) return;

    set({ loading: true });

    try {
      const data: GitMetaJson = await fetch("/data/git-meta.json").then((r) =>
        r.json()
      );
      // Inject the component name as a field so callers don't need the key
      Object.entries(data.components).forEach(([name, meta]) => {
        meta.name = name;
      });
      set({ meta: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  getByComponent: (name) => get().meta?.components[name] ?? null,

  getBySection: (sectionId) => {
    const meta = get().meta;
    if (!meta) return null;
    const matches = Object.values(meta.components).filter(
      (c) => c.section === sectionId
    );
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0];

    const normalized = sectionId.toLowerCase();
    const score = (c: ComponentMeta) => {
      const name = c.name.toLowerCase();
      if (name === normalized) return 3;
      if (name.startsWith(normalized) || name.endsWith(normalized)) return 2;
      if (name.includes(normalized)) return 1;
      return 0;
    };

    return matches.reduce((best, c) => {
      const scoreDiff = score(c) - score(best);
      if (scoreDiff !== 0) return scoreDiff > 0 ? c : best;
      return c.lines[1] - c.lines[0] > best.lines[1] - best.lines[0] ? c : best;
    });
  },

  getAuthor: (authorName) => get().meta?.authors?.[authorName] ?? null,
}));

export default useGitMetaStore;
