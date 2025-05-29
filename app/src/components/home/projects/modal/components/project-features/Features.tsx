import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Database,
  Smartphone,
  Globe,
  Maximize2,
  Eye,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem, Project } from "@/types";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import Reveal from "@/components/animations/reveal/Reveal";

interface FeaturesContentProps {
  project: Project;
  theme: ProjectTheme;
}

// Enhanced feature structure with hierarchy
interface MajorFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  subFeatures: SubFeature[];
  media: MediaItem[];
  tags: string[];
  priority: "high" | "medium" | "low";
}

interface SubFeature {
  id: string;
  title: string;
  description?: string;
  metrics?: string; // e.g., "10,000 users", "99.9% uptime"
  isHighlight?: boolean;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  project,
  theme,
}) => {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [allMedia] = useState<MediaItem[]>(project.media?.gallery || []);

  // Transform flat features into hierarchical structure
  const majorFeatures: MajorFeature[] = React.useMemo(() => {
    return organizeFeaturesHierarchically(project.features, allMedia);
  }, [project.features, allMedia]);

  const toggleFeatureExpansion = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  const openLightbox = (mediaIndex: number) => {
    setSelectedMediaIndex(mediaIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMediaIndex(null);
  };

  const navigateMedia = (direction: "prev" | "next") => {
    if (selectedMediaIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (selectedMediaIndex - 1 + allMedia.length) % allMedia.length
        : (selectedMediaIndex + 1) % allMedia.length;
    setSelectedMediaIndex(newIndex);
  };

  return (
    <div className="space-y-6 p-4 sm:p-8">
      {/* Header Section */}
      <FeatureHeader
        project={project}
        theme={theme}
        majorFeaturesCount={majorFeatures.length}
        totalSubFeatures={majorFeatures.reduce(
          (sum, f) => sum + f.subFeatures.length,
          0
        )}
      />

      {/* Major Features */}
      {majorFeatures.length > 0 ? (
        <div className="space-y-6">
          {majorFeatures.map((feature, index) => (
            <MajorFeatureCard
              key={feature.id}
              feature={feature}
              theme={theme}
              index={index}
              isExpanded={expandedFeatures.has(feature.id)}
              onToggleExpansion={() => toggleFeatureExpansion(feature.id)}
              onMediaClick={openLightbox}
              allMedia={allMedia}
            />
          ))}
        </div>
      ) : (
        <EmptyState theme={theme} />
      )}

      {/* Media Lightbox */}
      <MediaLightbox
        isOpen={isLightboxOpen}
        media={allMedia}
        selectedIndex={selectedMediaIndex}
        theme={theme}
        onClose={closeLightbox}
        onNavigate={navigateMedia}
      />
    </div>
  );
};

// Header Component
interface FeatureHeaderProps {
  project: Project;
  theme: ProjectTheme;
  majorFeaturesCount: number;
  totalSubFeatures: number;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  project,
  theme,
  majorFeaturesCount,
  totalSubFeatures,
}) => {
  return (
    <Reveal className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} shadow-lg`}
        >
          <Sparkles className="w-6 h-6 text-ctp-crust" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Core Features
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Major capabilities that power this project
          </p>
        </div>
      </div>

      {/* Enhanced Stats Bar */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-lg mx-auto">
        <div className="text-center">
          <div className={`text-xl font-bold text-ctp-${theme.main}`}>
            {majorFeaturesCount}
          </div>
          <div className="text-xs text-white/60">Major Features</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className={`text-xl font-bold text-ctp-${theme.secondary}`}>
            {totalSubFeatures}
          </div>
          <div className="text-xs text-white/60">Capabilities</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-ctp-green">
            {project.media?.gallery?.length || 0}
          </div>
          <div className="text-xs text-white/60">Demos</div>
        </div>
      </div>
    </Reveal>
  );
};

// Major Feature Card Component
interface MajorFeatureCardProps {
  feature: MajorFeature;
  theme: ProjectTheme;
  index: number;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onMediaClick: (index: number) => void;
  allMedia: MediaItem[];
}

const MajorFeatureCard: React.FC<MajorFeatureCardProps> = ({
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
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        `bg-${priorityColors[feature.priority]}/20 text-${
                          priorityColors[feature.priority]
                        } border border-${priorityColors[feature.priority]}/30`
                      )}
                    >
                      {feature.priority}
                    </div>
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

// Sub-feature Card Component
interface SubFeatureCardProps {
  subFeature: SubFeature;
  theme: ProjectTheme;
  index: number;
  priority: "high" | "medium" | "low";
}

const SubFeatureCard: React.FC<SubFeatureCardProps> = ({
  subFeature,
  theme,
  index,
  priority,
}) => {
  const priorityColors = {
    high: `ctp-${theme.main}`,
    medium: `ctp-${theme.secondary}`,
    low: "ctp-subtext1",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut",
      }}
      className={cn(
        "relative p-4 rounded-xl group/sub",
        "bg-gradient-to-br from-white/10 to-white/5",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:scale-105",
        subFeature.isHighlight && `ring-2 ring-${priorityColors[priority]}/30`
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "p-1.5 rounded-lg flex-shrink-0 mt-0.5",
            `bg-${priorityColors[priority]}/20`
          )}
        >
          <CheckCircle2
            className={`w-4 h-4 text-${priorityColors[priority]}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover/sub:text-white/90 transition-colors">
            {subFeature.title}
          </h4>
          {subFeature.description && (
            <p className="text-white/70 text-xs leading-relaxed mb-2">
              {subFeature.description}
            </p>
          )}
          {subFeature.metrics && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                `bg-${priorityColors[priority]}/20 text-${priorityColors[priority]}`
              )}
            >
              <Zap className="w-3 h-3" />
              {subFeature.metrics}
            </div>
          )}
        </div>
      </div>

      {subFeature.isHighlight && (
        <div className="absolute top-2 right-2">
          <div
            className={`w-2 h-2 rounded-full bg-${priorityColors[priority]} animate-pulse`}
          />
        </div>
      )}
    </motion.div>
  );
};

