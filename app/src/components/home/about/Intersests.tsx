import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Code,
  Coffee,
  Gamepad2,
  Music,
  Dumbbell,
  Zap,
} from "lucide-react";
import { interests } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const categoryData = {
  technical: {
    title: "Technical Interests",
    color: "green",
    icon: Code,
    description: "What drives my curiosity in tech",
  },
  nonTechnical: {
    title: "Life & Hobbies",
    color: "pink",
    icon: Heart,
    description: "What keeps me balanced and inspired",
  },
} as const;

const interestIcons = [Code, Zap, Coffee, Music, Gamepad2, Dumbbell, Heart];

const ModernInterests: React.FC = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-ctp-green/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ctp-pink/5 rounded-full blur-3xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-green via-ctp-teal to-ctp-pink" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="p-2.5 rounded-xl bg-ctp-green/10 text-ctp-green"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  Interests & Hobbies
                </h3>
                <p className="text-sm text-ctp-subtext0">
                  What keeps me curious and motivated
                </p>
              </div>
            </div>
          </Reveal>

          {/* Intro Message */}
          <Reveal effect="fade-up" duration={0.6} delay={0.1}>
            <motion.div
              className="mb-8 p-4 bg-ctp-surface0/20 rounded-2xl border border-ctp-surface1/20"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-ctp-text text-sm sm:text-base leading-relaxed text-center">
                When I'm not coding, you can find me engaged in various
                activities that keep me balanced and inspired:
              </p>
            </motion.div>
          </Reveal>

          {/* Interest Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(interests).map(
              ([category, items], categoryIndex) => {
                const categoryConfig =
                  categoryData[category as keyof typeof categoryData];
                const Icon = categoryConfig.icon;

                return (
                  <Reveal
                    key={category}
                    effect="slide-in"
                    direction={categoryIndex % 2 === 0 ? "left" : "right"}
                    delay={0.2 + categoryIndex * 0.1}
                    duration={0.7}
                  >
                    <motion.div
                      className="h-full"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-2xl border border-ctp-surface1/30 hover:border-ctp-${categoryConfig.color}/30 transition-all duration-300 overflow-hidden h-full`}
                      >
                        {/* Category header */}
                        <div
                          className={`h-1 bg-gradient-to-r from-ctp-${
                            categoryConfig.color
                          } to-ctp-${
                            categoryConfig.color === "green" ? "teal" : "red"
                          }`}
                        />

                        <div className="p-6">
                          {/* Category title */}
                          <div className="flex items-center gap-3 mb-6">
                            <motion.div
                              className={`p-3 rounded-xl bg-ctp-${categoryConfig.color}/10 text-ctp-${categoryConfig.color}`}
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>
                            <div>
                              <h4
                                className={`text-lg font-bold text-ctp-text group-hover:text-ctp-${categoryConfig.color} transition-colors duration-300`}
                              >
                                {categoryConfig.title}
                              </h4>
                              <p className="text-sm text-ctp-subtext0">
                                {categoryConfig.description}
                              </p>
                            </div>
                          </div>

                          {/* Interest Items */}
                          <div className="space-y-3">
                            {items.map((item, itemIndex) => {
                              const ItemIcon =
                                interestIcons[itemIndex % interestIcons.length];

                              return (
                                <Reveal
                                  key={item}
                                  effect="fade-through"
                                  delay={
                                    0.4 + categoryIndex * 0.1 + itemIndex * 0.05
                                  }
                                  duration={0.5}
                                >
                                  <motion.div
                                    className="group/item flex items-start gap-3 p-3 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl border border-ctp-surface1/20 hover:border-ctp-surface2/40 transition-all duration-200"
                                    whileHover={{ x: 4 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    <motion.div
                                      className={`flex-shrink-0 p-2 rounded-lg bg-ctp-${categoryConfig.color}/5 group-hover/item:bg-ctp-${categoryConfig.color}/10 transition-colors duration-200`}
                                      whileHover={{ rotate: 10, scale: 1.1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                      }}
                                    >
                                      <ItemIcon
                                        className={`w-4 h-4 text-ctp-${categoryConfig.color}`}
                                      />
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm text-ctp-text group-hover/item:text-ctp-${categoryConfig.color} transition-colors duration-200 leading-relaxed`}
                                      >
                                        {item}
                                      </p>
                                    </div>
                                  </motion.div>
                                </Reveal>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              }
            )}
          </div>

          {/* Fun Stats */}
          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="mt-8 pt-6 border-t border-ctp-surface1/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <motion.div
                  className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 group hover:bg-ctp-green/5 hover:border-ctp-green/30 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Code className="w-6 h-6 text-ctp-green mx-auto mb-2" />
                  <div className="text-lg font-bold text-ctp-green mb-1">5</div>
                  <div className="text-xs text-ctp-subtext0">
                    Tech Interests
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 group hover:bg-ctp-pink/5 hover:border-ctp-pink/30 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-6 h-6 text-ctp-pink mx-auto mb-2" />
                  <div className="text-lg font-bold text-ctp-pink mb-1">4</div>
                  <div className="text-xs text-ctp-subtext0">Life Hobbies</div>
                </motion.div>

                <motion.div
                  className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 group hover:bg-ctp-blue/5 hover:border-ctp-blue/30 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Coffee className="w-6 h-6 text-ctp-blue mx-auto mb-2" />
                  <div className="text-lg font-bold text-ctp-blue mb-1">∞</div>
                  <div className="text-xs text-ctp-subtext0">Coffee Cups</div>
                </motion.div>

                <motion.div
                  className="p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 group hover:bg-ctp-yellow/5 hover:border-ctp-yellow/30 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="w-6 h-6 text-ctp-yellow mx-auto mb-2" />
                  <div className="text-lg font-bold text-ctp-yellow mb-1">
                    24/7
                  </div>
                  <div className="text-xs text-ctp-subtext0">Curiosity</div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* Connect Call-to-Action */}
          <Reveal effect="fade-up" delay={1.0} duration={0.6}>
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-2xl border border-ctp-surface1/30 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-ctp-pink animate-pulse" />
                <span className="text-ctp-text font-medium">
                  Always open to connect
                </span>
                <Heart className="w-5 h-5 text-ctp-pink animate-pulse" />
              </div>
              <p className="text-sm text-ctp-subtext0 italic">
                I'm always looking to connect with like-minded professionals for
                collaborations and knowledge exchange. Feel free to reach out!
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ModernInterests;
