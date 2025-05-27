import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phase, phaseConfig } from "./config";
import { Project } from "@/types";
import { Brain } from "lucide-react";

interface HeaderProps {
  project: Project;
  currentPhase: Phase;
}

const Header = ({ project, currentPhase }: HeaderProps) => {
  const { name } = project;
  const config = phaseConfig[currentPhase];

  return (
    <div
      className={cn(
        "w-full relative overflow-hidden rounded-xl border-none py-4 sm:py-6 px-4 sm:px-6",
        "shadow-xl transition-all duration-500",
        `bg-gradient-to-r ${config.colors.background}`,
        `${config.colors.glow} shadow-lg`
      )}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white opacity-5" />
      <div className="absolute -bottom-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white opacity-5" />

      {/* Phase indicator dots */}
      <div className="absolute top-3 right-4 flex gap-2">
        {Object.keys(phaseConfig).map((phase) => (
          <div
            key={phase}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              phase === currentPhase
                ? `bg-${phaseConfig[phase].colors.primary}`
                : "bg-white/20"
            )}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 sm:p-3 rounded-lg bg-ctp-crust shadow-lg transition-all duration-500"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 3,
            }}
          >
            <Brain
              className={`w-4 h-4 sm:w-5 sm:h-5 text-${config.colors.primary}`}
            />
          </motion.div>
          <div className="text-left">
            <h4 className="font-bold text-white text-base sm:text-lg">
              {name}
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              {config.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
