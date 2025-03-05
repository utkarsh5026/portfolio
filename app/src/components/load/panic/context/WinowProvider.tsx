import { useCallback, useMemo, useState } from "react";
import { WindowContext, type ActiveWindow } from "./windowcontext";

const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);
  const [loadedWindows, setLoadedWindows] = useState<Set<ActiveWindow>>(
    new Set()
  );

  const goToWindow = useCallback((window: ActiveWindow) => {
    setActiveWindow(window);
    setLoadedWindows((prev) => {
      const newSet = new Set(prev);
      newSet.add(window);
      return newSet;
    });
  }, []);

  const value = useMemo(
    () => ({ activeWindow, goToWindow, loadedWindows }),
    [activeWindow, goToWindow, loadedWindows]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export default WindowProvider;
