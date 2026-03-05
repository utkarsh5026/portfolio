import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type MarkdownHeading = {
  h1: string | null;
  h2: string | null;
  h3: string | null;
};

type MarkdownHeadingContextType = {
  isDeepDive: boolean;
  activeHeadings: MarkdownHeading;
  setIsDeepDive: (v: boolean) => void;
  setActiveHeadings: (h: MarkdownHeading) => void;
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

  const setActiveHeadings = useCallback((h: MarkdownHeading) => {
    setActiveHeadingsState(h);
  }, []);

  const value = useMemo(
    () => ({ isDeepDive, activeHeadings, setIsDeepDive, setActiveHeadings }),
    [isDeepDive, activeHeadings, setIsDeepDive, setActiveHeadings],
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
