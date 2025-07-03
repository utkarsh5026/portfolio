import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { MajorFeature } from "@/types";
import { type ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import getCategoryIcon from "@/components/base/category-icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SubFeaturesList from "./sub-features-list";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: MajorFeature;
  theme: ProjectTheme;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  theme,
  index,
  isExpanded,
  onToggle,
}) => {
  const IconComponent = getCategoryIcon(feature.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 border-none",
        `hover:border-ctp-${theme.main}/50 hover:bg-ctp-${theme.main}/5 hover:shadow-lg hover:shadow-ctp-${theme.main}/20 transition-all duration-300`
      )}
      onClick={onToggle}
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

export default FeatureCard;
