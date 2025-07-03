import React, { createContext, useContext } from "react";

export type OutlineItem = {
  id: string;
  label: string;
  level: number;
  icon?: React.ReactNode;
  parentId?: string;
};

export type OutlineContextType = {
  currentSection: string;
  outlineItems: OutlineItem[];
  registerOutlineItem: (item: OutlineItem) => void;
  unregisterOutlineItem: (id: string) => void;
  setCurrentSection: (section: string) => void;
  highlightNode: (id: string) => void;
  activeHighlightId: string | null;
};

export const OutlineContext = createContext<OutlineContextType | undefined>(
  undefined
);

export const useOutline = () => {
  const context = useContext(OutlineContext);
  if (context === undefined) {
    throw new Error("useOutline must be used within an OutlineProvider");
  }
  return context;
};
