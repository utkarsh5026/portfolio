import { AppColor } from "@/lib/ctp-colors";

/**
 * Returns a Catppuccin color token name for a given learning category.
 */
export const getCategoryColor = (category: string): AppColor => {
  const colors: Record<string, AppColor> = {
    Database: "blue",
    Backend: "mauve",
    Frontend: "red",
    DevOps: "teal",
    "AI/ML": "pink",
  };
  return colors[category] ?? "text";
};
