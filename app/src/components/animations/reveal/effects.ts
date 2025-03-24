import styles from "./Reveal.module.css";

/**
 * Enum for defining the types of reveal effects available.
 *
 * @enum {string}
 * @property {"fade-up"} fade-up - Effect where the element fades in from the bottom.
 * @property {"zoom-in"} zoom-in - Effect where the element zooms in from a small size.
 * @property {"slide-in"} slide-in - Effect where the element slides in from a specified direction.
 * @property {"blur-in"} blur-in - Effect where the element blurs in from a blurry state.
 * @property {"rise"} rise - Effect where the element rises from the bottom.
 * @property {"unfold"} unfold - Effect where the element unfolds from a compact state.
 * @property {"glide"} glide - Effect where the element glides in from a specified direction.
 * @property {"emerge"} emerge - Effect where the element emerges from a hidden state.
 * @property {"assemble"} assemble - Effect where the element assembles from its parts.
 * @property {"cascade"} cascade - Effect where the element cascades in from the top.
 * @property {"fade-through"} fade-through - Effect where the element fades in through a transparent state.
 * @property {"ripple-in"} ripple-in - Effect where the element ripples in from the center.
 * @property {"swing-in"} swing-in - Effect where the element swings in from a specified direction.
 * @property {"spotlight-in"} spotlight-in - Effect where the element is spotlighted in from a dark state.
 * @property {"bounce-in"} bounce-in - Effect where the element bounces in from a specified direction.
 * @property {"flip-in"} flip-in - Effect where the element flips in from a specified direction.
 * @property {"fold-unfold"} fold-unfold - Effect where the element folds and unfolds into its final state.
 * @property {"split-pieces"} split-pieces - Effect where the element splits into pieces and then reassembles.
 * @property {"glitch-in"} glitch-in - Effect where the element glitches in from a distorted state.
 * @property {"typewriter"} typewriter - Effect where the element types in like a typewriter.
 */
export type RevealEffect =
  | "fade-up"
  | "zoom-in"
  | "slide-in"
  | "blur-in"
  | "rise"
  | "unfold"
  | "glide"
  | "emerge"
  | "assemble"
  | "cascade"
  | "fade-through"
  | "ripple-in"
  | "swing-in"
  | "spotlight-in"
  | "bounce-in"
  | "flip-in"
  | "fold-unfold"
  | "split-pieces"
  | "glitch-in"
  | "typewriter";

/**
 * Enum for defining the direction of the reveal effect.
 *
 * @enum {string}
 * @property {"left"} left - Direction from the left.
 * @property {"right"} right - Direction from the right.
 * @property {"up"} up - Direction from the top.
 * @property {"down"} down - Direction from the bottom.
 */
export type Direction = "left" | "right" | "up" | "down";

/**
 * Function to determine the duration class based on the duration time.
 *
 * @param {number} duration - The duration time in seconds.
 * @returns {string} The class name corresponding to the duration.
 */
export const getDurationClass = (duration: number): string => {
  if (duration <= 0.3) return styles["duration-300"];
  else if (duration <= 0.5) return styles["duration-500"];
  else if (duration <= 0.7) return styles["duration-700"];
  else if (duration <= 1) return styles["duration-1000"];
  else if (duration <= 1.5) return styles["duration-1500"];
  else return styles["duration-2000"];
};

/**
 * Function to determine the delay class based on the delay time.
 *
 * @param {number} delay - The delay time in seconds.
 * @returns {string} The class name corresponding to the delay.
 */
export const getDelayClass = (delay: number): string => {
  if (delay === 0) return styles["delay-0"];
  else if (delay <= 0.1) return styles["delay-100"];
  else if (delay <= 0.2) return styles["delay-200"];
  else if (delay <= 0.3) return styles["delay-300"];
  else if (delay <= 0.5) return styles["delay-500"];
  else if (delay <= 0.7) return styles["delay-700"];
  else return styles["delay-1000"];
};

/**
 * Function to determine the class for a given reveal effect and direction.
 *
 * @param {RevealEffect} effect - The type of reveal effect.
 * @param {Direction} direction - The direction of the reveal effect.
 * @returns {string} The class name corresponding to the effect and direction.
 */
export const getClassForEffect = (
  effect: RevealEffect,
  direction: Direction
): string => {
  switch (effect) {
    case "fade-up":
      return styles.fadeUp;
    case "zoom-in":
      return styles.zoomIn;
    case "slide-in":
      if (direction === "left") return styles.slideInLeft;
      else if (direction === "right") return styles.slideInRight;
      else if (direction === "up") return styles.slideInUp;
      else return styles.slideInDown;
    case "blur-in":
      return styles.blurIn;
    case "rise":
      return styles.rise;
    case "unfold":
      return styles.unfold;
    case "glide":
      if (direction === "left") return styles.glideLeft;
      else return styles.glideRight;
    case "emerge":
      return styles.emerge;
    case "assemble":
      return styles.assemble;
    case "cascade":
      return styles.cascade;

    case "fade-through":
      return styles.fadeThrough;
    case "ripple-in":
      return styles.rippleIn;
    case "swing-in":
      return styles.swingIn;
    case "spotlight-in":
      return styles.spotlightIn;
    case "bounce-in":
      return styles.bounceIn;
    case "flip-in":
      return styles.flipIn;
    case "fold-unfold":
      return styles.foldUnfold;
    case "split-pieces":
      return styles.splitPieces;
    case "glitch-in":
      return styles.glitchIn;
    case "typewriter":
      return styles.typewriter;
    default:
      return styles.fadeUp;
  }
};
