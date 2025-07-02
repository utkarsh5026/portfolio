import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/types";

interface MediaShowcaseProps {
  media: MediaItem[];
  theme: {
    main: string;
    secondary: string;
  };
}

/**
 * Creative Media Showcase Component
 *
 * An elegant and creative media display system featuring:
 * - Dynamic masonry layouts that adapt to content
 * - Featured media with special highlighting
 * - Smooth hover animations and transitions
 * - Interactive lightbox with full navigation
 * - Mobile-optimized touch interactions
 * - Theme-integrated design with your Catppuccin colors
 * - Creative grid patterns and visual hierarchy
 *
 * The component automatically arranges media in visually pleasing
 * layouts while maintaining performance and accessibility.
 */
const MediaShowcase: React.FC<MediaShowcaseProps> = ({ media, theme }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Separate featured and regular media
  const featuredMedia = media.filter((item) => item.featured);
  const regularMedia = media.filter((item) => !item.featured);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedIndex(null);
  };

  const navigateMedia = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (selectedIndex - 1 + media.length) % media.length
        : (selectedIndex + 1) % media.length;
    setSelectedIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigateMedia("prev");
          break;
        case "ArrowRight":
          navigateMedia("next");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedIndex]);

  if (!media.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-ctp-surface0 rounded-full flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-ctp-subtext0" />
        </div>
        <p className="text-ctp-subtext0">No media available for this project</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Media Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Media Gallery</h2>
        <p className="text-white/60">Visual showcase of the project</p>
      </div>

      {featuredMedia.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`p-2 rounded-full bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary}`}
            >
              <Sparkles className="w-4 h-4 text-ctp-crust" />
            </div>
            <h4 className={`text-lg font-semibold text-ctp-${theme.main}`}>
              Featured Media
            </h4>
            <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredMedia.map((item, index) => {
              const mediaIndex = media.findIndex((m) => m.id === item.id);
              return (
                <FeaturedMediaCard
                  key={item.id}
                  item={item}
                  index={index}
                  theme={theme}
                  isHovered={hoveredId === item.id}
                  onHover={setHoveredId}
                  onClick={() => openLightbox(mediaIndex)}
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Regular Media Gallery */}
      {regularMedia.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: featuredMedia.length > 0 ? 0.3 : 0,
          }}
          className="space-y-4"
        >
          {featuredMedia.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <h4 className="text-lg font-semibold text-ctp-text">Gallery</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1 to-transparent" />
            </div>
          )}

          <CreativeMediaGrid
            media={regularMedia}
            allMedia={media}
            theme={theme}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onItemClick={openLightbox}
          />
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <MediaLightbox
        isOpen={isLightboxOpen}
        media={media}
        selectedIndex={selectedIndex}
        theme={theme}
        onClose={closeLightbox}
        onNavigate={navigateMedia}
      />
    </div>
  );
};

