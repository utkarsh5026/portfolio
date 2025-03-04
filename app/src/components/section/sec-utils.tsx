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
