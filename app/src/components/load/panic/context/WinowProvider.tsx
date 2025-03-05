import { useMemo, useState } from "react";

import { WindowContext, type ActiveWindow } from "./windowcontext";

const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);

  const value = useMemo(
    () => ({ activeWindow, setActiveWindow }),
    [activeWindow, setActiveWindow]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export default WindowProvider;
