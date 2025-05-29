import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiGin,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiJenkins,
} from "react-icons/si";
import { FaJava, FaTools } from "react-icons/fa";
import { Code2, Database, Layers, Server } from "lucide-react";

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
        usage: [
          "Built interactive web applications with dynamic UI components",
          "Developed real-time chat systems using Socket.io",
          "Created data visualization dashboards with Chart.js",
        ],
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="w-5 h-5" />,
        color: "blue",
        usage: [
          "Developed large-scale React applications with type safety",
          "Built robust APIs with strict type definitions",
          "Implemented complex state management with Redux Toolkit",
        ],
      },
      {
        name: "Python",
        icon: <SiPython className="w-5 h-5" />,
        color: "yellow",
        usage: [
          "Built ML models for data analysis and prediction",
          "Created web scraping tools for automated data collection",
          "Developed REST APIs for microservices architecture",
        ],
      },
      {
        name: "Java",
        icon: <FaJava className="w-5 h-5" />,
        color: "red",
        usage: [
          "Built enterprise applications with Spring Boot",
          "Developed multi-threaded processing systems",
          "Created Android mobile applications",
        ],
      },
      {
        name: "Go",
        icon: <SiGo className="w-5 h-5" />,
        color: "teal",
        usage: [
          "Built high-performance microservices for scalable systems",
          "Developed CLI tools for automation and deployment",
          "Created concurrent data processing pipelines",
        ],
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
        usage: [
          "Built responsive SPAs with complex state management",
          "Created reusable component libraries for team projects",
          "Developed real-time dashboards with live data updates",
        ],
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="w-5 h-5" />,
        color: "text",
        usage: [
          "Built SEO-optimized websites with server-side rendering",
          "Developed full-stack applications with API routes",
          "Created e-commerce platforms with dynamic routing",
        ],
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="w-5 h-5" />,
        color: "teal",
        usage: [
          "Designed responsive layouts with mobile-first approach",
          "Created custom design systems with utility classes",
          "Built dark/light theme switching functionality",
        ],
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
        usage: [
          "Built RESTful APIs with authentication and authorization",
          "Developed real-time applications with WebSocket integration",
          "Created middleware for logging and error handling",
        ],
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="w-5 h-5" />,
        color: "green",
        usage: [
          "Built high-performance APIs with automatic documentation",
          "Developed ML model serving endpoints with async processing",
          "Created data validation systems with Pydantic models",
        ],
      },
      {
        name: "Django",
        icon: <SiDjango className="w-5 h-5" />,
        color: "green",
        usage: [
          "Built content management systems with admin interface",
          "Developed user authentication and permission systems",
          "Created data-driven web applications with ORM",
        ],
      },
      {
        name: "Flask",
        icon: <SiFlask className="w-5 h-5" />,
        color: "text",
        usage: [
          "Built lightweight APIs for prototype applications",
          "Developed webhook handlers for third-party integrations",
          "Created custom web services with minimal overhead",
        ],
      },
      {
        name: "Gin",
        icon: <SiGin className="w-5 h-5" />,
        color: "teal",
        usage: [
          "Built high-performance REST APIs with Go",
          "Developed microservices with efficient routing",
          "Created middleware for request processing and logging",
        ],
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
        usage: [
          "Designed complex relational schemas for web applications",
          "Optimized queries for large datasets with indexing strategies",
          "Implemented data backup and recovery procedures",
        ],
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-5 h-5" />,
        color: "green",
        usage: [
          "Built flexible document-based data models",
          "Developed real-time applications with change streams",
          "Created aggregation pipelines for data analysis",
        ],
      },
      {
        name: "Redis",
        icon: <SiRedis className="w-5 h-5" />,
        color: "red",
        usage: [
          "Implemented caching strategies for improved performance",
          "Built session management for web applications",
          "Created real-time pub/sub messaging systems",
        ],
      },
      {
        name: "SQLite",
        icon: <SiSqlite className="w-5 h-5" />,
        color: "blue",
        usage: [
          "Built lightweight desktop applications with local storage",
          "Developed mobile apps with embedded database",
          "Created prototypes and testing environments",
        ],
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
        usage: [
          "Containerized applications for consistent deployment",
          "Built multi-stage Docker builds for optimized images",
          "Created development environments with docker-compose",
        ],
      },
      {
        name: "Kubernetes",
        icon: <SiKubernetes className="w-5 h-5" />,
        color: "blue",
        usage: [
          "Deployed scalable applications with auto-scaling",
          "Managed service discovery and load balancing",
          "Implemented rolling updates and health checks",
        ],
      },
      {
        name: "Git",
        icon: <SiGit className="w-5 h-5" />,
        color: "red",
        usage: [
          "Managed complex branching strategies for team collaboration",
          "Implemented automated workflows with Git hooks",
          "Created release management processes",
        ],
      },
      {
        name: "Jenkins",
        icon: <SiJenkins className="w-5 h-5" />,
        color: "text",
        usage: [
          "Built CI/CD pipelines for automated testing and deployment",
          "Created automated code quality checks and reporting",
          "Implemented multi-environment deployment strategies",
        ],
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

export const skillPoints = [
  "I've become quite fluent in JavaScript and TypeScript over the years. They're my go-to languages for most projects, and I love how they've evolved. React is where I spend most of time, building interfaces that people actually enjoy using.",

  "On the backend, I'm comfortable with Node.js and Express, but I've also ventured into Python with FastAPI and Django. I believe in choosing the right tool for the job — sometimes that's Go when performance really matters.",

  "Databases are my playground! From PostgreSQL for structured data to MongoDB when I need more flexibility. I've developed a weird appreciation for database optimization — there's something satisfying about a well-indexed query.",

  "Docker containers have changed how I build and deploy. Combined with some Kubernetes for orchestration, I can create environments that are consistent and scalable. That's been a game-changer for reliability.",

  "Right now, I'm diving deeper into vector databases and RAG patterns for AI applications. I'm always learning something new — currently exploring React Native for mobile development and fascinated by compiler design.",

  "My journey started with jQuery and PHP years ago, and I still appreciate what they taught me. Each technology I've worked with has added something valuable to my approach to problem-solving.",
];
