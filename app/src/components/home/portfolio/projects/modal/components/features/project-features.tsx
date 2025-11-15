import React from "react";
import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import type { Project } from "@/types";
import { type ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";

interface ProjectFeaturesProps {
  project: Project;
  theme: ProjectTheme;
}

const ProjectFeatures: React.FC<ProjectFeaturesProps> = ({
  project,
  theme,
}) => {
  const features = project.keyFeatures || [];

  if (features.length === 0) {
    return <EmptyState theme={theme} />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
          >
            <div
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-ctp-${theme.main}/20`}
            >
              <Star
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-${theme.main}`}
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ctp-text text-center sm:text-left">
              Key Features
            </h2>
          </motion.div>
          <p className="text-ctp-subtext0 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Technical highlights and core capabilities of {project.name}
          </p>
        </div>

        {/* Features List */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-ctp-surface0/50 border-ctp-surface1 hover:border-ctp-${theme.main}/40`}
            >
              {/* Feature number badge */}
              <div className="absolute -top-3 -left-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ctp-${theme.main}/20 border-2 border-ctp-${theme.main}/50 flex items-center justify-center`}>
                  <span className={`text-sm sm:text-base font-bold text-ctp-${theme.main}`}>
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-2.5 rounded-lg bg-ctp-${theme.main}/10 group-hover:bg-ctp-${theme.main}/20 transition-colors`}>
                  <Zap className={`w-4 h-4 sm:w-5 sm:h-5 text-ctp-${theme.main}`} />
                </div>

                <div className="flex-1 space-y-2">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-ctp-text group-hover:text-ctp-${theme.main} transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ctp-subtext0 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover accent line */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-ctp-${theme.main}/50 to-transparent transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ theme: ProjectTheme }> = ({ theme }) => (
  <div className="h-full flex items-center justify-center p-4 sm:p-8">
    <div className="text-center space-y-3 sm:space-y-4 max-w-xs sm:max-w-md">
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-ctp-${theme.main}/20 flex items-center justify-center`}
      >
        <Star className={`w-6 h-6 sm:w-8 sm:h-8 text-ctp-${theme.main}`} />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-ctp-text">
        No Features Listed
      </h3>
      <p className="text-ctp-subtext0 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
        This project doesn't have detailed features documented yet. Check out
        the overview or tech stack for more information.
      </p>
    </div>
  </div>
);

export default ProjectFeatures;
