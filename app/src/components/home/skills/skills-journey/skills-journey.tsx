import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { journeySteps } from "../data";
import JourneyCard from "./journey-indicator";
import StepIndicator from "./step-indicator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface WhatDoIKnowProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatDoIKnow: React.FC<WhatDoIKnowProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance steps
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= journeySteps.length - 1) {
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying, activeStep]);

  // Reset when drawer opens
  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      setIsAutoPlaying(true);
    }
  }, [isOpen]);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setIsAutoPlaying(false);
  };

  const nextStep = () => {
    if (activeStep < journeySteps.length - 1) {
      setActiveStep(activeStep + 1);
      setIsAutoPlaying(false);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setIsAutoPlaying(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] bg-ctp-base border-ctp-surface1/50 z-[99999999]">
        {/* Header */}
        <DrawerHeader className="border-b border-ctp-surface1/50">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <motion.div
              className="p-1.5 sm:p-2 md:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 flex-shrink-0"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-blue" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <DrawerTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent leading-tight break-words text-left">
                My Tech Journey
              </DrawerTitle>
              <DrawerDescription className="text-ctp-subtext0 text-xs sm:text-sm md:text-base break-words text-left">
                Skills & experiences I've gathered along the way
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* Progress Indicator */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 border-b border-ctp-surface1/30">
          <StepIndicator
            steps={journeySteps}
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto flex-1 p-4 max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh]">
          <AnimatePresence mode="wait">
            <JourneyCard
              key={journeySteps[activeStep].id}
              step={journeySteps[activeStep]}
              index={activeStep}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 lg:p-8 border-t border-ctp-surface1/50 mt-auto">
          {/* Mobile: Stack navigation vertically */}
          <div className="flex sm:hidden w-full flex-col gap-2">
            {/* Auto-play toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isAutoPlaying
                    ? "bg-ctp-green/20 text-ctp-green"
                    : "bg-ctp-surface0/50 text-ctp-subtext0"
                }`}
              >
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between w-full">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                disabled={activeStep === journeySteps.length - 1}
                className="px-4 py-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden sm:contents">
            <button
              onClick={prevStep}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isAutoPlaying
                    ? "bg-ctp-green/20 text-ctp-green"
                    : "bg-ctp-surface0/50 text-ctp-subtext0"
                }`}
              >
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </button>
            </div>

            <button
              onClick={nextStep}
              disabled={activeStep === journeySteps.length - 1}
              className="px-4 py-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WhatDoIKnow;
