import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Star, Zap, TrendingUp } from "lucide-react";
import { Project, MajorFeature } from "@/types";
import { type ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import getCategoryIcon from "@/components/base/category-icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FeaturesContentProps {
  project: Project;
  theme: ProjectTheme;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  project,
  theme,
}) => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(
    project.projectFeatures?.[0]?.id || null
  );

  const features = project.projectFeatures || [];

  if (features.length === 0) {
    return <EmptyState theme={theme} />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
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
        <div className="grid gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              theme={theme}
              index={index}
              isExpanded={expandedFeature === feature.id}
              isSelected={selectedFeature === feature.id}
              onToggle={() =>
                setExpandedFeature(
                  expandedFeature === feature.id ? null : feature.id
                )
              }
              onSelect={() => setSelectedFeature(feature.id)}
            />
          ))}
        </div>

        {/* Feature Stats */}
        <FeatureStats features={features} theme={theme} />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  feature: MajorFeature;
  theme: ProjectTheme;
  index: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  theme,
  index,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
}) => {
  const IconComponent = getCategoryIcon(feature.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 ${
        isSelected
          ? `border-ctp-${theme.main}/50 bg-ctp-${theme.main}/5 shadow-lg shadow-ctp-${theme.main}/20`
          : "border-ctp-surface1/30 bg-ctp-surface0/50 hover:border-ctp-surface2/50 hover:bg-ctp-surface0/80"
      }`}
      onClick={onSelect}
    >
      {/* Background Pattern - smaller on mobile */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-ctp-${theme.main}/10 to-transparent rounded-full blur-xl sm:blur-2xl`}
        />
      </div>

      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <div className="relative p-3 sm:p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
            <div
              className={`flex-shrink-0 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-ctp-${theme.main}/20 text-ctp-${theme.main} group-hover:scale-110 transition-transform duration-300`}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-ctp-text group-hover:text-ctp-text transition-colors leading-tight">
                  {feature.title}
                </h3>
                <CollapsibleTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`p-1 sm:p-1 rounded-md sm:rounded-lg transition-all duration-200 flex-shrink-0 ${
                      isExpanded
                        ? `bg-ctp-${theme.main}/20 text-ctp-${theme.main}`
                        : "bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text"
                    }`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </CollapsibleTrigger>
              </div>

              <p className="text-ctp-subtext1 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 pr-1">
                {feature.description}
              </p>
            </div>
          </div>

          {/* Tags - better mobile layout */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4">
            {/* Show fewer tags on mobile */}
            {feature.tags
              .slice(0, window.innerWidth < 640 ? 2 : 3)
              .map((tag) => (
                <span
                  key={tag}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-md sm:rounded-full bg-ctp-${theme.main}/10 text-ctp-${theme.main} border border-ctp-${theme.main}/20 truncate max-w-[80px] sm:max-w-none`}
                >
                  {tag}
                </span>
              ))}
            {feature.tags.length > (window.innerWidth < 640 ? 2 : 3) && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-md sm:rounded-full bg-ctp-surface1/50 text-ctp-subtext0">
                +{feature.tags.length - (window.innerWidth < 640 ? 2 : 3)}
              </span>
            )}
          </div>

          {/* Sub-features Preview */}
          {!isExpanded && feature.subFeatures.length > 0 && (
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 text-xs text-ctp-subtext0">
                <div className="w-1 h-1 rounded-full bg-ctp-subtext0" />
                <span>{feature.subFeatures.length} capabilities</span>
              </div>
            </div>
          )}

          {/* Expanded Content */}
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="pt-3 sm:pt-4 border-t border-ctp-surface1/30 mt-3 sm:mt-4">
              <SubFeaturesList
                subFeatures={feature.subFeatures}
                theme={theme}
              />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
};

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

interface FeatureStatsProps {
  features: MajorFeature[];
  theme: ProjectTheme;
}

const FeatureStats: React.FC<FeatureStatsProps> = ({ features, theme }) => {
  const totalSubFeatures = features.reduce(
    (acc, f) => acc + f.subFeatures.length,
    0
  );
  const highlightedFeatures = features.reduce(
    (acc, f) => acc + f.subFeatures.filter((sf) => sf.isHighlight).length,
    0
  );

  const stats = [
    { label: "Major Features", value: features.length, icon: Star },
    { label: "Total Capabilities", value: totalSubFeatures, icon: Zap },
    { label: "Key Highlights", value: highlightedFeatures, icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-6 sm:mt-8 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-ctp-surface0/30 border border-ctp-surface1/30"
    >
      <h3 className="text-base sm:text-lg font-semibold text-ctp-text mb-3 sm:mb-4 text-center">
        Feature Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 rounded-lg bg-ctp-${theme.main}/20 flex items-center justify-center`}
            >
              <stat.icon
                className={`w-4 h-4 sm:w-5 sm:h-5 text-ctp-${theme.main}`}
              />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-ctp-text mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-ctp-subtext0">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
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

export default FeaturesContent;
