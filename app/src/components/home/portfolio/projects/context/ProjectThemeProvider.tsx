import { Project } from "@/types";
import React, { useCallback, useMemo, useRef } from "react";
import { ProjectTheme, ProjectThemeContext } from "./ThemeContext";

const colorPairs = [
  {
    main: "blue",
    secondary: "lavender",
    accentColor: "blue",
    fromColor: "from-ctp-blue/20",
    toColor: "to-ctp-lavender/20",
  },
  {
    main: "mauve",
    secondary: "pink",
    accentColor: "mauve",
    fromColor: "from-ctp-mauve/20",
    toColor: "to-ctp-pink/20",
  },
  {
    main: "red",
    secondary: "maroon",
    accentColor: "red",
    fromColor: "from-ctp-red/20",
    toColor: "to-ctp-maroon/20",
  },
  {
    main: "peach",
    secondary: "yellow",
    accentColor: "peach",
    fromColor: "from-ctp-peach/20",
    toColor: "to-ctp-yellow/20",
  },
  {
    main: "green",
    secondary: "teal",
    accentColor: "green",
    fromColor: "from-ctp-green/20",
    toColor: "to-ctp-teal/20",
  },
  {
    main: "sapphire",
    secondary: "sky",
    accentColor: "blue",
    fromColor: "from-ctp-blue/20",
    toColor: "to-ctp-sky/20",
  },
  {
    main: "lavender",
    secondary: "blue",
    accentColor: "lavender",
    fromColor: "from-ctp-lavender/20",
    toColor: "to-ctp-blue/20",
  },
];

interface ProjectThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ProjectThemeProvider Component
 *
 * This component provides a context for managing project themes in a React application.
 * It caches themes based on project names to avoid recalculating them on every render.
 *
 * Props:
 * - children: React.ReactNode
 *   The child components that will have access to the project theme context.
 *
 * Usage:
 * Wrap your components that need access to project themes with the ProjectThemeProvider.
 * Use the `useProjectTheme` hook to access the `getProjectTheme` function and cached themes.
 *
 * Example:
 *
 * <ProjectThemeProvider>
 *   <YourComponent />
 * </ProjectThemeProvider>
 *
 * Inside YourComponent:
 *
 * const { getProjectTheme } = useProjectTheme();
 * const theme = getProjectTheme(project);
 *
 * This will return the theme for the specified project, either from the cache or by calculating it.
 */
export const ProjectThemeProvider: React.FC<ProjectThemeProviderProps> = ({
  children,
}) => {
  // Use ref instead of state to avoid re-renders when cache updates
  const cachedThemesRef = useRef<Record<string, ProjectTheme>>({});

  const getProjectTheme = useCallback((project: Project): ProjectTheme => {
    if (cachedThemesRef.current[project.name]) {
      return cachedThemesRef.current[project.name];
    }

    const nameHash = project.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const theme = colorPairs[nameHash % colorPairs.length];
    cachedThemesRef.current[project.name] = theme;

    return theme;
  }, []); // No dependencies - stable callback

  const value = useMemo(() => ({ getProjectTheme }), [getProjectTheme]);

  return (
    <ProjectThemeContext.Provider value={value}>
      {children}
    </ProjectThemeContext.Provider>
  );
};
