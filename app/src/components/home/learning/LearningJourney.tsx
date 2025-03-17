import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "lucide-react";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import Modal from "@/components/utils/Modal";
import ProgressBar from "@/components/utils/ProgressBar";
import Cursor from "@/components/utils/Cursor";
import { cn } from "@/lib/utils";
import { learningJourneyItems } from "./data";

interface LearningJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({
  isOpen,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { displayedText, isTyping, isComplete, progress, start, reset } =
    useTypewriting({
      text:
        currentIndex < learningJourneyItems.length
          ? learningJourneyItems[currentIndex].description
          : "",
      speed: 10,
      delay: 100,
      autoStart: false,
      onComplete: () => {
        timerRef.current = setTimeout(() => {
          if (currentIndex < learningJourneyItems.length - 1) {
            setCompletedItems((prev) => [...prev, currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else {
            setCompletedItems((prev) => [...prev, currentIndex]);
          }
        }, 600);
      },
    });

  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setCurrentIndex(0);
      setCompletedItems([]);
      return;
    }

    const startTyping = () => {
      setCurrentIndex(0);
      setCompletedItems([]);
      return setTimeout(() => {
        start();
      }, 500);
    };

    const timeout = startTyping();
    return () => clearTimeout(timeout);
  }, [start, isOpen, reset]);

  useEffect(() => {
    return () => {
      reset();
      setCurrentIndex(0);
      setCompletedItems([]);
    };
  }, [reset]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    reset();
    setCurrentIndex(0);
    setCompletedItems([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      contentClassName="p-6"
    >
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-ctp-blue/10 to-ctp-mauve/5 rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-ctp-green/10 to-ctp-teal/5 rounded-full blur-3xl opacity-40 -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-5">
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-br from-ctp-blue/80 to-ctp-mauve/80 text-ctp-base shadow-lg relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 10px 25px -5px rgba(137, 180, 250, 0.4)",
                  "0 10px 25px -5px rgba(203, 166, 247, 0.4)",
                  "0 10px 25px -5px rgba(137, 180, 250, 0.4)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-50"></div>
              <Book className="w-6 h-6 relative z-10" />
            </motion.div>

            <div>
              <motion.h3
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve bg-clip-text text-transparent">
                  My Learning Journey
                </span>
              </motion.h3>

              <motion.p
                className="text-ctp-subtext0 mt-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                A glimpse into what I'm currently studying and building
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Learning journey items in a styled container with dynamic height */}
        <motion.div
          ref={containerRef}
          className="space-y-8 p-6 overflow-hidden"
          animate={{
            height: "auto",
            maxHeight: 500,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ scrollBehavior: "smooth" }}
        >
          {learningJourneyItems.map((item, index) => (
            <div
              key={`${item.title}`}
              className={cn(
                "min-h-[80px] relative transition-opacity duration-300",
                index > currentIndex && !completedItems.includes(index)
                  ? "opacity-40"
                  : "opacity-100"
              )}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <AnimatePresence mode="wait">
                {(index <= currentIndex || completedItems.includes(index)) && (
                  <motion.div
                    className="flex gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: index === currentIndex ? 0.1 : 0,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Icon section with enhanced styling */}
                    <LearningIcon
                      icon={item.icon}
                      color={item.color}
                      isActive={index === currentIndex}
                      isCompleted={completedItems.includes(index)}
                    />

                    {/* Content card with enhanced styling */}
                    <div className="flex-1">
                      <motion.div
                        className={cn(
                          "relative p-5 rounded-xl overflow-hidden",
                          index === currentIndex
                            ? `border ${item.accent}/40 bg-gradient-to-br ${item.gradient}`
                            : completedItems.includes(index)
                            ? `border border-ctp-surface1 bg-ctp-mantle/50`
                            : "border border-ctp-surface0 bg-ctp-surface0/30"
                        )}
                        initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                        animate={{
                          boxShadow:
                            index === currentIndex
                              ? `0 8px 25px -5px rgba(var(--ctp-${item.color}-rgb), 0.2)`
                              : completedItems.includes(index)
                              ? "0 4px 15px -8px rgba(0,0,0,0.1)"
                              : "0 2px 8px -8px rgba(0,0,0,0.05)",
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Title with gradient */}
                        <h4
                          className={cn(
                            "font-bold text-lg mb-3 pb-2",
                            index === currentIndex
                              ? `text-ctp-${item.color}`
                              : completedItems.includes(index)
                              ? `text-ctp-${item.color}/80`
                              : "text-ctp-text/70"
                          )}
                        >
                          {item.title}
                        </h4>

                        <motion.div
                          initial={{ opacity: 0.9 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.3 },
                          }}
                          className="text-base leading-relaxed min-h-[80px]"
                        >
                          {index < currentIndex ||
                          completedItems.includes(index) ? (
                            <div className="text-ctp-text relative z-10">
                              {item.description}
                            </div>
                          ) : (
                            <div className="text-ctp-text relative z-10">
                              {displayedText}
                              {!isComplete && index === currentIndex && (
                                <Cursor color={item.color} />
                              )}
                            </div>
                          )}
                        </motion.div>

                        {/* Item progress for current item */}
                        {index === currentIndex && isTyping && !isComplete && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <ProgressBar
                              color={item.color}
                              progress={progress}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {index < learningJourneyItems.length - 1 && (
                <div className="absolute left-[20px] top-[60px] bottom-0 w-px">
                  <motion.div
                    className={cn(
                      "h-full w-px",
                      completedItems.includes(index)
                        ? `bg-gradient-to-b from-ctp-${item.color} to-ctp-${
                            learningJourneyItems[index + 1].color
                          }`
                        : "bg-ctp-surface0/50"
                    )}
                    initial={{ scaleY: 0 }}
                    animate={{
                      scaleY: completedItems.includes(index) ? 1 : 0,
                    }}
                    style={{ transformOrigin: "top" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </Modal>
  );
};

interface LearningIconProps {
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  isCompleted: boolean;
}

const LearningIcon: React.FC<LearningIconProps> = ({
  icon,
  color,
  isActive,
  isCompleted,
}) => {
  return (
    <motion.div
      className="relative flex-shrink-0 mt-1"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glow effect for active icon */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 bg-ctp-${color}/30 rounded-xl blur-xl`}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Icon container with enhanced styling */}
      <motion.div
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-xl z-10",
          isActive
            ? `bg-gradient-to-br from-ctp-${color} to-ctp-${color}/80 text-ctp-base shadow-md`
            : isCompleted
            ? `bg-ctp-${color}/20 text-ctp-${color} border border-ctp-${color}/30`
            : "bg-ctp-surface0/70 text-ctp-overlay0 border border-ctp-surface0"
        )}
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity },
              }
            : {}
        }
      >
        {/* Inner highlight for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-80"></div>

        {/* The icon with animation */}
        <motion.div
          animate={
            isActive
              ? {
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.1, 1],
                  transition: { duration: 4, repeat: Infinity },
                }
              : {}
          }
          className="z-10"
        >
          {icon}
        </motion.div>

        {/* Status indicator with enhanced animation */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-ctp-base rounded-full flex items-center justify-center border border-ctp-surface0 shadow-md"
            >
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-br from-ctp-${color} to-ctp-${color}/80 flex items-center justify-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-2.5 h-2.5 text-ctp-base"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default LearningJourney;
