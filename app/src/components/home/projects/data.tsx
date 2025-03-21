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

const portfolioTech = {
  name: "Modern React Portfolio",
  description:
    "A sophisticated, VS Code-themed portfolio website built with React, TypeScript, and Tailwind CSS, featuring interactive components, smooth animations, and a guided tour experience.",
  githubLink: "https://github.com/utkarsh5026/Portfolio",
  liveLink: "https://utkarsh5026.github.io/",
  technologies: [
    { name: "React", aboutLink: "https://reactjs.org/" },
    { name: "TypeScript", aboutLink: "https://www.typescriptlang.org/" },
    { name: "Tailwind CSS", aboutLink: "https://tailwindcss.com/" },
    { name: "Vite", aboutLink: "https://vitejs.dev/" },
    { name: "Framer Motion", aboutLink: "https://www.framer.com/motion/" },
    { name: "AnimeJS", aboutLink: "https://animejs.com/" },
    { name: "shadcn/ui", aboutLink: "https://ui.shadcn.com/" },
    { name: "Lucide Icons", aboutLink: "https://lucide.dev/" },
    {
      name: "React Icons",
      aboutLink: "https://react-icons.github.io/react-icons/",
    },
  ],
  features: [
    "VS Code-inspired UI with syntax highlighting and editor-like interface",
    "Interactive guided tour with step-by-step navigation",
    "Smooth animations and transitions throughout the interface",
    "Responsive design for all device sizes",
    "Dark mode support with Catppuccin color palette",
    "Modular component architecture",
    "Code splitting and lazy loading for performance optimization",
    "Type-safe development with TypeScript",
    "Custom hooks for reusable functionality",
  ],
  techStack: {
    "Core Framework": [
      "React 18.3.1 - For building the UI components and managing state",
      "TypeScript - For type safety and improved developer experience",
      "Vite - For fast development and optimized builds",
    ],
    "Styling & UI": [
      "Tailwind CSS - For utility-first styling approach",
      "shadcn/ui - For accessible and customizable UI components",
      "Catppuccin color palette - For a cohesive and modern color scheme",
      "CSS Variables - For theme customization and consistency",
    ],
    "Animation & Interactions": [
      "Framer Motion - For declarative animations and gestures",
      "AnimeJS - For advanced timeline-based animations",
      "CSS Transitions - For simple hover effects and state changes",
      "Custom animation hooks - For reusable animation logic",
    ],
    "Icons & Media": [
      "Lucide Icons - For consistent and scalable line icons",
      "React Icons - For expanded icon library access",
      "SVG - For scalable vector graphics and animations",
    ],
    "State Management": [
      "React Context API - For global state management",
      "Custom hooks - For reusable state logic",
      "Prop drilling minimization - Through context providers",
    ],
    "Performance Optimization": [
      "Code splitting - For smaller initial bundle size",
      "Lazy loading - For components and routes",
      "Memoization - For preventing unnecessary re-renders",
      "useCallback and useMemo - For optimized function and value creation",
    ],
    "Developer Experience": [
      "ESLint - For code quality and consistency",
      "Path aliases - For cleaner imports",
      "Component organization - For maintainable codebase structure",
      "Reusable utility functions - For common operations",
    ],
    Deployment: [
      "GitHub Pages - For hosting the static site",
      "Vercel - For preview deployments",
      "Build optimization - For reduced bundle size",
    ],
  },
  explain: [
    "I built this portfolio to showcase my skills and projects. It's a modern, VS Code-inspired website that features interactive components, smooth animations, and a guided tour experience. I wanted to create a portfolio that was both functional and visually appealing, and I think I succeeded.",
    "I used React, TypeScript, and Tailwind CSS to build the portfolio. I also used Framer Motion for the animations and shadcn/ui for the UI components. I also used Lucide Icons for the icons and AnimeJS for the animations.",
    "I used Vite to build the project and GitHub Pages to host it. I also used Vercel for preview deployments.",
  ],
};

