import { type TourStep, TourStepType } from "../context/TourType";

/**
 * Type definitions for emotion configurations
 */
export type Emotion =
  | "excited"
  | "friendly"
  | "professional"
  | "proud"
  | "grateful"
  | "pointing"
  | "helpful"
  | "default"
  | "scholarly"
  | "insightful"
  | "contemplative"
  | "curious"
  | "analytical";

interface EmotionConfig {
  emoji: string;
  color: string;
  tailwindClasses: string;
}

/**
 * Map of tour steps to emotions - with specialized emotions for articles and learning
 */
export const guideEmotions: Record<TourStep, Emotion> = {
  [TourStepType.WELCOME]: "excited",
  [TourStepType.ABOUT]: "friendly",
  [TourStepType.SKILLS]: "proud",
  [TourStepType.PROJECTS]: "excited",
  [TourStepType.EXPERIENCE]: "professional",
  [TourStepType.CONTACT]: "friendly",
  [TourStepType.THANK_YOU]: "grateful",
  [TourStepType.ARTICLES]: "insightful",
  [TourStepType.LEARNING]: "scholarly",
};

/**
 * Configuration for each emotion type - including the new emotions
 */
export const emotionConfig: Record<Emotion, EmotionConfig> = {
  excited: {
    emoji: "😃",
    color: "peach",
    tailwindClasses: "bg-gradient-to-br from-amber-300 to-orange-400",
  },
  pointing: {
    emoji: "👉",
    color: "sapphire",
    tailwindClasses: "bg-gradient-to-br from-blue-400 to-sky-500",
  },
  friendly: {
    emoji: "😊",
    color: "green",
    tailwindClasses: "bg-gradient-to-br from-emerald-300 to-green-400",
  },
  proud: {
    emoji: "😌",
    color: "mauve",
    tailwindClasses: "bg-gradient-to-br from-purple-400 to-violet-500",
  },
  professional: {
    emoji: "👨‍💼",
    color: "blue",
    tailwindClasses: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  helpful: {
    emoji: "🤗",
    color: "teal",
    tailwindClasses: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  grateful: {
    emoji: "🙏",
    color: "maroon",
    tailwindClasses: "bg-gradient-to-br from-red-300 to-rose-400",
  },
  default: {
    emoji: "👋",
    color: "lavender",
    tailwindClasses: "bg-gradient-to-br from-indigo-300 to-purple-400",
  },
  scholarly: {
    emoji: "🧠",
    color: "sapphire",
    tailwindClasses: "bg-gradient-to-br from-ctp-blue to-ctp-sapphire",
  },
  insightful: {
    emoji: "💡",
    color: "yellow",
    tailwindClasses: "bg-gradient-to-br from-ctp-yellow to-ctp-peach",
  },
  contemplative: {
    emoji: "🤔",
    color: "mauve",
    tailwindClasses: "bg-gradient-to-br from-ctp-mauve to-ctp-pink",
  },
  curious: {
    emoji: "🔍",
    color: "sky",
    tailwindClasses: "bg-gradient-to-br from-ctp-sky to-ctp-blue",
  },
  analytical: {
    emoji: "📊",
    color: "teal",
    tailwindClasses: "bg-gradient-to-br from-ctp-teal to-ctp-green",
  },
};

/**
 * Updated messages for each tour step - enhanced messages for articles and learning
 */
export const guideMessages: Record<TourStep, string> = {
  [TourStepType.WELCOME]:
    "Welcome to my portfolio! I'm excited to show you around.",
  [TourStepType.ABOUT]:
    "This is where you can learn more about me and my background.",
  [TourStepType.SKILLS]:
    "Here are the technologies and tools I've mastered throughout my journey.",
  [TourStepType.PROJECTS]:
    "Check out some of the projects I've built. Each one taught me something valuable!",
  [TourStepType.EXPERIENCE]:
    "My professional experience has shaped my approach to problem-solving and collaboration.",
  [TourStepType.ARTICLES]:
    "I regularly write technical articles to share insights and break down complex concepts. Feel free to explore topics that interest you.",
  [TourStepType.LEARNING]:
    "Continuous learning is central to my growth as a developer. These are the technologies and concepts I'm currently exploring.",
  [TourStepType.CONTACT]:
    "I'd love to connect! Feel free to reach out through any of these channels.",
  [TourStepType.THANK_YOU]:
    "Thank you for taking the time to explore my portfolio! I hope you enjoyed the tour.",
};

/**
 * Tailwind classes for each emotion - including new emotions
 */
export const emotionTailwindClasses: Record<Emotion, string> = {
  excited: "bg-gradient-to-br from-ctp-yellow to-ctp-peach",
  friendly: "bg-gradient-to-br from-ctp-blue to-ctp-lavender",
  professional: "bg-gradient-to-br from-ctp-green to-ctp-teal",
  proud: "bg-gradient-to-br from-ctp-red to-ctp-maroon",
  grateful: "bg-gradient-to-br from-ctp-yellow to-ctp-peach",
  pointing: "bg-gradient-to-br from-ctp-sapphire to-ctp-sky",
  helpful: "bg-gradient-to-br from-ctp-green to-ctp-teal",
  default: "bg-gradient-to-br from-ctp-blue to-ctp-lavender",
  scholarly: "bg-gradient-to-br from-ctp-sapphire to-ctp-blue",
  insightful: "bg-gradient-to-br from-ctp-yellow to-ctp-peach",
  contemplative: "bg-gradient-to-br from-ctp-mauve to-ctp-pink",
  curious: "bg-gradient-to-br from-ctp-sky to-ctp-blue",
  analytical: "bg-gradient-to-br from-ctp-teal to-ctp-green",
};
