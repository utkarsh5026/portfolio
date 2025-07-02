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
import JourneyNavigation from "./journey-navigation";

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
      <DrawerContent className="max-h-[95vh] bg-ctp-base border-ctp-surface1/50 z-[99999999] w-full">
        {/* Header */}
        <DrawerHeader className="border-b border-ctp-surface1/50">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4">
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
          </div>
        </DrawerHeader>

        {/* Progress Indicator */}
        <div className="border-b border-ctp-surface1/30">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 py-2 sm:py-3 md:py-4">
            <StepIndicator
              steps={journeySteps}
              activeStep={activeStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto flex-1 max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4">
            <AnimatePresence mode="wait">
              <JourneyCard
                key={journeySteps[activeStep].id}
                step={journeySteps[activeStep]}
                index={activeStep}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <JourneyNavigation
          isAutoPlaying={isAutoPlaying}
          setIsAutoPlaying={setIsAutoPlaying}
          activeStep={activeStep}
          journeySteps={journeySteps}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default WhatDoIKnow;
