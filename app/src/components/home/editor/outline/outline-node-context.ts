import { createContext, useContext } from "react";

interface OutlinePosition {
  parentId: string | null;
  depth: number;
}

export const OutlineNodeContext = createContext<OutlinePosition>({
  parentId: null,
  depth: 0,
});

export const useOutlinePosition = () => useContext(OutlineNodeContext);
