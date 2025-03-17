import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import { SiPython, SiTypescript, SiGo } from "react-icons/si";
import { frameworks } from "./data";

interface FrameworkProps {
  frameworks: typeof frameworks;
}

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
 * Framework Component
 *
 * This component displays a list of programming frameworks and libraries organized by language.
 * It utilizes animations to enhance user interaction and visual appeal.
 *
 * Props:
 * - frameworks: An object containing arrays of frameworks categorized by programming language.
 *
 * State:
 * - hoveredFramework: A string that holds the name of the currently hovered framework for animation effects.
 *
 * Features:
 * - Animated background glow effect.
 * - Card layout with a gradient accent line.
 * - Each programming language is displayed with its corresponding frameworks.
 * - Hover effects that animate the framework items for better user engagement.
 *
 * Usage:
 * <Framework frameworks={frameworks} />
 */
const Framework: React.FC<FrameworkProps> = ({ frameworks }) => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  return (
    <motion.div
      className="skill-card relative group w-full perspective-1000"
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/20 via-ctp-blue/20 to-ctp-lavender/20 blur-xl opacity-50 w-full rounded-xl"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          filter: ["blur(15px)", "blur(20px)", "blur(15px)"],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main card */}
      <Card className="relative bg-ctp-mantle backdrop-blur-sm border border-ctp-surface0 hover:border-ctp-surface1 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:transform overflow-hidden">
        {/* Accent line at the top */}
        <div className="h-1 w-full bg-gradient-to-r from-ctp-mauve via-ctp-lavender to-ctp-blue"></div>

        <CardHeader className="pb-4 border-b border-ctp-surface0">
          <CardTitle className="flex items-center gap-3">
            {/* Icon with glowing background */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-ctp-lavender/10 to-ctp-blue/10 flex items-center justify-center relative">
              <Code2 className="w-6 h-6 text-ctp-lavender relative z-10" />
              <motion.div
                className="absolute inset-0 bg-ctp-lavender/5 rounded-lg opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Title with gradient */}
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-lavender"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Frameworks & Libraries
            </motion.span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
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
                      className={`text-ctp-${
                        getLanguageConfigs(language).color
                      }`}
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

                {/* Frameworks list with animations - always visible */}
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
                            scale:
                              hoveredFramework === framework ? [1, 1.5, 1] : 1,
                          }}
                          transition={{
                            duration: 1,
                            repeat:
                              hoveredFramework === framework ? Infinity : 0,
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Framework;
