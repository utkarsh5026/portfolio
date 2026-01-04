import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phase, phaseConfig } from "../config";
import AnimatedIcon from "../animated-icon";

interface PhaseTabsProps {
  activePhase: Phase;
  onPhaseChange: (phase: Phase) => void;
  cardCounts: Record<Phase, number>;
}

const phases: Phase[] = ["problem", "execution", "future"];

const PhaseTabs: React.FC<PhaseTabsProps> = ({
  activePhase,
  onPhaseChange,
  cardCounts,
}) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {phases.map((phase) => {
        const config = phaseConfig[phase];
        const isActive = phase === activePhase;
        const count = cardCounts[phase];

        const colorClasses = {
          problem: {
            active: "bg-ctp-yellow/20 text-ctp-yellow border-ctp-yellow/50",
            inactive: "hover:bg-ctp-yellow/10 hover:border-ctp-yellow/30",
          },
          execution: {
            active: "bg-ctp-blue/20 text-ctp-blue border-ctp-blue/50",
            inactive: "hover:bg-ctp-blue/10 hover:border-ctp-blue/30",
          },
          future: {
            active: "bg-ctp-green/20 text-ctp-green border-ctp-green/50",
            inactive: "hover:bg-ctp-green/10 hover:border-ctp-green/30",
          },
        };

        return (
          <motion.button
            key={phase}
            onClick={() => onPhaseChange(phase)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300",
              "border-2",
              isActive
                ? colorClasses[phase].active
                : cn(
                    "bg-ctp-surface0/30 text-ctp-subtext0 border-transparent",
                    colorClasses[phase].inactive
                  )
            )}
          >
            <AnimatedIcon
              IconComponent={config.icon}
              className="w-4 h-4"
              isActive={isActive}
            />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">
              {config.title.split(" ")[0]}
            </span>
            {count > 0 && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-ctp-surface0/50"
                    : "bg-ctp-surface1/50 text-ctp-overlay0"
                )}
              >
                {count}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="activePhaseIndicator"
                className="absolute inset-0 rounded-xl border-2 border-current opacity-30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default PhaseTabs;
