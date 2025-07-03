import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { type PhaseConfig } from "./config";
import { motion } from "framer-motion";
import { ProgressBar, Cursor } from "@/components/utils";
import useMobile from "@/hooks/use-mobile";

interface PhaseContentProps {
  explanations: string[];
  index: number;
  activeParagraph: number;
  phase: string;
  config: PhaseConfig;
  progress: number;
  displayedText: string;
  isComplete: boolean;
}

const PhaseContent: React.FC<PhaseContentProps> = ({
  explanations,
  activeParagraph,
  config,
  progress,
  displayedText,
  isComplete,
  index,
}) => {
  const { isMobile } = useMobile();
  const IconComponent = config.icon;

  const classes = useMemo(() => {
    if (index === activeParagraph) {
      return {
        stepIndicator: `bg-gradient-to-r from-${config.colors.primary} to-${config.colors.secondary} text-ctp-crust shadow-lg font-semibold ${config.colors.glow}`,
        content: `bg-ctp-mantle border ${config.colors.border} shadow-xl ${config.colors.glow}`,
        phaseHeader: `text-${config.colors.primary}`,
      };
    } else if (index < activeParagraph) {
      return {
        stepIndicator: `bg-gradient-to-r from-${config.colors.primary}/30 to-${config.colors.secondary}/30 text-${config.colors.primary} font-medium border ${config.colors.border}`,
        content: "bg-ctp-mantle border border-ctp-surface1 opacity-80",
        phaseHeader: `text-${config.colors.primary}/70`,
      };
    } else {
      return {
        stepIndicator: "bg-ctp-surface0 text-ctp-overlay0 font-medium",
        content: "bg-ctp-surface0/30 border border-ctp-surface0/50",
        phaseHeader: "text-ctp-overlay0",
      };
    }
  }, [index, activeParagraph, config]);

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Enhanced step indicator with phase icons */}
      {!isMobile && (
        <div className="flex-shrink-0 mt-1">
          <div
            className={cn(
              "relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl",
              classes.stepIndicator,
              "transition-all duration-500"
            )}
          >
            {index === activeParagraph ? (
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <span className="text-sm sm:text-base text-ctp-text font-bold">
                {index + 1}
              </span>
            )}

            {/* Enhanced connection line */}
            {index < explanations.length - 1 && (
              <div className="absolute top-full h-6 sm:h-8 w-1 left-1/2 -translate-x-1/2">
                <motion.div
                  className={`h-full w-full bg-gradient-to-b from-${config.colors.primary} to-${config.colors.secondary}`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: index < activeParagraph ? 1 : 0,
                    opacity: index < activeParagraph ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "top" }}
                />
                <div className="absolute inset-0 bg-ctp-surface0/30" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced content card */}
      <div className="flex-grow min-w-0">
        <div
          className={cn(
            "relative p-4 sm:p-5 rounded-xl transition-all duration-300",
            classes.content
          )}
        >
          <div className="mb-3">
            <h5
              className={cn(
                "text-sm sm:text-base font-bold text-ctp-text",
                "transition-colors duration-300"
              )}
            >
              {config.title}
            </h5>
          </div>

          <div className="relative">
            <p className="text-ctp-text leading-relaxed text-sm sm:text-base relative z-10">
              {index < activeParagraph && explanations[index]}
              {index === activeParagraph && (
                <>
                  {displayedText}
                  {!isComplete && <Cursor color={config.colors.primary} />}
                </>
              )}
            </p>

            {index === activeParagraph && (
              <ProgressBar
                color={config.colors.secondary.split("ctp-")[1]}
                progress={progress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseContent;
