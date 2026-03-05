/**
 * Converts a label to a URL-friendly slug.
 * e.g. "Key Achievements" → "key-achievements"
 */
export const slugify = (label: string): string =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Builds a stable outline id from a label and its parent's id.
 * e.g. ("Key Achievements", "experience") → "experience/key-achievements"
 * e.g. ("Skills", null)                  → "skills"
 */
export const toOutlineId = (label: string, parentId: string | null): string =>
  parentId ? `${parentId}/${slugify(label)}` : slugify(label);