const mayonation = {
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
  tags: ["Animation", "TypeScript", "CSS", "SVG", "NodeJS"],
  explain: [
    "I created this animation library because I was tired of the options available - either using bare CSS animations which get complex quickly, or heavy libraries that had way more features than I needed. I wanted something in between that would make it easy to create smooth animations with a simple API.",
    "The main feature I'm happy with is the timeline system for coordinating sequences of animations. It lets you precisely control when different animations start and end relative to each other. The API is designed to be readable and chainable, so you can understand what's happening just by looking at the code - which is important when you come back to it months later.",
    "I built it without any dependencies, focusing on using the browser's native animation capabilities for the best performance. It started as something for my own projects, but I've shared it with other developers who've found it useful too. It's satisfying to see animations that would have taken hundreds of lines of CSS or JavaScript done in just a few lines.",
  ],
  techStack: {
    "Core Technology": [
      "TypeScript - For type-safe development and improved developer experience",
      "ESNext - Leveraging modern JavaScript features for cleaner code",
      "Zero dependencies - Built without external libraries for minimal bundle size",
    ],
    "Animation Engine": [
      "requestAnimationFrame - For optimized animation loop and 60fps performance",
      "CSS Transitions - Integration with native browser transitions",
      "SVG Manipulation - Direct control of SVG paths and attributes",
      "CSS Custom Properties - Dynamic property updates without DOM thrashing",
    ],
    "Development Tools": [
      "Vite - For lightning-fast development and optimized builds",
      "TypeScript Compiler - For type checking and transpilation",
      "Jest - For unit testing animation behaviors",
      "ESLint - For code quality enforcement",
      "TSDoc - For comprehensive API documentation",
    ],
    "Design Patterns": [
      "Fluent Interface - Chainable methods for intuitive animation definition",
      "Factory Pattern - For creating animation instances",
      "Observer Pattern - For event handling and callbacks",
      "Composition - For building complex animations from simple ones",
    ],
    "Performance Optimization": [
      "Batched DOM Updates - Minimizing browser reflows and repaints",
      "GPU Acceleration - Utilizing transform and opacity for hardware-accelerated animations",
      "Optimized Easing Functions - Pre-calculated easing curves for smooth animations",
      "Memory Management - Proper cleanup of animation instances to prevent memory leaks",
    ],
  },
};

const gep = {
  name: "GEP: AI-Powered Code Search",
  description:
    "An intelligent code search and analysis tool that combines semantic understanding with traditional search capabilities. GEP uses vector embeddings and large language models to understand code at a conceptual level, enabling developers to search their codebase using natural language queries and receive contextually relevant results with detailed explanations.",
  githubLink: "https://github.com/utkarsh5026/gep",
  technologies: [
    { name: "Python", aboutLink: "https://www.python.org/" },
    { name: "FastAPI", aboutLink: "https://fastapi.tiangolo.com/" },
    { name: "LangChain", aboutLink: "https://langchain.com/" },
    { name: "SQLAlchemy", aboutLink: "https://www.sqlalchemy.org/" },
    { name: "Rich", aboutLink: "https://github.com/Textualize/rich" },
    { name: "Poetry", aboutLink: "https://python-poetry.org/" },
    { name: "Docker", aboutLink: "https://www.docker.com/" },
  ],
  features: [
    "Natural language code search using semantic understanding",
    "Vector embeddings for efficient similarity search across the codebase",
    "LLM-powered code analysis and explanation",
    "File change monitoring with automatic indexing",
    "Integration with multiple vector stores (FAISS, Chroma)",
    "Support for multiple embedding and LLM providers",
    "Git repository integration for commit history analysis",
    "CLI interface with rich formatting and interactive components",
    "Incremental indexing to efficiently handle large codebases",
    "Docker support for easy deployment and containerization",
  ],
  techStack: {
    "Core Framework": [
      "Python 3.12 - For robust backend processing and language features",
      "LangChain - For orchestrating LLMs and embeddings in the workflow",
      "FAISS - For high-performance vector similarity search",
      "FastAPI - For the API server with automatic OpenAPI documentation",
      "SQLAlchemy - For database interactions and ORM functionality",
    ],
    "AI & Machine Learning": [
      "OpenAI API - For embedding generation and code analysis",
      "Vector embeddings - For semantic code representation",
      "Multiple LLM support - Including GPT-4o, Claude, Gemini models",
      "Custom prompt engineering - For specialized code analysis tasks",
      "Batched processing - For efficient handling of large codebases",
    ],
    "Search & Indexing": [
      "Incremental indexing - For efficiently updating the vector database",
      "File change detection - Using watchdog for real-time updates",
      "Multiple vector store support - Including FAISS, Chroma, and extensible design",
      "Gitignore integration - For respecting project ignore patterns",
      "Chunking strategies - For appropriate code segmentation by language",
    ],
    "Git Integration": [
      "GitPython - For repository analysis and interaction",
      "Commit history analysis - For understanding code evolution",
      "Diff processing - For tracking and analyzing code changes",
      "Branch management - For working with different code versions",
    ],
    "CLI & Interface": [
      "Rich - For beautiful terminal output with colors and formatting",
      "Rich Click - For enhanced command-line interfaces",
      "Async streaming - For real-time search results and analysis",
      "Progress indicators - For long-running operations feedback",
      "Interactive components - For improved user experience",
    ],
    "Project Structure": [
      "Modular architecture - For maintainability and extensibility",
      "Command pattern - For CLI command organization",
      "Strategy pattern - For interchangeable embedding and LLM providers",
      "Dependency injection - For flexible component configuration",
      "Async/await throughout - For non-blocking operations",
    ],
    DevOps: [
      "Poetry - For dependency management and packaging",
      "Docker - For containerization and deployment",
      "Configuration management - For flexible environment setup",
      "Cross-platform support - For Windows, macOS, and Linux",
      "Executable builds - Using PyInstaller for standalone distribution",
    ],
  },
  explain: [
    "I built GEP to solve a frustrating problem I encountered regularly: searching through large codebases. Traditional tools like grep are great for exact pattern matching, but they fall short when you're trying to find code by concept or functionality, especially in unfamiliar codebases.",

    "What makes GEP different is its ability to understand code semantically. Instead of just matching text patterns, it uses vector embeddings to understand the meaning and purpose of code. This means you can search with natural language like 'how does the authentication system work?' and get relevant results even if those exact words don't appear in the code.",

    "The architecture combines several advanced technologies: code is processed and embedded using language models, stored in vector databases for efficient similarity search, and then retrieved and analyzed when needed. I implemented file monitoring to keep the index up-to-date as code changes, and integrated with Git to provide context around when and why code evolved.",

    "One of the most satisfying aspects was building the semantic search capability. By generating embeddings for code chunks and queries, the tool can find conceptually similar code regardless of specific syntax or naming conventions. The challenge was balancing embedding granularity - too small and you lose context, too large and you lose precision.",

    "The project taught me a lot about working with vector databases, prompt engineering for code analysis, and building maintainable CLI applications. I'm particularly proud of the modular architecture that allows for different embedding models, LLMs, and vector stores to be swapped out as technology evolves.",
  ],
  highlights: [
    "Reduces time to understand unfamiliar codebases by enabling semantic search",
    "Processes and indexes code incrementally to handle repositories of any size",
    "Supports multiple AI providers to adapt to different needs and cost considerations",
    "Maintains context of code changes through Git integration",
    "Implements an extensible architecture that can evolve with AI technology",
  ],
  tags: ["Python", "AI", "Vector Search", "Code Analysis", "LLM", "CLI"],
};