// Feature Media Showcase Component (Updated)
interface FeatureMediaShowcaseProps {
  media: MediaItem[];
  currentIndex: number;
  theme: ProjectTheme;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onClick: () => void;
  featureTitle: string;
}

const FeatureMediaShowcase: React.FC<FeatureMediaShowcaseProps> = ({
  media,
  currentIndex,
  theme,
  isHovered,
  onHover,
  onNext,
  onPrevious,
  onClick,
  featureTitle,
}) => {
  const currentMedia = media[currentIndex];
  const hasMultipleMedia = media.length > 1;

  if (!currentMedia) return null;

  return (
    <div
      className="relative group/media cursor-pointer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
    >
      {/* Media Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-ctp-surface0 border border-ctp-surface1",
          "aspect-video transition-all duration-500",
          isHovered
            ? `shadow-xl shadow-ctp-${theme.main}/20 scale-105 border-ctp-${theme.main}/30`
            : "shadow-md"
        )}
      >
        {/* Media Content */}
        {currentMedia.type === "video" ? (
          <video
            src={currentMedia.url}
            poster={currentMedia.thumbnail}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            muted
            preload="metadata"
          />
        ) : (
          <img
            src={currentMedia.url}
            alt={`${featureTitle} demonstration`}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            loading="lazy"
          />
        )}

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-colors duration-300 flex items-center justify-center",
            isHovered ? "bg-black/30" : "bg-black/0"
          )}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center",
              `bg-ctp-${theme.main}/90 backdrop-blur-md text-ctp-crust`,
              "shadow-lg border-2 border-white/20"
            )}
          >
            {currentMedia.type === "video" ? (
              <Play className="w-4 h-4 sm:w-6 sm:h-6 ml-0.5" />
            ) : (
              <Maximize2 className="w-4 h-4 sm:w-6 sm:h-6" />
            )}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        {hasMultipleMedia && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2",
                "w-8 h-8 rounded-full bg-black/50 backdrop-blur-md",
                "flex items-center justify-center text-white",
                "opacity-0 group-hover/media:opacity-100 transition-opacity duration-200",
                "hover:bg-black/70"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "w-8 h-8 rounded-full bg-black/50 backdrop-blur-md",
                "flex items-center justify-center text-white",
                "opacity-0 group-hover/media:opacity-100 transition-opacity duration-200",
                "hover:bg-black/70"
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Media Type Indicator */}
        <div className="absolute top-2 left-2">
          <div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
            {currentMedia.type === "video" ? (
              <Play className="w-3 h-3 text-white" />
            ) : (
              <ImageIcon className="w-3 h-3 text-white" />
            )}
          </div>
        </div>

        {/* Media Counter */}
        {hasMultipleMedia && (
          <div className="absolute top-2 right-2">
            <div className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs">
              {currentIndex + 1}/{media.length}
            </div>
          </div>
        )}
      </div>

      {/* Media Info */}
      <div className="mt-3 text-center">
        <p className="text-white/60 text-xs">
          {featureTitle} Demo{" "}
          {hasMultipleMedia ? `(${currentIndex + 1}/${media.length})` : ""}
        </p>
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  theme: ProjectTheme;
}

