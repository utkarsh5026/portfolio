import { FaTerminal, FaDatabase, FaServer, FaMagic } from "react-icons/fa";
import { RiCodeSSlashLine } from "react-icons/ri";
import { VscDebugConsole, VscSymbolClass } from "react-icons/vsc";
import { SiGraphql } from "react-icons/si";

const iconMap = {
  terminal: <FaTerminal className="text-ctp-red" />,
  code: <RiCodeSSlashLine className="text-ctp-green" />,
  debug: <VscDebugConsole className="text-ctp-yellow" />,
  class: <VscSymbolClass className="text-ctp-blue" />,
  api: <SiGraphql className="text-ctp-mauve" />,
  database: <FaDatabase className="text-ctp-sapphire" />,
  server: <FaServer className="text-ctp-teal" />,
  magic: <FaMagic className="text-ctp-pink" />,
};

/**
 * Retrieves the corresponding icon component for a given icon name.
 *
 * @param {string} icon - The name of the icon to retrieve. It should match one of the keys in the iconMap.
 * @returns {JSX.Element | undefined} The icon component associated with the provided name, or undefined if the name is not found.
 */
export const getIcon = (icon: string) => {
  return iconMap[icon as keyof typeof iconMap];
};

export const sectionColorSchemes = {
  home: {
    primary: "ctp-blue",
    secondary: "ctp-sapphire",
    accent: "ctp-sky",
    gradient: "from-ctp-blue via-ctp-sapphire to-ctp-sky",
  },
  about: {
    primary: "ctp-mauve",
    secondary: "ctp-pink",
    accent: "ctp-lavender",
    gradient: "from-ctp-mauve via-ctp-pink to-ctp-lavender",
  },
  skills: {
    primary: "ctp-green",
    secondary: "ctp-teal",
    accent: "ctp-sapphire",
    gradient: "from-ctp-green via-ctp-teal to-ctp-sapphire",
  },
  projects: {
    primary: "ctp-yellow",
    secondary: "ctp-peach",
    accent: "ctp-red",
    gradient: "from-ctp-yellow via-ctp-peach to-ctp-red",
  },
  experience: {
    primary: "ctp-blue",
    secondary: "ctp-lavender",
    accent: "ctp-mauve",
    gradient: "from-ctp-blue via-ctp-lavender to-ctp-mauve",
  },
  contact: {
    primary: "ctp-pink",
    secondary: "ctp-mauve",
    accent: "ctp-flamingo",
    gradient: "from-ctp-pink via-ctp-mauve to-ctp-flamingo",
  },
  learning: {
    primary: "ctp-peach",
    secondary: "ctp-yellow",
    accent: "ctp-green",
    gradient: "from-ctp-peach via-ctp-yellow to-ctp-green",
  },
  articles: {
    primary: "ctp-pink",
    secondary: "ctp-mauve",
    accent: "ctp-lavender",
    gradient: "from-ctp-pink via-ctp-mauve to-ctp-lavender",
  },
} as const;
