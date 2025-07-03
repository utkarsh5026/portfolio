import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { skillCategories } from "../data";

interface TriggerContentProps {
  category: (typeof skillCategories)[number];
  isMobile: boolean;
  isDrawerOpen: boolean;
  isExpanded: boolean;
  handleToggle: () => void;
}

const TriggerContent: React.FC<TriggerContentProps> = ({
  category,
  isMobile,
  isDrawerOpen,
  isExpanded,
  handleToggle,
}) => (
  <div
    className="bg-ctp-surface0/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-none hover:border-ctp-surface2/60 hover:bg-ctp-surface0/15 transition-all duration-300 cursor-pointer w-full overflow-hidden group"
    onClick={handleToggle}
  >
    <Header
      category={category}
      isMobile={isMobile}
      isDrawerOpen={isDrawerOpen}
      isExpanded={isExpanded}
    />

    <div className="sm:hidden">
      <MobileSkillsPreview category={category} />
    </div>

    <div className="hidden sm:block">
      <DesktopSkillsPreview category={category} />
    </div>
  </div>
);

interface MobileSkillsPreviewProps {
  category: (typeof skillCategories)[number];
}

const MobileSkillsPreview: React.FC<MobileSkillsPreviewProps> = ({
  category,
}) => {
  return (
    <div className="mb-3">
      <div className="flex flex-wrap gap-2">
        {category.skills.slice(0, 3).map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-ctp-base to-ctp-crust hover:bg-ctp-surface1/40 rounded-lg transition-colors duration-200 border-none"
          >
            <div className={`text-ctp-${skill.color} text-sm flex-shrink-0`}>
              {skill.icon}
            </div>
            <span className="text-xs text-ctp-subtext1 font-medium truncate">
              {skill.name}
            </span>
          </div>
        ))}
        {category.skills.length > 3 && (
          <div className="flex items-center px-3 py-2 bg-ctp-surface1/15 border-none rounded-lg">
            <span className="text-xs text-ctp-subtext0 font-medium">
              +{category.skills.length - 3} more
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface DesktopSkillsPreviewProps {
  category: (typeof skillCategories)[number];
}

const DesktopSkillsPreview: React.FC<DesktopSkillsPreviewProps> = ({
  category,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-0.5 w-6 bg-gradient-to-r from-ctp-blue to-ctp-mauve rounded-full"></div>
        <h3 className="text-sm font-bold text-ctp-text tracking-wide">
          Technology Stack
        </h3>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-ctp-mauve/30 to-transparent rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {category.skills.slice(0, 4).map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2.5 px-3 py-2 bg-ctp-surface1/15 hover:bg-ctp-surface1/30 rounded-xl transition-all duration-200 border border-ctp-surface1/20 group/skill"
          >
            <div
              className={`text-ctp-${skill.color} flex-shrink-0 group-hover/skill:scale-110 transition-transform duration-200`}
            >
              {skill.icon}
            </div>
            <span className="text-sm text-ctp-subtext1 group-hover/skill:text-ctp-text font-medium transition-colors duration-200">
              {skill.name}
            </span>
          </div>
        ))}
        {category.skills.length > 4 && (
          <div className="flex items-center px-3 py-2 bg-ctp-surface1/10 border border-ctp-surface1/20 rounded-xl">
            <span className="text-sm text-ctp-subtext0 font-medium">
              +{category.skills.length - 4} more technologies
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  category: (typeof skillCategories)[number];
  isMobile: boolean;
  isDrawerOpen: boolean;
  isExpanded: boolean;
}

const Header: React.FC<HeaderProps> = ({
  category,
  isMobile,
  isDrawerOpen,
  isExpanded,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-5 gap-3">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl bg-ctp-${category.color}/15 text-ctp-${category.color} flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
            {category.icon}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight break-words group-hover:text-ctp-text transition-colors duration-200">
            {category.title}
          </h2>
          <p className="text-xs sm:text-base text-ctp-subtext0 group-hover:text-ctp-subtext1 mt-1 break-words font-medium leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <motion.div
        animate={{ rotate: (isMobile ? isDrawerOpen : isExpanded) ? 90 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-ctp-subtext0 group-hover:text-ctp-text flex-shrink-0 p-1 rounded-lg hover:bg-ctp-surface1/30 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>
    </div>
  );
};
export default TriggerContent;
