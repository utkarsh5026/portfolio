import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
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
 * Minimal Media Showcase Component
 *
 * A clean and elegant photo gallery featuring:
 * - Minimal design with subtle effects
 * - Smart lazy loading with skeleton states
 * - Graceful error handling
 * - Smooth lightbox with keyboard navigation
 * - Mobile-optimized touch interactions
 * - Consistent with portfolio's minimal aesthetic
 */
const MediaShowcase: React.FC<MediaShowcaseProps> = ({ media, theme }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-ctp-surface0/10 backdrop-blur-sm flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-ctp-subtext0" />
        </div>
        <h3 className="text-xl font-medium text-ctp-text mb-2">
          No media available
        </h3>
        <p className="text-ctp-subtext0">
          Media gallery will appear here once added
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ctp-text mb-2">Media Gallery</h2>
        <p className="text-ctp-subtext0">
          {media.length} {media.length === 1 ? "item" : "items"} in this
          collection
        </p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <MediaCard
            key={item.id}
            item={item}
            index={index}
            theme={theme}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
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

// Media Card Component with Lazy Loading and Error Handling
interface MediaCardProps {
  item: MediaItem;
  index: number;
  theme: { main: string; secondary: string };
  onClick: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  item,
  index,
  theme,
  onClick,
}) => {
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl cursor-pointer",
          "bg-ctp-surface0/10 backdrop-blur-sm border-none",
          "aspect-video transition-all duration-300",
          "hover:bg-ctp-surface0/15",
          isHovered && loadState === "loaded" ? "scale-[1.02]" : "scale-100"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={loadState === "loaded" ? onClick : undefined}
      >
        {/* Loading Skeleton */}
        {loadState === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-ctp-surface0/5 via-ctp-surface0/10 to-ctp-surface0/5 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-ctp-subtext0 animate-spin" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {loadState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-ctp-red/10 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-ctp-red" />
            </div>
            <p className="text-sm text-ctp-subtext0">Failed to load image</p>
            <p className="text-xs text-ctp-subtext1 mt-1">
              {item.title || "Unknown image"}
            </p>
          </div>
        )}

        {/* Image */}
        <img
          src={item.url}
          alt={item.alt || item.title || "Project media"}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            loadState === "loaded" ? "opacity-100" : "opacity-0",
            isHovered && loadState === "loaded" ? "scale-105" : "scale-100"
          )}
          onLoad={() => setLoadState("loaded")}
          onError={() => setLoadState("error")}
          loading="lazy"
        />

        {/* Hover Overlay */}
        {loadState === "loaded" && (
          <div
            className={cn(
              "absolute inset-0 bg-black/0 transition-colors duration-300",
              isHovered ? "bg-black/20" : "bg-black/0"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center",
                  `bg-ctp-${theme.main}/90 text-ctp-crust`
                )}
              >
                <ImageIcon className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        {item.title && loadState === "loaded" && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4",
              "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <h5 className="text-white font-medium text-sm line-clamp-1">
              {item.title}
            </h5>
            {item.description && (
              <p className="text-white/70 text-xs line-clamp-1 mt-0.5">
                {item.description}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Minimal Lightbox Component
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
  onClose,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentItem = selectedIndex !== null ? media[selectedIndex] : null;

  useEffect(() => {
    setImageLoaded(false);
  }, [selectedIndex]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-20"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-20"
              title="Previous (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ctp-surface0/80 backdrop-blur-md flex items-center justify-center text-ctp-text hover:bg-ctp-surface1 transition-colors z-20"
              title="Next (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-6xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-xl overflow-hidden bg-ctp-surface0/5 backdrop-blur-sm">
            {/* Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-ctp-subtext0 animate-spin" />
              </div>
            )}

            {/* Image */}
            <img
              src={currentItem.url}
              alt={currentItem.alt || currentItem.title || "Project media"}
              className={cn(
                "w-full max-h-[90vh] object-contain transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Image info */}
          {(currentItem.title || currentItem.description) && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 bg-ctp-surface0/80 backdrop-blur-md rounded-lg p-4 text-center"
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

          {/* Counter */}
          {media.length > 1 && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-ctp-surface0/80 backdrop-blur-md rounded-full text-ctp-text text-sm">
              {(selectedIndex || 0) + 1} / {media.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MediaShowcase;
