import React from "react";
import { experiences } from "./experienceDump";
import { motion, AnimatePresence } from "framer-motion";
import TechBadge from "@/components/base/TechBadge";
import OutlineNode from "../../editor/outline/OutlineNode";
import Reveal from "@/components/animations/reveal/Reveal";
import { FaCode } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import ExperienceHeader from "./experience-header";
import Achievements from "./work-acheivements";

interface ExperienceDetailsProps {
  selectedExp: number;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
  selectedExp,
}) => {
  return (
    <div className="space-y-6 sm:space-y-8">
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
              <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
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
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-ctp-surface1/20">
                  <OutlineNode
                    id={`${experiences[selectedExp].company}-technologies`}
                    label="Technologies Used"
                    level={1}
                    parentId={"experience"}
                  >
                    <div className="pt-4 sm:pt-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-ctp-peach/20 flex items-center justify-center flex-shrink-0">
                          <FaCode className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-peach" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-ctp-text">
                          Tech Stack & Tools
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent" />
                      </div>

                      <Reveal
                        effect="cascade"
                        duration={0.5}
                        staggerChildren={0.05}
                        className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3"
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
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 bg-ctp-surface0/30 border-t border-ctp-surface1/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-ctp-subtext0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ctp-green animate-pulse flex-shrink-0" />
                      <span>Experience verified and documented</span>
                    </div>
                    <span className="text-xs sm:text-sm">
                      Last updated: July 2024
                    </span>
                  </div>
                </div>
              </Reveal>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperienceDetails;
