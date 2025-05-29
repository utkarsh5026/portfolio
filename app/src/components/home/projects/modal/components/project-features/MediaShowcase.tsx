import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { MediaItem } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Play,
  Maximize2,
} from "lucide-react";

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
              title="Previous"
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
              title="Next"
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

export default FeatureMediaShowcase;
