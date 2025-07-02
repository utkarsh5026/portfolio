import React from "react";
import { motion } from "framer-motion";
import {
  FaDatabase,
  FaSearch,
  FaDocker,
  FaCode,
  FaTerminal,
} from "react-icons/fa";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { experiences } from "./experienceDump";
import Reveal from "@/components/animations/reveal/Reveal";

const iconMap: { [key: string]: JSX.Element } = {
  FaDatabase: <FaDatabase />,
  FaSearchDatabase: <FaSearch />,
  FaDocker: <FaDocker />,
  FaCode: <FaCode />,
  FaTerminal: <FaTerminal />,
};

interface AchievementsProps {
  selectedExp: number;
}

/**
 * Achievements component displays a list of achievements and responsibilities
 * for a selected experience. Each achievement is presented with an icon, title,
 * and description, organized in a visually appealing manner with reveal animations.
 *
 * @param {AchievementsProps} props - The properties for the Achievements component.
 * @param {number} props.selectedExp - The index of the selected experience from
 * the experiences array, which determines which achievements to display.
 *
 * @returns {JSX.Element} The rendered Achievements component.
 */
const Achievements: React.FC<AchievementsProps> = ({ selectedExp }) => {
  return (
    <OutlineNode
      id="achievements"
      label="Achievements"
      level={1}
      parentId="experience"
    >
      <Reveal effect="fade-up" duration={0.6}>
        <div className="font-semibold text-ctp-mauve mb-6 flex items-center">
          <span className="w-2 h-2 rounded-full bg-ctp-mauve mr-2"></span>{" "}
          Achievements & Responsibilities
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences[selectedExp].achievements.map((achievement, index) => (
          <OutlineNode
            key={`achievement-${achievement.title}`}
            id={`achievement-${index}`}
            label={achievement.title}
            level={2}
            parentId="achievements"
          >
            <Reveal
              effect="rise"
              duration={0.7}
              delay={0.1 * index}
              threshold={0.2}
            >
              <motion.div
                key={`project-${index}-${achievement.title}`}
                className="h-full bg-ctp-surface0/30 backdrop-blur-sm rounded-xl border border-ctp-surface0 
                          hover:border-ctp-lavender/30 transition-all duration-300 overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Achievement header with gradient accent */}
                <div className="h-1 bg-gradient-to-r from-ctp-mauve via-ctp-pink to-ctp-mauve"></div>

                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {achievement.icon && iconMap[achievement.icon] && (
                      <Reveal
                        effect="zoom-in"
                        duration={0.5}
                        delay={0.1 * index + 0.2}
                      >
                        <div
                          className="flex-shrink-0 p-2.5 rounded-lg bg-ctp-surface0/70 
                                    text-ctp-lavender shadow-sm shadow-ctp-lavender/10"
                        >
                          <div className="text-lg">
                            {iconMap[achievement.icon]}
                          </div>
                        </div>
                      </Reveal>
                    )}
                    <div>
                      <Reveal
                        effect="fade-up"
                        duration={0.6}
                        delay={0.1 * index + 0.3}
                      >
                        <h4 className="font-semibold text-ctp-subtext1 mb-2">
                          {achievement.title}
                        </h4>
                      </Reveal>
                      <Reveal
                        effect="cascade"
                        cascade={true}
                        staggerChildren={0.08}
                        duration={0.5}
                        delay={0.1 * index + 0.4}
                      >
                        <ul className="space-y-2">
                          {achievement.description.map((desc, i) => (
                            <li
                              key={`${index}-${i}`}
                              className="flex items-start gap-2 group"
                            >
                              <span className="text-ctp-green mt-1 text-xs group-hover:scale-110 transition-transform">
                                ■
                              </span>
                              <span className="text-sm text-ctp-subtext0 group-hover:text-ctp-text transition-colors">
                                {desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </OutlineNode>
        ))}
      </div>
    </OutlineNode>
  );
};

export default Achievements;
