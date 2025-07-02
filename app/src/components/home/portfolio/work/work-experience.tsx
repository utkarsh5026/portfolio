import React, { useState } from "react";
import Section from "@/components/section/portfolio-section";
import { experiences } from "./experienceDump";
import { motion } from "framer-motion";
import Reveal from "@/components/animations/reveal/Reveal";
import { FaBuilding } from "react-icons/fa";
import ExperienceTabs from "./experience-tabs";
import ExperienceDetails from "./experience-details";

const EXPERIENCE_ID = "experience";

const WorkExperience: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number>(0);

  const handleExperienceClick = (index: number) => {
    setSelectedExp(index);
  };

  return (
    <Section id={EXPERIENCE_ID} label="Work Experience" icon="database">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <Reveal effect="fade-up" duration={0.8} delay={0.1}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-ctp-blue/20 backdrop-blur-sm flex-shrink-0">
                <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-blue" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve bg-clip-text text-transparent text-center break-words">
                Professional Experience
              </h2>
            </div>
            <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 leading-relaxed break-words">
              My journey in building impactful solutions and driving innovation
            </p>
          </div>
        </Reveal>

        <div className="space-y-6 sm:space-y-8">
          {/* Experience Selection (Mobile: Horizontal scroll, Desktop: Sidebar) */}
          {experiences.length > 1 && (
            <Reveal
              effect="slide-in"
              direction="left"
              duration={0.7}
              delay={0.2}
            >
              <div className="lg:hidden">
                <div className="overflow-x-auto pb-3 sm:pb-4 -mx-3 sm:-mx-4 px-3 sm:px-4">
                  <div className="flex gap-2 sm:gap-3 min-w-max">
                    {experiences.map((exp, index) => (
                      <motion.button
                        key={`mobile-${exp.duration}-${index}`}
                        className={`flex-shrink-0 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 min-w-[160px] sm:min-w-[200px] border ${
                          selectedExp === index
                            ? "bg-ctp-surface0/80 border-ctp-blue/30"
                            : "bg-ctp-surface0/30 border-ctp-surface1/30 hover:bg-ctp-surface0/50"
                        }`}
                        onClick={() => handleExperienceClick(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg overflow-hidden border border-ctp-surface1/50 flex-shrink-0">
                            <img
                              src={exp.imageSrc}
                              alt={exp.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left min-w-0 flex-1">
                            <p className="font-semibold text-xs sm:text-sm text-ctp-text truncate">
                              {exp.company}
                            </p>
                            <p className="text-xs text-ctp-subtext0 truncate">
                              {exp.duration}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div
            className={`grid gap-6 sm:gap-8 ${
              experiences.length === 1
                ? "grid-cols-1"
                : "lg:grid-cols-[280px,1fr] xl:grid-cols-[320px,1fr]"
            }`}
          >
            {experiences.length > 1 && (
              <Reveal
                effect="slide-in"
                direction="left"
                duration={0.7}
                delay={0.2}
              >
                <div className="hidden lg:block">
                  <div className="sticky top-8">
                    <ExperienceTabs
                      selectedExp={selectedExp}
                      handleExperienceClick={handleExperienceClick}
                    />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Experience Details */}
            <ExperienceDetails selectedExp={selectedExp} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
