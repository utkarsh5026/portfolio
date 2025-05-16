import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  RevealEffect,
  Direction,
} from "@/components/animations/reveal/effects";

interface AboutSectionTemplateProps {
  children: React.ReactNode;
  className?: string;
  effect?: RevealEffect;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

/**
 * A template component for sections in the About Me page
 * This creates a consistent structure with reveal animations
 */
export const AboutSectionTemplate: React.FC<AboutSectionTemplateProps> = ({
  children,
  className,
  effect = "fade-up",
  direction = "up",
  delay = 0.2,
  duration = 0.7,
}) => {
  return (
    <Reveal
      effect={effect}
      direction={direction}
      delay={delay}
      duration={duration}
      className={className}
    >
      <div className="p-4">{children}</div>
    </Reveal>
  );
};

interface AboutSectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  accentColor: string;
}

/**
 * Consistent header component for About sections
 * Displays an icon, title, and colored accent bar
 */
export const AboutSectionHeader: React.FC<AboutSectionHeaderProps> = ({
  icon,
  title,
  accentColor,
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className={`bg-ctp-${accentColor} w-2 h-8 mr-3 rounded-full`}></div>
      <h3
        className={`text-ctp-${accentColor} font-semibold text-xl flex items-center`}
      >
        {React.cloneElement(icon as React.ReactElement, { className: "mr-2" })}
        {title}
      </h3>
    </div>
  );
};

interface AboutSectionContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container for the content of About sections
 * Provides consistent spacing and styling
 */
export const AboutSectionContent: React.FC<AboutSectionContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn("text-ctp-text ml-5", className)}>{children}</div>;
};

interface AboutCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * A styled card component for About sections
 * Provides consistent styling with optional hover effects
 */
export const AboutCard: React.FC<AboutCardProps> = ({
  children,
  className,
  hover = true,
}) => {
  return (
    <Card
      className={cn(
        "bg-ctp-crust border-none",
        hover && "hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
};
