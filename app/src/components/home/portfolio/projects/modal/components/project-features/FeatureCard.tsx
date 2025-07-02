import type { MajorFeature, MediaItem } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import FeatureMediaShowcase from "./MediaShowcase";
import SubFeatureCard from "./SubFeatureCard";

interface FeatureCardProps {
  feature: MajorFeature;
  theme: ProjectTheme;
  index: number;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onMediaClick: (index: number) => void;
  allMedia: MediaItem[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  theme,
  index,
  isExpanded,
  onToggleExpansion,
  onMediaClick,
  allMedia,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMediaHovered, setIsMediaHovered] = useState(false);

  const hasMedia = feature.media.length > 0;
  const IconComponent = feature.icon;

  const nextMedia = () => {
    if (feature.media.length > 1) {
      setCurrentMediaIndex((prev) => (prev + 1) % feature.media.length);
    }
  };

  const previousMedia = () => {
    if (feature.media.length > 1) {
      setCurrentMediaIndex(
        (prev) => (prev - 1 + feature.media.length) % feature.media.length
      );
    }
  };

  const handleMediaClick = () => {
    if (hasMedia && feature.media[currentMediaIndex]) {
      const globalIndex = allMedia.findIndex(
        (m) => m.id === feature.media[currentMediaIndex].id
      );
      if (globalIndex !== -1) {
        onMediaClick(globalIndex);
      }
    }
  };

  const priorityColors = {
    high: `ctp-${theme.main}`,
    medium: `ctp-${theme.secondary}`,
    low: "ctp-subtext1",
  };

  return (
    <Reveal
      effect="fade-up"
      duration={0.6}
      delay={index * 0.1}
      className="w-full"
    >
      <div
        className={cn(
          "group relative rounded-2xl overflow-hidden",
          "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md",
          "border border-white/20 hover:border-white/30",
          "transition-all duration-500",
          `hover:shadow-2xl hover:shadow-${priorityColors[feature.priority]}/20`
        )}
      >
        {/* Feature Header */}
        <div className="p-6 sm:p-8">
          <div
            className={cn(
              "flex flex-col gap-6",
              hasMedia ? "lg:flex-row lg:items-start" : ""
            )}
          >
            {/* Feature Info */}
            <div className={cn("space-y-4", hasMedia ? "flex-1" : "w-full")}>
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "p-3 rounded-xl flex-shrink-0",
                    `bg-${priorityColors[feature.priority]}/20 border border-${
                      priorityColors[feature.priority]
                    }/30`
                  )}
                >
                  <IconComponent
                    className={`w-6 h-6 text-${
                      priorityColors[feature.priority]
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                    {feature.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feature.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.1 + index * 0.05 }}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          `bg-ctp-${theme.secondary}/20 text-ctp-${theme.secondary} border border-ctp-${theme.secondary}/30`,
                          "transition-all duration-200 hover:scale-105"
                        )}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-features Toggle */}
              <button
                onClick={onToggleExpansion}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl w-full text-left",
                  "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
                  "transition-all duration-300 group/toggle"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 flex-1",
                    `text-${priorityColors[feature.priority]}`
                  )}
                >
                  <Eye className="w-4 h-4" />
                  <span className="font-medium text-sm">
                    View {feature.subFeatures.length} Capabilities
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/60 group-hover/toggle:text-white" />
                </motion.div>
              </button>
            </div>

            {/* Media Showcase */}
            {hasMedia && (
              <div className="flex-1 lg:max-w-md">
                <FeatureMediaShowcase
                  media={feature.media}
                  currentIndex={currentMediaIndex}
                  theme={theme}
                  isHovered={isMediaHovered}
                  onHover={setIsMediaHovered}
                  onNext={nextMedia}
                  onPrevious={previousMedia}
                  onClick={handleMediaClick}
                  featureTitle={feature.title}
                />
              </div>
            )}
          </div>
        </div>

        {/* Expandable Sub-features */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feature.subFeatures.map((subFeature, subIndex) => (
                    <SubFeatureCard
                      key={subFeature.id}
                      subFeature={subFeature}
                      theme={theme}
                      index={subIndex}
                      priority={feature.priority}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Priority Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "w-3 h-3 rounded-full",
              `bg-${priorityColors[feature.priority]}`
            )}
          />
        </div>
      </div>
    </Reveal>
  );
};

export default FeatureCard;
