import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronRight, Layers } from "lucide-react";
import { skills } from "./data";
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

const ModernSkills: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-ctp-red/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ctp-mauve/5 rounded-full blur-3xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-red via-ctp-mauve to-ctp-teal" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="p-2.5 rounded-xl bg-ctp-red/10 text-ctp-red"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Code2 className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  Core Skills
                </h3>
                <p className="text-sm text-ctp-subtext0">
                  Technologies I work with daily
                </p>
              </div>
            </div>
          </Reveal>

          {/* Skills Categories */}
          <div className="space-y-4">
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
                    className="group cursor-pointer"
                    onClick={() => toggleCategory(skillCategory.category)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-2xl border border-ctp-surface1/30 hover:border-ctp-${colors.primary}/30 transition-all duration-300 overflow-hidden`}
                    >
                      {/* Category header */}
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div
                              className={`p-3 rounded-xl bg-ctp-${colors.primary}/10 text-ctp-${colors.primary} group-hover:bg-ctp-${colors.primary}/20 transition-colors duration-300`}
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>

                            <div>
                              <h4
                                className={`text-lg font-bold text-ctp-text group-hover:text-ctp-${colors.primary} transition-colors duration-300`}
                              >
                                {skillCategory.category}
                              </h4>
                              <p className="text-sm text-ctp-subtext0 mt-1">
                                {skillCategory.skills.length} technologies
                              </p>
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`text-ctp-${colors.primary}`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>

                        {/* Skills preview (visible on mobile) */}
                        <div className="mt-4 sm:hidden">
                          <div className="flex flex-wrap gap-2">
                            {skillCategory.skills.slice(0, 3).map((skill) => (
                              <div
                                key={skill}
                                className={`px-3 py-1.5 bg-ctp-${colors.primary}/10 text-ctp-${colors.primary} rounded-lg text-xs font-medium border border-ctp-${colors.primary}/20`}
                              >
                                {skill}
                              </div>
                            ))}
                            {skillCategory.skills.length > 3 && (
                              <div className="px-3 py-1.5 bg-ctp-surface0/30 text-ctp-subtext0 rounded-lg text-xs font-medium">
                                +{skillCategory.skills.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Skills preview (visible on desktop) */}
                        <div className="mt-4 hidden sm:block">
                          <div className="flex flex-wrap gap-2">
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
                            <div className="px-6 pb-6 pt-2 border-t border-ctp-surface1/30">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                                      className={`p-3 bg-ctp-surface0/30 hover:bg-ctp-${colors.primary}/10 rounded-xl border border-ctp-surface1/20 hover:border-ctp-${colors.primary}/30 transition-all duration-200 text-center group/skill`}
                                      whileHover={{ y: -2 }}
                                    >
                                      <div
                                        className={`text-sm font-medium text-ctp-text group-hover/skill:text-ctp-${colors.primary} transition-colors duration-200`}
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

export default ModernSkills;