const cope = {
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
  highlights: [
    "Built as part of the CodeCrafters platform challenge",
    "Implements core grep functionality in pure Go",
    "Includes comprehensive test coverage",
    "Uses modern Go tooling and practices (Go 1.22+)",
  ],
  tags: ["CLI", "Go", "Grep", "CodeCrafters"],
  explain: [
    "This was part of a CodeCrafters challenge where I built my own version of the grep command-line tool. If you're not familiar with grep, it's a utility that searches text files for lines that match patterns. I wanted to understand how text search tools actually work, so I implemented one from scratch rather than just using existing libraries.",
    "I focused on making it handle regular expressions efficiently even with really large files. Writing the pattern matching engine was trickier than I expected - there are a lot of edge cases to consider. I took a test-driven approach, writing tests for each feature before implementing it, which helped make sure everything worked correctly.",
    "I built it in Go, using its standard library and concurrency features. It was mainly an exercise to learn more about Go and text processing, but it turned out to be pretty useful. I actually use it quite often now when searching through code because it's fast even on large projects with millions of lines of code. It's nice when a learning project turns into something practical.",
  ],
  techStack: {
    "Language & Runtime": [
      "Go 1.22+ - For performance and strong standard library support",
      "Zero external dependencies - Using only standard library for stability and security",
    ],
    "Text Processing": [
      "Go regexp package - For pattern matching and regular expressions",
      "Bufio Scanner - For efficient line-by-line file processing",
      "UTF-8 Support - For handling international character sets",
    ],
    "Command-Line Interface": [
      "Flag package - For parsing command-line arguments and options",
      "Standard input/output streams - For Unix-style piping capability",
      "Error handling with exit codes - For proper CLI application behavior",
    ],
    "Development Methodology": [
      "Test-Driven Development - Writing tests before implementation",
      "Benchmarking - Performance testing and optimization",
      "Go tooling - Using go fmt, go vet, and go test",
      "Continuous Integration - Using GitHub Actions for automated testing",
    ],
    "Design Patterns": [
      "Strategy Pattern - For different search algorithms",
      "Factory Pattern - For creating appropriate searchers based on input",
      "Command Pattern - For encapsulating search operations",
    ],
  },
};

