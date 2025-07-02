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
          <Card className="overflow-hidden border-none bg-ctp-surface0/10 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Header */}
              <Reveal effect="fade-up" duration={0.7} delay={0.3}>
                <ExperienceHeader selectedExp={selectedExp} />
              </Reveal>

              {/* Achievements */}
              <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-6 sm:pb-8">
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
                <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-ctp-surface1/20">
                  <OutlineNode
                    id={`${experiences[selectedExp].company}-technologies`}
                    label="Technologies Used"
                    level={1}
                    parentId={"experience"}
                  >
                    <div className="pt-4 sm:pt-6">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-ctp-peach/20 flex items-center justify-center flex-shrink-0">
                          <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-ctp-peach" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-ctp-text">
                          Tech Stack & Tools
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent" />
                      </div>

                      <Reveal
                        effect="cascade"
                        duration={0.5}
                        staggerChildren={0.05}
                        className="flex flex-wrap gap-2 sm:gap-3 md:gap-4"
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
                <div className="px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-6 bg-ctp-surface0/30 border-t border-ctp-surface1/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-ctp-subtext0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-ctp-green animate-pulse flex-shrink-0" />
                      <span>Experience verified and documented</span>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">
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
