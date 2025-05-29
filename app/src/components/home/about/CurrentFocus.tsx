import React from "react";
import {
  Target,
  Zap,
  TrendingUp,
  Rocket,
  Database,
  Globe,
  Code,
  Cloud,
} from "lucide-react";
import { focusAreas } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const focusIcons = [Cloud, Database, TrendingUp, Code, Globe];
const focusColors = ["peach", "blue", "green", "mauve", "teal"];

const learningPhilosophy = [
  {
    title: "Focused Learning",
    description: "Deep diving into specific areas for expertise",
    color: "peach",
    icon: Target,
  },
  {
    title: "Hands-on Practice",
    description: "Building real projects to solidify knowledge",
    color: "blue",
    icon: Zap,
  },
  {
    title: "Continuous Growth",
    description: "Always evolving with industry trends",
    color: "green",
    icon: TrendingUp,
  },
];

const CurrentFocus: React.FC = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-ctp-peach/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ctp-blue/5 rounded-full blur-3xl" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-3xl border border-ctp-surface1/30 overflow-hidden">
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-ctp-peach via-ctp-blue to-ctp-green" />

        <div className="p-6 sm:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-ctp-peach/10 text-ctp-peach">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-ctp-text">
                  Current Focus
                </h3>
                <p className="text-sm text-ctp-subtext0">
                  What I'm actively learning and improving
                </p>
              </div>
            </div>
          </Reveal>

          {/* Focus Intro */}
          <Reveal effect="fade-up" duration={0.6} delay={0.1}>
            <div className="mb-8 p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-2xl border border-ctp-surface1/30">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-ctp-peach" />
                <span className="text-ctp-text font-semibold">
                  Growth Mindset
                </span>
              </div>
              <p className="text-ctp-subtext0 text-sm sm:text-base leading-relaxed">
                I'm currently focused on deepening my expertise in emerging
                technologies and best practices that will shape the future of
                development.
              </p>
            </div>
          </Reveal>

          {/* Focus Areas Grid */}
          <div className="flex flex-wrap gap-4 flex-col mb-8">
            {focusAreas.map((area, index) => {
              const Icon = focusIcons[index % focusIcons.length];
              const color = focusColors[index % focusColors.length];

              return (
                <Reveal
                  key={area}
                  effect="slide-in"
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={0.2 + index * 0.1}
                  duration={0.6}
                >
                  <div className="group">
                    <div
                      className={`relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-2xl border border-ctp-surface1/30 hover:border-ctp-${color}/30 transition-all duration-300 overflow-hidden p-6`}
                    >
                      {/* Subtle background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-ctp-${color}/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Focus Icon */}
                        <div
                          className={`flex-shrink-0 p-3 rounded-xl bg-ctp-${color}/10 text-ctp-${color} group-hover:bg-ctp-${color}/20 group-hover:scale-110 transition-all duration-300`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Focus Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4
                              className={`text-base font-semibold text-ctp-text group-hover:text-ctp-${color} transition-colors duration-300`}
                            >
                              {area}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Learning Philosophy */}
          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {learningPhilosophy.map(
                ({ color, icon: Icon, title, description }) => {
                  return (
                    <div
                      className={`p-4 bg-ctp-surface0/20 rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-${color}/5 hover:border-ctp-${color}/30 transition-all duration-300`}
                      key={title}
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-ctp-${color}/10 flex items-center justify-center group-hover:bg-ctp-${color}/20 transition-colors duration-300`}
                      >
                        <Icon className={`w-6 h-6 text-ctp-${color}`} />
                      </div>
                      <h4
                        className={`font-semibold text-ctp-text mb-2 group-hover:text-ctp-${color} transition-colors duration-300`}
                      >
                        {title}
                      </h4>
                      <p className="text-xs text-ctp-subtext0 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </Reveal>

          {/* Current Status */}
          <Reveal effect="fade-up" delay={1.0} duration={0.6}>
            <div className="p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-2xl border border-ctp-surface1/30">
              <p className="text-center text-sm text-ctp-subtext0 italic">
                "In the beginner’s mind, there are many possibilities; in the
                expert’s mind, there are few. - Shunryu Suzuki"
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default CurrentFocus;