const current = {
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
  highlights: [
    "Custom implementation of the bencode format parser/encoder",
    "Efficient piece management with concurrent downloads",
    "Clean separation of concerns with modular package design",
    "Robust error handling and data verification",
    "Support for both single-file and multi-file torrents",
  ],
  tags: ["BitTorrent", "Go", "Network Programming", "CodeCrafters", "CLI"],
  explain: [
    "I've always been curious about how BitTorrent works, so I decided to build a torrent client from scratch. It turned out to be a really deep dive into networking and distributed systems - I had to implement everything from parsing torrent files to managing connections with peers and downloading file pieces in parallel.",
    "The most interesting part was figuring out the peer wire protocol - how torrent clients talk to each other. I built a system that requests different pieces of a file from multiple peers at the same time, verifies each piece with SHA1 hashing to make sure it's correct, and puts them all together. Seeing that first complete download finish correctly was pretty exciting.",
    "I wrote it in Go, which was perfect for this because of how it handles concurrent operations with goroutines. What started as a learning project actually ended up being quite fast - it can download files more quickly than some popular clients because of how it prioritizes which pieces to download first and which peers to connect to. I learned more about networking from this one project than from any course or book.",
  ],
  techStack: {
    "Language & Runtime": [
      "Go 1.20+ - Leveraging concurrency features with goroutines and channels",
      "Standard Library - Using net, io, and crypto packages for core functionality",
    ],
    "BitTorrent Protocol": [
      "Custom Bencode Parser - Implemented from scratch for .torrent file decoding",
      "Peer Wire Protocol - Implementation of the BitTorrent peer communication protocol",
      "Tracker Communication - HTTP and UDP tracker protocol support",
      "Distributed Hash Table (DHT) - For tracker-less operation",
    ],
    Networking: [
      "TCP Connection Pool - Managing multiple peer connections efficiently",
      "Handshake Protocol - Implementing BitTorrent peer handshake",
      "Message Framing - Handling BitTorrent protocol message boundaries",
      "Rate Limiting - Controlling upload and download bandwidth",
    ],
    Concurrency: [
      "Goroutines - For handling multiple simultaneous downloads",
      "Channels - For safe communication between concurrent processes",
      "Mutexes - For protecting shared state",
      "Context - For managing lifetime of operations",
    ],
    "Data Management": [
      "Piece Selection Algorithm - For optimizing download speed and availability",
      "SHA-1 Hashing - For verifying integrity of downloaded pieces",
      "File Management - Handling disk I/O and file assembly",
      "Buffer Pool - Reusing memory buffers for improved performance",
    ],
    "CLI Interface": [
      "Progress Display - Real-time download statistics and progress bars",
      "Configuration - Command-line options and configuration files",
      "Logging - Different verbosity levels for debugging",
    ],
  },
};

const pauth = {
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

  tags: ["OAuth", "Python", "Flask", "Django", "REST", "PKCE"],
  explain: [
    "I created this after implementing OAuth authentication for the third or fourth time and realizing I was solving the same problems over and over. Each time I'd have to handle all the OAuth flows, token storage, refreshing, and provider-specific quirks. I wanted something that would just handle all that for me regardless of which Python framework I was using.",
    "The library supports all the standard OAuth providers like Google and GitHub, but what I'm most happy with is the security features. It automatically implements PKCE (that's Proof Key for Code Exchange) which prevents certain types of attacks. Usually, you'd have to configure that manually, but I made it the default because good security shouldn't be optional.",
    "It has a really simple API - just a few lines of code to set up authentication, and the library handles all the complicated stuff in the background. It works with any Python web framework, so whether you're using Flask, Django, or something else, the integration is pretty much the same. It's saved me a ton of time in my own projects since I built it.",
  ],
  techStack: {
    "Language & Features": [
      "Python 3.10+ - Leveraging modern Python features",
      "Type Hints - For better developer experience and static analysis",
      "Async support - For non-blocking OAuth operations",
    ],
    "OAuth Implementation": [
      "OAuth 2.0 - Full implementation of the OAuth 2.0 specification",
      "PKCE Extension - Proof Key for Code Exchange for enhanced security",
      "JWT Handling - For token validation and parsing",
      "Auto Token Refresh - Background token refresh before expiration",
    ],
    "Framework Integration": [
      "Flask Integration - Middleware and extensions for Flask applications",
      "Django Integration - App and middleware for Django applications",
      "Framework-agnostic Core - Can be used with any Python web framework",
      "Starlette/FastAPI Support - Async-compatible middleware",
    ],
    "Provider Support": [
      "Multiple OAuth Providers - Google, GitHub, Facebook, Twitter, Microsoft",
      "Provider Abstraction - Consistent API across different providers",
      "Custom Provider Support - Extensible for any OAuth 2.0 compliant service",
    ],
    "Security Features": [
      "State Parameter Validation - Protection against CSRF attacks",
      "Token Encryption - Secure storage of sensitive tokens",
      "Scope Management - Fine-grained control over authorization scopes",
      "HTTPS Enforcement - Ensuring secure communication",
    ],
    "Storage & Persistence": [
      "Multiple Storage Backends - Redis, SQL, Memory, or custom implementations",
      "Session Integration - Works with various session backends",
      "Cookie Security - HTTP-only, SameSite, and Secure flags",
    ],
    "Development Tools": [
      "Comprehensive Testing - Unit and integration tests",
      "Documentation - Extensive usage examples and API reference",
      "Type Stubs - For IDE autocompletion and type checking",
    ],
  },
};

