import React from "react";
import { frameworks } from "../data";
import { SiTypescript, SiPython, SiGo } from "react-icons/si";
import { Code2 } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";

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
 * and their associated frameworks. It uses reveal animations for smooth entrance
 * effects and provides hover interactions for better user engagement.
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
        <Reveal
          key={`${language}-${index}`}
          effect="fade-up"
          duration={0.6}
          delay={0.1 * index}
          className="rounded-lg transition-all duration-500 bg-ctp-surface0/50 p-5"
        >
          {/* Language header */}
          <Reveal
            effect="slide-in"
            direction="right"
            duration={0.5}
            delay={0.1 * index + 0.1}
          >
            <h3 className="text-base mb-3 pl-8 relative font-medium flex items-center">
              <div className="flex items-center gap-2">
                {/* Bullet point with gradient */}
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-ctp-${
                    getLanguageConfigs(language).color
                  }/20`}
                >
                  {getLanguageConfigs(language).icon}
                </div>

                {/* Language name */}
                <span
                  className={`text-ctp-${getLanguageConfigs(language).color}`}
                  style={{
                    animation: "neon-pulse 1.5s ease-in-out infinite alternate",
                  }}
                >
                  {language}
                </span>
              </div>
            </h3>
          </Reveal>

          <Reveal
            effect="cascade"
            cascade={true}
            staggerChildren={0.05}
            duration={0.4}
            delay={0.1 * index + 0.2}
            className="flex flex-wrap gap-3 pl-8 pt-2"
          >
            {libs.map((framework, fIndex) => (
              <div
                key={`${framework}-${fIndex}`}
                className="relative"
                onMouseEnter={() => setHoveredFramework(framework)}
                onMouseLeave={() => setHoveredFramework(null)}
              >
                <div
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md text-ctp-subtext1 hover:text-ctp-text transition-all duration-300 bg-ctp-crust hover:bg-ctp-surface0 border border-ctp-surface0 hover:border-ctp-${
                    getLanguageConfigs(language).color
                  }/50 hover:-translate-y-1 hover:shadow-md`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-ctp-${
                      getLanguageConfigs(language).color
                    } flex-shrink-0`}
                    style={{
                      animation:
                        hoveredFramework === framework
                          ? "pulse 1s infinite"
                          : "none",
                    }}
                  />
                  <span>{framework}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </Reveal>
      ))}
    </ul>
  );
};

export default LanguageFrameworks;
