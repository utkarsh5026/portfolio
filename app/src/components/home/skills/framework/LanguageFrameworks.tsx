import { motion } from "framer-motion";
import { frameworks } from "../data";
import { SiTypescript, SiPython, SiGo } from "react-icons/si";
import { Code2 } from "lucide-react";

/**
 * Retrieves configuration for a given programming language.
 * This includes the corresponding icon and color used for display.
 *
 * @param {string} language - The name of the programming language.
 * @returns {Object} An object containing the icon and color for the language.
 *
 * Example:
 * const config = getLanguageConfigs("TypeScript");
 * console.log(config.icon); // Renders the TypeScript icon
 * console.log(config.color); // "yellow"
 */
const getLanguageConfigs = (language: string) => {
  if (language.includes("Javascript") || language.includes("TypeScript")) {
    return {
      icon: <SiTypescript className="w-5 h-5 text-ctp-yellow" />,
      color: "yellow",
    };
  } else if (language.includes("Python")) {
    return {
      icon: <SiPython className="w-5 h-5 text-ctp-blue" />,
      color: "blue",
    };
  } else if (language.includes("Go")) {
    return {
      icon: <SiGo className="w-5 h-5 text-ctp-green" />,
      color: "green",
    };
  } else {
    return {
      icon: <Code2 className="w-5 h-5 text-ctp-green" />,
      color: "green",
    };
  }
};

/**
 * Props for the LanguageFrameworks component.
 *
 * @typedef {Object} LanguageFrameworksProps
 * @property {string | null} hoveredFramework - The currently hovered framework.
 * @property {function} setHoveredFramework - Function to set the hovered framework.
 */
interface LanguageFrameworksProps {
  hoveredFramework: string | null;
  setHoveredFramework: (framework: string | null) => void;
}

/**
 * LanguageFrameworks component displays a list of programming languages
 * and their associated frameworks. It provides hover effects and animations
 * for better user interaction.
 *
 * @param {LanguageFrameworksProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const LanguageFrameworks: React.FC<LanguageFrameworksProps> = ({
  hoveredFramework,
  setHoveredFramework,
}) => {
  return (
    <ul className="space-y-6">
      {Object.entries(frameworks).map(([language, libs], index) => (
        <motion.li
          key={`${language}-${index}`}
          className="rounded-lg transition-all duration-500 bg-ctp-surface0/50 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {/* Language header */}
          <motion.h3
            className="text-base mb-3 pl-8 relative font-medium flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="flex items-center gap-2">
              {/* Bullet point with gradient */}
              <motion.div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-ctp-${
                  getLanguageConfigs(language).color
                }/20`}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                {getLanguageConfigs(language).icon}
              </motion.div>

              {/* Language name */}
              <motion.span
                className={`text-ctp-${getLanguageConfigs(language).color}`}
                animate={{
                  textShadow: [
                    "0 0 0px rgba(var(--ctp-text-rgb), 0)",
                    "0 0 3px rgba(var(--ctp-text-rgb), 0.3)",
                    "0 0 0px rgba(var(--ctp-text-rgb), 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {language}
              </motion.span>
            </div>
          </motion.h3>

          <motion.ul
            className="flex flex-wrap gap-3 pl-8 pt-2"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {libs.map((framework, fIndex) => (
              <motion.li
                key={`${framework}-${fIndex}`}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="relative"
                onMouseEnter={() => setHoveredFramework(framework)}
                onMouseLeave={() => setHoveredFramework(null)}
              >
                <motion.div
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md text-ctp-subtext1 hover:text-ctp-text transition-all duration-300 bg-ctp-crust hover:bg-ctp-surface0 border border-ctp-surface0 hover:border-ctp-${
                    getLanguageConfigs(language).color
                  }/50`}
                  whileHover={{
                    y: -2,
                    boxShadow: `0 4px 12px rgba(var(--ctp-${
                      getLanguageConfigs(language).color
                    }-rgb), 0.2)`,
                  }}
                >
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full bg-ctp-${
                      getLanguageConfigs(language).color
                    } flex-shrink-0`}
                    animate={{
                      scale: hoveredFramework === framework ? [1, 1.5, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: hoveredFramework === framework ? Infinity : 0,
                    }}
                  />
                  <span>{framework}</span>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.li>
      ))}
    </ul>
  );
};

export default LanguageFrameworks;