const reducer = {
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
  explain: [
    "I built this because I kept running into the same frustrations with Redux in my React projects. Don't get me wrong, Redux is great, but there's so much boilerplate code involved. I wanted something that kept the good parts of Redux - the predictable state updates and time-travel debugging - but without all the extra typing.",
    "The main idea was to create a more TypeScript-friendly state management library. I used TypeScript's type system to make everything type-safe without requiring tons of manual type declarations. I also integrated Immer which lets you write code that looks like you're directly modifying state (which is more intuitive) while still keeping the immutability benefits behind the scenes.",
    "What I like most about how it turned out is the way you can organize state by feature into slices that automatically get composed together. It makes the codebase a lot cleaner. I use this in my own projects now, and a few of my colleagues have started using it too after I showed it to them. It's nice to solve a problem that other people were having as well.",
  ],
  techStack: {
    "Language & Core": [
      "TypeScript - For type-safe state management",
      "Immer - For immutable state updates with mutable syntax",
      "ES6+ Features - Leveraging modern JavaScript capabilities",
    ],
    "State Management": [
      "Flux Architecture - One-way data flow pattern",
      "Immutable State - Ensuring predictable state transitions",
      "Action Creators - Type-safe functions for creating actions",
      "Reducers - Pure functions for state transitions",
      "Combined Reducers - For modular state composition",
    ],
    "Type System": [
      "Generic Types - For flexible and reusable components",
      "Discriminated Unions - For type-safe action handling",
      "Utility Types - For advanced type manipulations",
      "Type Inference - Minimizing explicit type annotations",
    ],
    "Middleware System": [
      "Redux-like Middleware - For extending functionality",
      "Thunk Implementation - For handling async actions",
      "Logger Middleware - For debugging state changes",
      "Middleware Composition - For combining multiple middlewares",
    ],
    "Performance Optimization": [
      "Selector Memoization - For efficient derived state",
      "Batched Updates - For minimizing re-renders",
      "State Normalization - For efficient updates and lookups",
    ],
    "Developer Experience": [
      "DevTools Integration - For time-travel debugging",
      "Hot Module Replacement - For development workflow",
      "Error Boundaries - For robust error handling",
    ],
    Testing: [
      "Jest - For unit testing",
      "Action Testing - Simplified action creator testing",
      "Reducer Testing - Pure function testing",
      "Integration Testing - Full store testing",
    ],
  },
};

const dss = {
  name: "Automotive Training & Workforce Analytics DSS",
  description:
    "A comprehensive analytics platform developed for Skoda Auto, Volkswagen, and Audi that transforms workforce development through data-driven insights. Processing over 200,000 training records, this system delivers actionable analytics on training effectiveness, employee development, and workforce trends through intuitive interactive dashboards, reducing analysis time from days to minutes.",

  githubLink: "private-repository",
  explain: [
    "So for this project, I worked with Skoda, VW, and Audi to help them track how their training programs were doing. They had all these training records - like over 200,000 of them - but no good way to see patterns or make decisions based on them. I basically built a system that could process all that data and show them what was actually happening with their workforce development.",
    "The cool thing was how it changed their workflow. Before, their managers would spend days trying to piece together Excel files to figure out if training was working. With this system, they could just open a dashboard and immediately see which trainers were effective, where employee retention was dropping, and compare performance across different brands. It cut analysis time from days to just minutes.",
    "Technically, I built it with Python and Django on the backend to handle all the data processing, with a React frontend for the visualizations. I added different access levels so executives see the big picture while team managers get more detailed views of their specific areas. It's one of those projects where you can clearly see the before and after difference it made in how they work.",
  ],
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
  techStack: {
    "Backend & Data Processing": [
      "Python 3.9 - Core language for backend development",
      "Django 4.0 - Web framework for application structure and ORM",
      "Pandas - For data manipulation and analysis",
      "NumPy - For numerical operations and calculations",
      "SQLite - For database storage in testing and development",
      "PostgreSQL - For production database deployment",
    ],
    "Data Visualization": [
      "Plotly - For interactive charts and dashboards",
      "D3.js - For custom visualizations",
      "Chart.js - For responsive chart rendering",
      "React-Plotly - For React integration of Plotly charts",
    ],
    Frontend: [
      "React - For building the user interface components",
      "Redux - For state management",
      "Material-UI - For UI component library",
      "Styled Components - For component styling",
      "Axios - For API communication",
    ],
    "API & Integration": [
      "Django REST Framework - For API endpoints",
      "Celery - For background task processing",
      "Redis - For caching and message broker",
      "JWT Authentication - For secure API access",
    ],
    "Analytics & Reporting": [
      "Custom Analytics Engine - For training effectiveness metrics",
      "Automated Report Generation - For periodic reports",
      "Excel Export - For data portability",
      "PDF Generation - For formal reporting",
    ],
    "Deployment & Infrastructure": [
      "Docker - For containerization",
      "Nginx - For web server and reverse proxy",
      "Gunicorn - For WSGI HTTP Server",
      "CI/CD Pipeline - For automated testing and deployment",
    ],
    "Security & Access Control": [
      "Role-based Access Control - For multi-level permissions",
      "Data Encryption - For sensitive information",
      "Audit Logging - For tracking system usage",
      "Cross-Origin Resource Sharing - For secure API access",
    ],
  },
};

