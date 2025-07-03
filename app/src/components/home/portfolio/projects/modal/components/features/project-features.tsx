import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Project } from "@/types";
import { type ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import FeatureCard from "./feature-card";

interface ProjectFeaturesProps {
  project: Project;
  theme: ProjectTheme;
}

const ProjectFeatures: React.FC<ProjectFeaturesProps> = ({
  project,
  theme,
}) => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const features = project.projectFeatures || [];

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
            Discover the powerful capabilities and innovative solutions built
            into {project.name}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              theme={theme}
              index={index}
              isExpanded={expandedFeature === feature.id}
              onToggle={() =>
                setExpandedFeature(
                  expandedFeature === feature.id ? null : feature.id
                )
              }
            />
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
