import { create } from "zustand";

import type { Project } from "@/types";
import { getProjectSlug } from "@/utils/project-slug";

type MarkdownLoadState = "loading" | "loaded" | "error";

/**
 * Interface defining the state and actions for the project store
 */
interface ProjectState {
  projects: Project[];
  featuredProject: Project | null;
  otherProjects: Project[];
  isLoading: boolean;
  error: string | null;
  selectedProject: Project | null;
  downloaded: boolean;

  markdownCache: Record<string, string>;
  markdownStates: Record<string, MarkdownLoadState>;

  // Actions
  fetchProjects: () => Promise<void>;
  selectProject: (project: Project | null) => void;
  prefetchMarkdown: (projectName: string) => void;
}

/**
 * Zustand store for managing projects data
 *
 * This store handles loading projects from JSON, selecting projects,
 * searching, filtering, and provides access to the project data
 * throughout the application.
 */
const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  featuredProject: null,
  otherProjects: [],
  isLoading: false,
  error: null,
  selectedProject: null,
  downloaded: false,
  markdownCache: {},
  markdownStates: {},

  fetchProjects: async () => {
    if (get().downloaded) return;
    try {
      set({ isLoading: true, error: null });

      const response = await fetch("/data/projects.json");

      if (!response.ok) {
        throw new Error(
          `Failed to load projects: ${response.status} ${response.statusText}`
        );
      }

      const projects: Project[] = await response.json();

      if (!Array.isArray(projects) || projects.length === 0) {
        throw new Error("Invalid or empty projects data");
      }

      // Set the projects in the store
      set({
        projects,
        featuredProject: projects[0],
        otherProjects: projects.slice(1),
        isLoading: false,
      });
    } catch (error) {
      console.error("Error loading projects:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Select a project (e.g., for displaying in a modal)
  selectProject: (project) => {
    set({ selectedProject: project });
  },

  prefetchMarkdown: (projectName) => {
    const slug = getProjectSlug(projectName);
    const existing = get().markdownStates[slug];
    if (existing === "loading" || existing === "loaded") return;

    set((s) => ({
      markdownStates: { ...s.markdownStates, [slug]: "loading" },
    }));

    fetch(`/data/projects/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        const ct = res.headers.get("content-type") ?? "";
        if (ct.includes("text/html")) throw new Error("not-found");
        return res.text();
      })
      .then((text) => {
        if (text.trimStart().startsWith("<!")) throw new Error("not-found");
        set((s) => ({
          markdownCache: { ...s.markdownCache, [slug]: text },
          markdownStates: { ...s.markdownStates, [slug]: "loaded" },
        }));
      })
      .catch(() => {
        set((s) => ({
          markdownStates: { ...s.markdownStates, [slug]: "error" },
        }));
      });
  },
}));

export default useProjectStore;
