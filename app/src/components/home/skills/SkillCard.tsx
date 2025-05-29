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
      className="group"
    >
      <div
        className="bg-ctp-surface0/50 backdrop-blur-sm rounded-2xl p-6 border border-ctp-surface1/50 hover:border-ctp-surface2/80 transition-all duration-300 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl bg-ctp-${category.color}/10 text-ctp-${category.color}`}
            >
              {category.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ctp-text">
                {category.title}
              </h3>
              <p className="text-sm text-ctp-subtext0 hidden sm:block">
                {category.description}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-ctp-subtext0"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Skills Preview (Always visible on mobile) */}
        <div className="flex flex-wrap gap-2 mb-3 sm:hidden">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-ctp-surface1/50 rounded-lg"
            >
              <div className={`text-ctp-${skill.color} text-sm`}>
                {skill.icon}
              </div>
              <span className="text-xs text-ctp-subtext1 font-medium">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop Preview */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {category.skills.slice(0, 4).map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-3 py-1.5 bg-ctp-surface1/30 rounded-lg"
            >
              <div className={`text-ctp-${skill.color}`}>{skill.icon}</div>
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
          <div className="pt-4 border-t border-ctp-surface1/50 mt-4">
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 bg-ctp-surface1/20 rounded-xl hover:bg-ctp-surface1/30 transition-colors duration-200"
                >
                  {/* Skill Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`text-ctp-${skill.color} flex-shrink-0`}>
                      {skill.icon}
                    </div>
                    <span className="text-ctp-text font-semibold text-lg">
                      {skill.name}
                    </span>
                  </div>

                  {/* Usage Examples */}
                  <div className="space-y-2">
                    <p className="text-ctp-subtext0 text-sm font-medium mb-2">
                      How I've used it:
                    </p>
                    <ul className="space-y-1.5">
                      {skill.usage.map((use) => (
                        <li
                          key={use}
                          className="text-sm text-ctp-subtext1 pl-4 relative before:absolute before:left-0 before:top-[0.4em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-ctp-subtext0"
                        >
                          {use}
                        </li>
                      ))}
                    </ul>
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
