import { Lightbulb, Cog, Telescope } from "lucide-react";

export type Phase = "problem" | "execution" | "future";

export const processText = (text: string, phase: Phase) => {
  const highlights = {
    problem: {
      amber: [
        "problem",
        "challenge",
        "issue",
        "limitation",
        "gap",
        "need",
        "pain point",
      ],
      orange: [
        "opportunity",
        "potential",
        "vision",
        "inspiration",
        "motivation",
      ],
    },
    execution: {
      blue: [
        "React",
        "TypeScript",
        "Python",
        "Docker",
        "Go",
        "MongoDB",
        "API",
        "algorithm",
      ],
      purple: [
        "architecture",
        "design",
        "implementation",
        "optimization",
        "performance",
      ],
      cyan: [
        "features",
        "functionality",
        "interface",
        "experience",
        "interaction",
      ],
    },
    future: {
      green: ["learning", "improvement", "enhancement", "evolution", "growth"],
      emerald: ["future", "potential", "roadmap", "vision", "next", "upcoming"],
      teal: [
        "scalability",
        "maintainability",
        "extensibility",
        "sustainability",
      ],
    },
  };

  const phaseHighlights = highlights[phase] || {};
  let processedText = text;

  Object.entries(phaseHighlights).forEach(([color, terms]) => {
    const pattern = new RegExp(`(${terms.join("|")})`, "gi");
    processedText = processedText.replace(
      pattern,
      (match) =>
        `<span class="font-medium text-${color}-400 bg-${color}-400/10 px-1 rounded">${match}</span>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

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
      primary: "amber-400",
      secondary: "orange-500",
      background: "from-amber-400/10 to-orange-500/10",
      border: "border-amber-400/30",
      glow: "shadow-amber-400/20",
    },
  },
  execution: {
    title: "Execution & Features",
    icon: Cog,
    description: "Bringing the vision to life",
    colors: {
      primary: "blue-400",
      secondary: "purple-500",
      background: "from-blue-400/10 to-purple-500/10",
      border: "border-blue-400/30",
      glow: "shadow-blue-400/20",
    },
  },
  future: {
    title: "Future & Learning",
    icon: Telescope,
    description: "What's next and lessons learned",
    colors: {
      primary: "green-400",
      secondary: "emerald-500",
      background: "from-green-400/10 to-emerald-500/10",
      border: "border-green-400/30",
      glow: "shadow-green-400/20",
    },
  },
} as const;