// Featured Media Card Component
interface FeaturedMediaCardProps {
  item: MediaItem;
  index: number;
  theme: { main: string; secondary: string };
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

const FeaturedMediaCard: React.FC<FeaturedMediaCardProps> = ({
  item,
  index,
  theme,
  isHovered,
  onHover,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Main media container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-ctp-surface0 to-ctp-surface1",
          "border border-ctp-surface1",
          getAspectRatioClass(item.aspectRatio || "landscape"),
          "transition-all duration-500",
          isHovered
            ? "shadow-2xl shadow-ctp-" + theme.main + "/20 scale-105"
            : "shadow-lg"
        )}
      >
        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
            `from-ctp-${theme.main}/20 to-ctp-${theme.secondary}/20`,
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Media content */}
        {item.type === "video" ? (
          <video
            src={item.url}
            poster={item.thumbnail}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoadedData={() => setIsLoaded(true)}
            muted
            preload="metadata"
          />
        ) : (
          <img
            src={item.url}
            alt={item.title || "Project media"}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}

        {/* Loading shimmer */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-ctp-surface0 via-ctp-surface1 to-ctp-surface0 animate-pulse" />
        )}

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-colors duration-300",
            isHovered ? "bg-black/20" : "bg-black/0"
          )}
        >
          {/* Play button for videos */}
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-20 h-20 rounded-full bg-ctp-${theme.main}/90 backdrop-blur-md
                  flex items-center justify-center text-ctp-crust
                  shadow-lg border-2 border-white/20
                `}
              >
                <Play className="w-8 h-8 ml-1" />
              </motion.div>
            </div>
          )}

          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`
                px-3 py-1 rounded-full backdrop-blur-md border
                bg-ctp-${theme.main}/90 border-ctp-${theme.main}/50 text-ctp-crust
                text-xs font-medium flex items-center gap-1
              `}
            >
              <Sparkles className="w-3 h-3" />
              Featured
            </motion.div>
          </div>

          {/* Media type indicator */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center">
              {item.type === "video" ? (
                <Play className="w-4 h-4 text-ctp-text" />
              ) : (
                <ImageIcon className="w-4 h-4 text-ctp-text" />
              )}
            </div>
          </div>
        </div>

        {/* Content overlay at bottom */}
        {(item.title || item.description) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          >
            {item.title && (
              <h5 className="text-white font-semibold text-lg mb-1">
                {item.title}
              </h5>
            )}
            {item.description && (
              <p className="text-white/80 text-sm line-clamp-2">
                {item.description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Creative Media Grid Component
interface CreativeMediaGridProps {
  media: MediaItem[];
  allMedia: MediaItem[];
  theme: { main: string; secondary: string };
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onItemClick: (index: number) => void;
}

const CreativeMediaGrid: React.FC<CreativeMediaGridProps> = ({
  media,
  allMedia,
  theme,
  hoveredId,
  onHover,
  onItemClick,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item, index) => {
        const allMediaIndex = allMedia.findIndex((m) => m.id === item.id);
        const isHovered = hoveredId === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
              "group relative cursor-pointer",
              // Creative sizing for variety
              index % 7 === 0 ? "md:col-span-2 md:row-span-2" : "",
              index % 11 === 0 ? "lg:col-span-2" : ""
            )}
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onItemClick(allMediaIndex)}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-xl",
                "bg-ctp-surface0 border border-ctp-surface1",
                "aspect-square",
                "transition-all duration-300",
                isHovered
                  ? "shadow-lg shadow-ctp-" + theme.main + "/10 scale-105"
                  : ""
              )}
            >
              {/* Media content */}
              {item.type === "video" ? (
                <video
                  src={item.url}
                  poster={item.thumbnail}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    isHovered ? "scale-110" : "scale-100"
                  )}
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title || "Project media"}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    isHovered ? "scale-110" : "scale-100"
                  )}
                  loading="lazy"
                />
              )}

              {/* Hover overlay */}
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
                  className={`
                    w-12 h-12 rounded-full bg-ctp-${theme.main}/90 backdrop-blur-md
                    flex items-center justify-center text-ctp-crust
                  `}
                >
                  {item.type === "video" ? (
                    <Play className="w-5 h-5 ml-0.5" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </motion.div>
              </div>

              {/* Type indicator */}
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center">
                  {item.type === "video" ? (
                    <Play className="w-3 h-3 text-ctp-text" />
                  ) : (
                    <ImageIcon className="w-3 h-3 text-ctp-text" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Media Lightbox Component
interface MediaLightboxProps {
  isOpen: boolean;
  media: MediaItem[];
  selectedIndex: number | null;
  theme: { main: string; secondary: string };
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
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
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={() => onNavigate("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-10"
                title="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => onNavigate("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-10"
                title="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Media content */}
          <div className="relative rounded-xl overflow-hidden bg-ctp-surface0 max-h-[80vh]">
            {currentItem.type === "video" ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={currentItem.url}
                  poster={currentItem.thumbnail}
                  className="w-full max-h-[80vh] object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  muted={isMuted}
                  controls={false}
                />

                {/* Video controls */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className={`
                      w-20 h-20 rounded-full bg-ctp-${theme.main}/90 backdrop-blur-md
                      flex items-center justify-center text-ctp-crust
                      hover:bg-ctp-${theme.main} transition-colors
                      shadow-lg
                    `}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>
                </div>

                {/* Additional controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={currentItem.url}
                alt={currentItem.title || "Project media"}
                className="w-full max-h-[80vh] object-contain"
              />
            )}
          </div>

          {/* Media info */}
          {(currentItem.title || currentItem.description) && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ctp-surface0/90 backdrop-blur-md rounded-lg p-4 max-w-md text-center"
            >
              {currentItem.title && (
                <h4 className="font-semibold text-ctp-text mb-1">
                  {currentItem.title}
                </h4>
              )}
              {currentItem.description && (
                <p className="text-sm text-ctp-subtext0">
                  {currentItem.description}
                </p>
              )}
            </motion.div>
          )}

          {/* Media counter */}
          {media.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-ctp-surface0/80 backdrop-blur-md rounded-full text-ctp-text text-sm">
              {(selectedIndex || 0) + 1} of {media.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper function for aspect ratio classes
const getAspectRatioClass = (aspectRatio: string) => {
  switch (aspectRatio) {
    case "square":
      return "aspect-square";
    case "portrait":
      return "aspect-[3/4]";
    case "ultra-wide":
      return "aspect-[21/9]";
    case "landscape":
    default:
      return "aspect-video";
  }
};

export default MediaShowcase;
