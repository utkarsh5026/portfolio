import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Code } from "lucide-react";
import { FaDocker, FaReact, FaBrain } from "react-icons/fa";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import ProgressBar from "@/components/utils/ProgressBar";
import Cursor from "@/components/utils/Cursor";
import { skillPoints } from "../data";
import SkillIcon from "./SkillIcon";
import Header from "./Header";
import DialogModal from "@/components/utils/DialogModal";

const pointIcons = [
  <FaReact className="w-5 h-5" key="code" />,
  <Terminal className="w-4 h-4" key="server" />,
  <Database className="w-4 h-4" key="database" />,
  <FaDocker className="w-5 h-5" key="container" />,
  <FaBrain className="w-5 h-5" key="brain" />,
  <Code className="w-4 h-4" key="heart" />,
];

const totalSkillPointsLength = skillPoints.reduce((acc, point) => {
  return acc + point.length;
}, 0);

const accentColors = [
  "blue",
  "green",
  "mauve",
  "sapphire",
  "lavender",
  "peach",
];

interface WhatDoIKnowProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * WhatDoIKnow Component
 *
 * This component renders a modal that displays a series of skill points with animated typing effect.
 * It includes a header with progress bar, a scrollable container for skill points, and a cursor animation.
 * The component manages the state of the current index, typing animation, and transition between skill points.
 *
 * Props:
 * - isOpen: boolean - Indicates if the modal is open.
 * - onClose: () => void - Function to close the modal.
 */
const WhatDoIKnow: React.FC<WhatDoIKnowProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { displayedText, isTyping, start, reset, progress } = useTypewriting({
    text: skillPoints[currentIndex],
    speed: 20,
    delay: 100,
    humanize: true,
    humanizeFactor: 0.5,
    autoStart: false,
    onComplete: () => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentIndex < skillPoints.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
        setIsTransitioning(false);
      }, 300);
    },
  });

  /**
   * Effect to scroll to the current skill point when it becomes visible.
   *
   * This effect checks if the current skill point is visible in the scroll container
   * and scrolls it into view if it is.
   *
   */
  useEffect(() => {
    if (paragraphRefs.current[currentIndex]) {
      paragraphRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex, displayedText]);

  /**
   * Effect to reset the skill points when the modal is closed.
   *
   * This effect is triggered when the modal is closed, and it resets the skill points
   * to their initial state.
   *
   */
  useEffect(() => {
    if (!isOpen) {
      reset();
      setCurrentIndex(0);
      return;
    }

    const startTyping = () => {
      setCurrentIndex(0);
      return setTimeout(() => {
        console.log("starting");
        start();
      }, 500);
    };

    const timeout = startTyping();
    return () => clearTimeout(timeout);
  }, [start, isOpen, reset]);

  /**
   * Effect to reset the skill points when the modal is closed.
   *
   * This effect is triggered when the modal is closed, and it resets the skill points
   * to their initial state.
   *
   */
  useEffect(() => {
    return () => {
      reset();
      setCurrentIndex(0);
    };
  }, [reset]);

  /**
   * Calculates the total length of all skill points up to the current index.
   */
  const prevPointsLength = useMemo(() => {
    return skillPoints
      .slice(0, currentIndex)
      .reduce((acc, point) => acc + point.length, 0);
  }, [currentIndex]);

  /**
   * Calculates the progress as a percentage based on the total typed characters.
   */
  const calculateProgress = () => {
    const totalTypedCharacters = prevPointsLength + displayedText.length;
    return (totalTypedCharacters / totalSkillPointsLength) * 100;
  };

  return (
    <DialogModal isOpen={isOpen} handleChange={onClose}>
      <div className="relative overflow-hidden">
        {/* Background decorative shapes - subtle but visible */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Decorative triangles */}
          <div className="w-64 h-64 bg-ctp-teal/10 rounded-3xl rotate-45 opacity-20" />
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl border border-ctp-surface0 shadow-xl"
        >
          {/* Inner content */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <Header
              currentIndex={currentIndex}
              calculateProgress={calculateProgress}
              accentColors={accentColors}
            />

            <div
              ref={scrollContainerRef}
              className="space-y-6 max-h-[400px] overflow-y-auto pr-2 pb-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {skillPoints.map((point, index) => (
                <div
                  key={point}
                  className="min-h-[80px] relative"
                  ref={(el) => (paragraphRefs.current[index] = el)}
                >
                  <AnimatePresence mode="wait">
                    {index <= currentIndex && (
                      <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 10 }}
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
                        <SkillIcon
                          icon={pointIcons[index]}
                          color={accentColors[index]}
                          isActive={index === currentIndex}
                          isCompleted={index < currentIndex}
                          isTransitioning={
                            isTransitioning && index === currentIndex
                          }
                        />

                        {/* Content card */}
                        <div className="flex-1">
                          <motion.div
                            className={`relative p-4 bg-ctp-mantle rounded-lg ${
                              index === currentIndex
                                ? `border border-ctp-${accentColors[index]}/30`
                                : "border border-ctp-surface0"
                            }`}
                            initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                            animate={{
                              boxShadow:
                                index === currentIndex
                                  ? `0 4px 20px -5px rgba(var(--ctp-${accentColors[index]}-rgb), 0.15)`
                                  : "0 2px 10px -8px rgba(0,0,0,0.1)",
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {/* Subtle background accent for current card */}
                            {index === currentIndex && (
                              <motion.div
                                className={`absolute right-0 top-0 rounded-bl-xl rounded-tr-lg w-12 h-12 bg-ctp-${accentColors[index]}/10`}
                                animate={{
                                  rotate: [0, 5, 0],
                                  opacity: [0.1, 0.15, 0.1],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                              />
                            )}

                            {/* Card text with animated entry for each character */}
                            <motion.div
                              initial={{ opacity: 0.9 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              className="min-h-[40px] flex" // Ensure consistent height
                            >
                              {index < currentIndex ? (
                                <p className="text-ctp-text relative z-10">
                                  {point}
                                </p>
                              ) : (
                                <p className="text-ctp-text relative z-10">
                                  {displayedText}
                                  {!isTransitioning && (
                                    <Cursor color={accentColors[index]} />
                                  )}
                                </p>
                              )}
                            </motion.div>

                            {/* Progress line for current item */}
                            {index === currentIndex &&
                              isTyping &&
                              !isTransitioning && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ProgressBar
                                    color={accentColors[index]}
                                    progress={progress}
                                  />
                                </motion.div>
                              )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DialogModal>
  );
};

export default WhatDoIKnow;
