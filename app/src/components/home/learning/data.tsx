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
    learningGoals: [
      "Master vector embedding techniques for code representation and semantic search",
      "Implement efficient retrieval-augmented generation pipelines for context-aware code completion",
      "Develop optimized vector indexing strategies for real-time code search and retrieval",
      "Build a responsive browser-based editor with LLM integration for intelligent code assistance",
    ],
  },
  {
    name: "Database Internals",
    icon: <Database className="w-4 h-4" />,
    description:
      "Creating a database from scratch, implementing B-tree indexing, WAL (Write-Ahead Logging), and basic query engine to learn internals of databases",
    repoLink: "https://github.com/yourusername/custom-db-engine",
    category: "Database",
    learningGoals: [
      "Implement B-tree and B+tree data structures for efficient indexing and range queries",
      "Design a robust WAL (Write-Ahead Logging) system for ACID transaction guarantees",
      "Develop a query parser and execution engine with optimization capabilities",
      "Create storage management systems with efficient page allocation and caching strategies",
    ],
  },

  {
    name: "React Native",
    icon: <Smartphone className="w-4 h-4" />,
    description:
      "This year I definitely want to build a mobile app with React Native. I want to test working with local level llms and also at the api level to create some productivity app for developers.",
    repoLink: "https://github.com/yourusername/cross-platform-apps",
    category: "Frontend",
    learningGoals: [
      "Master React Native's bridge architecture and native module integration for LLM deployment",
      "Implement efficient state management patterns for complex cross-platform applications",
      "Develop optimized UI rendering techniques for smooth performance on resource-constrained devices",
      "Create platform-specific adaptations while maintaining a unified codebase architecture",
    ],
  },
  {
    name: "Programming Language Interpreter and Compiler",
    icon: <Terminal className="w-4 h-4" />,
    description:
      "Building a custom programming language interpreter with a visual frontend to demonstrate language internals.",
    repoLink: "https://github.com/utkarsh5026/enigma",
    category: "Backend",
    learningGoals: [
      "Implement lexical analysis and parsing techniques for a custom grammar specification",
      "Design an efficient abstract syntax tree (AST) representation and traversal system",
      "Develop bytecode generation and virtual machine execution environment",
      "Create visualization tools for runtime execution and memory management",
    ],
  },
  {
    name: "Container Orchestration Platform",
    icon: <Server className="w-4 h-4" />,
    description:
      "Building a lightweight container orchestration system to learn core Kubernetes concepts like scheduling, service discovery and cluster management.",
    repoLink: "https://github.com/utkarsh5026/Orchestra",
    category: "DevOps",
    learningGoals: [
      "Implement distributed scheduling algorithms for optimal container placement",
      "Design a service discovery and load balancing system with health monitoring",
      "Develop a declarative configuration system for infrastructure-as-code deployment",
      "Create networking solutions for secure inter-container and cross-node communication",
    ],
  },
  {
    name: "Media Streaming",
    icon: <Video className="w-4 h-4" />,
    description:
      "I want to build a projects using WebRTC and HLS protocols, implementing live broadcasting and video-on-demand features while learning streaming architectures.",
    repoLink: "https://github.com/utkarsh5026/stream-connect",
    category: "Backend",
    learningGoals: [
      "Master WebRTC signaling protocols and peer connection establishment for real-time communication",
      "Implement adaptive bitrate streaming with HLS segment management and playlist generation",
      "Develop media processing pipelines for transcoding, compression and format conversion",
      "Design scalable streaming architectures with CDN integration and edge caching strategies",
    ],
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
