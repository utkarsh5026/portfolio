import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { HeadingNode } from "../markdown-renderer/parse-markdown-headings";

export type MarkdownHeading = {
  h1: string | null;
  h2: string | null;
  h3: string | null;
};

type MarkdownHeadingContextType = {
  isDeepDive: boolean;
  activeHeadings: MarkdownHeading;
  headingTree: HeadingNode[];
  setIsDeepDive: (v: boolean) => void;
  setActiveHeadings: (h: MarkdownHeading) => void;
  setHeadingTree: (tree: HeadingNode[]) => void;
};

const MarkdownHeadingContext = createContext<
  MarkdownHeadingContextType | undefined
>(undefined);

export const MarkdownHeadingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDeepDive, setIsDeepDive] = useState(false);
  const [activeHeadings, setActiveHeadingsState] = useState<MarkdownHeading>({
    h1: null,
    h2: null,
    h3: null,
  });
  const [headingTree, setHeadingTreeState] = useState<HeadingNode[]>([]);

  const setActiveHeadings = useCallback((h: MarkdownHeading) => {
    setActiveHeadingsState(h);
  }, []);

  const setHeadingTree = useCallback((tree: HeadingNode[]) => {
    setHeadingTreeState(tree);
  }, []);

  const value = useMemo(
    () => ({
      isDeepDive,
      activeHeadings,
      headingTree,
      setIsDeepDive,
      setActiveHeadings,
      setHeadingTree,
    }),
    [
      isDeepDive,
      activeHeadings,
      headingTree,
      setIsDeepDive,
      setActiveHeadings,
      setHeadingTree,
    ],
  );

  return (
    <MarkdownHeadingContext.Provider value={value}>
      {children}
    </MarkdownHeadingContext.Provider>
  );
};

export const useMarkdownHeading = (): MarkdownHeadingContextType => {
  const ctx = useContext(MarkdownHeadingContext);
  if (!ctx)
    throw new Error(
      "useMarkdownHeading must be used within MarkdownHeadingProvider",
    );
  return ctx;
};
