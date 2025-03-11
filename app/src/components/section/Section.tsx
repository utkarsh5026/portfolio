import React, { useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import MatrixEffect from "@/components/animations/MatrixEffect";
import BlurBackground from "./BlurBackground";
import SectionFooter from "./SectionFooter";
import useIntersectionAnimation from "./use-intersection-animation";
import anime from "animejs";
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
  glowAccent?: "green" | "blue" | "red" | "yellow" | "pink" | "mauve";
  matrix?: boolean;
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
  glowAccent = "blue",
  matrix = false,
  scanlines = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isActive, titleWidth } = useIntersectionAnimation(
    id,
    sectionRef,
    label,
    glowAccent
  );

  useEffect(() => {
    if (isActive && contentRef.current) {
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 800,
        easing: "easeOutExpo",
        delay: 800,
      });
    }
  }, [isActive]);

  return (
    <OutlineNode id={id} label={label} level={0} icon={getIcon(icon)}>
      <div
        ref={sectionRef}
        id={id}
        className={`${id}-section relative opacity-0 ${className}`}
      >
        <div className="rounded-lg shadow-lg bg-ctp-base border border-ctp-surface0 overflow-hidden relative">
          {/* Matrix effect canvas */}
          {matrix && (
            <MatrixEffect
              isActive={isActive}
              glowAccent={glowAccent}
              icon={icon}
            />
          )}

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

          <BlurBackground isActive={isActive} glowAccent={glowAccent} />

          <SectionHeader
            icon={icon}
            label={label}
            isActive={isActive}
            titleWidth={titleWidth}
          />

          <div className="flex relative z-10">
            <div
              ref={contentRef}
              className="p-5 opacity-0 flex-1 overflow-hidden"
            >
              {children}
            </div>
          </div>

          <SectionFooter label={label} glowAccent={glowAccent} />
        </div>
      </div>
    </OutlineNode>
  );
};

export default Section;
