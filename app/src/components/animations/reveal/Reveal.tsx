import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Reveal.module.css";
import {
  type RevealEffect,
  type Direction,
  getDurationClass,
  getDelayClass,
  getClassForEffect,
} from "./effects";

interface RevealProps {
  children: React.ReactNode;
  effect?: RevealEffect;
  direction?: Direction;
  duration?: number;
  delay?: number;
  threshold?: number;
  staggerChildren?: number;
  cascade?: boolean;
  damping?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveal component using CSS Modules with keyframe animations
 *
 * Uses Intersection Observer for triggering CSS animations when elements come into view.
 * Supports a variety of simple transform animations as well as complex keyframe animations.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  effect = "fade-up",
  direction = "up",
  duration = 0.7,
  delay = 0,
  threshold = 0.1,
  staggerChildren = 0.08,
  cascade = false,
  damping = 20,
  once = true,
  className = "",
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    rootMargin: "-50px 0px",
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [inView, once]);

  const getAnimationClasses = () => {
    const classes = [styles.animated];

    classes.push(getClassForEffect(effect, direction));
    classes.push(getDelayClass(delay));
    classes.push(getDurationClass(duration));

    if (damping < 15 && !isKeyframeAnimation(effect))
      classes.push(styles.spring);
    else classes.push(styles.eased);

    if (cascade) classes.push(styles.cascade);
    if (isVisible) classes.push(styles.visible);

    return classes.join(" ");
  };

  const isKeyframeAnimation = (effect: RevealEffect): boolean => {
    return [
      "fade-through",
      "ripple-in",
      "swing-in",
      "spotlight-in",
      "bounce-in",
      "flip-in",
      "fold-unfold",
      "split-pieces",
      "glitch-in",
      "typewriter",
    ].includes(effect);
  };

  const combinedClassName = `${getAnimationClasses()} ${className}`;

  const customStyle = {
    ...style,
    "--stagger-delay": `${staggerChildren * 1000}ms`,
    "--random-x": cascade ? "0px" : `${(Math.random() - 0.5) * 20}px`,
    "--random-y": cascade ? "0px" : `${(Math.random() - 0.5) * 20}px`,
    "--random-angle": cascade ? "0deg" : `${(Math.random() - 0.5) * 10}deg`,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={combinedClassName} style={customStyle}>
      {children}
    </div>
  );
};

export default Reveal;
