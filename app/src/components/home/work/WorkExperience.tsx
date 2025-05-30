import React, { useState } from "react";
import Section from "@/components/section/Section";
import { experiences } from "./experienceDump";
import { motion, AnimatePresence } from "framer-motion";
import TechBadge from "@/components/base/TechBadge";
import OutlineNode from "../editor/outline/OutlineNode";
import Reveal from "@/components/animations/reveal/Reveal";
import {
  FaExternalLinkAlt,
  FaFileAlt,
  FaBuilding,
  FaCalendarAlt,
  FaChevronRight,
  FaDatabase,
  FaSearch,
  FaDocker,
  FaCode,
  FaTerminal,
  FaRocket,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EXPERIENCE_ID = "experience";

// Icon mapping for achievements
const iconMap: { [key: string]: JSX.Element } = {
  FaDatabase: <FaDatabase />,
  FaSearchDatabase: <FaSearch />,
  FaDocker: <FaDocker />,
  FaCode: <FaCode />,
  FaTerminal: <FaTerminal />,
};

interface ExperienceHeaderProps {
  selectedExp: number;
}

const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ selectedExp }) => {
  const experience = experiences[selectedExp];

  return (
    <div className="relative mb-8">
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ctp-crust/50 via-ctp-mantle/30 to-ctp-crust/50 rounded-2xl -z-10" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-ctp-surface0/80 backdrop-blur-sm border border-ctp-surface1/50 overflow-hidden ring-2 ring-ctp-surface0/30">
                  <img
                    src={experience.imageSrc}
                    alt={experience.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-ctp-green rounded-full border-2 border-ctp-base flex items-center justify-center">
                  <div className="w-2 h-2 bg-ctp-base rounded-full" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ctp-text mb-2">
                  {experience.position}
                </h2>
                <div className="flex items-center gap-2 text-ctp-subtext0">
                  <FaBuilding className="w-4 h-4 text-ctp-blue" />
                  <span className="text-sm">at</span>
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1 font-medium"
                  >
                    {experience.company}
                    <FaExternalLinkAlt className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Duration and status */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-ctp-surface0/50 text-ctp-blue border-ctp-blue/30 px-3 py-1.5 hover:bg-ctp-surface1/50"
              >
                <FaCalendarAlt className="w-3 h-3 mr-2" />
                {experience.duration}
              </Badge>

              <Badge
                variant="outline"
                className="bg-ctp-green/10 text-ctp-green border-ctp-green/30 px-3 py-1.5"
              >
                <div className="w-2 h-2 bg-ctp-green rounded-full mr-2 animate-pulse" />
                Experience Completed
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          {experience.docsUrl && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="default"
                className="bg-ctp-blue hover:bg-ctp-lavender text-ctp-base font-medium px-6 py-3 rounded-xl shadow-lg shadow-ctp-blue/20 hover:shadow-ctp-lavender/20 transition-all duration-300 border-none"
                onClick={() => window.open(experience.docsUrl, "_blank")}
              >
                <FaFileAlt className="w-4 h-4 mr-2" />
                View Details
                <FaChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ExperienceTabsProps {
  selectedExp: number;
  handleExperienceClick: (index: number) => void;
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({
  selectedExp,
  handleExperienceClick,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-ctp-text mb-4 px-2">
        Experience Timeline
      </h3>
      {experiences.map((exp, index) => (
        <motion.div
          key={`${exp.duration}-${index}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <button
            className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 relative overflow-hidden border ${
              selectedExp === index
                ? "bg-ctp-surface0/80 border-ctp-blue/30 shadow-md shadow-ctp-blue/10"
                : "bg-ctp-surface0/30 hover:bg-ctp-surface0/50 border-ctp-surface1/30 hover:border-ctp-surface1/50"
            }`}
            onClick={() => handleExperienceClick(index)}
          >
            {/* Selection indicator */}
            {selectedExp === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-0 w-1 h-full bg-ctp-blue rounded-r-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedExp === index
                      ? "border-ctp-blue/50 shadow-md shadow-ctp-blue/20"
                      : "border-ctp-surface1/50"
                  }`}
                >
                  <img
                    src={exp.imageSrc}
                    alt={exp.company}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Active indicator */}
                {selectedExp === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-ctp-blue rounded-full border-2 border-ctp-base"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className={`font-bold text-base sm:text-lg mb-1 transition-colors duration-300 ${
                    selectedExp === index ? "text-ctp-blue" : "text-ctp-text"
                  }`}
                >
                  {exp.company}
                </h4>
                <p className="text-sm text-ctp-subtext0 mb-2">{exp.position}</p>
                <Badge
                  variant="outline"
                  className={`text-xs transition-all duration-300 ${
                    selectedExp === index
                      ? "bg-ctp-blue/10 text-ctp-blue border-ctp-blue/30"
                      : "bg-ctp-surface1/30 text-ctp-subtext0 border-ctp-surface1/50"
                  }`}
                >
                  {exp.duration}
                </Badge>
              </div>

              <FaChevronRight
                className={`w-4 h-4 transition-all duration-300 ${
                  selectedExp === index
                    ? "text-ctp-blue rotate-90"
                    : "text-ctp-subtext0"
                }`}
              />
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

interface AchievementsProps {
  selectedExp: number;
}

const Achievements: React.FC<AchievementsProps> = ({ selectedExp }) => {
  const experience = experiences[selectedExp];

  return (
    <OutlineNode
      id="achievements"
      label="Key Achievements"
      level={1}
      parentId="experience"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-ctp-green/20 flex items-center justify-center">
            <FaRocket className="w-4 h-4 text-ctp-green" />
          </div>
          <h3 className="text-xl font-bold text-ctp-text">
            Achievements & Impact
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {experience.achievements.map((achievement, index) => (
            <OutlineNode
              key={`achievement-${achievement.title}`}
              id={`achievement-${index}`}
              label={achievement.title}
              level={2}
              parentId="achievements"
            >
              <Reveal
                effect="rise"
                duration={0.6}
                delay={0.1 * index}
                threshold={0.2}
              >
                <Card className="h-full bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1/30 hover:border-ctp-surface1/50 hover:bg-ctp-surface0/70 transition-all duration-300 overflow-hidden group">
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-ctp-mauve via-ctp-pink to-ctp-red" />

                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {achievement.icon && iconMap[achievement.icon] && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-ctp-mauve/20 flex items-center justify-center text-ctp-mauve group-hover:scale-105 transition-transform duration-300">
                          <div className="text-lg">
                            {iconMap[achievement.icon]}
                          </div>
                        </div>
                      )}

                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-ctp-text mb-3 group-hover:text-ctp-mauve transition-colors duration-300">
                          {achievement.title}
                        </h4>

                        <div className="space-y-3">
                          {achievement.description.map((desc, i) => (
                            <motion.div
                              key={`${index}-${i}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.2 + index * 0.1 + i * 0.05,
                              }}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="w-2 h-2 rounded-full bg-ctp-green mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                              <p className="text-sm text-ctp-subtext0 leading-relaxed group-hover/item:text-ctp-subtext1 transition-colors duration-200">
                                {desc}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </OutlineNode>
          ))}
        </div>
      </div>
    </OutlineNode>
  );
};

/**
 * Modern WorkExperience component with clean dark design using Catppuccin colors.
 * Optimized for both mobile and desktop experiences with proper dark theme support.
 */
const WorkExperience: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number>(0);

  const handleExperienceClick = (index: number) => {
    setSelectedExp(index);
  };

  return (
    <Section id={EXPERIENCE_ID} label="Work Experience" icon="database">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal effect="fade-up" duration={0.8} delay={0.1}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-ctp-blue/20 backdrop-blur-sm">
                <FaBuilding className="w-6 h-6 text-ctp-blue" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve bg-clip-text text-transparent">
                Professional Experience
              </h2>
            </div>
            <p className="text-ctp-subtext0 text-lg max-w-2xl mx-auto">
              My journey in building impactful solutions and driving innovation
            </p>
          </div>
        </Reveal>

        <div className="space-y-8">
          {/* Experience Selection (Mobile: Horizontal scroll, Desktop: Sidebar) */}
          {experiences.length > 1 && (
            <Reveal
              effect="slide-in"
              direction="left"
              duration={0.7}
              delay={0.2}
            >
              <div className="lg:hidden">
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-3 min-w-max">
                    {experiences.map((exp, index) => (
                      <motion.button
                        key={`mobile-${exp.duration}-${index}`}
                        className={`flex-shrink-0 p-4 rounded-xl transition-all duration-300 min-w-[200px] border ${
                          selectedExp === index
                            ? "bg-ctp-surface0/80 border-ctp-blue/30"
                            : "bg-ctp-surface0/30 border-ctp-surface1/30 hover:bg-ctp-surface0/50"
                        }`}
                        onClick={() => handleExperienceClick(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-ctp-surface1/50">
                            <img
                              src={exp.imageSrc}
                              alt={exp.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm text-ctp-text truncate">
                              {exp.company}
                            </p>
                            <p className="text-xs text-ctp-subtext0">
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

          {/* Main Content */}
          <div
            className={`grid gap-8 ${
              experiences.length === 1
                ? "grid-cols-1"
                : "lg:grid-cols-[300px,1fr] xl:grid-cols-[350px,1fr]"
            }`}
          >
            {/* Desktop Sidebar */}
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
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`experience-${selectedExp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden border border-ctp-surface1/30 bg-ctp-surface0/30 backdrop-blur-sm">
                    <CardContent className="p-0">
                      {/* Header */}
                      <Reveal effect="fade-up" duration={0.7} delay={0.3}>
                        <ExperienceHeader selectedExp={selectedExp} />
                      </Reveal>

                      {/* Achievements */}
                      <div className="px-6 sm:px-8 pb-8">
                        <Reveal
                          effect="cascade"
                          duration={0.8}
                          delay={0.4}
                          staggerChildren={0.1}
                        >
                          <Achievements selectedExp={selectedExp} />
                        </Reveal>
                      </div>

                      {/* Technologies */}
                      <Reveal effect="fade-up" duration={0.7} delay={0.5}>
                        <div className="px-6 sm:px-8 pb-8 border-t border-ctp-surface1/20">
                          <OutlineNode
                            id={`${experiences[selectedExp].company}-technologies`}
                            label="Technologies Used"
                            level={1}
                            parentId={EXPERIENCE_ID}
                          >
                            <div className="pt-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-ctp-peach/20 flex items-center justify-center">
                                  <FaCode className="w-4 h-4 text-ctp-peach" />
                                </div>
                                <h3 className="text-lg font-semibold text-ctp-text">
                                  Tech Stack & Tools
                                </h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent" />
                              </div>

                              <Reveal
                                effect="cascade"
                                duration={0.5}
                                staggerChildren={0.05}
                                className="flex flex-wrap gap-2 sm:gap-3"
                              >
                                {experiences[selectedExp].technologies.map(
                                  (tech, index) => (
                                    <motion.div
                                      key={`${tech}-${index}`}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <TechBadge tech={tech} />
                                    </motion.div>
                                  )
                                )}
                              </Reveal>
                            </div>
                          </OutlineNode>
                        </div>
                      </Reveal>

                      {/* Footer */}
                      <Reveal effect="fade-up" duration={0.7} delay={0.6}>
                        <div className="px-6 sm:px-8 py-6 bg-ctp-surface0/30 border-t border-ctp-surface1/20">
                          <div className="flex items-center justify-between text-sm text-ctp-subtext0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-ctp-green animate-pulse" />
                              <span>Experience verified and documented</span>
                            </div>
                            <span>Last updated: July 2024</span>
                          </div>
                        </div>
                      </Reveal>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
