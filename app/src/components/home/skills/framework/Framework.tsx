import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import LanguageFrameworks from "./LanguageFrameworks";

/**
 * Framework Component
 *
 * This component displays a list of programming frameworks and libraries organized by language.
 * It utilizes animations to enhance user interaction and visual appeal.
 *
 * Props:
 * - frameworks: An object containing arrays of frameworks categorized by programming language.
 *
 * State:
 * - hoveredFramework: A string that holds the name of the currently hovered framework for animation effects.
 *
 * Features:
 * - Animated background glow effect.
 * - Card layout with a gradient accent line.
 * - Each programming language is displayed with its corresponding frameworks.
 * - Hover effects that animate the framework items for better user engagement.
 *
 * Usage:
 * <Framework frameworks={frameworks} />
 */
const Framework: React.FC = () => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  return (
    <motion.div
      className="skill-card relative group w-full perspective-1000"
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/20 via-ctp-blue/20 to-ctp-lavender/20 blur-xl opacity-50 w-full rounded-xl"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          filter: ["blur(15px)", "blur(20px)", "blur(15px)"],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main card */}
      <Card className="relative bg-ctp-mantle backdrop-blur-sm border border-ctp-surface0 hover:border-ctp-surface1 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:transform overflow-hidden">
        {/* Accent line at the top */}
        <div className="h-1 w-full bg-gradient-to-r from-ctp-mauve via-ctp-lavender to-ctp-blue"></div>

        <CardHeader className="pb-4 border-b border-ctp-surface0">
          <CardTitle className="flex items-center gap-3">
            {/* Icon with glowing background */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-ctp-lavender/10 to-ctp-blue/10 flex items-center justify-center relative">
              <Code2 className="w-6 h-6 text-ctp-lavender relative z-10" />
              <motion.div
                className="absolute inset-0 bg-ctp-lavender/5 rounded-lg opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Title with gradient */}
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-lavender"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Frameworks & Libraries
            </motion.span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <LanguageFrameworks
            hoveredFramework={hoveredFramework}
            setHoveredFramework={setHoveredFramework}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Framework;
