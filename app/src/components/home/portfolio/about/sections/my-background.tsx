import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Heart,
  Rocket,
  User,
  GraduationCap,
  Puzzle,
  Users,
} from "lucide-react";
import { background } from "../data/data";
import Reveal from "@/components/animations/reveal/Reveal";

// Status items configuration
const statusItems = [
  {
    text: "Always Learning",
    color: "ctp-green",
    icon: GraduationCap,
  },
  {
    text: "Problem Solver",
    color: "ctp-blue",
    icon: Puzzle,
  },
  {
    text: "Team Player",
    color: "ctp-pink",
    icon: Users,
  },
];

const StatusItem: React.FC<{
  text: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}> = ({ text, color, icon: Icon, isLast }) => (
  <>
    <div className="flex items-center gap-1 sm:gap-2 min-w-0">
      <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-${color} flex-shrink-0`} />
      <span className="text-xs sm:text-sm truncate">{text}</span>
    </div>
    {!isLast && (
      <div className="w-px h-3 sm:h-4 bg-ctp-surface1 flex-shrink-0" />
    )}
  </>
);

/**
 * 📖 Personal background story component with animated cards
 *
 * Tells my personal journey through beautifully animated story cards.
 * Each paragraph gets its own card with hover effects and smooth transitions.
 * It's like reading an interactive autobiography! 🎭✨
 */
const Background: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-transparent backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <motion.div
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-ctp-blue/10 text-ctp-blue flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
                  My Background
                </h3>
                <p className="text-xs sm:text-sm text-ctp-subtext0">
                  The journey so far
                </p>
              </div>
            </div>
          </Reveal>

          {/* Story Cards */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {background.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                effect="slide-in"
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.2 + index * 0.1}
                duration={0.6}
              >
                <StoryCard index={index} paragraph={paragraph} />
              </Reveal>
            ))}
          </div>

          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-ctp-surface1/30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-ctp-subtext0 overflow-hidden w-full">
                {/* Mobile: Stack vertically, Desktop: Horizontal with separators */}
                <div className="flex flex-col sm:hidden space-y-2 w-full">
                  {statusItems.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center justify-center gap-2"
                    >
                      <item.icon className={`w-3 h-3 text-${item.color}`} />
                      <span className="text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:flex items-center justify-center gap-2 md:gap-4 w-full overflow-hidden">
                  {statusItems.map((item, index) => (
                    <StatusItem
                      key={item.text}
                      text={item.text}
                      color={item.color}
                      icon={item.icon}
                      isLast={index === statusItems.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

interface StoryCardProps {
  index: number;
  paragraph: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ index, paragraph }) => {
  return (
    <div className="relative group w-full">
      <div className="relative flex gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 bg-ctp-mantle/80 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl border border-none hover:border-ctp-surface2/40 transition-all duration-300 w-full overflow-hidden">
        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 flex items-center justify-center">
            {index === 0 && (
              <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-blue" />
            )}
            {index === 1 && (
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-mauve" />
            )}
            {index === 2 && (
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-pink" />
            )}
            {index === 3 && (
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-green" />
            )}
          </div>
        </div>

        {/* Story content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-ctp-text leading-relaxed text-xs sm:text-sm md:text-base break-words">
            {paragraph}
          </p>

          {index === background.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.5,
              }}
              className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-1 sm:gap-2 text-ctp-pink"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium break-words">
                Let's build something amazing together!
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Background;
