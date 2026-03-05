import { Code2, Database, Layers, Server } from "lucide-react";
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
