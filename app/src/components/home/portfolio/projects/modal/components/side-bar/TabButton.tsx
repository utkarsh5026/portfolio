import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export type Tab = {
  id: string;
  icon: React.ElementType;
  label: string;
  count: number | null;
  isSpecial: boolean;
};

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  theme: ProjectTheme;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  tab,
  isActive,
  theme,
  onClick,
}) => {
  const IconComponent = tab.icon;

  if (tab.isSpecial) {
    // Special styling for demo tab
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full relative overflow-hidden rounded-xl transition-all duration-300 group",
          isActive
            ? "bg-gradient-to-r from-ctp-red/30 via-ctp-peach/30 to-ctp-yellow/30 border-2 border-ctp-peach/50 shadow-lg shadow-ctp-peach/20"
            : "hover:bg-gradient-to-r hover:from-ctp-red/10 hover:via-ctp-peach/10 hover:to-ctp-yellow/10 border-2 border-transparent hover:border-ctp-peach/20"
        )}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-ctp-red/5 via-ctp-peach/5 to-ctp-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sparkle animation */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3 text-ctp-peach" />
          </motion.div>
        )}

        <div className="relative flex items-center gap-4 p-4">
          <div
            className={cn(
              "p-2.5 rounded-lg transition-all duration-300 relative overflow-hidden",
              isActive
                ? "bg-gradient-to-br from-ctp-peach/40 to-ctp-red/40 shadow-lg"
                : "bg-gradient-to-br from-ctp-peach/20 to-ctp-red/20 group-hover:from-ctp-peach/30 group-hover:to-ctp-red/30"
            )}
          >
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-ctp-peach/20 to-ctp-red/20 blur-sm" />
            <IconComponent
              className={cn(
                "w-5 h-5 relative z-10 transition-colors duration-300",
                isActive
                  ? "text-ctp-peach"
                  : "text-white/80 group-hover:text-ctp-peach"
              )}
            />
          </div>

          <div className="flex-1 text-left">
            <span
              className={cn(
                "font-semibold transition-colors duration-300 flex items-center gap-2",
                isActive
                  ? "text-ctp-peach"
                  : "text-white/90 group-hover:text-ctp-peach"
              )}
            >
              {tab.label}
              {/* Live indicator */}
              <motion.div
                className="w-2 h-2 rounded-full bg-ctp-red"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
            <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300">
              Watch in action
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl border border-ctp-peach/30 shadow-[0_0_20px_rgba(250,179,135,0.3)]" />
        )}
      </button>
    );
  }

  // Regular tab styling
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group",
        isActive
          ? `bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 text-ctp-${theme.main}`
          : "hover:bg-white/5 text-white/70 hover:text-white"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg transition-colors",
          isActive
            ? `bg-ctp-${theme.main}/30`
            : "bg-white/10 group-hover:bg-white/20"
        )}
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <span className="font-medium flex-1 text-left">{tab.label}</span>
      {tab.count && (
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full",
            isActive
              ? `bg-ctp-${theme.main}/30 text-ctp-${theme.main}`
              : "bg-white/10 text-white/60"
          )}
        >
          {tab.count}
        </span>
      )}
    </button>
  );
};

export default TabButton;
