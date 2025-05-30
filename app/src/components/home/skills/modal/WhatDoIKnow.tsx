import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { journeySteps } from "../data";
import JourneyCard from "./JourneyIndicator";
import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";

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

  // Reset when modal opens
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-ctp-base rounded-2xl sm:rounded-3xl border border-ctp-surface1/50 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 border-b border-ctp-surface1/50">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <motion.div
                className="p-1.5 sm:p-2 md:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 flex-shrink-0"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-blue" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent leading-tight break-words">
                  My Tech Journey
                </h2>
                <p className="text-ctp-subtext0 text-xs sm:text-sm md:text-base break-words">
                  Skills & experiences I've gathered along the way
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200 flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 border-b border-ctp-surface1/30">
          <StepIndicator
            steps={journeySteps}
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] p-4">
          <AnimatePresence mode="wait">
            <JourneyCard
              key={journeySteps[activeStep].id}
              step={journeySteps[activeStep]}
              index={activeStep}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 lg:p-8 border-t border-ctp-surface1/50">
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
      </motion.div>
    </motion.div>
  );
};

export default WhatDoIKnow;
