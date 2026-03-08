import { useEffect } from "react";

import useSettingsStore from "@/store/settings-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const flavor = useSettingsStore((s) => s.flavor);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("latte", "frappe", "macchiato", "mocha");
    root.classList.add(flavor);
  }, [flavor]);

  return <>{children}</>;
}
