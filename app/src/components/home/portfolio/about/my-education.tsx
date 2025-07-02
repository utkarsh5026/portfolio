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

/**
 * 🎓 Educational background timeline with achievements
 *
 * Showcases my academic journey through an interactive timeline.
 * Each education milestone gets its own beautiful card with institution
 * details, grades, and highlights. Like a digital diploma wall! 🏆📜
 */
const Education: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-gradient-to-br from-ctp-mantle to-ctp-crust backdrop-blur-sm rounded-2xl sm:rounded-3xl border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <motion.div
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-ctp-sapphire/10 text-ctp-sapphire flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
                  Education
                </h3>
                <p className="text-xs sm:text-sm text-ctp-subtext0">
                  Academic foundation & achievements
                </p>
              </div>
            </div>
          </Reveal>

          {/* Education Timeline */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {education.map((item, index) => (
              <Reveal
                key={index}
                effect="slide-in"
                direction="left"
                delay={0.2 + index * 0.1}
                duration={0.7}
              >
                <EducationCard index={index} item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface EducationCardProps {
  index: number;
  item: (typeof education)[number];
}

const EducationCard: React.FC<EducationCardProps> = ({ index, item }) => {
  return (
    <motion.div
      className="relative group w-full"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Timeline connector - adjusted for mobile */}
      {index < education.length - 1 && (
        <div className="absolute left-4 sm:left-6 top-16 sm:top-20 w-px h-8 sm:h-12 md:h-16 bg-gradient-to-b from-ctp-sapphire/40 to-transparent z-0" />
      )}

      <div className="relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-xl sm:rounded-2xl border-none hover:border-ctp-sapphire/30 transition-all duration-300 overflow-hidden group-hover:shadow-lg group-hover:shadow-ctp-sapphire/10 w-full">
        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 relative">
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-ctp-sapphire/20 to-ctp-blue/20 flex items-center justify-center border border-ctp-sapphire/30"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-ctp-sapphire" />
              </motion.div>

              {index === 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-ctp-yellow rounded-full flex items-center justify-center border border-ctp-base"
                >
                  <Award className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-ctp-base" />
                </motion.div>
              )}
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex flex-col gap-2 mb-2 sm:mb-3">
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-ctp-text group-hover:text-ctp-sapphire transition-colors duration-300 leading-tight break-words">
                    {item.degree}
                  </h4>
                  <div className="flex items-start gap-1 sm:gap-2 mt-1 flex-wrap">
                    <MapPin className="w-3 h-3 text-ctp-subtext0 flex-shrink-0 mt-0.5" />
                    <a
                      href={item.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-ctp-subtext0 hover:text-ctp-sapphire transition-colors duration-200 flex items-center gap-1 group/link min-w-0 break-words"
                    >
                      <span className="break-words">{item.institution}</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-ctp-sapphire/10 rounded-full border border-ctp-sapphire/20 self-start">
                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-ctp-sapphire flex-shrink-0" />
                  <span className="text-xs font-medium text-ctp-sapphire whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                {item.highlights.map((highlight, hIndex) => (
                  <Reveal
                    key={hIndex}
                    effect="fade-through"
                    delay={0.4 + index * 0.1 + hIndex * 0.05}
                    duration={0.5}
                  >
                    <motion.div
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3  rounded-lg sm:rounded-xl transition-colors duration-200 w-full overflow-hidden border-none"
                      whileHover={{ x: 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-ctp-green mt-1.5 sm:mt-2 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-ctp-text leading-relaxed break-words">
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
  );
};

export default Education;
