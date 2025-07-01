import { motion } from "framer-motion";
import type { TechnologyLearning } from "@/types";
import { categoryInfo, currentLearningTechnologies } from "./data";

import React from "react";

interface LearningCardProps {
  tech: TechnologyLearning;
  catInfo: (typeof categoryInfo)[keyof typeof categoryInfo];
  isActive: boolean;
  category: (typeof currentLearningTechnologies)[number]["category"];
}

const LearningCard: React.FC<LearningCardProps> = ({
  tech,
  catInfo,
  isActive,
  category,
}) => {
  return (
    <div className="relative rounded-xl p-1 bg-gradient-to-b from-ctp-surface0/70 to-ctp-mantle/70 backdrop-blur-md z-10 h-full overflow-hidden">
      <div className="h-full flex flex-col bg-gradient-to-b from-ctp-crust/90 to-ctp-mantle/90 rounded-lg p-6">
        {/* Card header with tech info */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            {/* Tech icon with interactive effects */}
            <motion.div
              className="flex-shrink-0 relative"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${catInfo.color}40, ${catInfo.hoverColor}10)`,
                }}
              >
                <div className="relative z-10 text-xl group-hover:text-white text-ctp-text transition-colors duration-300">
                  {tech.icon}
                </div>

                {/* Icon background animation */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${catInfo.color}30, ${catInfo.hoverColor}10)`,
                  }}
                  animate={{
                    rotate: isActive ? [0, 10, 0] : 0,
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>

              {/* Decorative accent ring */}
              {isActive && (
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    border: `1px solid ${catInfo.color}30`,
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${catInfo.color}20`,
                color: catInfo.color,
              }}
            >
              {category}
            </div>
          </div>

          {/* Tech name with hover effect */}
          <h3 className="mt-4 text-xl font-bold group-hover:text-ctp-blue text-ctp-text transition-colors duration-300">
            {tech.name}
          </h3>
        </div>

        {/* Tech description with line clamp */}
        <div className="mb-4 flex-grow">
          <p className="text-ctp-subtext0 text-sm line-clamp-3 group-hover:text-ctp-subtext1 transition-colors duration-300">
            {tech.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
