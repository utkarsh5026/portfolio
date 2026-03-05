import React from "react";

import { cn } from "@/lib/utils";

type SketchColor =
  | "mauve"
  | "pink"
  | "blue"
  | "green"
  | "teal"
  | "lavender"
  | "red"
  | "yellow"
  | "peach"
  | "sky"
  | "sapphire"
  | "flamingo"
  | "maroon"
  | "rosewater";

interface SketchBorderProps {
  children: React.ReactNode;
  className?: string;
  /** Color of the outermost border */
  primaryColor?: SketchColor;
  /** Color of the middle border */
  secondaryColor?: SketchColor;
  /** Color of the innermost border (defaults to primaryColor at lower opacity) */
  tertiaryColor?: SketchColor;
  /** Opacity of the primary border (0–100) */
  primaryOpacity?: number;
  /** Opacity of the secondary border (0–100) */
  secondaryOpacity?: number;
  /** Opacity of the tertiary border (0–100) */
  tertiaryOpacity?: number;
  /** Base rotation magnitude in degrees — each layer alternates direction */
  rotation?: number;
  /** Whether to add a subtle scale on group hover */
  hoverScale?: boolean;
}

// Three distinct wobbly radius variants so each layer looks different
const borderRadiusVariants = [
  "255px 15px 225px 15px/15px 225px 15px 255px",
  "15px 225px 15px 255px/255px 15px 225px 15px",
  "225px 15px 255px 25px/25px 255px 15px 225px",
] as const;

/**
 * SketchBorder — renders THREE rotated, wobbly-radius borders to mimic the
 * hand-drawn Excalidraw aesthetic. Each layer uses a different radius shape
 * and alternating rotation so they never stack cleanly.
 *
 * The wrapper gains a Tailwind `group` class so nested `group-hover:`
 * utilities animate all three layers on hover.
 */
const SketchBorder: React.FC<SketchBorderProps> = ({
  children,
  className,
  primaryColor = "mauve",
  secondaryColor = "pink",
  tertiaryColor,
  primaryOpacity = 40,
  secondaryOpacity = 30,
  tertiaryOpacity = 20,
  rotation = 0.5,
  hoverScale = false,
}) => {
  const r = rotation;

  return (
    <div
      className={cn(
        "relative group overflow-visible",
        hoverScale && "group-hover:scale-[1.01]",
        className,
      )}
    >
      {/* Border layers — desktop only */}
      <div className="hidden md:contents">
        {/* Layer 1 — outermost, negative rotation */}
        <div
          className={cn(
            "absolute inset-[-5px] border-[2px] transition-all duration-500 pointer-events-none z-0",
            `border-ctp-${primaryColor}/${primaryOpacity}`,
          )}
          style={{
            borderRadius: borderRadiusVariants[0],
            transform: `rotate(-${r}deg)`,
          }}
        />

        {/* Layer 2 — middle, positive rotation (slightly larger magnitude) */}
        <div
          className={cn(
            "absolute inset-[-2px] border-[2px] transition-all duration-500 pointer-events-none z-0",
            `border-ctp-${secondaryColor}/${secondaryOpacity}`,
          )}
          style={{
            borderRadius: borderRadiusVariants[1],
            transform: `rotate(${r * 1.4}deg)`,
          }}
        />

        {/* Layer 3 — innermost, slight negative rotation */}
        <div
          className={cn(
            "absolute inset-[1px] border-[1.5px] transition-all duration-500 pointer-events-none z-0",
            `border-ctp-${tertiaryColor ?? primaryColor}/${tertiaryOpacity}`,
          )}
          style={{
            borderRadius: borderRadiusVariants[2],
            transform: `rotate(-${r * 0.6}deg)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SketchBorder;