const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => {
  return (
    <div className="text-center py-12">
      <div
        className={`w-16 h-16 mx-auto mb-4 bg-ctp-${theme.main}/20 rounded-2xl flex items-center justify-center`}
      >
        <Sparkles className={`w-8 h-8 text-ctp-${theme.main}`} />
      </div>
      <h3 className="text-white text-lg font-semibold mb-2">
        No Features Available
      </h3>
      <p className="text-white/60">
        This project doesn't have detailed features listed yet.
      </p>
    </div>
  );
};

// Media Lightbox Component (Same as before, but simplified for space)
interface MediaLightboxProps {
  isOpen: boolean;
  media: MediaItem[];
  selectedIndex: number | null;
  theme: ProjectTheme;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  media,
  selectedIndex,
  theme,
  onClose,
  onNavigate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = selectedIndex !== null ? media[selectedIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-6xl max-h-full w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 sm:-top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={() => onNavigate("prev")}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => onNavigate("next")}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Media content */}
          <div className="relative rounded-xl overflow-hidden bg-ctp-surface0 max-h-[85vh]">
            {currentItem.type === "video" ? (
              <video
                ref={videoRef}
                src={currentItem.url}
                poster={currentItem.thumbnail}
                className="w-full max-h-[85vh] object-contain"
                muted={isMuted}
                controls={false}
              />
            ) : (
              <img
                src={currentItem.url}
                alt={currentItem.title || "Project media"}
                className="w-full max-h-[85vh] object-contain"
              />
            )}
          </div>

          {/* Media counter */}
          {media.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-xs sm:text-sm">
              {(selectedIndex || 0) + 1} of {media.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Feature Organization Logic
const organizeFeaturesHierarchically = (
  features: string[],
  allMedia: MediaItem[]
): MajorFeature[] => {
  // This is a smart function that organizes flat features into major categories
  // In a real application, this would be based on your project data structure

  const majorFeatureGroups = identifyMajorFeatureGroups(features);
  const mediaPerGroup = Math.ceil(allMedia.length / majorFeatureGroups.length);

  return majorFeatureGroups.map((group, index) => {
    const startIndex = index * mediaPerGroup;
    const endIndex = Math.min(startIndex + mediaPerGroup, allMedia.length);
    const groupMedia = allMedia.slice(startIndex, endIndex);

    return {
      id: `major-${index}`,
      title: group.title,
      description: group.description,
      icon: group.icon,
      subFeatures: group.subFeatures,
      media: groupMedia,
      tags: group.tags,
      priority: group.priority,
    };
  });
};

const identifyMajorFeatureGroups = (
  features: string[]
): Omit<MajorFeature, "id" | "media">[] => {
  // Smart categorization based on feature content
  const groups: Omit<MajorFeature, "id" | "media">[] = [];

  // Define major categories with their associated features
  const categoryMap = {
    "User Interface & Experience": {
      icon: Smartphone,
      keywords: [
        "ui",
        "ux",
        "interface",
        "responsive",
        "mobile",
        "design",
        "user",
        "experience",
      ],
      priority: "high" as const,
      tags: ["Frontend", "UI/UX", "Responsive"],
    },
    "Performance & Scalability": {
      icon: Zap,
      keywords: [
        "performance",
        "fast",
        "speed",
        "scalable",
        "optimization",
        "efficient",
        "concurrent",
      ],
      priority: "high" as const,
      tags: ["Performance", "Scalability", "Optimization"],
    },
    "Security & Authentication": {
      icon: Shield,
      keywords: [
        "security",
        "auth",
        "authentication",
        "secure",
        "encryption",
        "privacy",
        "protection",
      ],
      priority: "medium" as const,
      tags: ["Security", "Authentication", "Privacy"],
    },
    "Data Management": {
      icon: Database,
      keywords: [
        "database",
        "data",
        "storage",
        "crud",
        "management",
        "backup",
        "sync",
      ],
      priority: "medium" as const,
      tags: ["Database", "Data Management", "Storage"],
    },
    "Integration & APIs": {
      icon: Globe,
      keywords: [
        "api",
        "integration",
        "third-party",
        "external",
        "service",
        "webhook",
      ],
      priority: "low" as const,
      tags: ["Integration", "APIs", "Services"],
    },
  };

  // Categorize features
  Object.entries(categoryMap).forEach(([categoryName, categoryInfo]) => {
    const categoryFeatures = features.filter((feature) =>
      categoryInfo.keywords.some((keyword) =>
        feature.toLowerCase().includes(keyword)
      )
    );

    if (categoryFeatures.length > 0) {
      const subFeatures = categoryFeatures.map((feature, index) => ({
        id: `sub-${categoryName}-${index}`,
        title: extractSubFeatureTitle(feature),
        description: extractSubFeatureDescription(feature),
        metrics: extractMetrics(feature),
        isHighlight: index === 0, // First feature in each category is highlighted
      }));

      groups.push({
        title: categoryName,
        description: generateCategoryDescription(
          categoryName,
          categoryFeatures.length
        ),
        icon: categoryInfo.icon,
        subFeatures,
        tags: categoryInfo.tags,
        priority: categoryInfo.priority,
      });
    }
  });

  // Handle uncategorized features
  const categorizedFeatures = new Set();
  groups.forEach((group) => {
    group.subFeatures.forEach((sub) => {
      const originalFeature = features.find(
        (f) => extractSubFeatureTitle(f) === sub.title
      );
      if (originalFeature) categorizedFeatures.add(originalFeature);
    });
  });

  const uncategorizedFeatures = features.filter(
    (f) => !categorizedFeatures.has(f)
  );
  if (uncategorizedFeatures.length > 0) {
    const subFeatures = uncategorizedFeatures.map((feature, index) => ({
      id: `sub-other-${index}`,
      title: extractSubFeatureTitle(feature),
      description: extractSubFeatureDescription(feature),
      metrics: extractMetrics(feature),
      isHighlight: false,
    }));

    groups.push({
      title: "Additional Features",
      description: `${uncategorizedFeatures.length} additional capabilities that enhance the overall functionality`,
      icon: Users,
      subFeatures,
      tags: ["Additional", "Features"],
      priority: "low",
    });
  }

  return groups.slice(0, 5); // Limit to 5 major features max
};

// Utility functions
const extractSubFeatureTitle = (feature: string): string => {
  const separators = [":", " - ", " – ", " | "];

  for (const separator of separators) {
    const index = feature.indexOf(separator);
    if (index > 0 && index < 60) {
      return feature.substring(0, index).trim();
    }
  }

  const firstSentence = feature.split(".")[0];
  if (firstSentence.length <= 60) {
    return firstSentence.trim();
  }

  const words = feature.split(" ");
  let title = "";
  for (const word of words) {
    if (title.length + word.length + 1 > 50) break;
    title += (title ? " " : "") + word;
  }

  return title || feature.substring(0, 50) + "...";
};

const extractSubFeatureDescription = (feature: string): string | undefined => {
  const separators = [":", " - ", " – ", " | "];

  for (const separator of separators) {
    const index = feature.indexOf(separator);
    if (index > 0 && index < 60) {
      const description = feature.substring(index + separator.length).trim();
      return description.length > 10 ? description : undefined;
    }
  }

  return undefined;
};

const extractMetrics = (feature: string): string | undefined => {
  // Extract metrics like "10,000 users", "99.9% uptime", "< 100ms response time"
  const metricPatterns = [
    /\d+[,\d]*\s*(?:users|requests|connections|transactions)/i,
    /\d+\.?\d*%\s*(?:uptime|availability|accuracy|performance)/i,
    /<?\s*\d+\s*(?:ms|seconds|minutes)\s*(?:response|load|latency)/i,
    /\d+[,\d]*\s*(?:MB|GB|TB|KB)/i,
    /\d+x\s*(?:faster|better|improvement)/i,
  ];

  for (const pattern of metricPatterns) {
    const match = feature.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return undefined;
};

const generateCategoryDescription = (
  categoryName: string,
  featureCount: number
): string => {
  const descriptions = {
    "User Interface & Experience": `Intuitive and responsive design with ${featureCount} user-focused capabilities`,
    "Performance & Scalability": `High-performance architecture supporting ${featureCount} optimization features`,
    "Security & Authentication": `Robust security measures with ${featureCount} protection mechanisms`,
    "Data Management": `Comprehensive data handling with ${featureCount} management features`,
    "Integration & APIs": `Seamless connectivity through ${featureCount} integration points`,
    "Additional Features": `${featureCount} additional capabilities that enhance the overall functionality`,
  };

  return (
    descriptions[categoryName as keyof typeof descriptions] ||
    `${featureCount} specialized features in this category`
  );
};

export default FeaturesContent;
