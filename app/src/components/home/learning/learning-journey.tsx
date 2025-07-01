import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, X, Play, Pause, RotateCcw } from "lucide-react";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import { learningJourneyItems } from "./data";

interface LearningJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { displayedText, isTyping, progress, start, reset } = useTypewriting({
    text:
      currentIndex < learningJourneyItems.length
        ? learningJourneyItems[currentIndex].description
        : "",
    speed: 15,
    delay: 300,
    autoStart: false,
    onComplete: () => {
      timerRef.current = setTimeout(() => {
        if (currentIndex < learningJourneyItems.length - 1) {
          setCompletedItems((prev) => [...prev, currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCompletedItems((prev) => [...prev, currentIndex]);
          setIsAutoPlaying(false);
        }
      }, 1000);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setCurrentIndex(0);
      setCompletedItems([]);
      setIsAutoPlaying(true);
      return;
    }

    const timeout = setTimeout(() => {
      start();
    }, 500);

    return () => clearTimeout(timeout);
  }, [isOpen, start, reset]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const resetJourney = () => {
    reset();
    setCurrentIndex(0);
    setCompletedItems([]);
    setIsAutoPlaying(true);
    setTimeout(() => start(), 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-ctp-base rounded-3xl border border-ctp-surface1/50 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-ctp-surface1/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20">
                    <Book className="w-6 h-6 text-ctp-blue" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent">
                      Learning Journey
                    </h2>
                    <p className="text-ctp-subtext0 text-sm sm:text-base">
                      What I'm currently exploring and building
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="px-6 sm:px-8 py-4 border-b border-ctp-surface1/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ProgressIndicator
                    total={learningJourneyItems.length}
                    current={currentIndex}
                    completed={completedItems}
                  />
                  <span className="text-sm text-ctp-subtext0">
                    {currentIndex + 1} of {learningJourneyItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAutoPlay}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isAutoPlaying
                        ? "bg-ctp-green/20 text-ctp-green"
                        : "bg-ctp-surface0/50 text-ctp-subtext0"
                    }`}
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    {isAutoPlaying ? "Auto" : "Manual"}
                  </button>

                  <button
                    onClick={resetJourney}
                    className="p-1.5 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200"
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh] p-6 sm:p-8">
              <div className="space-y-8">
                {learningJourneyItems.map((item, index) => (
                  <JourneyItem
                    key={item.title}
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                    completedItems={completedItems}
                    displayedText={displayedText}
                    isTyping={isTyping}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Progress Indicator Component
interface ProgressIndicatorProps {
  total: number;
  current: number;
  completed: number[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  total,
  current,
  completed,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            completed.includes(index)
              ? "bg-ctp-green"
              : index === current
              ? "bg-ctp-blue"
              : "bg-ctp-surface1"
          }`}
        />
      ))}
    </div>
  );
};

// Journey Item Component
interface JourneyItemProps {
  item: (typeof learningJourneyItems)[0];
  index: number;
  currentIndex: number;
  completedItems: number[];
  displayedText: string;
  isTyping: boolean;
  progress: number;
}

const JourneyItem: React.FC<JourneyItemProps> = ({
  item,
  index,
  currentIndex,
  completedItems,
  displayedText,
  isTyping,
  progress,
}) => {
  const isActive = index === currentIndex;
  const isCompleted = completedItems.includes(index);
  const isUpcoming = index > currentIndex && !isCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isUpcoming ? 0.4 : 1,
        y: 0,
      }}
      className={`relative transition-all duration-500 ${
        isUpcoming ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex gap-6">
        {/* Icon */}
        <div className="flex-shrink-0 relative">
          <motion.div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? `bg-ctp-${item.color}/20 text-ctp-${item.color} border-2 border-ctp-${item.color}/40`
                : isCompleted
                ? `bg-ctp-${item.color}/10 text-ctp-${item.color}/80 border border-ctp-${item.color}/30`
                : "bg-ctp-surface0/30 text-ctp-subtext0 border border-ctp-surface1"
            }`}
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {item.icon}
          </motion.div>

          {/* Status Indicator */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-ctp-green rounded-full flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-ctp-base"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </motion.div>
          )}

          {/* Connection Line */}
          {index < learningJourneyItems.length - 1 && (
            <div className="absolute top-12 left-1/2 w-px h-8 -translate-x-px">
              <motion.div
                className={`w-full h-full ${
                  isCompleted ? `bg-ctp-${item.color}/40` : "bg-ctp-surface1/50"
                }`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isCompleted ? 1 : 0 }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              isActive
                ? `bg-ctp-${item.color}/5 border-ctp-${item.color}/20`
                : isCompleted
                ? "bg-ctp-surface0/30 border-ctp-surface1/50"
                : "bg-ctp-surface0/20 border-ctp-surface1/30"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-3 ${
                isActive ? `text-ctp-${item.color}` : "text-ctp-text"
              }`}
            >
              {item.title}
            </h3>

            <div className="text-ctp-subtext0 leading-relaxed">
              {isActive ? (
                <>
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      className={`inline-block w-0.5 h-4 bg-ctp-${item.color} ml-1`}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </>
              ) : (
                item.description
              )}
            </div>

            {/* Progress Bar for Active Item */}
            {isActive && isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="w-full h-1 bg-ctp-surface1/30 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-ctp-${item.color} rounded-full`}
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningJourney;
