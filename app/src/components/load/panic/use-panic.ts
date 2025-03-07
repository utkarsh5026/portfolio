import { useMemo, useState } from "react";

export type PanicState =
  | "setup"
  | "research"
  | "coding"
  | "assistance"
  | "commands";

const usePanic = () => {
  const [panicPhase, setPanicPhase] = useState<PanicState>("setup");

  const bgClass = useMemo(() => {
    switch (panicPhase) {
      case "setup":
        return "bg-[#1e1e2e]";
      case "research":
        return "bg-[#1e1e32]";
      case "coding":
        return "bg-[#1e1e38]";
      case "assistance":
        return "bg-[#2a1e2e]";
      case "commands":
        return "bg-[#2e1e28]";
      default:
        return "bg-[#1e1e2e]";
    }
  }, [panicPhase]);

  const { stressLevelClass, stressLevel } = useMemo(() => {
    switch (panicPhase) {
      case "setup":
        return {
          stressLevelClass: "w-[30%]",
          stressLevel: "Stress Level: Low",
        };
      case "research":
        return {
          stressLevelClass: "w-[50%]",
          stressLevel: "Stress Level: Moderate",
        };
      case "coding":
        return {
          stressLevelClass: "w-[75%]",
          stressLevel: "Stress Level: High",
        };
      case "assistance":
        return {
          stressLevelClass: "w-[90%]",
          stressLevel: "Stress Level: Critical",
        };
      case "commands":
        return {
          stressLevelClass: "w-[98%] animate-pulse",
          stressLevel: "Stress Level: EXTREME",
        };
    }
  }, [panicPhase]);

  const { timeLeftClass, timeLeft } = useMemo(() => {
    switch (panicPhase) {
      case "setup":
        return { timeLeftClass: "00:15", timeLeft: "Time Left: 15 seconds" };
      case "research":
        return { timeLeftClass: "00:10", timeLeft: "Time Left: 10 seconds" };
      case "coding":
        return { timeLeftClass: "00:05", timeLeft: "Time Left: 5 seconds" };
      case "assistance":
        return { timeLeftClass: "00:03", timeLeft: "Time Left: 3 seconds" };
      case "commands":
        return { timeLeftClass: "00:01", timeLeft: "Time Left: 1 second" };
    }
  }, [panicPhase]);

  return {
    panicPhase,
    setPanicPhase,
    bgClass,
    stressLevel,
    stressLevelClass,
    timeLeft,
    timeLeftClass,
  };
};

export default usePanic;
