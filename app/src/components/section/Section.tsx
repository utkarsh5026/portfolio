import React, { useRef } from "react";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { getIcon } from "./sec-utils";

interface SectionProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  icon?:
    | "terminal"
    | "code"
    | "debug"
    | "class"
    | "api"
    | "database"
    | "server"
    | "magic";
  scanlines?: boolean;
}

/**
 * Enhanced Section component with coding-themed effects
 *
 * Features:
 * - Terminal/code editor aesthetics with line numbers & command prompt
 * - Matrix-style falling code animation
 * - CRT scanline effect
 * - Animated glowing accents using Catppuccin colors
 * - Typing animation on section title
 * - Dynamic blur effects in background
 */
const Section: React.FC<SectionProps> = ({
  id,
  label,
  className = "",
  children,
  icon = "code",
  scanlines = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <OutlineNode id={id} label={label} level={0} icon={getIcon(icon)}>
      <div
        ref={sectionRef}
        id={id}
        className={`${id}-section relative  ${className}`}
      >
        <div className="rounded-lg shadow-lg bg-ctp-mantle border-none overflow-auto relative">
          {scanlines && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.5) 1px, rgba(0, 0, 0, 0.5) 2px)",
                  backgroundSize: "100% 2px",
                }}
              ></div>
            </div>
          )}

          <div className="flex relative">
            <div ref={contentRef} className="p-5 flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </OutlineNode>
  );
};

export default Section;
