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
import { Database, Search, Brain, Smartphone, Terminal } from "lucide-react";

export const currentLearningTechnologies: TechnologyLearning[] = [
  {
    name: "Vector Databases & Similarity Search",
    icon: <Search className="w-4 h-4" />,
    description:
      "Implementing vector similarity search using Pinecone, exploring embeddings for semantic search and content recommendation",
    repoLink: "https://github.com/yourusername/vector-search-project",
    category: "Database",
  },
  {
    name: "RAG (Retrieval Augmented Generation)",
    icon: <Brain className="w-4 h-4" />,
    description:
      "Building RAG applications with LangChain, combining vector stores with LLMs for context-aware AI responses",
    repoLink: "https://github.com/yourusername/rag-implementation",
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
      "Developing a custom programming language interpreter from scratch, implementing lexical analysis, parsing, and runtime execution to understand language design principles, also creating a frontend to show a progrmmer how a programming language works.",
    repoLink: "https://github.com/utkarsh5026/enigma",
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
  Python: ["FastAPI", "Flask", "Django", "Pandas"],
  Golang: ["Gin", "Gorm"],
};

export const tools = ["Git", "Docker", "Kubernetes", "Jenkins", "CI/CD"];
