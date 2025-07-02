import React from "react";
import { motion } from "framer-motion";
import { Code2, ChevronRight, Layers } from "lucide-react";
import { skills } from "../data/data";
import Reveal from "@/components/animations/reveal/Reveal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-transparent backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
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

              return (
                <Reveal
                  key={skillCategory.category}
                  effect="slide-in"
                  direction="left"
                  delay={0.1 + index * 0.1}
                  duration={0.6}
                >
                  <Collapsible>
                    <div
                      className={`relative bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl border border-none hover:border-ctp-${colors.primary}/30 transition-all duration-300 overflow-hidden w-full group`}
                    >
                      {/* Category header */}
                      <CollapsibleTrigger asChild>
                        <motion.button
                          className="w-full p-3 sm:p-4 md:p-6 text-left cursor-pointer"
                          whileHover={{ y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
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

                            <div
                              className={`text-ctp-${colors.primary} flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90`}
                            >
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          </div>

                          {/* Skills preview - always visible but responsive */}
                          <div className="mt-2 sm:mt-3 md:mt-4">
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                              {/* Mobile: Show fewer skills */}
                              <div className="flex flex-wrap gap-1 sm:hidden">
                                {skillCategory.skills
                                  .slice(0, 2)
                                  .map((skill) => (
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
                                {skillCategory.skills
                                  .slice(0, 4)
                                  .map((skill) => (
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
                                {skillCategory.skills
                                  .slice(0, 5)
                                  .map((skill) => (
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
                        </motion.button>
                      </CollapsibleTrigger>

                      {/* Expanded skills list */}
                      <CollapsibleContent>
                        <div className="px-3 pb-3 pt-1 sm:px-4 sm:pb-4 sm:pt-2 md:px-6 md:pb-6 md:pt-2 border-t border-ctp-surface1/30 animate-in slide-in-from-top-2 duration-300">
                          {/* Mobile: 1-2 columns */}
                          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
                            {skillCategory.skills.map((skill) => (
                              <div
                                key={skill}
                                className={`p-2 sm:p-2.5 md:p-3  rounded-xl duration-200 group/skill w-full overflow-hidden hover:-translate-y-0.5`}
                              >
                                <div
                                  className={`text-xs sm:text-sm font-medium text-ctp-text group-hover/skill:text-ctp-${colors.primary} transition-colors duration-200 break-words leading-tight`}
                                >
                                  {skill}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
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
