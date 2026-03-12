import { LucideIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import IconBox from "./icon-box";

interface IconCardProps {
  icon: LucideIcon;
  /** Catppuccin color token, e.g. "blue", "green", "peach" */
  color: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card with a colored IconBox + title header above arbitrary children.
 *
 * @example
 * <IconCard icon={Code} color="green" title="Technical Interests">
 *   <ul>...</ul>
 * </IconCard>
 */
const IconCard: React.FC<IconCardProps> = ({
  icon: Icon,
  color,
  title,
  className,
  children,
}) => (
  <div
    className={cn(
      "relative bg-ctp-surface0/20 rounded-xl sm:rounded-2xl overflow-hidden h-full",
      className
    )}
  >
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
        <IconBox color={color}>
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </IconBox>
        <h4 className="text-sm sm:text-base md:text-lg font-bold text-ctp-text leading-tight break-words min-w-0 flex-1">
          {title}
        </h4>
      </div>
      {children}
    </div>
  </div>
);

export default IconCard;
