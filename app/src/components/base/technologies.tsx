/**
 * Our technology stack configuration! 🚀
 *
 * This is where we keep track of all the tech we use or know about.
 * Each entry includes:
 * - The tech's display name
 * - A link to learn more about it
 * - Its official icon (with the correct brand color!)
 *
 * We use this to power our tech badges throughout the site -
 * just import the technologies object and grab what you need!
 */

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
  SiDjango,
  SiFlask,
  SiBittorrent,
  SiAxios,
  SiMui,
  SiMysql,
  SiPlotly,
  SiPandas,
  SiCss3,
  SiSvg,
  SiLangchain,
  SiSqlalchemy,
  SiPoetry,
  SiRich,
  SiShadcnui,
  SiLucide,
  SiFramer,
  SiVite,
  SiTailwindcss,
  SiRedux,
} from "react-icons/si";
import { FaAws, FaLinux, FaNode } from "react-icons/fa";
import { VscTerminalPowershell, VscEditorLayout } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import { GoCommandPalette } from "react-icons/go";

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
  rest: {
    name: "REST",
    aboutLink: "https://restfulapi.net/",
    icon: <TbApi className="text-[#F7DF1E]" />,
  },
  django: {
    name: "Django",
    aboutLink: "https://www.djangoproject.com/",
    icon: <SiDjango className="text-[#0F4D32]" />,
  },
  flask: {
    name: "Flask",
    aboutLink: "https://flask.palletsprojects.com/",
    icon: <SiFlask />,
  },
  bittorrent: {
    name: "BitTorrent",
    aboutLink: "https://en.wikipedia.org/wiki/BitTorrent",
    icon: <SiBittorrent />,
  },
  cli: {
    name: "CLI",
    aboutLink: "https://en.wikipedia.org/wiki/Command-line_interface",
    icon: <GoCommandPalette />,
  },
  axios: {
    name: "Axios",
    aboutLink: "https://axios-http.com/",
    icon: <SiAxios />,
  },
  materialui: {
    name: "Material-UI",
    aboutLink: "https://mui.com/",
    icon: <SiMui />,
  },
  mysql: {
    name: "MySQL",
    aboutLink: "https://www.mysql.com/",
    icon: <SiMysql />,
  },
  plotly: {
    name: "Plotly",
    aboutLink: "https://plotly.com/",
    icon: <SiPlotly />,
  },
  pandas: {
    name: "Pandas",
    aboutLink: "https://pandas.pydata.org/",
    icon: <SiPandas />,
  },
  css: {
    name: "CSS",
    aboutLink: "https://www.w3.org/Style/CSS/",
    icon: <SiCss3 />,
  },
  svg: {
    name: "SVG",
    aboutLink: "https://www.w3.org/Graphics/SVG/",
    icon: <SiSvg />,
  },
  langchain: {
    name: "LangChain",
    aboutLink: "https://www.langchain.com/",
    icon: <SiLangchain />,
  },
  sqlalchemy: {
    name: "SQLAlchemy",
    aboutLink: "https://www.sqlalchemy.org/",
    icon: <SiSqlalchemy />,
  },
  poetry: {
    name: "Poetry",
    aboutLink: "https://python-poetry.org/",
    icon: <SiPoetry className="text-[#3776AB]" />,
  },
  rich: {
    name: "Rich",
    aboutLink: "https://rich.readthedocs.io/en/stable/",
    icon: <SiRich className="text-ctp-mauve" />,
  },
  monaco: {
    name: "Monaco Editor",
    aboutLink: "https://microsoft.github.io/monaco-editor/",
    icon: <VscEditorLayout className="text-ctp-pink" />,
  },
  shadcn: {
    name: "shadcn/ui",
    aboutLink: "https://ui.shadcn.com/",
    icon: <SiShadcnui className="text-ctp-pink" />,
  },
  framermotion: {
    name: "Framer Motion",
    aboutLink: "https://www.framer.com/motion/",
    icon: <SiFramer className="text-ctp-pink" />,
  },
  lucideicons: {
    name: "Lucide Icons",
    aboutLink: "https://lucide.dev/",
    icon: <SiLucide className="text-ctp-pink" />,
  },
  vite: {
    name: "Vite",
    aboutLink: "https://vitejs.dev/",
    icon: <SiVite className="text-ctp-yellow" />,
  },
  tailwind: {
    name: "Tailwind CSS",
    aboutLink: "https://tailwindcss.com/",
    icon: <SiTailwindcss className="text-ctp-pink" />,
  },
  redux: {
    name: "Redux Toolkit",
    aboutLink: "https://redux-toolkit.js.org/",
    icon: <SiRedux className="text-ctp-pink" />,
  },
};
