import React from "react";
import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import type { MajorFeature } from "@/types";
import { type ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";

interface SubFeaturesListProps {
  subFeatures: MajorFeature["subFeatures"];
  theme: ProjectTheme;
}

const SubFeaturesList: React.FC<SubFeaturesListProps> = ({
  subFeatures,
  theme,
}) => {
  const highlights = subFeatures.filter((f) => f.isHighlight);
  const regular = subFeatures.filter((f) => !f.isHighlight);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Highlighted Features */}
      {highlights.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <Star className={`w-3 h-3 sm:w-4 sm:h-4 text-ctp-${theme.main}`} />
            <h4 className="text-xs sm:text-sm font-semibold text-ctp-text">
              Key Highlights
            </h4>
          </div>
          <div className="grid gap-2">
            {highlights.map((subFeature, index) => (
              <motion.div
                key={subFeature.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-2 sm:p-3 rounded-md sm:rounded-lg bg-ctp-${theme.main}/10 border border-ctp-${theme.main}/20`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-ctp-text text-xs sm:text-sm mb-1">
                      {subFeature.title}
                    </h5>
                    {subFeature.description && (
                      <p className="text-xs text-ctp-subtext1 leading-relaxed">
                        {subFeature.description}
                      </p>
                    )}
                  </div>
                  {subFeature.metrics && (
                    <div
                      className={`px-2 py-1 rounded-md bg-ctp-${theme.main}/20 text-ctp-${theme.main} text-xs font-medium flex-shrink-0 self-start`}
                    >
                      {subFeature.metrics}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Features */}
      {regular.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          {highlights.length > 0 && (
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-subtext0" />
              <h4 className="text-xs sm:text-sm font-semibold text-ctp-text">
                Additional Features
              </h4>
            </div>
          )}
          <div className="grid gap-1 sm:gap-2">
            {regular.map((subFeature, index) => (
              <motion.div
                key={subFeature.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (highlights.length + index) * 0.05 }}
                className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 rounded-md sm:rounded-lg hover:bg-ctp-surface1/30 transition-colors"
              >
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-ctp-subtext0 flex-shrink-0 mt-1.5 sm:mt-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-ctp-text block">
                    {subFeature.title}
                  </span>
                  {subFeature.metrics && (
                    <span className="text-xs text-ctp-subtext0 block sm:inline sm:ml-2">
                      ({subFeature.metrics})
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubFeaturesList;
