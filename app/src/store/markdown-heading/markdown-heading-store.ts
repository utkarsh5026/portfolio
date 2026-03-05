import { create } from "zustand";

export interface HeadingNode {
  level: 1 | 2 | 3;
  text: string;
  id: string;
  children: HeadingNode[];
}

/** Slugify heading text — mirrors the markdown renderer's id generation. */
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Pretty-print an id back to title case (matches breadcrumb label logic). */
export const idToLabel = (id: string): string =>
  id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const HEADING_RE = /^(#{1,3})\s+(.+)$/gm;

/**
 * Parse markdown source into a tree of h1 → h2 → h3 nodes.
 *
 * Only h1, h2, h3 are captured (matching the breadcrumb levels).
 * The returned array contains the top-level h1 nodes, each with nested
 * h2 children, which in turn contain h3 children.
 */
export function parseMarkdownHeadings(md: string): HeadingNode[] {
  const roots: HeadingNode[] = [];
  let currentH1: HeadingNode | null = null;
  let currentH2: HeadingNode | null = null;

  let match: RegExpExecArray | null;
  HEADING_RE.lastIndex = 0;

  while ((match = HEADING_RE.exec(md)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].trim();
    const node: HeadingNode = { level, text, id: slugify(text), children: [] };

    if (level === 1) {
      roots.push(node);
      currentH1 = node;
      currentH2 = null;
    } else if (level === 2) {
      if (currentH1) {
        currentH1.children.push(node);
      } else {
        roots.push(node);
      }
      currentH2 = node;
    } else if (level === 3) {
      if (currentH2) {
        currentH2.children.push(node);
      } else if (currentH1) {
        currentH1.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }

  return roots;
}

export type MarkdownHeading = {
  h1: string | null;
  h2: string | null;
  h3: string | null;
};

interface MarkdownHeadingState {
  isDeepDive: boolean;
  activeHeadings: MarkdownHeading;
  headingTree: HeadingNode[];

  setIsDeepDive: (v: boolean) => void;
  setActiveHeadings: (h: MarkdownHeading) => void;
  setHeadingTree: (tree: HeadingNode[]) => void;
}

/**
 * Zustand store for managing markdown heading state.
 *
 * Tracks the active heading hierarchy (h1/h2/h3) as the user scrolls
 * through markdown content, the full heading tree for navigation,
 * and whether the content is a "deep dive" section.
 */
const useMarkdownHeadingStore = create<MarkdownHeadingState>((set) => ({
  isDeepDive: false,
  activeHeadings: {
    h1: null,
    h2: null,
    h3: null,
  },
  headingTree: [],

  setIsDeepDive: (v) => set({ isDeepDive: v }),
  setActiveHeadings: (h) => set({ activeHeadings: h }),
  setHeadingTree: (tree) => set({ headingTree: tree }),
}));

export default useMarkdownHeadingStore;
