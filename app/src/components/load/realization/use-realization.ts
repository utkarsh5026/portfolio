import { useMemo,useState } from "react";

type RealizationStage = "working" | "notice" | "alarm" | "panic";

const useRealization = () => {
  const [stage, setStage] = useState<RealizationStage>("working");

  const sceneBackgroundColor = useMemo(() => {
    switch (stage) {
      case "notice":
        return "bg-[#1e2035]";
      case "alarm":
        return "bg-[#2a1e2e]";
      case "panic":
        return "bg-[#2e1e28]";
      default:
        return "bg-[#1e1e2e]";
    }
  }, [stage]);

  const { emojiClass, emoji } = useMemo(() => {
    switch (stage) {
      case "notice":
        return {
          emojiClass: "scale-110 animate-none bg-[rgba(249,226,175,0.1)]",
          emoji: "🧐",
        };
      case "alarm":
        return {
          emojiClass: "scale-125 bg-[rgba(243,139,168,0.1)]",
          emoji: "😳",
        };
      case "panic":
        return {
          emojiClass: "scale-150 bg-[rgba(235,50,80,0.2)] animate-pulse",
          emoji: "😱",
        };
      default:
        return { emojiClass: "scale-100", emoji: "😌" };
    }
  }, [stage]);

  return { stage, setStage, sceneBackgroundColor, emojiClass, emoji };
};

export default useRealization;
