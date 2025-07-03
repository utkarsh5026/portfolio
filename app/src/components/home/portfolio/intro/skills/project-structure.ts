export type FileItem = {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  extension?: string;
  description?: string;
  color: string;
  delay: number;
  depth: number;
};

export const projectStructure: FileItem[] = [
  {
    name: "frontend",
    type: "folder",
    color: "#89b4fa",
    delay: 0,
    depth: 0,
    children: [
      {
        name: "components",
        type: "folder",
        color: "#89b4fa",
        delay: 200,
        depth: 1,
        children: [
          {
            name: "App.tsx",
            type: "file",
            extension: "tsx",
            color: "#89b4fa",
            delay: 400,
            depth: 2,
            description:
              "I build dynamic user interfaces with React & TypeScript",
          },
          {
            name: "Button.tsx",
            type: "file",
            extension: "tsx",
            color: "#89b4fa",
            delay: 500,
            depth: 2,
            description: "Reusable components with TypeScript for type safety",
          },
        ],
      },
      {
        name: "styles",
        type: "folder",
        color: "#74c7ec",
        delay: 300,
        depth: 1,
        children: [
          {
            name: "globals.css",
            type: "file",
            extension: "css",
            color: "#74c7ec",
            delay: 600,
            depth: 2,
            description: "Custom CSS for pixel-perfect designs",
          },
          {
            name: "tailwind.config.js",
            type: "file",
            extension: "js",
            color: "#f9e2af",
            delay: 700,
            depth: 2,
            description: "I use Tailwind CSS for rapid UI development",
          },
        ],
      },
    ],
  },
  {
    name: "backend",
    type: "folder",
    color: "#a6e3a1",
    delay: 100,
    depth: 0,
    children: [
      {
        name: "server.js",
        type: "file",
        extension: "js",
        color: "#a6e3a1",
        delay: 800,
        depth: 1,
        description: "I build scalable REST APIs with Node.js & Express",
      },
      {
        name: "api.py",
        type: "file",
        extension: "py",
        color: "#f9e2af",
        delay: 900,
        depth: 1,
        description:
          "I create machine learning backends with Python, FastAPI and libraries like langchain",
      },
      {
        name: "main.go",
        type: "file",
        extension: "go",
        color: "#89b4fa",
        delay: 1000,
        depth: 1,
        description: "High-performance microservices built with Go",
      },
    ],
  },
  {
    name: "devops",
    type: "folder",
    color: "#cba6f7",
    delay: 150,
    depth: 0,
    children: [
      {
        name: "Dockerfile",
        type: "file",
        extension: "docker",
        color: "#74c7ec",
        delay: 1100,
        depth: 1,
        description: "I containerize applications with Docker for deployment",
      },
      {
        name: "k8s-deploy.yaml",
        type: "file",
        extension: "yaml",
        color: "#cba6f7",
        delay: 1200,
        depth: 1,
        description: "I deploy and scale applications using Kubernetes",
      },
      {
        name: ".gitignore",
        type: "file",
        extension: "git",
        color: "#f38ba8",
        delay: 1300,
        depth: 1,
        description:
          "I use Git for version control and collaborative development",
      },
    ],
  },
];
