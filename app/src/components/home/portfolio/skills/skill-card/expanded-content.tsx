import { skillCategories } from "../data";
import { motion } from "framer-motion";

interface ExpandedSkillsContentProps {
  category: (typeof skillCategories)[number];
}

const ExpandedSkillsContent: React.FC<ExpandedSkillsContentProps> = ({
  category,
}) => {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {category.skills.map((skill) => (
        <div
          key={skill.name}
          className="p-3 sm:p-4 md:p-5 bg-ctp-surface0/5 rounded-xl sm:rounded-2xl hover:bg-ctp-surface1/20 transition-colors duration-200 w-full overflow-hidden border border-ctp-surface1/10"
        >
          {/* Skill Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div
              className={`text-ctp-${skill.color} flex-shrink-0 p-2 rounded-lg bg-ctp-${skill.color}/10`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6">{skill.icon}</div>
            </div>
            <div>
              <h3 className="text-ctp-text font-bold text-lg sm:text-xl md:text-2xl break-words leading-tight">
                {skill.name}
              </h3>
              <p className="text-ctp-subtext0 text-sm sm:text-base mt-1 font-medium">
                Technology & Framework
              </p>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-ctp-blue to-ctp-mauve rounded-full"></div>
              <h4 className="text-ctp-text text-base sm:text-lg font-bold tracking-wide">
                Real-World Experience
              </h4>
              <div className="h-1 flex-1 bg-gradient-to-r from-ctp-mauve/50 to-transparent rounded-full"></div>
            </div>

            {/* Usage List */}
            <div className="space-y-3 sm:space-y-4">
              {skill.usage.map((use, index) => (
                <motion.div
                  key={use}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="group relative"
                >
                  <div className="flex items-start gap-4 p-3 sm:p-4 rounded-xl bg-transparent hover:bg-ctp-surface1/20 transition-all duration-300 border-l-2 border-ctp-green/30 hover:border-ctp-green/60">
                    <div className="flex-1 min-w-0">
                      <p className="text-ctp-subtext1 group-hover:text-ctp-text text-sm sm:text-base leading-relaxed transition-colors duration-200 font-medium">
                        {use}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandedSkillsContent;
