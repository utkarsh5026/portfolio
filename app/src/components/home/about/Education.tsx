import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  ExternalLink,
  Award,
  MapPin,
} from "lucide-react";
import { education } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const ModernEducation: React.FC = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-ctp-sapphire/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-ctp-lavender/5 rounded-full blur-2xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-sapphire via-ctp-blue to-ctp-lavender" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="p-2.5 rounded-xl bg-ctp-sapphire/10 text-ctp-sapphire"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  Education
                </h3>
                <p className="text-sm text-ctp-subtext0">
                  Academic foundation & achievements
                </p>
              </div>
            </div>
          </Reveal>

          {/* Education Timeline */}
          <div className="space-y-6">
            {education.map((item, index) => (
              <Reveal
                key={index}
                effect="slide-in"
                direction="left"
                delay={0.2 + index * 0.1}
                duration={0.7}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Timeline connector */}
                  {index < education.length - 1 && (
                    <div className="absolute left-6 top-20 w-px h-16 bg-gradient-to-b from-ctp-sapphire/40 to-transparent z-0" />
                  )}

                  <div className="relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-2xl border border-ctp-surface1/30 hover:border-ctp-sapphire/30 transition-all duration-300 overflow-hidden group-hover:shadow-lg group-hover:shadow-ctp-sapphire/10">
                    {/* Card header with institution color */}
                    <div
                      className={`h-1 bg-gradient-to-r ${
                        index === 0
                          ? "from-ctp-sapphire to-ctp-blue"
                          : index === 1
                          ? "from-ctp-blue to-ctp-lavender"
                          : "from-ctp-lavender to-ctp-mauve"
                      }`}
                    />

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 relative">
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-ctp-sapphire/20 to-ctp-blue/20 flex items-center justify-center border border-ctp-sapphire/30"
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <GraduationCap className="w-5 h-5 text-ctp-sapphire" />
                          </motion.div>

                          {/* Achievement badge for first item */}
                          {index === 0 && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.8 + index * 0.1,
                                duration: 0.5,
                              }}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-ctp-yellow rounded-full flex items-center justify-center border-2 border-ctp-base"
                            >
                              <Award className="w-3 h-3 text-ctp-base" />
                            </motion.div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Degree & Duration Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-ctp-text group-hover:text-ctp-sapphire transition-colors duration-300">
                                {item.degree}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="w-3 h-3 text-ctp-subtext0" />
                                <a
                                  href={item.institutionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-ctp-subtext0 hover:text-ctp-sapphire transition-colors duration-200 flex items-center gap-1 group/link"
                                >
                                  {item.institution}
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                                </a>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-ctp-sapphire/10 rounded-full border border-ctp-sapphire/20">
                              <Calendar className="w-3 h-3 text-ctp-sapphire" />
                              <span className="text-xs font-medium text-ctp-sapphire">
                                {item.duration}
                              </span>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="space-y-2">
                            {item.highlights.map((highlight, hIndex) => (
                              <Reveal
                                key={hIndex}
                                effect="fade-through"
                                delay={0.4 + index * 0.1 + hIndex * 0.05}
                                duration={0.5}
                              >
                                <motion.div
                                  className="flex items-start gap-3 p-3 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl transition-colors duration-200"
                                  whileHover={{ x: 2 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-ctp-green mt-2 flex-shrink-0" />
                                  <p className="text-sm text-ctp-text leading-relaxed">
                                    {highlight}
                                  </p>
                                </motion.div>
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEducation;
