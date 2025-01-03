import type { Technology } from "@/types";
import {
  SiGo,
  SiReact,
  SiFastapi,
  SiPython,
  SiMongodb,
  SiKubernetes,
  SiTypescript,
  SiDocker,
  SiPostgresql,
  SiSqlite,
  SiJavascript,
} from "react-icons/si";
import { FaAws, FaLinux, FaNode } from "react-icons/fa";
import { VscTerminalPowershell } from "react-icons/vsc";

export const technologies: Record<string, Technology> = {
  golang: {
    name: "Golang",
    aboutLink: "https://go.dev/",
    icon: <SiGo className="text-[#00ADD8]" />,
  },
  react: {
    name: "React",
    aboutLink: "https://reactjs.org/",
    icon: <SiReact className="text-[#61DAFB]" />,
  },
  fastapi: {
    name: "FastAPI",
    aboutLink: "https://fastapi.tiangolo.com/",
    icon: <SiFastapi className="text-[#009688]" />,
  },
  python: {
    name: "Python",
    aboutLink: "https://www.python.org/",
    icon: <SiPython className="text-[#3776AB]" />,
  },
  docker: {
    name: "Docker",
    aboutLink: "https://www.docker.com/",
    icon: <SiDocker className="text-[#2496ED]" />,
  },
  mongodb: {
    name: "MongoDB",
    aboutLink: "https://www.mongodb.com/",
    icon: <SiMongodb className="text-[#47A248]" />,
  },
  kubernetes: {
    name: "Kubernetes",
    aboutLink: "https://kubernetes.io/",
    icon: <SiKubernetes className="text-[#326CE5]" />,
  },
  typescript: {
    name: "TypeScript",
    aboutLink: "https://www.typescriptlang.org/",
    icon: <SiTypescript className="text-[#3178C6]" />,
  },
  postgresql: {
    name: "PostgreSQL",
    aboutLink: "https://www.postgresql.org/",
    icon: <SiPostgresql className="text-yellow-500" />,
  },
  aws: {
    name: "AWS",
    aboutLink: "https://aws.amazon.com/",
    icon: <FaAws className="text-[#FF9900]" />,
  },
  sqlite: {
    name: "SQLite",
    aboutLink: "https://www.sqlite.org/",
    icon: <SiSqlite className="text-yellow-500" />,
  },
  linux: {
    name: "Linux",
    aboutLink: "https://www.linux.org/",
    icon: <FaLinux className="text-[#FCC624]" />,
  },
  powershell: {
    name: "PowerShell",
    aboutLink: "https://docs.microsoft.com/en-us/powershell/",
    icon: <VscTerminalPowershell className="text-[#2D7DD2]" />,
  },
  node: {
    name: "Node",
    aboutLink: "https://nodejs.org/",
    icon: <FaNode className="text-[#339933]" />,
  },
  javascript: {
    name: "JavaScript",
    aboutLink: "https://www.javascript.com/",
    icon: <SiJavascript className="text-[#F7DF1E]" />,
  },
};
