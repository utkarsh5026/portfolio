export const TourStepType = {
  WELCOME: "welcome",
  ABOUT: "about",
  SKILLS: "skills",
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  ARTICLES: "articles",
  LEARNING: "learning",
  CONTACT: "contact",
  THANK_YOU: "thank_you",
} as const;

export type TourStep = (typeof TourStepType)[keyof typeof TourStepType];
