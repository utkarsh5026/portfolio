import type { Project } from "@/types";

/**
 * 📦 Fetches all the cool projects from our JSON file
 * Handles all the messy network stuff so you don't have to!
 */
export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/projects.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load projects: ${response.status} ${response.statusText}`
      );
    }

    const projects: Project[] = await response.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      throw new Error("Invalid or empty projects data");
    }

    return projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
}

/**
 * ✨ Grabs the star of the show - our featured project!
 */
export function getFeaturedProject(projects: Project[]): Project {
  return projects[0];
}

/**
 * 👯‍♀️ Gets all the supporting cast - the non-featured projects
 */
export function getNonFeaturedProjects(projects: Project[]): Project[] {
  return projects.slice(1);
}

/**
 * 🏷️ Finds projects with a specific tag
 * Perfect for when you're in the mood for something specific!
 */
export function filterProjectsByTag(
  projects: Project[],
  tag: string
): Project[] {
  return projects.filter((project) =>
    project.tags?.some(
      (projectTag) => projectTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * 🔧 Discovers projects built with a particular technology
 * Tech enthusiasts rejoice!
 */
export function filterProjectsByTech(
  projects: Project[],
  tech: string
): Project[] {
  return projects.filter((project) =>
    project.technologies.some(
      (projectTech) => projectTech.toLowerCase() === tech.toLowerCase()
    )
  );
}

/**
 * 🔍 Searches through projects by name and description
 * Find exactly what you're looking for in a jiffy!
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  const searchTerm = query.toLowerCase();
  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm)
  );
}

export default {
  loadProjects,
  getFeaturedProject,
  getNonFeaturedProjects,
  filterProjectsByTag,
  filterProjectsByTech,
  searchProjects,
};
