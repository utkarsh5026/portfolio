import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { MediaItem } from "@/types";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface MediaLightboxProps {
  isOpen: boolean;
  media: MediaItem[];
  selectedIndex: number | null;
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
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={() => onNavigate("prev")}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => onNavigate("next")}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                title="Next"
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
                muted={true}
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
              {(selectedIndex ?? 0) + 1} of {media.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MediaLightbox;
