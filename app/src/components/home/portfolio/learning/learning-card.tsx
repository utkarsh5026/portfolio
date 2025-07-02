import { TechnologyLearning } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LearningCardProps {
  tech: TechnologyLearning;
  category: string;
  onSelect: (tech: TechnologyLearning) => void;
  delay?: number;
  categoryColor: string;
}

const LearningCard: React.FC<LearningCardProps> = ({
  tech,
  category,
  onSelect,
  delay = 0,
  categoryColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onSelect(tech)}
    >
      <div className="h-full bg-gradient-to-b from-ctp-mantle to-ctp-crust backdrop-blur-sm rounded-2xl p-6 border-none hover:border-ctp-surface2/80 transition-all duration-300 hover:bg-ctp-surface0/80">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} group-hover:scale-105 transition-transform duration-300`}
          >
            {tech.icon}
          </div>

          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ x: 2 }}
          >
            <ArrowRight className="w-4 h-4 text-ctp-subtext0" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-ctp-text group-hover:text-ctp-lavender transition-colors duration-300">
            {tech.name}
          </h3>

          <p className="text-sm md:text-base lg:text-lg text-ctp-subtext0 line-clamp-3 leading-relaxed">
            {tech.description}
          </p>

          {/* Learning Goals Preview */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-1 h-1 rounded-full bg-ctp-${categoryColor}`} />
              <span className="text-xs md:text-sm font-medium text-ctp-subtext1">
                Learning Focus
              </span>
            </div>
            <p className="text-xs md:text-sm lg:text-base text-ctp-subtext0 line-clamp-2">
              {tech.learningGoals[0]}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-ctp-surface1/30">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs md:text-sm px-2 py-1 rounded-full bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} font-medium`}
            >
              {category}
            </span>

            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full bg-ctp-${categoryColor}`}
              />
              <span className="text-xs md:text-sm text-ctp-subtext0">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningCard;
