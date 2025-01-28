/**
 * My projects showcase! 🛠️
 *
 * This is where I keep all the juicy details about my projects.
 * Each project entry includes:
 * - Project name and description
 * - Links to GitHub (and live demos where available)
 * - Tech stack used (linked to my technologies config)
 * - Key features and highlights
 * - Project status (Completed/In Progress)
 * - Category (DevOps, AI/ML, Library, etc.)
 */

import type { Project } from "@/types";
import { technologies } from "@/components/base/technologies";

export const projects: Project[] = [
  {
    name: "Automotive Training & Workforce Analytics DSS",
    description:
      "A comprehensive analytics platform developed for Skoda Auto, Volkswagen, and Audi that transforms workforce development through data-driven insights. Processing over 200,000 training records, this system delivers actionable analytics on training effectiveness, employee development, and workforce trends through intuitive interactive dashboards, reducing analysis time from days to minutes.",

    githubLink: "private-repository",

    technologies: [
      technologies.react,
      technologies.python,
      technologies.django,
      technologies.pandas,
      technologies.plotly,
      technologies.sqlite,
    ],

    features: [
      "Multi-brand workforce analytics (Skoda, VW, Audi)",
      "Training success rate analysis by trainer/location",
      "Employee aging and retention tracking",
      "Customizable trend analysis with date ranges",
      "Zone and dealer-wise performance metrics",
      "Data visualization with interactive charts",
      "Automated data processing pipelines",
      "Role-based access control",
      "Export functionality for reports",
    ],

    category: "Web",

    status: "Completed",

    tags: [
      "Dashboard",
      "Data",
      "Analytics",
      "React",
      "Python",
      "Django",
      "Pandas",
      "Plotly",
    ],
  },
  {
    name: "Container Management Platform",
    description:
      "A sophisticated container management solution that streamlines Docker operations through real-time monitoring and control. This platform offers comprehensive container insights, interactive terminal access, and resource management capabilities through an intuitive web interface, enabling DevOps teams to efficiently manage containerized applications.",
    githubLink: "https://github.com/yourusername/container-platform",
    liveLink: "https://demo-container-platform.com",
    technologies: [
      technologies.golang,
      technologies.react,
      technologies.docker,
      technologies.typescript,
    ],
    features: [
      "Real-time container monitoring via WebSocket",
      "Interactive terminal access to containers",
      "Resource usage visualization (CPU, Memory, Network)",
      "Container log streaming and search",
      "Image and volume management",
    ],
    category: "DevOps",
    status: "Completed",
    tags: ["Docker", "Golang", "React", "Typescript"],
  },
  {
    name: "AI-Powered Code Review Assistant",
    description:
      "An intelligent code analysis tool that provides continuous code quality assurance through machine learning. This system performs automated code reviews, detecting potential issues and suggesting optimizations while learning from complex code patterns to offer architectural insights and maintain consistent code quality standards.",
    githubLink: "https://github.com/utkarsh5026/gep",
    technologies: [
      technologies.python,
      technologies.fastapi,
      technologies.mongodb,
    ],
    features: [
      "Automated code quality analysis",
      "Security vulnerability detection",
      "Performance optimization suggestions",
    ],
    tags: ["AI", "ML", "Python", "FastAPI", "Langchain"],
    category: "AI/ML",
    status: "In Progress",
  },
  {
    name: "Microservices Orchestration Platform",
    description:
      "A lightweight container orchestration system built from first principles, implementing core Kubernetes concepts from the ground up. This educational platform demonstrates fundamental distributed systems concepts including scheduling, service discovery, and fault tolerance, providing hands-on insight into container orchestration mechanics.",
    githubLink: "https://github.com/yourusername/micro-orchestrator",
    technologies: [
      technologies.golang,
      technologies.kubernetes,
      technologies.docker,
    ],
    features: [
      "Custom scheduler implementation",
      "Service discovery and load balancing",
      "Automated scaling and failover",
      "Health monitoring and self-healing",
    ],
    tags: ["Kubernetes", "Docker", "Go", "Distributed Systems"],
    category: "DevOps",
    status: "Completed",
  },
  {
    name: "Reducer",
    description:
      "A streamlined state management library that reimagines Redux core principles with TypeScript. This solution provides robust state management capabilities while maintaining simplicity, offering features such as state slices and middleware support. Designed to help developers understand immutable state management patterns through practical implementation.",
    githubLink: "https://github.com/utkarsh5026/ReduceMe",
    technologies: [technologies.typescript, technologies.node],
    features: [
      "Redux-like state management with TypeScript support",
      "Immutable state updates using Immer",
      "Slice-based state organization",
      "Middleware support for extending functionality",
      "Type-safe action creators and reducers",
      "Combined reducers for complex state management",
      "State change subscription system",
      "Comprehensive test coverage",
    ],
    tags: ["Redux", "TypeScript", "NodeJS", "State Management"],
    category: "Library",
    status: "Completed",
  },
  {
    name: "PAuth",
    description:
      "A modern OAuth 2.0 authentication library for Python applications that prioritizes security and developer experience. This framework-agnostic solution implements comprehensive authentication flows with built-in security best practices, supporting multiple providers while maintaining a clean, intuitive API across Flask, Django, and other frameworks.",
    githubLink: "https://github.com/utkarsh5026/pauth",
    technologies: [
      technologies.python,
      technologies.flask,
      technologies.django,
      technologies.rest,
    ],
    features: [
      "Complete OAuth 2.0 implementation with modern security features",
      "Multiple provider support (Google, GitHub, Facebook, Twitter)",
      "Framework integration with Flask and Django",
      "Built-in PKCE (Proof Key for Code Exchange) support",
      "Customizable token storage",
      "Comprehensive error handling",
      "Type hints for better developer experience",
    ],
    category: "Library",
    status: "In Progress",
    highlights: [
      "Security-first approach with PKCE implementation and state validation",
      "Framework-agnostic core with seamless integrations",
      "Extensible provider system with consistent interface",
      "Comprehensive documentation and examples",
      "Type-safe implementation with modern Python features",
    ],
    tags: ["OAuth", "Python", "Flask", "Django", "REST", "PKCE"],
  },
  {
    name: "Current",
    description:
      "A full-featured BitTorrent client implemented from the ground up in Go, showcasing practical applications of network programming and distributed systems principles. This project encompasses the complete BitTorrent protocol stack, featuring concurrent downloads, peer management, and efficient file handling capabilities.",
    githubLink: "https://github.com/utkarsh5026/current",
    technologies: [technologies.golang, technologies.bittorrent],
    features: [
      "Parse and decode .torrent files using custom bencode parser",
      "Connect and communicate with BitTorrent trackers",
      "Manage peer connections and handshakes",
      "Download file pieces from multiple peers simultaneously",
      "Verify downloaded pieces using SHA1 hashing",
      "Track download progress in real-time",
      "Handle concurrent TCP connections efficiently",
    ],
    category: "Backend",
    status: "Completed",
    highlights: [
      "Custom implementation of the bencode format parser/encoder",
      "Efficient piece management with concurrent downloads",
      "Clean separation of concerns with modular package design",
      "Robust error handling and data verification",
      "Support for both single-file and multi-file torrents",
    ],
    tags: ["BitTorrent", "Go", "Network Programming", "CodeCrafters", "CLI"],
  },
  {
    name: "Cope",
    description:
      "A modern implementation of grep functionality, developed as part of the CodeCrafters challenge. This tool combines traditional text searching capabilities with advanced regular expression support, demonstrating how classical Unix utilities can be enhanced through modern language features and systematic testing approaches.",
    githubLink: "https://github.com/utkarsh5026/cope",
    technologies: [technologies.golang, technologies.cli],
    features: [
      "Pattern matching using regular expressions",
      "Command-line interface",
      "File content searching",
      "Test-driven development approach",
      "Support for various input formats",
    ],
    category: "Backend",
    status: "In Progress",
    highlights: [
      "Built as part of the CodeCrafters platform challenge",
      "Implements core grep functionality in pure Go",
      "Includes comprehensive test coverage",
      "Uses modern Go tooling and practices (Go 1.22+)",
    ],
    tags: ["CLI", "Go", "Grep", "CodeCrafters"],
  },

  {
    name: "Mayonation",
    description:
      "A performance-focused web animation library that simplifies complex animations through an intuitive API. This TypeScript-based solution handles CSS properties, SVG paths, and animation timelines while maintaining type safety and optimal performance. Designed to deliver smooth 60fps animations with minimal overhead and maximum developer productivity.",
    githubLink: "https://github.com/utkarsh5026/mayonation",
    liveLink: "https://utkarsh5026.github.io/mayosite/",
    technologies: [technologies.typescript, technologies.css, technologies.svg],
    features: [
      "Fluent chainable API for simple animations",
      "Complex timeline-based animations",
      "CSS property and transform animations",
      "SVG path animations",
      "Keyframe-based animations",
      "Custom easing functions",
      "Event handling system",
      "Performance optimized animation loop",
      "TypeScript type safety",
      "Automatic element selection and handling",
      "Relative and absolute timing control",
    ],
    category: "Library",
    status: "Completed",
    highlights: [
      "Lightweight bundle size with zero dependencies",
      "60fps performance with requestAnimationFrame",
      "Comprehensive test coverage with Vitest",
      "Full TypeScript support with detailed type definitions",
      "Timeline system for complex animation sequences",
      "Smart handling of transform properties",
      "Automatic detection of SVG elements",
      "Browser-native animation performance",
      "Precise timing control with sub-millisecond precision",
    ],
    tags: ["Animation", "TypeScript", "CSS", "SVG", "NodeJS"],
  },
];

export default projects;
