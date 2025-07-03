import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PhaseConfig } from "./config";
import AnimatedIcon from "./animated-icon";

interface ProgressIndicatorProps {
  index: number;
  activeParagraph: number;
  classes: { stepIndicator: string };
  IconComponent: React.ElementType;
  config: PhaseConfig;
}

const ProgressIndicator = ({
  index,
  activeParagraph,
  classes,
  IconComponent,
  config,
}: ProgressIndicatorProps) => {
  return (
    <div className="flex-shrink-0 mt-1 relative">
      <motion.div
        className={cn(
          "relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
          classes.stepIndicator,
          "transition-all duration-700 ease-out transform hover:scale-105"
        )}
        animate={{
          scale: index === activeParagraph ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: index === activeParagraph ? 2 : 0.3,
          repeat: index === activeParagraph ? Infinity : 0,
          repeatDelay: 3,
        }}
      >
        {/* Pulsing background for active state */}
        {index === activeParagraph && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-${config.colors.primary}/20`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <AnimatedIcon
          IconComponent={IconComponent}
          className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-lg"
          isActive={index === activeParagraph}
        />
      </motion.div>
    </div>
  );
};

export default ProgressIndicator;
