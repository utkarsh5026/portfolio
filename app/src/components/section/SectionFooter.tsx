import React from "react";
import { FaCircle, FaCheck } from "react-icons/fa";

interface SectionFooterProps {
  label: string;
  glowAccent: string;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({
  label,
  glowAccent,
}) => {
  // Accent color mapping for footer indicator
  const accentColorClass =
    {
      green: "text-ctp-green",
      blue: "text-ctp-blue",
      red: "text-ctp-red",
      yellow: "text-ctp-yellow",
      pink: "text-ctp-pink",
      mauve: "text-ctp-mauve",
    }[glowAccent] ?? "text-ctp-blue";

  return (
    <div className="bg-ctp-mantle text-xs border-t border-ctp-surface0 text-ctp-subtext0 flex justify-between px-3 py-1 relative z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <FaCheck className={accentColorClass} />
          <span>{label.toLowerCase().replace(/\s/g, "-")}.tsx</span>
        </div>
        <div>TypeScript</div>
      </div>
      <div className="flex items-center gap-2">
        <span>Lines: 120</span>
        <span>Size: 4.2KB</span>
        <FaCircle className={`${accentColorClass} text-[8px]`} />
      </div>
    </div>
  );
};

export default SectionFooter;
