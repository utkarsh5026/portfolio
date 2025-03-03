import React, { useMemo } from "react";

interface BlurBackgroundProps {
  isActive: boolean;
  glowAccent: string;
}

export const BlurBackground: React.FC<BlurBackgroundProps> = ({
  isActive,
  glowAccent,
}) => {
  const glowColor = useMemo(() => {
    switch (glowAccent) {
      case "green":
        return "rgba(166, 227, 161, 0.2)";
      case "blue":
        return "rgba(137, 180, 250, 0.2)";
      case "red":
        return "rgba(243, 139, 168, 0.2)";
      case "yellow":
        return "rgba(249, 226, 175, 0.2)";
      case "pink":
        return "rgba(245, 194, 231, 0.2)";
      case "mauve":
        return "rgba(203, 166, 247, 0.2)";
      default:
        return "rgba(137, 180, 250, 0.2)";
    }
  }, [glowAccent]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Animated blurs */}
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl opacity-10"
        style={{
          backgroundColor: glowColor,
          top: "20%",
          left: "30%",
          animation: "pulse 10s infinite alternate",
        }}
      ></div>
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{
          backgroundColor: glowColor,
          bottom: "10%",
          right: "20%",
          animation: "pulse 8s infinite alternate-reverse",
        }}
      ></div>
    </div>
  );
};

export default BlurBackground;
