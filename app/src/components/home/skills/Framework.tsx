import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Braces, Library } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FrameworkProps {
  frameworks: Record<string, string[]>;
}

const Framework: React.FC<FrameworkProps> = ({ frameworks }) => {
  const [expandedLanguage, setExpandedLanguage] = useState<string | null>(null);

  // Toggle expanded language section
  const toggleLanguage = (language: string) => {
    setExpandedLanguage(expandedLanguage === language ? null : language);
  };

  // Get icon for different language categories
  const getLanguageIcon = (language: string) => {
    if (language.includes("Javascript") || language.includes("TypeScript")) {
      return <Braces className="w-4 h-4 text-ctp-yellow" />;
    } else if (language.includes("Python")) {
      return <Library className="w-4 h-4 text-ctp-blue" />;
    } else {
      return <Code2 className="w-4 h-4 text-ctp-green" />;
    }
  };

  return (
    <div className="skill-card relative group w-full perspective-1000">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/20 via-ctp-blue/20 to-ctp-lavender/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-lg opacity-50 w-full" />

      {/* Main card */}
      <Card className="relative bg-ctp-mantle backdrop-blur-sm border border-ctp-surface0 hover:border-ctp-surface1 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:transform group-hover:translate-y-[-5px]">
        <CardHeader className="pb-4 border-b border-ctp-surface0">
          <CardTitle className="flex items-center gap-3">
            {/* Icon with glowing background */}
            <div className="p-2 rounded-lg bg-gradient-to-br from-ctp-lavender/10 to-ctp-blue/10 flex items-center justify-center relative">
              <Code2 className="w-5 h-5 text-ctp-lavender" />
              <div className="absolute inset-0 bg-ctp-lavender/5 rounded-lg animate-pulse-slow opacity-60"></div>
            </div>

            {/* Title with gradient */}
            <span className="text-xl font-semibold bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-lavender bg-clip-text text-transparent bg-size-200 animate-gradient-x">
              Frameworks & Libraries
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <ul className="space-y-6">
            {Object.entries(frameworks).map(([language, libs], index) => (
              <li
                key={`${language}-${index}`}
                className={`rounded-lg transition-all duration-300 ${
                  expandedLanguage === language
                    ? "bg-ctp-surface0/50 p-4"
                    : "p-2"
                }`}
              >
                {/* Language header with click interaction */}
                <h3
                  className="text-base mb-3 pl-6 relative font-medium text-ctp-text cursor-pointer flex items-center justify-between"
                  onClick={() => toggleLanguage(language)}
                >
                  <div className="flex items-center gap-2">
                    {/* Bullet point with gradient */}
                    <span className="absolute left-0 top-[0.4em] h-2 w-2 rounded-full bg-gradient-to-r from-ctp-lavender to-ctp-blue"></span>

                    {/* Language name */}
                    <span>{language}</span>

                    {/* Language icon */}
                    {getLanguageIcon(language)}
                  </div>

                  {/* Expand/collapse indicator */}
                  <span
                    className={`text-ctp-subtext0 text-xs transition-transform duration-300 ${
                      expandedLanguage === language ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </h3>

                {/* Frameworks list with animations */}
                <AnimatePresence>
                  <motion.ul
                    className={`flex flex-wrap gap-3 pl-6 ${
                      expandedLanguage === language || expandedLanguage === null
                        ? "mt-3"
                        : "hidden"
                    }`}
                    initial={
                      expandedLanguage === language
                        ? { opacity: 0, height: 0 }
                        : false
                    }
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {libs.map((framework, fIndex) => (
                      <motion.li
                        key={`${framework}-${fIndex}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: fIndex * 0.05, duration: 0.3 }}
                        className="relative"
                      >
                        <div className="flex items-center px-3 py-1.5 text-sm rounded-md text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 bg-ctp-crust hover:bg-ctp-surface0 border border-ctp-surface0 hover:border-ctp-surface1 shadow-sm hover:shadow">
                          {/* Dot indicator */}
                          <span className="w-1.5 h-1.5 rounded-full bg-ctp-blue mr-2"></span>

                          {framework}
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Framework;
