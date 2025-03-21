import React, { useState } from "react";
import Section from "@/components/section/Section";
import { experiences } from "./experienceDump";
import { motion } from "framer-motion";
import TechBadge from "@/components/base/TechBadge";
import Achievements from "./Achievements";
import OutlineNode from "../editor/outline/OutlineNode";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceTabs from "./ExperienceTabs";

const EXPERIENCE_ID = "experience";

/**
 * WorkExperience component displays a list of work experiences for the user.
 * It allows users to select a specific experience to view detailed information,
 * including the position held, company name, duration, achievements, and technologies used.
 *
 * @returns {JSX.Element} The rendered WorkExperience component.
 */
const WorkExperience: React.FC = () => {
  // State to track the currently selected experience index
  const [selectedExp, setSelectedExp] = useState<number>(0);

  /**
   * Handles the click event on an experience button.
   * Updates the selected experience index to display the corresponding details.
   *
   * @param {number} index - The index of the experience that was clicked.
   */
  const handleExperienceClick = (index: number) => {
    setSelectedExp(index);
  };

  return (
    <Section id={EXPERIENCE_ID} label="Work Experience" icon="database">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative mb-8">
          {/* Subtle section header */}
          <h2 className="text-2xl font-bold text-ctp-text mb-6 flex items-center">
            <span className="mr-3 bg-gradient-to-r from-ctp-blue to-ctp-lavender text-transparent bg-clip-text">
              Professional Experience
            </span>
            <div className="h-px flex-grow bg-gradient-to-r from-ctp-blue/30 to-transparent"></div>
          </h2>

          <div
            className={`grid ${
              experiences.length === 1
                ? "grid-cols-1"
                : "lg:grid-cols-[1fr,2fr] md:grid-cols-[1.2fr,2fr]"
            } gap-6 lg:gap-8`}
          >
            {experiences.length > 1 && (
              <ExperienceTabs
                selectedExp={selectedExp}
                handleExperienceClick={handleExperienceClick}
              />
            )}

            {/* Experience details card with smooth transitions */}
            <motion.div
              key={selectedExp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-ctp-mantle to-ctp-crust rounded-xl overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-sapphire"></div>

              <div className="p-6">
                {/* Experience header with position and company */}
                <ExperienceHeader selectedExp={selectedExp} />

                {/* Achievements section */}
                <Achievements selectedExp={selectedExp} />

                <OutlineNode
                  id={`${experiences[selectedExp].company}-technologies`}
                  label="Technologies"
                  level={1}
                  parentId={EXPERIENCE_ID}
                >
                  <div className="mt-6 pt-4 border-t border-ctp-surface0">
                    <div className="font-semibold text-ctp-mauve mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-ctp-mauve mr-2"></span>{" "}
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experiences[selectedExp].technologies.map(
                        (tech, index) => (
                          <TechBadge tech={tech} key={`${tech}-${index}`} />
                        )
                      )}
                    </div>
                  </div>
                </OutlineNode>
              </div>

              {/* Card footer with subtle gradient */}
              <div className="px-6 py-4 bg-ctp-mantle/50 border-t border-ctp-surface0 text-sm text-ctp-subtext0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-ctp-green"></div>
                  <span>Experience details last updated: July 2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
