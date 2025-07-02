import { SectionType } from "../context/explorer-context";
import {
  FaHome,
  FaLaptopCode,
  FaStar,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaGraduationCap,
  FaNewspaper,
} from "react-icons/fa";

export const sectionIconMap: Record<SectionType, React.ReactNode> = {
  home: <FaHome />,
  projects: <FaLaptopCode />,
  skills: <FaStar />,
  about: <FaUser />,
  experience: <FaBriefcase />,
  contact: <FaEnvelope />,
  learning: <FaGraduationCap />,
  articles: <FaNewspaper />,
};

export const getIconColor = (section: SectionType): string => {
  switch (section) {
    case "home":
      return "text-ctp-red";
    case "projects":
      return "text-ctp-green";
    case "skills":
      return "text-ctp-yellow";
    case "about":
      return "text-ctp-blue";
    case "experience":
      return "text-ctp-mauve";
    case "contact":
      return "text-ctp-pink";
    case "articles":
      return "text-ctp-teal";
    case "learning":
      return "text-ctp-sapphire";
    default:
      return "text-ctp-blue";
  }
};

// Gets color for active tab indicator
export const getActiveTabColor = (section: SectionType): string => {
  switch (section) {
    case "home":
      return "from-ctp-red to-ctp-peach";
    case "projects":
      return "from-ctp-green to-ctp-teal";
    case "skills":
      return "from-ctp-yellow to-ctp-peach";
    case "about":
      return "from-ctp-blue to-ctp-lavender";
    case "experience":
      return "from-ctp-mauve to-ctp-pink";
    case "contact":
      return "from-ctp-pink to-ctp-red";
    case "articles":
      return "from-ctp-teal to-ctp-green";
    case "learning":
      return "from-ctp-sapphire to-ctp-blue";
    default:
      return "from-ctp-blue to-ctp-lavender";
  }
};
