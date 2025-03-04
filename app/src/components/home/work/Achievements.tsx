import React from "react";
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

const Achievements: React.FC<AchievementsProps> = ({ selectedExp }) => {
  return (
    <OutlineNode
      id="achievements"
      label="Achievements"
      level={1}
      parentId="experience"
      className="p-2"
    >
      <div className="font-semibold text-ctp-mauve mb-2">Achievements:</div>
      <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8 ml-4">
        {experiences[selectedExp].achievements.map((achievement, index) => (
          <OutlineNode
            key={`achievement-${achievement.title}`}
            id={`achievement-${index}`}
            label={achievement.title}
            level={2}
            parentId="achievements"
          >
            <div
              key={`project-${index}-${achievement.title}`}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all hover:bg-ctp-surface0 dark:hover:bg-ctp-surface0 border border-ctp-surface0 dark:border-ctp-surface1"
            >
              {achievement.icon && iconMap[achievement.icon] && (
                <div className="flex-shrink-0 p-1.5 sm:p-2 bg-ctp-surface0 dark:bg-ctp-surface0 rounded-lg text-ctp-sky">
                  <div className="text-sm sm:text-base">
                    {iconMap[achievement.icon]}
                  </div>
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-sm sm:text-base mb-2 text-ctp-blue dark:text-ctp-sky">
                  {achievement.title}
                </h4>
                <ul className="text-xs sm:text-sm text-ctp-subtext1 dark:text-ctp-subtext0 leading-relaxed list-disc pl-4">
                  {achievement.description.map((desc, i) => (
                    <li key={`${index}-${i}`} className="marker:text-ctp-green">
                      <span className="text-ctp-subtext1 dark:text-ctp-subtext0">
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </OutlineNode>
        ))}
      </div>
    </OutlineNode>
  );
};

export default Achievements;