const orchestra = {
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
  explain: [
    "I've been using Kubernetes for a while, but I realized I didn't fully understand how container orchestration actually works under the hood. So I decided to build my own lightweight version of it from scratch - not to replace Kubernetes, but to learn how all those pieces fit together.",
    "The most challenging part was building the scheduler that decides where to place containers based on resource availability. I also had to figure out service discovery so containers could find each other, and implement self-healing so if something crashed, the system would automatically restart it. It was complex but so satisfying when it all started working together.",
    "I wrote it in Go which was perfect for this kind of systems programming. What started as a learning project actually ended up being useful - it's much simpler than full Kubernetes, so it works well for small-scale deployments where Kubernetes would be overkill. A couple of IoT projects are using it now because it's lightweight enough to run on edge devices with limited resources.",
  ],
  techStack: {
    "Core Platform": [
      "Go 1.19+ - For performance and concurrency features",
      "gRPC - For inter-service communication",
      "Protocol Buffers - For service definitions and data serialization",
      "etcd - For distributed configuration and service discovery",
    ],
    "Container Management": [
      "containerd - For container runtime operations",
      "OCI Runtime Spec - For container standardization",
      "CNI (Container Network Interface) - For network management",
      "Container Storage Interface - For volume management",
    ],
    "Scheduling & Orchestration": [
      "Custom Scheduler - Algorithm for optimal container placement",
      "Node Agent - For managing container lifecycle on nodes",
      "Controller Pattern - For reconciling desired and actual state",
      "Operator Pattern - For managing complex applications",
    ],
    "Service Discovery & Networking": [
      "DNS-based Service Discovery - For service lookup",
      "Dynamic Proxy - For load balancing and routing",
      "Network Policy Implementation - For traffic control",
      "Health Checking - For service availability monitoring",
    ],
    Observability: [
      "Distributed Tracing - Using OpenTelemetry",
      "Metrics Collection - For system performance monitoring",
      "Structured Logging - For debugging and audit",
      "Health Monitoring - For cluster and service health",
    ],
    Security: [
      "Role-Based Access Control - For authorization",
      "mTLS - For secure service-to-service communication",
      "Secret Management - For sensitive configuration",
      "Network Policies - For traffic isolation",
    ],
    "High Availability": [
      "Leader Election - For control plane redundancy",
      "State Replication - For resilience against failures",
      "Automated Recovery - For self-healing capability",
      "Graceful Degradation - For handling partial failures",
    ],
    "Developer Tools": [
      "CLI Tool - For interacting with the platform",
      "API Client Libraries - For programmatic access",
      "Manifest Format - For declarative configuration",
      "Local Development Environment - For testing",
    ],
  },
};

