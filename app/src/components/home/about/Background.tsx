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
import { background } from "./data";
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
    <div className="flex items-center gap-2">
      <Icon className={`w-3 h-3 text-${color}`} />
      <span>{text}</span>
    </div>
    {!isLast && <div className="w-px h-4 bg-ctp-surface1" />}
  </>
);

const ModernBackground: React.FC = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-ctp-blue/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ctp-mauve/5 rounded-full blur-3xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-pink" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-2.5 rounded-xl bg-ctp-blue/10 text-ctp-blue"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  My Story
                </h3>
                <p className="text-sm text-ctp-subtext0">The journey so far</p>
              </div>
            </div>
          </Reveal>

          {/* Story Cards */}
          <div className="space-y-6">
            {background.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                effect="slide-in"
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.2 + index * 0.1}
                duration={0.6}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-ctp-blue/5 to-ctp-mauve/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex gap-4 p-4 sm:p-6 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-2xl border border-ctp-surface1/20 hover:border-ctp-surface2/40 transition-all duration-300">
                    {/* Story icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 flex items-center justify-center">
                        {index === 0 && (
                          <Code2 className="w-4 h-4 text-ctp-blue" />
                        )}
                        {index === 1 && (
                          <Rocket className="w-4 h-4 text-ctp-mauve" />
                        )}
                        {index === 2 && (
                          <Heart className="w-4 h-4 text-ctp-pink" />
                        )}
                        {index === 3 && (
                          <User className="w-4 h-4 text-ctp-green" />
                        )}
                      </div>
                    </div>

                    {/* Story content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-ctp-text leading-relaxed text-sm sm:text-base">
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
                          className="mt-4 flex items-center gap-2 text-ctp-pink"
                        >
                          <Heart className="w-4 h-4 animate-pulse" />
                          <span className="text-sm font-medium">
                            Let's build something amazing together!
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom highlight */}
          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="mt-8 pt-6 border-t border-ctp-surface1/30">
              <div className="flex items-center justify-center gap-4 text-sm text-ctp-subtext0">
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
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ModernBackground;
