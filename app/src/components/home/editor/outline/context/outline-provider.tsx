import React, { useState, useMemo, useCallback } from "react";
import { OutlineContext, OutlineItem } from "./outline-context";

export const OutlineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [outlineItems, setOutlineItems] = useState<OutlineItem[]>([]);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(
    null
  );

  const registerOutlineItem = useCallback((item: OutlineItem) => {
    setOutlineItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
  }, []);

  const unregisterOutlineItem = useCallback((id: string) => {
    setOutlineItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const highlightNode = useCallback((id: string) => {
    setActiveHighlightId(id);
    setTimeout(() => {
      setActiveHighlightId(null);
    }, 1000);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentSection,
      outlineItems,
      registerOutlineItem,
      unregisterOutlineItem,
      setCurrentSection,
      highlightNode,
      activeHighlightId,
    }),
    [
      currentSection,
      outlineItems,
      registerOutlineItem,
      unregisterOutlineItem,
      setCurrentSection,
      highlightNode,
      activeHighlightId,
    ]
  );

  return (
    <OutlineContext.Provider value={contextValue}>
      {children}
    </OutlineContext.Provider>
  );
};
