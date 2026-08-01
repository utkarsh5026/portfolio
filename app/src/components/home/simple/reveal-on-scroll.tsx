import React, { useRef } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

import styles from "./simple.module.css";

interface RevealOnScrollProps {
  children: React.ReactNode;
  /** Stagger, in seconds, applied as a transition delay. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Fades content up the first time it scrolls into view.
 *
 * Deliberately tiny — the simple view is meant to feel calm, so the only
 * motion on the page is this single fade and a couple of hover transitions.
 */
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={cn(styles.reveal, inView && styles.revealVisible, className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default RevealOnScroll;