const enigmaLanguageExplorer = {
  name: "Enigma Language Explorer",
  description:
    "An interactive educational platform for learning programming language concepts through visual exploration of lexical analysis, abstract syntax trees, and execution flow. Built with React and TypeScript, this IDE-inspired application demonstrates the inner workings of language interpretation by visualizing source code tokenization, parsing, and evaluation in real-time.",
  githubLink: "https://github.com/utkarsh5026/enigma",
  liveLink: "https://enigma-explorer.vercel.app/",
  technologies: [
    { name: "React", aboutLink: "https://reactjs.org/" },
    { name: "TypeScript", aboutLink: "https://www.typescriptlang.org/" },
    { name: "tailwind", aboutLink: "https://tailwindcss.com/" },
    {
      name: "Monaco",
      aboutLink: "https://microsoft.github.io/monaco-editor/",
    },
    { name: "shadcn", aboutLink: "https://ui.shadcn.com/" },
    { name: "framerMotion", aboutLink: "https://www.framer.com/motion/" },
    { name: "lucideIcons", aboutLink: "https://lucide.dev/" },
    { name: "vite", aboutLink: "https://vitejs.dev/" },
  ],
  features: [
    "IDE-like code editor with syntax highlighting and code completion",
    "Real-time lexical analysis with token visualization and categorization",
    "Interactive Abstract Syntax Tree (AST) visualization of parsed code",
    "Step-by-step execution visualizer with environment and call stack tracking",
    "Educational reference guide explaining language concepts and syntax",
    "Tokyo Night-inspired dark theme with semantic color coding",
    "Responsive design with intuitive layout for learning progression",
    "Built-in code examples and language reference documentation",
    "Zero-dependency language interpreter implemented in TypeScript",
    "Modular architecture separating lexical, syntactic, and semantic concerns",
  ],
  techStack: {
    "Core Framework": [
      "React 19 - For building the UI components with the latest React features",
      "TypeScript - For type safety throughout the application and language implementation",
      "Vite - For fast development experience and optimized production builds",
    ],
    "UI & Styling": [
      "Tailwind CSS - For utility-first styling approach with custom theming",
      "shadcn/ui - For accessible and customizable UI components",
      "Monaco Editor - For professional code editing with syntax highlighting",
      "Tokyo Night theme - Custom-adapted dark theme for consistent visual language",
      "CSS Variables - For theme consistency across components",
    ],
    "Language Implementation": [
      "Custom Lexer - For tokenizing source code with position tracking",
      "Recursive Descent Parser - For generating abstract syntax trees",
      "Evaluator - For interpreting the AST and executing code",
      "Environment system - For scope management and variable resolution",
      "Type system - For dynamic typing with type checking",
    ],
    "Visualization Components": [
      "Token Visualizer - For displaying lexical analysis results",
      "AST Tree View - For interactive syntax tree exploration",
      "Step-by-step Debugger - For execution flow visualization",
      "Environment Inspector - For tracking variable changes during execution",
      "Call Stack Visualizer - For function call tracking",
    ],
    "State Management": [
      "React Context API - For global state management",
      "Custom hooks - For encapsulating language processing logic",
      "Reducer pattern - For complex state transitions in the execution visualizer",
      "Local component state - For UI interactions",
    ],
    "Animations & Interactions": [
      "Framer Motion - For fluid animations and transitions",
      "CSS transitions - For subtle state changes and hover effects",
      "Collapsible panels - For information density management",
      "Tooltips - For explaining complex concepts inline",
    ],
    "Performance Optimization": [
      "Memoization - For expensive parsing and evaluation operations",
      "Lazy loading - For code splitting and component rendering",
      "Virtualized lists - For handling large token and AST displays",
      "Throttled updates - For smooth visualization during execution",
    ],
    "Developer Experience": [
      "Component architecture - For maintainable and reusable code",
      "Custom type definitions - For language implementation",
      "Documentation - For both user-facing guides and code comments",
      "Example programs - For demonstrating language features",
    ],
  },
  explain: [
    "I built Enigma Language Explorer to make programming language internals more accessible and visual. Most developers use languages every day but rarely understand how they work under the hood. By creating an interactive tool that shows each step from source code to execution, I wanted to demystify interpreter design and language theory.",
    "The core of the project is a complete implementation of a programming language interpreter with clear separation between lexical analysis (tokenization), syntactic analysis (parsing), and semantic analysis (evaluation). Each stage is visualized in real-time as users type or modify code, making abstract concepts concrete and interactive. The language itself is dynamically typed with first-class functions, closures, and other modern features.",
    "The most technically challenging aspect was building the step-by-step execution visualizer. It required redesigning the interpreter to support pausing and resuming execution at any point, capturing environment states, and visualizing the call stack without compromising the integrity of the execution model. I'm particularly proud of how it highlights the current AST node during execution, showing the direct connection between syntax and runtime behavior.",
    "I used React with TypeScript for the frontend, focusing on creating a responsive, IDE-like experience with Monaco Editor integration. The Tokyo Night-inspired theme enhances readability with semantic color coding for different language elements. The shadcn/ui component library provided a foundation for UI elements, which I extended with custom animations and visualizations using Framer Motion.",
    "This project combines my interests in programming languages, visual learning, and interactive educational tools. Beyond being a showcase of my technical skills, it's a genuine attempt to create something useful for developers who want to understand language implementation better. I've already used it myself to explain concepts like scoping, closures, and evaluation order to other developers.",
  ],
};

import type { Project } from "@/types";
import { technologies } from "@/components/base/technologies";

