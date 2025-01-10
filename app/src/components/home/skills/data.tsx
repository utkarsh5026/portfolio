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

import type { TechnologyLearning } from "@/types";
import {
  Database,
  Brain,
  Smartphone,
  Terminal,
  Server,
  Video,
} from "lucide-react";

export const currentLearningTechnologies: TechnologyLearning[] = [
  {
    name: "Vector Databases & RAG",
    icon: <Brain className="w-4 h-4" />,
    description:
      "Implementing a code editor like cursor in the browser with RAG and vector database for context aware code search, autocomplete and chat with code.",
    repoLink: "https://github.com/utkarsh5026/gep",
    category: "AI/ML",
  },
  {
    name: "Database Internals",
    icon: <Database className="w-4 h-4" />,
    description:
      "Creating a database from scratch, implementing B-tree indexing, WAL (Write-Ahead Logging), and basic query engine to learn internals of databases",
    repoLink: "https://github.com/yourusername/custom-db-engine",
    category: "Database",
  },

  {
    name: "React Native",
    icon: <Smartphone className="w-4 h-4" />,
    description:
      "This year I definitely want to build a mobile app with React Native. I want to test working with local level llms and also at the api level to create some productivity app for developers.",
    repoLink: "https://github.com/yourusername/cross-platform-apps",
    category: "Frontend",
  },
  {
    name: "Custom Programming Language Interpreter and Compiler",
    icon: <Terminal className="w-4 h-4" />,
    description:
      "Building a custom programming language interpreter with a visual frontend to demonstrate language internals.",
    repoLink: "https://github.com/utkarsh5026/enigma",
    category: "Backend",
  },
  {
    name: "Container Orchestration Platform",
    icon: <Server className="w-4 h-4" />,
    description:
      "Building a lightweight container orchestration system to learn core Kubernetes concepts like scheduling, service discovery and cluster management.",
    repoLink: "https://github.com/utkarsh5026/Orchestra",
    category: "DevOps",
  },
  {
    name: "Media Streaming",
    icon: <Video className="w-4 h-4" />,
    description:
      "I want to build a projects using WebRTC and HLS protocols, implementing live broadcasting and video-on-demand features while learning streaming architectures.",
    repoLink: "https://github.com/utkarsh5026/stream-connect",
    category: "Backend",
  },
];

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
};

export const tools = ["Git", "Docker", "Kubernetes", "Jenkins", "CI/CD"];
