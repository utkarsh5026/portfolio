import { Lightbulb, Cog, Telescope } from "lucide-react";

export type Phase = "problem" | "execution" | "future";

export type PhaseConfig = {
  title: string;
  icon: React.ElementType;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    border: string;
    glow: string;
  };
};

export const phaseConfig: Record<Phase, PhaseConfig> = {
  problem: {
    title: "Problem & Inspiration",
    icon: Lightbulb,
    description: "The spark that started it all",
    colors: {
      primary: "ctp-yellow",
      secondary: "ctp-peach",
      background: "from-ctp-yellow/10 to-ctp-peach/10",
      border: "border-ctp-yellow/30",
      glow: "shadow-ctp-yellow/20",
    },
  },
  execution: {
    title: "Execution & Features",
    icon: Cog,
    description: "Bringing the vision to life",
    colors: {
      primary: "ctp-blue",
      secondary: "ctp-mauve",
      background: "from-ctp-blue/10 to-ctp-mauve/10",
      border: "border-ctp-blue/30",
      glow: "shadow-ctp-blue/20",
    },
  },
  future: {
    title: "Future & Learning",
    icon: Telescope,
    description: "What's next and lessons learned",
    colors: {
      primary: "ctp-green",
      secondary: "ctp-teal",
      background: "from-ctp-green/10 to-ctp-teal/10",
      border: "border-ctp-green/30",
      glow: "shadow-ctp-green/20",
    },
  },
} as const;