const smashLeetcode = {
  name: "Smash LeetCode",
  description:
    "A comprehensive full-stack platform for mastering coding interviews, featuring AI-powered explanations, interactive visualizations, and personalized learning paths. Built with React, TypeScript, and Python, this application helps developers practice algorithmic problem-solving with real-time feedback, animated algorithm visualizations, and detailed code analysis.",
  githubLink: "https://github.com/utkarsh5026/Smash-LeetCode",
  liveLink: "https://smash-leetcode.vercel.app/",
  technologies: [
    { name: "React", aboutLink: "https://reactjs.org/" },
    { name: "TypeScript", aboutLink: "https://www.typescriptlang.org/" },
    { name: "Python", aboutLink: "https://www.python.org/" },
    { name: "FastAPI", aboutLink: "https://fastapi.tiangolo.com/" },
    { name: "tailwind", aboutLink: "https://tailwindcss.com/" },
    { name: "redux", aboutLink: "https://redux-toolkit.js.org/" },
    { name: "framerMotion", aboutLink: "https://www.framer.com/motion/" },
    { name: "shadcn", aboutLink: "https://ui.shadcn.com/" },
    { name: "SQLAlchemy", aboutLink: "https://www.sqlalchemy.org/" },
    { name: "LangChain", aboutLink: "https://langchain.com/" },
    { name: "OpenAI", aboutLink: "https://openai.com/" },
  ],
  features: [
    "Interactive algorithm visualizations with step-by-step playback controls",
    "AI-powered code analysis and optimization suggestions",
    "Personalized learning paths based on skill level and progress",
    "Virtual coding coach with contextual hints and guidance",
    "Real-time code execution and testing",
    "Comprehensive problem library with difficulty filtering",
    "Time and space complexity analysis of solutions",
    "Alternative solution approaches with pros and cons",
    "Side-by-side comparison of user solutions with optimal approaches",
    "Responsive design for desktop and mobile learning",
    "Dark mode with Catppuccin-inspired color palette",
    "Performance metrics and progress tracking",
  ],
  techStack: {
    "Frontend Framework": [
      "React 19 - For building the modern, component-based UI",
      "TypeScript - For type safety and improved developer experience",
      "Vite - For rapid development and optimized production builds",
      "Redux Toolkit - For centralized application state management",
    ],
    "Styling & UI": [
      "Tailwind CSS 4 - For utility-first styling with modern features",
      "shadcn/ui - For accessible, customizable UI components",
      "Framer Motion - For fluid animations and transitions",
      "Lucide Icons - For consistent visual iconography",
      "Catppuccin-inspired color scheme - For eye-friendly aesthetics",
    ],
    "Backend & API": [
      "Python 3.12 - For efficient server-side operations",
      "FastAPI - For high-performance, type-safe API endpoints",
      "SQLAlchemy - For ORM-based database interactions",
      "Pydantic - For data validation and settings management",
      "LangChain - For integrating and orchestrating AI capabilities",
    ],
    "AI & Code Analysis": [
      "OpenAI GPT models - For code explanation and optimization",
      "LangChain - For prompt engineering and AI response processing",
      "Custom code parsers - For syntax highlighting and static analysis",
      "Algorithm visualization engine - For animated execution steps",
    ],
    "Database & Persistence": [
      "SQLite - For lightweight, portable database storage",
      "Async SQLAlchemy - For non-blocking database operations",
      "Redis - For caching frequently accessed data",
      "Session management - For user progress tracking",
    ],
    "Authentication & Security": [
      "JWT authentication - For secure user sessions",
      "Role-based access control - For feature permission management",
      "Rate limiting - For API protection",
      "Environment variable configuration - For sensitive credential management",
    ],
    "DevOps & Deployment": [
      "GitHub Actions - For CI/CD automation",
      "Docker - For containerized deployment",
      "Vercel - For frontend hosting",
      "Fly.io - For backend API hosting",
    ],
    "Testing & Quality": [
      "Jest - For frontend unit and component testing",
      "Pytest - For backend unit and integration testing",
      "ESLint - For code quality and consistency",
      "TypeScript static analysis - For type-safety enforcement",
    ],
  },
  explain: [
    "I built Smash LeetCode to address the challenges I personally faced when preparing for technical interviews. While practicing algorithmic problems, I found that existing platforms often lacked the depth of explanation and visualization tools needed to truly understand complex algorithms. I wanted to create a learning environment that not only tests your coding ability but actually teaches you the underlying concepts through interactive visuals and AI-powered guidance.",

    "The feature I'm most proud of is the algorithm visualization system, which transforms abstract code into animated, step-by-step visual representations. This makes it much easier to understand how algorithms like graph traversals or dynamic programming actually work. I put considerable effort into designing the visualization engine to handle different data structures elegantly - from arrays and linked lists to trees and graphs.",

    "The AI coaching component was another significant challenge. I integrated large language models with custom prompts to create contextual hints that guide without spoiling solutions. The system analyzes your code in real-time, identifying potential optimizations and explaining complex concepts in an approachable way. It's designed to simulate having a patient mentor who helps you think through problems rather than just giving you answers.",

    "From a technical perspective, I learned a tremendous amount about full-stack development with modern technologies. The frontend uses React 19 with TypeScript for a responsive, type-safe user experience, while the backend leverages FastAPI and SQLAlchemy for high-performance API endpoints. The project also gave me valuable experience integrating AI capabilities through LangChain and handling complex state management across a feature-rich application.",

    "This project ultimately became much more than just a portfolio piece - it's a tool I personally use every day to continue improving my algorithmic thinking skills. The feedback from other developers has been incredibly rewarding, particularly from those who previously struggled with visualizing how algorithms transform data structures.",
  ],
};

export const projects: Project[] = [
  dss,
  enigmaLanguageExplorer,
  orchestra,
  gep,
  smashLeetcode,
  reducer,
  pauth,
  current,
  cope,
  mayonation,
  portfolioTech,
] as const;

export default projects;
