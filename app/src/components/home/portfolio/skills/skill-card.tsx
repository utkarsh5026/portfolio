import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { skillCategories } from "./data";

interface SkillCardProps {
  category: (typeof skillCategories)[number];
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group w-full"
    >
      <div
        className="bg-ctp-surface0/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-none hover:border-ctp-surface2/80 transition-all duration-300 cursor-pointer w-full overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div
              className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-ctp-${category.color}/10 text-ctp-${category.color} flex-shrink-0`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                {category.icon}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-ctp-text leading-tight break-words">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm text-ctp-subtext0 hidden sm:block mt-0.5 break-words">
                {category.description}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-ctp-subtext0 flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </div>

        {/* Skills Preview - Mobile optimized */}
        <div className="sm:hidden">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {category.skills.slice(0, 3).map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-1 px-2 py-1 bg-transparent rounded-md"
              >
                <div
                  className={`text-ctp-${skill.color} text-xs flex-shrink-0`}
                >
                  {skill.icon}
                </div>
                <span className="text-xs text-ctp-subtext1 font-medium truncate">
                  {skill.name}
                </span>
              </div>
            ))}
            {category.skills.length > 3 && (
              <div className="flex items-center px-2 py-1 bg-ctp-surface1/30 rounded-md">
                <span className="text-xs text-ctp-subtext0">
                  +{category.skills.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Preview */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {category.skills.slice(0, 4).map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-ctp-surface1/30 rounded-lg"
            >
              <div className={`text-ctp-${skill.color} flex-shrink-0`}>
                {skill.icon}
              </div>
              <span className="text-sm text-ctp-subtext1 font-medium">
                {skill.name}
              </span>
            </div>
          ))}
          {category.skills.length > 4 && (
            <div className="flex items-center px-3 py-1.5 bg-ctp-surface1/30 rounded-lg">
              <span className="text-sm text-ctp-subtext0">
                +{category.skills.length - 4} more
              </span>
            </div>
          )}
        </div>

        {/* Expanded Skills */}
        <motion.div
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-3 sm:pt-4 border-none bg-transparent mt-3 sm:mt-4">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2 sm:p-3 md:p-4 bg-transparent rounded-lg sm:rounded-xl hover:bg-ctp-surface1/30 transition-colors duration-200 w-full overflow-hidden"
                >
                  {/* Skill Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`text-ctp-${skill.color} flex-shrink-0`}>
                      <div className="w-4 h-4 sm:w-5 sm:h-5">{skill.icon}</div>
                    </div>
                    <span className="text-ctp-text font-semibold text-sm sm:text-base md:text-lg break-words">
                      {skill.name}
                    </span>
                  </div>

                  {/* Usage Examples */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="h-0.5 w-6 bg-gradient-to-r from-ctp-blue to-ctp-mauve rounded-full"></div>
                      <p className="text-ctp-subtext0 text-xs sm:text-sm font-semibold">
                        How I've used it:
                      </p>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-ctp-mauve to-transparent rounded-full"></div>
                    </div>
                    <div className="grid gap-2 sm:gap-2.5">
                      {skill.usage.map((use, index) => (
                        <motion.div
                          key={use}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div className="flex items-start gap-3 p-2 sm:p-3 rounded-lg bg-transparent hover:bg-ctp-surface1/30 transition-all duration-200 border-none">
                            <div
                              className={`mt-1 p-1 rounded-full bg-ctp-surface1/30 flex-shrink-0`}
                            >
                              <div
                                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-ctp-green/50`}
                              ></div>
                            </div>
                            <p className="text-xs sm:text-sm text-ctp-subtext1 leading-relaxed flex-1 group-hover:text-ctp-text transition-colors duration-200">
                              {use}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
