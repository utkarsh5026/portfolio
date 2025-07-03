import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { type PhaseConfig } from "./config";
import { motion } from "framer-motion";
import { ProgressBar, Cursor } from "@/components/utils";
import useMobile from "@/hooks/use-mobile";
import ProgressIndicator from "./progress-indicator";
import AnimatedIcon from "./animated-icon";

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
        stepIndicator: `bg-gradient-to-br from-${config.colors.primary} via-${config.colors.secondary} to-${config.colors.primary} text-ctp-crust shadow-2xl font-bold border-2 border-${config.colors.primary}/50 ${config.colors.glow} shadow-${config.colors.primary}/30`,
        content: `bg-gradient-to-br from-ctp-mantle via-ctp-base to-ctp-mantle border-2 ${config.colors.border} shadow-2xl ${config.colors.glow} shadow-${config.colors.primary}/20 backdrop-blur-sm`,
        phaseHeader: `text-${config.colors.primary} drop-shadow-sm`,
        glow: `shadow-${config.colors.primary}/40`,
      };
    } else if (index < activeParagraph) {
      return {
        stepIndicator: `bg-gradient-to-br from-${config.colors.primary}/40 via-${config.colors.secondary}/30 to-${config.colors.primary}/40 text-${config.colors.primary} font-semibold border-2 border-${config.colors.primary}/30 shadow-lg`,
        content: `bg-gradient-to-br from-ctp-mantle/90 via-ctp-base/80 to-ctp-mantle/90 border border-ctp-surface1 shadow-lg backdrop-blur-sm`,
        phaseHeader: `text-${config.colors.primary}/80`,
        glow: `shadow-${config.colors.primary}/20`,
      };
    } else {
      return {
        stepIndicator:
          "bg-gradient-to-br from-ctp-surface0 via-ctp-surface1 to-ctp-surface0 text-ctp-overlay0 font-medium border border-ctp-surface1/50 shadow-md",
        content:
          "bg-gradient-to-br from-ctp-surface0/50 via-ctp-surface1/30 to-ctp-surface0/50 border border-ctp-surface0/50 backdrop-blur-sm",
        phaseHeader: "text-ctp-overlay0",
        glow: "",
      };
    }
  }, [index, activeParagraph, config]);

  return (
    <motion.div
      className="flex gap-4 sm:gap-6 relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {!isMobile && (
        <ProgressIndicator
          index={index}
          activeParagraph={activeParagraph}
          classes={classes}
          IconComponent={IconComponent}
          config={config}
        />
      )}

      <motion.div
        className="flex-grow min-w-0 relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "relative p-6 sm:p-8 rounded-2xl transition-all duration-500 overflow-hidden",
            "border-none",
            classes.content
          )}
        >
          <ContentHeader
            config={config}
            isMobile={isMobile}
            IconComponent={IconComponent}
            classes={classes}
          />

          <Content
            index={index}
            activeParagraph={activeParagraph}
            explanations={explanations}
            displayedText={displayedText}
            isComplete={isComplete}
            config={config}
            progress={progress}
          />

          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-ctp-text/5 to-transparent rounded-full blur-sm" />
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-tl from-ctp-text/5 to-transparent rounded-full blur-sm" />
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ContentProps {
  index: number;
  activeParagraph: number;
  explanations: string[];
  displayedText: string;
  isComplete: boolean;
  config: PhaseConfig;
  progress: number;
}
const Content: React.FC<ContentProps> = ({
  index,
  activeParagraph,
  explanations,
  displayedText,
  isComplete,
  config,
  progress,
}) => {
  return (
    <div className="relative z-10">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-ctp-text leading-relaxed text-base sm:text-lg font-medium tracking-wide">
          {index < activeParagraph && explanations[index]}
          {index === activeParagraph && (
            <>
              {displayedText}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Cursor color={config.colors.primary} />
                </motion.span>
              )}
            </>
          )}
        </p>

        {index === activeParagraph && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium text-ctp-overlay1">
                Progress
              </span>
              <motion.span
                className={`text-xs font-bold text-${config.colors.primary}`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            <ProgressBar
              color={config.colors.secondary.split("ctp-")[1]}
              progress={progress}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

interface ContentHeaderProps {
  config: PhaseConfig;
  isMobile: boolean;
  IconComponent: React.ElementType;
  classes: { phaseHeader: string };
}
const ContentHeader: React.FC<ContentHeaderProps> = ({
  config,
  isMobile,
  IconComponent,
  classes,
}) => {
  return (
    <div className="mb-4 relative z-10">
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {isMobile && (
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              `bg-gradient-to-br from-${config.colors.primary}/20 to-${config.colors.secondary}/20`,
              `border border-${config.colors.primary}/30`
            )}
          >
            <AnimatedIcon
              IconComponent={IconComponent}
              className={`w-4 h-4 text-${config.colors.primary} drop-shadow-sm`}
              isActive={true}
            />
          </div>
        )}
        <h5
          className={cn(
            "text-lg sm:text-xl font-bold transition-colors duration-300",
            classes.phaseHeader
          )}
        >
          {config.title}
        </h5>
      </motion.div>

      <motion.p
        className="text-ctp-overlay1 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {config.description}
      </motion.p>
    </div>
  );
};

export default PhaseContent;
