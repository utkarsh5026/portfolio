import React from "react";

import { cn } from "@/lib/utils";

type IconBoxSize = "xs" | "sm" | "md" | "lg";

const sizeClasses: Record<IconBoxSize, string> = {
  xs: "p-1.5 sm:p-2 rounded-lg sm:rounded-xl",
  sm: "p-2 sm:p-2.5 rounded-lg sm:rounded-xl",
  md: "p-2.5 sm:p-3 rounded-xl sm:rounded-2xl",
  lg: "p-3 sm:p-3.5 rounded-xl sm:rounded-2xl",
};

interface IconBoxProps {
  /** Catppuccin color token name, e.g. "blue", "mauve", "peach" */
  color: string;
  /** Size preset (default "sm") */
  size?: IconBoxSize;
  /** Additional classes merged via cn() */
  className?: string;
  children: React.ReactNode;
}

/**
 * Rounded, tinted icon container used across cards and section headers.
 *
 * @example
 * <IconBox color="blue" size="sm">
 *   <Code className="w-4 h-4 sm:w-5 sm:h-5" />
 * </IconBox>
 */
const IconBox: React.FC<IconBoxProps> = ({
  color,
  size = "sm",
  className,
  children,
}) => (
  <div
    className={cn(
      sizeClasses[size],
      `bg-ctp-${color}/10 text-ctp-${color} flex-shrink-0`,
      className
    )}
  >
    {children}
  </div>
);

export default IconBox;
