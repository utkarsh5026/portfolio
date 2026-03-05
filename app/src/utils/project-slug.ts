/** Slugify a project name for use in URLs: "My Project" → "my-project" */
export const getProjectSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Convert a project name to its markdown filename: "My Project" → "my-project.md" */
export const getProjectFileName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".md";

/** Build the shareable deep-link URL for a project. */
export const getProjectPath = (name: string): string =>
  `/projects/${getProjectSlug(name)}`;

/** If the pathname looks like /projects/:slug return the slug, else null. */
export const getProjectSlugFromPath = (pathname: string): string | null => {
  const m = pathname.match(/^\/projects\/([^/]+)$/);
  return m ? m[1] : null;
};
