import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-ctp-text via-ctp-text to-ctp-subtext0",
  h2: "text-2xl md:text-3xl font-bold tracking-tight text-ctp-text transition-colors duration-300",
  h3: "text-xl md:text-2xl font-bold text-ctp-text tracking-tight flex items-center gap-2",
  h4: "text-sm md:text-base font-bold text-ctp-mauve tracking-widest uppercase",
  h5: "text-sm font-semibold text-ctp-subtext0 tracking-wide uppercase",
  h6: "text-xs font-semibold text-ctp-overlay0 tracking-widest uppercase",
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

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

type TextTag = "p" | "span" | "label" | "small" | "strong" | "em" | "div";

type TextVariant = "body" | "subtitle" | "caption" | "muted" | "lead";

const textStyles: Record<TextVariant, string> = {
  body: "text-base md:text-lg text-ctp-subtext0 leading-relaxed md:leading-loose font-medium",
  lead: "text-lg md:text-xl text-ctp-subtext1 leading-relaxed font-medium",
  subtitle: "text-sm md:text-base text-ctp-subtext1 font-medium tracking-wide",
  caption: "text-xs text-ctp-overlay0 font-medium tracking-wide",
  muted: "text-sm text-ctp-overlay1 font-normal",
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
