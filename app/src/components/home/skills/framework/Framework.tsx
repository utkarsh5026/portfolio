import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import LanguageFrameworks from "./LanguageFrameworks";
import Reveal from "@/components/animations/reveal/Reveal";

/**
 * Framework Component
 *
 * This component displays a list of programming frameworks and libraries organized by language.
 * It utilizes reveal animations to enhance user interaction and visual appeal.
 *
 * State:
 * - hoveredFramework: A string that holds the name of the currently hovered framework for animation effects.
 *
 * Features:
 * - Animated background glow effect.
 * - Card layout with a gradient accent line.
 * - Each programming language is displayed with its corresponding frameworks.
 * - Hover effects that animate the framework items for better user engagement.
 * - Optimized reveal animations for both mobile and desktop experiences.
 *
 * Usage:
 * <Framework />
 */
const Framework: React.FC = () => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  return (
    <Reveal
      effect="rise"
      duration={0.8}
      className="skill-card relative group w-full perspective-1000"
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/20 via-ctp-blue/20 to-ctp-lavender/20 blur-xl opacity-50 w-full rounded-xl"
        style={{
          animation: "pulse-slow 5s infinite",
        }}
      />

      {/* Main card */}
      <Card className="relative bg-ctp-mantle backdrop-blur-sm border border-ctp-surface0 hover:border-ctp-surface1 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:transform overflow-hidden">
        {/* Accent line at the top */}
        <div className="h-1 w-full bg-gradient-to-r from-ctp-mauve via-ctp-lavender to-ctp-blue"></div>

        <CardHeader className="pb-4 border-b border-ctp-surface0">
          <Reveal effect="fade-up" duration={0.6} delay={0.1}>
            <CardTitle className="flex items-center gap-3">
              {/* Icon with glowing background */}
              <Reveal effect="zoom-in" duration={0.5} delay={0.2}>
                <div className="p-3 rounded-lg bg-gradient-to-br from-ctp-lavender/10 to-ctp-blue/10 flex items-center justify-center relative">
                  <Code2 className="w-6 h-6 text-ctp-lavender relative z-10" />
                  <div
                    className="absolute inset-0 bg-ctp-lavender/5 rounded-lg opacity-60"
                    style={{
                      animation: "pulse-slow 3s infinite",
                    }}
                  />
                </div>
              </Reveal>

              {/* Title with gradient */}
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-lavender bg-size-200 animate-gradient-x">
                Frameworks & Libraries
              </span>
            </CardTitle>
          </Reveal>
        </CardHeader>

        <CardContent className="pt-6">
          <Reveal effect="fade-up" duration={0.7} delay={0.3}>
            <LanguageFrameworks
              hoveredFramework={hoveredFramework}
              setHoveredFramework={setHoveredFramework}
            />
          </Reveal>
        </CardContent>
      </Card>
    </Reveal>
  );
};

export default Framework;
