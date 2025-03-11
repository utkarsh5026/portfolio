import type { TechnologyLearning } from "@/types";
import {
  Database,
  Cpu,
  Code,
  Cloud,
  Brain,
  Terminal,
  Video,
  Smartphone,
  Server,
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
    name: "Programming Language Interpreter and Compiler",
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

type Category = (typeof currentLearningTechnologies)[number]["category"];

export const categoryInfo: Record<
  Category,
  {
    icon: React.ReactNode;
    color: string;
    hoverColor: string;
    description: string;
    position: string;
  }
> = {
  Database: {
    icon: <Database className="w-full h-full p-2" />,
    color: "#89dceb", // Catppuccin blue
    hoverColor: "#96d0fd", // Catppuccin sapphire
    description: "Storage systems and query optimization",
    position: "top-8 left-1/4",
  },
  Backend: {
    icon: <Cpu className="w-full h-full p-2" />,
    color: "#ca9ee6", // Catppuccin mauve
    hoverColor: "#f4b8e4", // Catppuccin pink
    description: "Server-side development and APIs",
    position: "top-1/2 left-8 -translate-y-1/2",
  },
  Frontend: {
    icon: <Code className="w-full h-full p-2" />,
    color: "#e78284", // Catppuccin red
    hoverColor: "#ef9f76", // Catppuccin peach
    description: "User interfaces and experience design",
    position: "bottom-8 left-1/4",
  },
  DevOps: {
    icon: <Cloud className="w-full h-full p-2" />,
    color: "#81c8be", // Catppuccin teal
    hoverColor: "#a6d189", // Catppuccin green
    description: "Deployment and infrastructure automation",
    position: "bottom-8 right-1/4",
  },
  "AI/ML": {
    icon: <Cpu className="w-full h-full p-2" />,
    color: "#f4b8e4", // Catppuccin pink
    hoverColor: "#ca9ee6", // Catppuccin mauve
    description: "Machine learning and artificial intelligence",
    position: "top-1/2 right-8 -translate-y-1/2",
  },
};
