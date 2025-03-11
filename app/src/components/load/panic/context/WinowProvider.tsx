import { useCallback, useMemo, useState } from "react";
import {
  WindowContext,
  type ActiveWindow,
} from "@/components/load/panic/context/windowContext";

/**
 * WindowProvider Component
 *
 * This component provides a context for managing the active window in the panic scene.
 * It allows for navigation between different windows and tracking of loaded windows.
 *
 * Props:
 * - children: The child components to be rendered within the WindowProvider.
 *
 * Usage:
 * <WindowProvider>
 *   <YourComponent />
 * </WindowProvider>
 */
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
