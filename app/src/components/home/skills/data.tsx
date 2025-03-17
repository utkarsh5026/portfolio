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

export const databases = ["PostgreSQL", "SQLite", "MongoDB", "Redis"] as const;

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

export const skillPoints = [
  "I've become quite fluent in JavaScript and TypeScript over the years. They're my go-to languages for most projects, and I love how they've evolved. React is where I spend most of time, building interfaces that people actually enjoy using.",

  "On the backend, I'm comfortable with Node.js and Express, but I've also ventured into Python with FastAPI and Django. I believe in choosing the right tool for the job — sometimes that's Go when performance really matters.",

  "Databases are my playground! From PostgreSQL for structured data to MongoDB when I need more flexibility. I've developed a weird appreciation for database optimization — there's something satisfying about a well-indexed query.",

  "Docker containers have changed how I build and deploy. Combined with some Kubernetes for orchestration, I can create environments that are consistent and scalable. That's been a game-changer for reliability.",

  "Right now, I'm diving deeper into vector databases and RAG patterns for AI applications. I'm always learning something new — currently exploring React Native for mobile development and fascinated by compiler design.",

  "My journey started with jQuery and PHP years ago, and I still appreciate what they taught me. Each technology I've worked with has added something valuable to my approach to problem-solving.",
];
