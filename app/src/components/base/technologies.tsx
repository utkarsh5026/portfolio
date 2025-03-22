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
  SiGin,
  SiFirebase,
  SiGit,
  SiGraphql,
  SiApollographql,
} from "react-icons/si";
import { FaAws, FaLinux, FaNode } from "react-icons/fa";
import { VscTerminalPowershell, VscEditorLayout } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import { GoCommandPalette } from "react-icons/go";
import { GiCobra } from "react-icons/gi";

export const technologies = {
  golang: {
    name: "Golang",
    aboutLink: "https://go.dev/",
    icon: <SiGo className="text-ctp-sky" />,
  },
  react: {
    name: "React",
    aboutLink: "https://reactjs.org/",
    icon: <SiReact className="text-ctp-blue" />,
  },
  fastapi: {
    name: "FastAPI",
    aboutLink: "https://fastapi.tiangolo.com/",
    icon: <SiFastapi className="text-ctp-teal" />,
  },
  python: {
    name: "Python",
    aboutLink: "https://www.python.org/",
    icon: <SiPython className="text-ctp-blue" />,
  },
  docker: {
    name: "Docker",
    aboutLink: "https://www.docker.com/",
    icon: <SiDocker className="text-ctp-blue" />,
  },
  mongodb: {
    name: "MongoDB",
    aboutLink: "https://www.mongodb.com/",
    icon: <SiMongodb className="text-ctp-green" />,
  },
  kubernetes: {
    name: "Kubernetes",
    aboutLink: "https://kubernetes.io/",
    icon: <SiKubernetes className="text-ctp-blue" />,
  },
  typescript: {
    name: "TypeScript",
    aboutLink: "https://www.typescriptlang.org/",
    icon: <SiTypescript className="text-ctp-blue" />,
  },
  postgresql: {
    name: "PostgreSQL",
    aboutLink: "https://www.postgresql.org/",
    icon: <SiPostgresql className="text-ctp-blue" />,
  },
  aws: {
    name: "AWS",
    aboutLink: "https://aws.amazon.com/",
    icon: <FaAws className="text-ctp-peach" />,
  },
  sqlite: {
    name: "SQLite",
    aboutLink: "https://www.sqlite.org/",
    icon: <SiSqlite className="text-ctp-blue" />,
  },
  linux: {
    name: "Linux",
    aboutLink: "https://www.linux.org/",
    icon: <FaLinux className="text-ctp-yellow" />,
  },
  powershell: {
    name: "PowerShell",
    aboutLink: "https://docs.microsoft.com/en-us/powershell/",
    icon: <VscTerminalPowershell className="text-ctp-blue" />,
  },
  node: {
    name: "Node",
    aboutLink: "https://nodejs.org/",
    icon: <FaNode className="text-ctp-green" />,
  },
  javascript: {
    name: "JavaScript",
    aboutLink: "https://www.javascript.com/",
    icon: <SiJavascript className="text-ctp-yellow" />,
  },
  rest: {
    name: "REST",
    aboutLink: "https://restfulapi.net/",
    icon: <TbApi className="text-ctp-yellow" />,
  },
  django: {
    name: "Django",
    aboutLink: "https://www.djangoproject.com/",
    icon: <SiDjango className="text-ctp-green" />,
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
    icon: <SiPoetry className="text-ctp-blue" />,
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
  gin: {
    name: "Gin",
    aboutLink: "https://gin-gonic.com/",
    icon: <SiGin className="text-ctp-pink" />,
  },
  firebase: {
    name: "Firebase",
    aboutLink: "https://firebase.google.com/",
    icon: <SiFirebase className="text-ctp-peach" />,
  },
  cobra: {
    name: "Cobra",
    aboutLink: "https://github.com/spf13/cobra",
    icon: <GiCobra className="text-ctp-green" />,
  },
  git: {
    name: "Git",
    aboutLink: "https://git-scm.com/",
    icon: <SiGit className="text-ctp-red" />,
  },
  graphql: {
    name: "GraphQL",
    aboutLink: "https://graphql.org/",
    icon: <SiGraphql className="text-ctp-pink" />,
  },
  apollo: {
    name: "Apollo",
    aboutLink: "https://www.apollographql.com/",
    icon: <SiApollographql className="text-ctp-pink" />,
  },
} as const;

export type TechName = keyof typeof technologies;
