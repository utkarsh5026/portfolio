import React from "react";
import { motion } from "framer-motion";
import { Brain, Quote, Zap, Target, Heart } from "lucide-react";
import { philosophy } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const philosophyIcons = [Target, Zap, Heart];

const ModernPhilosophy: React.FC = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-ctp-blue/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-ctp-mauve/5 rounded-full blur-3xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-pink" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="p-2.5 rounded-xl bg-ctp-blue/10 text-ctp-blue"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  Philosophy
                </h3>
                <p className="text-sm text-ctp-subtext0">
                  How I approach development & life
                </p>
              </div>
            </div>
          </Reveal>

          {/* Main Philosophy Card */}
          <Reveal effect="fade-up" duration={0.7} delay={0.2}>
            <div className="relative mb-8">
              {/* Quote background decoration */}
              <div className="absolute -top-4 -left-4 text-6xl text-ctp-blue/10 font-serif pointer-events-none">
                "
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-ctp-blue/10 font-serif pointer-events-none rotate-180">
                "
              </div>

              <motion.div
                className="relative bg-gradient-to-br from-ctp-surface0/50 to-ctp-mantle/30 rounded-2xl border border-ctp-surface1/30 p-6 sm:p-8 overflow-hidden"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-ctp-blue/5 via-transparent to-ctp-mauve/5" />

                <div className="relative space-y-6">
                  {philosophy.map((paragraph, index) => {
                    const Icon = philosophyIcons[index];
                    return (
                      <Reveal
                        key={index}
                        effect="slide-in"
                        direction={index % 2 === 0 ? "left" : "right"}
                        delay={0.3 + index * 0.2}
                        duration={0.7}
                      >
                        <motion.div
                          className="flex gap-4 group"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Philosophy icon */}
                          <div className="flex-shrink-0 mt-1">
                            <motion.div
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                                index === 0
                                  ? "from-ctp-blue/20 to-ctp-sapphire/20"
                                  : index === 1
                                  ? "from-ctp-mauve/20 to-ctp-pink/20"
                                  : "from-ctp-pink/20 to-ctp-red/20"
                              } flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                              whileHover={{ rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  index === 0
                                    ? "text-ctp-blue"
                                    : index === 1
                                    ? "text-ctp-mauve"
                                    : "text-ctp-pink"
                                }`}
                              />
                            </motion.div>
                          </div>

                          {/* Philosophy text */}
                          <div className="flex-1 min-w-0">
                            <p className="text-ctp-text leading-relaxed text-sm sm:text-base group-hover:text-ctp-subtext1 transition-colors duration-300">
                              {paragraph}
                            </p>

                            {/* Special highlight for the last paragraph */}
                            {index === philosophy.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                                className="mt-4 flex items-center gap-2 text-ctp-pink"
                              >
                                <Heart className="w-4 h-4 animate-pulse" />
                                <span className="text-sm font-medium italic">
                                  Code as storytelling
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Philosophy Principles */}
          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-blue/5 hover:border-ctp-blue/30 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ctp-blue/10 flex items-center justify-center group-hover:bg-ctp-blue/20 transition-colors duration-300">
                  <Target className="w-6 h-6 text-ctp-blue" />
                </div>
                <h4 className="font-semibold text-ctp-text mb-2 group-hover:text-ctp-blue transition-colors duration-300">
                  Make it Work
                </h4>
                <p className="text-xs text-ctp-subtext0 leading-relaxed">
                  Functionality first, ensuring the core requirements are met
                </p>
              </motion.div>

              <motion.div
                className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-mauve/5 hover:border-ctp-mauve/30 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ctp-mauve/10 flex items-center justify-center group-hover:bg-ctp-mauve/20 transition-colors duration-300">
                  <Brain className="w-6 h-6 text-ctp-mauve" />
                </div>
                <h4 className="font-semibold text-ctp-text mb-2 group-hover:text-ctp-mauve transition-colors duration-300">
                  Make it Right
                </h4>
                <p className="text-xs text-ctp-subtext0 leading-relaxed">
                  Clean, maintainable code that follows best practices
                </p>
              </motion.div>

              <motion.div
                className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-pink/5 hover:border-ctp-pink/30 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ctp-pink/10 flex items-center justify-center group-hover:bg-ctp-pink/20 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-ctp-pink" />
                </div>
                <h4 className="font-semibold text-ctp-text mb-2 group-hover:text-ctp-pink transition-colors duration-300">
                  Make it Fast
                </h4>
                <p className="text-xs text-ctp-subtext0 leading-relaxed">
                  Optimize for performance and user experience
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Inspiring Quote */}
          <Reveal effect="fade-up" delay={1.0} duration={0.6}>
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-2xl border border-ctp-surface1/30 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Quote className="w-8 h-8 text-ctp-blue mx-auto mb-3 opacity-60" />
              <p className="text-ctp-text font-medium italic mb-2">
                "Continuous learning and embracing challenges that push me
                outside my comfort zone"
              </p>
              <div className="flex items-center justify-center gap-2 text-ctp-subtext0 text-sm">
                <div className="w-2 h-2 rounded-full bg-ctp-blue animate-pulse" />
                <span>Growth Mindset</span>
                <div className="w-2 h-2 rounded-full bg-ctp-blue animate-pulse" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ModernPhilosophy;
