import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronRight, Layers } from "lucide-react";
import { skills } from "../data/data";
import Reveal from "@/components/animations/reveal/Reveal";

const categoryColors = {
  Frontend: { primary: "red", secondary: "pink" },
  Backend: { primary: "mauve", secondary: "lavender" },
  "DevOps & Cloud": { primary: "teal", secondary: "green" },
  "Tools & Others": { primary: "peach", secondary: "yellow" },
} as const;

const categoryIcons = {
  Frontend: Layers,
  Backend: Code2,
  "DevOps & Cloud": Code2,
  "Tools & Others": Code2,
} as const;

/**
 * 💻 Technical skills showcase with expandable categories
 *
 * Interactive component displaying my technical expertise across
 * different categories (Frontend, Backend, DevOps, etc.). Each category
 * can be expanded to show all technologies. It's my technical toolkit
 * presented beautifully! 🛠️✨
 */
const Skills: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 bg-ctp-red/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />
      <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-16 h-16 sm:w-32 sm:h-32 bg-ctp-mauve/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-ctp-surface1/30 overflow-hidden w-full">
        {/* Header gradient bar */}
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-ctp-red via-ctp-mauve to-ctp-teal" />

        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <motion.div
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-ctp-red/10 text-ctp-red flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
                  Core Skills
                </h3>
                <p className="text-xs sm:text-sm text-ctp-subtext0">
                  Technologies I work with daily
                </p>
              </div>
            </div>
          </Reveal>

          {/* Skills Categories */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {skills.map((skillCategory, index) => {
              const colors =
                categoryColors[
                  skillCategory.category as keyof typeof categoryColors
                ];
              const Icon =
                categoryIcons[
                  skillCategory.category as keyof typeof categoryIcons
                ];
              const isExpanded = expandedCategory === skillCategory.category;

              return (
                <Reveal
                  key={skillCategory.category}
                  effect="slide-in"
                  direction="left"
                  delay={0.1 + index * 0.1}
                  duration={0.6}
                >
                  <motion.div
                    className="group cursor-pointer w-full"
                    onClick={() => toggleCategory(skillCategory.category)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30 hover:border-ctp-${colors.primary}/30 transition-all duration-300 overflow-hidden w-full`}
                    >
                      {/* Category header */}
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                            <motion.div
                              className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-ctp-${colors.primary}/10 text-ctp-${colors.primary} group-hover:bg-ctp-${colors.primary}/20 transition-colors duration-300 flex-shrink-0`}
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </motion.div>

                            <div className="min-w-0 flex-1">
                              <h4
                                className={`text-sm sm:text-base md:text-lg font-bold text-ctp-text group-hover:text-ctp-${colors.primary} transition-colors duration-300 leading-tight break-words`}
                              >
                                {skillCategory.category}
                              </h4>
                              <p className="text-xs sm:text-sm text-ctp-subtext0 mt-0.5 sm:mt-1">
                                {skillCategory.skills.length} technologies
                              </p>
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`text-ctp-${colors.primary} flex-shrink-0`}
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>

                        {/* Skills preview - always visible but responsive */}
                        <div className="mt-2 sm:mt-3 md:mt-4">
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                            {/* Mobile: Show fewer skills */}
                            <div className="flex flex-wrap gap-1 sm:hidden">
                              {skillCategory.skills.slice(0, 2).map((skill) => (
                                <div
                                  key={skill}
                                  className={`px-2 py-1 bg-ctp-${colors.primary}/10 text-ctp-${colors.primary} rounded-md text-xs font-medium border border-ctp-${colors.primary}/20`}
                                >
                                  {skill}
                                </div>
                              ))}
                              {skillCategory.skills.length > 2 && (
                                <div className="px-2 py-1 bg-ctp-surface0/30 text-ctp-subtext0 rounded-md text-xs font-medium">
                                  +{skillCategory.skills.length - 2} more
                                </div>
                              )}
                            </div>

                            {/* Tablet: Show more skills */}
                            <div className="hidden sm:flex md:hidden flex-wrap gap-1.5">
                              {skillCategory.skills.slice(0, 4).map((skill) => (
                                <div
                                  key={skill}
                                  className={`px-2.5 py-1.5 bg-ctp-${colors.primary}/5 text-ctp-${colors.primary} rounded-lg text-sm font-medium border border-ctp-${colors.primary}/10 hover:bg-ctp-${colors.primary}/10 transition-colors duration-200`}
                                >
                                  {skill}
                                </div>
                              ))}
                              {skillCategory.skills.length > 4 && (
                                <div className="px-2.5 py-1.5 bg-ctp-surface0/20 text-ctp-subtext0 rounded-lg text-sm font-medium">
                                  +{skillCategory.skills.length - 4} more
                                </div>
                              )}
                            </div>

                            {/* Desktop: Show most skills */}
                            <div className="hidden md:flex flex-wrap gap-2">
                              {skillCategory.skills.slice(0, 5).map((skill) => (
                                <div
                                  key={skill}
                                  className={`px-3 py-1.5 bg-ctp-${colors.primary}/5 text-ctp-${colors.primary} rounded-lg text-sm font-medium border border-ctp-${colors.primary}/10 hover:bg-ctp-${colors.primary}/10 transition-colors duration-200`}
                                >
                                  {skill}
                                </div>
                              ))}
                              {skillCategory.skills.length > 5 && (
                                <div className="px-3 py-1.5 bg-ctp-surface0/20 text-ctp-subtext0 rounded-lg text-sm font-medium">
                                  +{skillCategory.skills.length - 5} more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded skills list */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 pt-1 sm:px-4 sm:pb-4 sm:pt-2 md:px-6 md:pb-6 md:pt-2 border-t border-ctp-surface1/30">
                              {/* Mobile: 1-2 columns */}
                              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
                                {skillCategory.skills.map(
                                  (skill, skillIndex) => (
                                    <motion.div
                                      key={skill}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: skillIndex * 0.05,
                                        duration: 0.3,
                                      }}
                                      className={`p-2 sm:p-2.5 md:p-3 bg-ctp-surface0/30 hover:bg-ctp-${colors.primary}/10 rounded-lg sm:rounded-xl border border-ctp-surface1/20 hover:border-ctp-${colors.primary}/30 transition-all duration-200 text-center group/skill w-full overflow-hidden`}
                                      whileHover={{ y: -2 }}
                                    >
                                      <div
                                        className={`text-xs sm:text-sm font-medium text-ctp-text group-hover/skill:text-ctp-${colors.primary} transition-colors duration-200 break-words leading-tight`}
                                      >
                                        {skill}
                                      </div>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
