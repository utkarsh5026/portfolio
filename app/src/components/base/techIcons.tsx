import {
  FaReact,
  FaNode,
  FaPython,
  FaAws,
  FaDocker,
  FaLinux,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiGo,
  SiFastapi,
  SiSqlite,
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc";

const techIconMap: { [key: string]: JSX.Element } = {
  React: <FaReact className="text-[#61DAFB]" />,
  Node: <FaNode className="text-[#339933]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  Python: <FaPython className="text-[#3776AB]" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  PostgreSQL: <SiPostgresql className="text-yellow-500" />,
  AWS: <FaAws className="text-[#FF9900]" />,
  Sqlite: <SiSqlite className="text-yellow-500" />,
  Docker: <FaDocker className="text-[#2496ED]" />,
  Go: <SiGo className="text-[#00ADD8]" />,
  Golang: <SiGo className="text-[#00ADD8]" />,
  FastAPI: <SiFastapi className="text-[#00ADD8]" />,
  Linux: <FaLinux className="text-[#FCC624]" />,
  PowerShell: <VscTerminalPowershell className="text-[#5399D6]" />,
};

export default techIconMap;
