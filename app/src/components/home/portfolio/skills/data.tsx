import { Code2, Database, Heart,Layers, Server, Zap } from "lucide-react";
import { FaJava, FaTools } from "react-icons/fa";
import {
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGin,
  SiGit,
  SiGo,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    color: "blue",
    description: "Core programming languages",
    skills: [
      {
        name: "JavaScript",
        icon: <SiJavascript className="w-5 h-5" />,
        color: "yellow",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="w-5 h-5" />,
        color: "blue",
      },
      {
        name: "Python",
        icon: <SiPython className="w-5 h-5" />,
        color: "yellow",
      },
      {
        name: "Java",
        icon: <FaJava className="w-5 h-5" />,
        color: "red",
      },
      {
        name: "Go",
        icon: <SiGo className="w-5 h-5" />,
        color: "teal",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: <Layers className="w-5 h-5" />,
    color: "sapphire",
    description: "UI/UX frameworks & libraries",
    skills: [
      {
        name: "React",
        icon: <SiReact className="w-5 h-5" />,
        color: "sapphire",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="w-5 h-5" />,
        color: "text",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="w-5 h-5" />,
        color: "teal",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Server className="w-5 h-5" />,
    color: "green",
    description: "Server-side frameworks",
    skills: [
      {
        name: "Express",
        icon: <SiExpress className="w-5 h-5" />,
        color: "text",
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="w-5 h-5" />,
        color: "green",
      },
      {
        name: "Django",
        icon: <SiDjango className="w-5 h-5" />,
        color: "green",
      },
      {
        name: "Flask",
        icon: <SiFlask className="w-5 h-5" />,
        color: "text",
      },
      {
        name: "Gin",
        icon: <SiGin className="w-5 h-5" />,
        color: "teal",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "mauve",
    description: "Data storage solutions",
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="w-5 h-5" />,
        color: "blue",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-5 h-5" />,
        color: "green",
      },
      {
        name: "Redis",
        icon: <SiRedis className="w-5 h-5" />,
        color: "red",
      },
      {
        name: "SQLite",
        icon: <SiSqlite className="w-5 h-5" />,
        color: "blue",
      },
    ],
  },
  {
    id: "tools",
    title: "DevOps & Tools",
    icon: <FaTools className="w-5 h-5" />,
    color: "peach",
    description: "Development & deployment tools",
    skills: [
      {
        name: "Docker",
        icon: <SiDocker className="w-5 h-5" />,
        color: "blue",
      },
      {
        name: "Kubernetes",
        icon: <SiKubernetes className="w-5 h-5" />,
        color: "blue",
      },
      {
        name: "Git",
        icon: <SiGit className="w-5 h-5" />,
        color: "red",
      },
      {
        name: "Jenkins",
        icon: <SiJenkins className="w-5 h-5" />,
        color: "text",
      },
    ],
  },
];

export const databases = ["PostgreSQL", "MongoDB", "Redis", "SQLite"] as const;

export const tools = ["Jenkins", "Git", "Kubernetes", "Docker"] as const;

export const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
] as const;

export const frameworks = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Express",
  "FastAPI",
  "Django",
  "Flask",
  "Gin",
] as const;

export const journeySteps = [
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    icon: <SiReact className="w-6 h-6" />,
    color: "sapphire",
    description:
      "I've become quite fluent in JavaScript and TypeScript over the years. They're my go-to languages for most projects, and I love how they've evolved. React is where I spend most of my time, building interfaces that people actually enjoy using.",
    highlights: [
      "JavaScript & TypeScript",
      "React Ecosystem",
      "User Experience",
    ],
  },
  {
    id: "backend-expertise",
    title: "Backend Expertise",
    icon: <SiNodedotjs className="w-6 h-6" />,
    color: "green",
    description:
      "On the backend, I'm comfortable with Node.js and Express, but I've also ventured into Python with FastAPI and Django. I believe in choosing the right tool for the job — sometimes that's Go when performance really matters.",
    highlights: ["Node.js & Express", "Python FastAPI", "Go for Performance"],
  },
  {
    id: "database-passion",
    title: "Database Passion",
    icon: <Database className="w-6 h-6" />,
    color: "mauve",
    description:
      "Databases are my playground! From PostgreSQL for structured data to MongoDB when I need more flexibility. I've developed a weird appreciation for database optimization — there's something satisfying about a well-indexed query.",
    highlights: ["PostgreSQL", "MongoDB", "Query Optimization"],
  },
  {
    id: "devops-evolution",
    title: "DevOps Evolution",
    icon: <SiDocker className="w-6 h-6" />,
    color: "blue",
    description:
      "Docker containers have changed how I build and deploy. Combined with some Kubernetes for orchestration, I can create environments that are consistent and scalable. That's been a game-changer for reliability.",
    highlights: ["Docker Containers", "Kubernetes", "Scalable Systems"],
  },
  {
    id: "ai-exploration",
    title: "AI Exploration",
    icon: <Zap className="w-6 h-6" />,
    color: "yellow",
    description:
      "Right now, I'm diving deeper into vector databases and RAG patterns for AI applications. I'm always learning something new — currently exploring React Native for mobile development and fascinated by compiler design.",
    highlights: ["Vector Databases", "RAG Patterns", "Compiler Design"],
  },
  {
    id: "journey-reflection",
    title: "The Journey",
    icon: <Heart className="w-6 h-6" />,
    color: "pink",
    description:
      "My journey started with jQuery and PHP years ago, and I still appreciate what they taught me. Each technology I've worked with has added something valuable to my approach to problem-solving.",
    highlights: ["Continuous Learning", "Problem Solving", "Growth Mindset"],
  },
];
