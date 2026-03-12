import React from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-ctp-text",
  h2: "text-2xl md:text-3xl font-bold tracking-tight text-ctp-text",
  h3: "text-lg sm:text-xl md:text-2xl font-bold text-ctp-text tracking-tight",
  h4: "text-sm sm:text-base md:text-lg font-bold text-ctp-text",
  h5: "text-sm font-semibold text-ctp-subtext0",
  h6: "text-xs font-semibold text-ctp-overlay0",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Tag = "h2",
  className,
  children,
  ...props
}) => (
  <Tag className={cn(headingStyles[Tag], className)} {...props}>
    {children}
  </Tag>
);

type TextTag = "p" | "span" | "label" | "small" | "strong" | "em" | "div";

type TextVariant = "lead" | "subtitle" | "body" | "caption" | "muted";

const textStyles: Record<TextVariant, string> = {
  lead: "text-sm sm:text-base md:text-lg text-ctp-subtext0 leading-relaxed font-medium",
  subtitle: "text-sm sm:text-base text-ctp-subtext1 font-medium",
  body: "text-xs sm:text-sm md:text-base text-ctp-subtext0 leading-relaxed font-medium",
  caption: "text-xs sm:text-sm text-ctp-subtext0 font-medium",
  muted: "text-xs text-ctp-overlay1 font-normal",
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextTag;
  variant?: TextVariant;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as: Tag = "p",
  variant = "body",
  className,
  children,
  ...props
}) => (
  <Tag
    className={cn(textStyles[variant], className)}
    {...(props as React.HTMLAttributes<HTMLElement>)}
  >
    {children}
  </Tag>
);
