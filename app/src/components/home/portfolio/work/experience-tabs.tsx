import { experiences } from "./experienceDump";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FaChevronRight } from "react-icons/fa";

interface ExperienceTabsProps {
  selectedExp: number;
  handleExperienceClick: (index: number) => void;
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({
  selectedExp,
  handleExperienceClick,
}) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-base sm:text-lg font-semibold text-ctp-text mb-3 sm:mb-4 px-2">
        Experience Timeline
      </h3>
      {experiences.map((exp, index) => (
        <motion.div
          key={`${exp.duration}-${index}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <button
            className={`w-full text-left p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl transition-all duration-300 relative overflow-hidden border ${
              selectedExp === index
                ? "bg-ctp-surface0/80 border-ctp-blue/30 shadow-md shadow-ctp-blue/10"
                : "bg-ctp-surface0/30 hover:bg-ctp-surface0/50 border-ctp-surface1/30 hover:border-ctp-surface1/50"
            }`}
            onClick={() => handleExperienceClick(index)}
          >
            {/* Selection indicator */}
            {selectedExp === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-0 w-1 h-full bg-ctp-blue rounded-r-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedExp === index
                      ? "border-ctp-blue/50 shadow-md shadow-ctp-blue/20"
                      : "border-ctp-surface1/50"
                  }`}
                >
                  <img
                    src={exp.imageSrc}
                    alt={exp.company}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Active indicator */}
                {selectedExp === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-ctp-blue rounded-full border-2 border-ctp-base"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className={`font-bold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1 transition-colors duration-300 leading-tight break-words ${
                    selectedExp === index ? "text-ctp-blue" : "text-ctp-text"
                  }`}
                >
                  {exp.company}
                </h4>
                <p className="text-xs sm:text-sm text-ctp-subtext0 mb-1 sm:mb-2 break-words">
                  {exp.position}
                </p>
                <Badge
                  variant="outline"
                  className={`text-xs transition-all duration-300 ${
                    selectedExp === index
                      ? "bg-ctp-blue/10 text-ctp-blue border-ctp-blue/30"
                      : "bg-ctp-surface1/30 text-ctp-subtext0 border-ctp-surface1/50"
                  }`}
                >
                  {exp.duration}
                </Badge>
              </div>

              <FaChevronRight
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 flex-shrink-0 ${
                  selectedExp === index
                    ? "text-ctp-blue rotate-90"
                    : "text-ctp-subtext0"
                }`}
              />
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTabs;
