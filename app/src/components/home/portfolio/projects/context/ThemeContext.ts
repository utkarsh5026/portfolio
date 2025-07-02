import { createContext, useContext } from "react";
import { Project } from "@/types";

export type ProjectTheme = {
  main: string;
  secondary: string;
  accentColor?: string;
  fromColor?: string;
  toColor?: string;
};

type ProjectThemeContextType = {
  getProjectTheme: (project: Project) => ProjectTheme;
  cachedThemes: Record<string, ProjectTheme>;
};

export const ProjectThemeContext = createContext<
  ProjectThemeContextType | undefined
>(undefined);

/**
 * Custom hook to access the ProjectTheme context.
 *
 * This hook allows components to retrieve the current project theme
 * and ensures that it is used within a valid ProjectThemeProvider.
 *
 * @throws {Error} Throws an error if used outside of a ProjectThemeProvider.
 *
 * @returns {ProjectThemeContextType} The context value containing the
 *          `getProjectTheme` function and `cachedThemes` object.
 */
export const useProjectTheme = (): ProjectThemeContextType => {
  const context = useContext(ProjectThemeContext);
  if (context === undefined) {
    throw new Error(
      "useProjectTheme must be used within a ProjectThemeProvider"
    );
  }
  return context;
};
