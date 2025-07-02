import React, { useState } from "react";
import Section from "@/components/section/portfolio-section";
import { experiences } from "./experienceDump";
import { motion } from "framer-motion";
import Reveal from "@/components/animations/reveal/Reveal";
import { Building } from "lucide-react";
import ExperienceTabs from "./experience-tabs";
import ExperienceDetails from "./experience-details";

const EXPERIENCE_ID = "experience";

const WorkExperience: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number>(0);

  const handleExperienceClick = (index: number) => {
    setSelectedExp(index);
  };

  return (
    <Section
      id={EXPERIENCE_ID}
      label="Work Experience"
      title="Professional Experience"
      description="My journey in building impactful solutions and driving innovation"
      headerIcon={Building}
      icon="database"
      showHeader={true}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
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
