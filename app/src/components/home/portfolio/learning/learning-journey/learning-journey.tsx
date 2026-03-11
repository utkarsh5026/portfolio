import { Book, Pause, Play, RotateCcw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import useTypewriting from "@/components/type-write/hooks/use-type-write";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGitComponent } from "@/hooks/use-git-component";

import { learningJourneyItems } from "../data";
import JourneyItem from "./journey-item";
import ProgressIndicator from "./progress-indicator";

interface LearningJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({
  isOpen,
  onClose,
}) => {
  const ref = useGitComponent(LearningJourney);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    }, 150);

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
    setTimeout(() => start(), 100);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] bg-gradient-to-b from-ctp-mantle to-ctp-crust border-none rounded-2xl z-[999999] w-full font-source">
        <div ref={ref} className="flex flex-col h-full w-full">
          <DrawerHeader className="border-b border-ctp-surface1/50 pb-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto px-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-ctp-mantle">
                  <Book className="w-6 h-6 text-ctp-blue" />
                </div>
                <div className="text-left">
                  <DrawerTitle className="text-2xl sm:text-3xl font-bold text-ctp-green">
                    Learning Journey
                  </DrawerTitle>
                  <DrawerDescription className="text-ctp-subtext0 text-sm sm:text-base">
                    What I'm currently exploring and building
                  </DrawerDescription>
                </div>
              </div>
            </div>
          </DrawerHeader>

          {/* Progress Section */}
          <div className="py-4 border-b border-ctp-surface1/30 bg-ctp-base">
            <div className="flex items-center justify-between max-w-4xl mx-auto px-6 sm:px-8">
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

          {/* Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto py-6 bg-ctp-base">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
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
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LearningJourney;
