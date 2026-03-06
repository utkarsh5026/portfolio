import React from "react";
import { FaAws } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { MdApi, MdAutoGraph } from "react-icons/md";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";

export const skillIcons: Record<string, React.ElementType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Redux: SiRedux,
  "React Query": SiReactquery,

  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  Go: SiGo,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  MySQL: SiMysql,
  GraphQL: SiGraphql,
  "REST API Design": MdApi,

  AWS: FaAws,
  "Google Cloud Platform": SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  "CI/CD": MdAutoGraph,
  "GitHub Actions": SiGithubactions,

  Git: SiGit,
  GitHub: SiGithub,
  "Agile Methodologies": VscSymbolMethod,
  "Unit Testing": GrTest,
  "E2E Testing": GrTest,
};

export const skillColors: Record<string, string> = {
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Styled Components": "#DB7093",
  Redux: "#764ABC",
  "React Query": "#FF4154",

  "Node.js": "#339933",
  Express: "#000000",
  Python: "#3776AB",
  Go: "#00ADD8",
  MongoDB: "#47A248",
  PostgreSQL: "#4169E1",
  Redis: "#DC382D",
  MySQL: "#4479A1",
  GraphQL: "#E10098",
  "REST API Design": "#FF6C37",

  AWS: "#FF9900",
  "Google Cloud Platform": "#4285F4",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  "CI/CD": "#2088FF",
  "GitHub Actions": "#2088FF",

  Git: "#F05032",
  GitHub: "#2496ED",
  "Agile Methodologies": "#0052CC",
  "Unit Testing": "#25A162",
  "E2E Testing": "#69D3A7",
};
