import { TourStepType, TourStep } from "../context/TourType";

export const guideEmotions: Record<TourStep, string> = {
  [TourStepType.WELCOME]: "excited",
  [TourStepType.ABOUT]: "friendly",
  [TourStepType.SKILLS]: "proud",
  [TourStepType.PROJECTS]: "excited",
  [TourStepType.EXPERIENCE]: "professional",
  [TourStepType.CONTACT]: "friendly",
  [TourStepType.THANK_YOU]: "grateful",
  [TourStepType.ARTICLES]: "excited",
  [TourStepType.LEARNING]: "excited",
} as const;

export const emotionConfig = {
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
} as const;

export const guideMessages = {
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
    "Here are some of the articles I've written. I hope you find them useful!",
  [TourStepType.LEARNING]:
    "I'm always learning new things. Here are some of my favorite resources.",
  [TourStepType.CONTACT]:
    "I'd love to connect! Feel free to reach out through any of these channels.",
  [TourStepType.THANK_YOU]:
    "Thank you for taking the time to explore my portfolio! I hope you enjoyed the tour.",
} as const;

export type Emotion = keyof typeof emotionConfig;
