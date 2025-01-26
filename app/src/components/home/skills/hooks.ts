import { RefObject, useCallback, useRef, useState } from "react";
import anime from "animejs";

/**
 * Custom hook to manage the animation of a skill card element.
 *
 * @param {RefObject<HTMLDivElement>} elementRef - A reference to the HTML div element that contains the skills.
 *
 * This hook provides three functions to control the animation:
 *
 * 1. **startAnimation**: Starts the animation of the skill card. If the animation is not already created, it will create it first.
 *
 * 2. **stopAnimation**: Pauses the currently running animation.
 *
 * 3. **updateAnimation**: Stops the current animation, recreates it based on the current content width, and then starts it again.
 *
 * The animation is created using the anime.js library, which allows for smooth and customizable animations. The animation will translate the skill card horizontally across the screen in a loop.
 */
export const useSkillAnimation = (elementRef: RefObject<HTMLDivElement>) => {
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  const createAnimation = useCallback(() => {
    if (!elementRef.current) return null;

    const contentWidth = elementRef.current.scrollWidth / 2;
    const duration = Math.max(20000, contentWidth * 50);

    return anime({
      targets: elementRef.current,
      translateX: [0, -contentWidth],
      duration,
      easing: "linear",
      loop: true,
      autoplay: false,
    });
  }, [elementRef]);

  const startAnimation = useCallback(() => {
    if (!animationRef.current) {
      animationRef.current = createAnimation();
    }
    animationRef.current?.play();
  }, [createAnimation]);

  const stopAnimation = useCallback(() => {
    animationRef.current?.pause();
  }, []);

  const updateAnimation = useCallback(() => {
    stopAnimation();
    animationRef.current = createAnimation();
    startAnimation();
  }, [createAnimation, startAnimation, stopAnimation]);

  return {
    startAnimation,
    stopAnimation,
    updateAnimation,
  };
};

/**
 * Custom hook to clone child elements of a given reference element.
 *
 * @param {RefObject<HTMLDivElement>} elementRef - A reference to the HTML div element that contains the skills.
 *
 * This hook provides the following:
 *
 * - **isInitialized**: A boolean state indicating whether the clones have been initialized.
 * - **initializeClones**: A function that clones the child elements of the referenced element and appends them to the same element.
 *
 * The cloning process is done only once to prevent unnecessary duplication. The cloned elements are added to the DOM using a document fragment for performance optimization.
 */
export const useCloneElements = (elementRef: RefObject<HTMLDivElement>) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeClones = useCallback(() => {
    if (!elementRef.current || isInitialized) return;

    const element = elementRef.current;
    const itemsToClone = Array.from(element.children);

    const fragment = document.createDocumentFragment();
    itemsToClone.forEach((item) => {
      const clone = item.cloneNode(true);
      fragment.appendChild(clone);
    });

    element.appendChild(fragment);
    setIsInitialized(true);
  }, [isInitialized, elementRef]);

  return { isInitialized, initializeClones };
};
