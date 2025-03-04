import { createContext, useContext, useEffect, useState } from "react";

type CatppuccinFlavor = "latte" | "frappe" | "macchiato" | "mocha";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultFlavor?: CatppuccinFlavor;
};

type ThemeProviderState = {
  flavor: CatppuccinFlavor;
  setFlavor: (flavor: CatppuccinFlavor) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  flavor: "mocha",
  setFlavor: () => null,
});

export function ThemeProvider({
  children,
  defaultFlavor = "mocha",
}: ThemeProviderProps) {
  const [flavor, setFlavor] = useState<CatppuccinFlavor>(defaultFlavor);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("latte", "frappe", "macchiato", "mocha");
    root.classList.add(flavor);
  }, [flavor]);

  return (
    <ThemeProviderContext.Provider value={{ flavor, setFlavor }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
