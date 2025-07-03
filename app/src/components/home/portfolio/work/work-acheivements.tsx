import React from "react";
import { experiences } from "./experienceDump";
import { motion } from "framer-motion";
import { OutlineNode } from "@/components/home/editor/outline";
import Reveal from "@/components/animations/reveal/Reveal";
import {
  FaCode,
  FaTerminal,
  FaDocker,
  FaDatabase,
  FaSearch,
  FaRocket,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

interface AchievementsProps {
  selectedExp: number;
}

const iconMap: { [key: string]: JSX.Element } = {
  FaDatabase: <FaDatabase />,
  FaSearchDatabase: <FaSearch />,
  FaDocker: <FaDocker />,
  FaCode: <FaCode />,
  FaTerminal: <FaTerminal />,
};

const Achievements: React.FC<AchievementsProps> = ({ selectedExp }) => {
  const experience = experiences[selectedExp];

  return (
    <OutlineNode
      id="achievements"
      label="Key Achievements"
      level={1}
      parentId="experience"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-ctp-green/20 flex items-center justify-center flex-shrink-0">
            <FaRocket className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-green" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-ctp-text">
            Achievements & Impact
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent" />
        </div>

        <div className="flex flex-col  gap-3 sm:gap-4 md:gap-6">
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
                <AchievementCard achievement={achievement} index={index} />
              </Reveal>
            </OutlineNode>
          ))}
        </div>
      </div>
    </OutlineNode>
  );
};

interface AchievementCardProps {
  achievement: (typeof experiences)[number]["achievements"][number];
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  index,
}) => {
  return (
    <Card className="h-full bg-transparent backdrop-blur-sm border-none hover:border-ctp-surface1/50 hover:bg-ctp-surface0/70 transition-all duration-300 overflow-hidden group">
      <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
          {achievement.icon && iconMap[achievement.icon] && (
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-ctp-mauve/20 flex items-center justify-center text-ctp-mauve group-hover:scale-105 transition-transform duration-300">
              <div className="text-base sm:text-lg md:text-xl">
                {iconMap[achievement.icon]}
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-ctp-text mb-3 sm:mb-4 group-hover:text-ctp-mauve transition-colors duration-300 leading-tight break-words">
              {achievement.title}
            </h4>

            <div className="space-y-3 sm:space-y-4">
              {achievement.description.map((desc, i) => (
                <motion.div
                  key={`${index}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1 + i * 0.05,
                  }}
                  className="flex items-start gap-3 sm:gap-4 group/item"
                >
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-ctp-green mt-2 sm:mt-2.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                  <p className="text-sm sm:text-base md:text-lg text-ctp-subtext0 leading-relaxed group-hover/item:text-ctp-subtext1 transition-colors duration-200 break-words">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Achievements;
