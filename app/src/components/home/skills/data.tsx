/**
 * Skills and Technologies Data Configuration
 *
 * This file contains the structured data that powers the Skills section of the portfolio/website.
 * It defines several key data structures:
 *
 * - currentLearningTechnologies: Array of current learning projects/technologies with detailed
 *   information including name, icon, description, repository links, and categories
 *
 * - databases: List of database technologies/platforms used
 *
 * - languages: Core programming languages proficiency
 *
 * - frameworks: Organized mapping of frameworks/libraries by programming language
 *
 * - tools: DevOps and development tools expertise
 */

export const databases = [
  "PostgreSQL",
  "SQLite",
  "MongoDB",
  "Redis",
  "Firebase",
  "Supabase",
] as const;

export const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Golang",
] as const;

export const frameworks = {
  "Javascript/Typescript": [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Socket.io",
    "Express",
  ],
  Python: ["FastAPI", "Flask", "Django", "Pandas", "Langchain"],
  Golang: ["Gin", "Gorm"],
} as const;

export const tools = ["Git", "Docker", "Kubernetes", "Jenkins", "CI/CD"];
