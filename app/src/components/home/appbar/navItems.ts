const navigationItems = [
  "home",
  "skills",
  "projects",
  "experience",
  "articles",
  "contact",
] as const;

export type NavigationItem = (typeof navigationItems)[number];
export default navigationItems;
