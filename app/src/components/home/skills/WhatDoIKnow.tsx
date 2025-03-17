import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Database, Code } from "lucide-react";
import { FaDocker, FaReact, FaBrain } from "react-icons/fa";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import Modal from "@/components/utils/Modal";
import ProgressBar from "@/components/utils/ProgressBar";
import Cursor from "@/components/utils/Cursor";
import { skillPoints } from "./data";

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

  useEffect(() => {
    if (paragraphRefs.current[currentIndex]) {
      paragraphRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex, displayedText]);

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

  useEffect(() => {
    return () => {
      reset();
      setCurrentIndex(0);
    };
  }, [reset]);

  const prevPointsLength = useMemo(() => {
    return skillPoints.slice(0, currentIndex).reduce((acc, point) => {
      return acc + point.length;
    }, 0);
  }, [currentIndex]);

  const calculateProgress = () => {
    const totalTypedCharacters = prevPointsLength + displayedText.length;
    return (totalTypedCharacters / totalSkillPointsLength) * 100;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
            <div className="mb-8 flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="relative"
              >
                <div className="rounded-full bg-gradient-to-r from-ctp-blue to-ctp-mauve p-3 text-ctp-base shadow-lg shadow-ctp-mantle">
                  <Sparkles className="h-5 w-5" />
                </div>
              </motion.div>

              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve bg-clip-text text-transparent">
                  My Tech Journey
                </h3>
                <p className="text-sm text-ctp-subtext0 mt-1">
                  Skills & experiences I've gathered along the way
                </p>
              </div>
            </div>

            {/* Skills progress bar */}
            <div className="mb-8">
              <ProgressBar
                color={accentColors[currentIndex]}
                progress={calculateProgress()}
              />
            </div>

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
    </Modal>
  );
};

interface SkillIconProps {
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  isCompleted: boolean;
  isTransitioning: boolean;
}

const SkillIcon: React.FC<SkillIconProps> = ({
  icon,
  color,
  isActive,
  isCompleted,
  isTransitioning,
}) => {
  return (
    <motion.div
      className="relative flex-shrink-0 mt-1"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon container */}
      <motion.div
        className={`
          relative flex h-10 w-10 items-center justify-center 
          rounded-md
          ${
            isActive
              ? `bg-gradient-to-br from-ctp-${color} to-ctp-${color}/80 text-ctp-base shadow-md shadow-ctp-${color}/10`
              : isCompleted
              ? `bg-ctp-surface0 text-ctp-${color}`
              : "bg-ctp-surface0 text-ctp-overlay0"
          }
        `}
        animate={
          isActive && !isTransitioning
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity },
              }
            : isTransitioning
            ? {
                scale: 1.1,
                transition: { duration: 0.3 },
              }
            : {}
        }
      >
        {/* The icon */}
        <motion.div
          animate={
            isActive && !isTransitioning
              ? {
                  rotate: [0, 5, 0, -5, 0],
                  transition: { duration: 4, repeat: Infinity },
                }
              : isTransitioning
              ? {
                  rotate: [0, 10, 0],
                  transition: { duration: 0.5 },
                }
              : {}
          }
        >
          {icon}
        </motion.div>

        {/* Status indicator */}
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
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-ctp-crust rounded-full flex items-center justify-center border border-ctp-surface0"
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-ctp-${color}/80`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-2.5 h-2.5 text-ctp-crust"
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

export default WhatDoIKnow;
