import React from "react";
import { motion } from "framer-motion";
import {
  FaDatabase,
  FaSearch,
  FaDocker,
  FaCode,
  FaTerminal,
} from "react-icons/fa";
import OutlineNode from "../editor/outline/OutlineNode";
import { experiences } from "./experienceDump";

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

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/**
 * Achievements component displays a list of achievements and responsibilities
 * for a selected experience. Each achievement is presented with an icon, title,
 * and description, organized in a visually appealing manner.
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
      <div className="font-semibold text-ctp-mauve mb-6 flex items-center">
        <span className="w-2 h-2 rounded-full bg-ctp-mauve mr-2"></span>{" "}
        Achievements & Responsibilities
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experiences[selectedExp].achievements.map((achievement, index) => (
          <OutlineNode
            key={`achievement-${achievement.title}`}
            id={`achievement-${index}`}
            label={achievement.title}
            level={2}
            parentId="achievements"
          >
            <motion.div
              key={`project-${index}-${achievement.title}`}
              className="h-full bg-ctp-surface0/30 backdrop-blur-sm rounded-xl border border-ctp-surface0 
                        hover:border-ctp-lavender/30 transition-all duration-300 overflow-hidden"
              variants={itemVariants}
            >
              {/* Achievement header with gradient accent */}
              <div className="h-1 bg-gradient-to-r from-ctp-mauve via-ctp-pink to-ctp-mauve"></div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  {achievement.icon && iconMap[achievement.icon] && (
                    <div
                      className="flex-shrink-0 p-2.5 rounded-lg bg-ctp-surface0/70 
                                  text-ctp-lavender shadow-sm shadow-ctp-lavender/10"
                    >
                      <div className="text-lg">{iconMap[achievement.icon]}</div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-ctp-subtext1 mb-2">
                      {achievement.title}
                    </h4>
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
                  </div>
                </div>
              </div>
            </motion.div>
          </OutlineNode>
        ))}
      </motion.div>
    </OutlineNode>
  );
};

export default Achievements;
