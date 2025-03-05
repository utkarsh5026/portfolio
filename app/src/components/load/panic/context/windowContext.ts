import { createContext, useContext } from "react";

export type ActiveWindow =
  | "browser"
  | "reactComponent"
  | "cssStyles"
  | "animation"
  | "chat"
  | "terminal"
  | null;

export type WindowContextType = {
  activeWindow: ActiveWindow;
  setActiveWindow: (window: ActiveWindow) => void;
};

export const WindowContext = createContext<WindowContextType | undefined>(
  undefined
);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowContext");
  }
  return context;
};
