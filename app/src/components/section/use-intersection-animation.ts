import { useState, useEffect, RefObject } from "react";
import anime from "animejs";

export const useIntersectionAnimation = (
  sectionRef: RefObject<HTMLDivElement>,
  label: string,
  glowAccent: string
) => {
  const [isActive, setIsActive] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            runEntranceAnimations();
            // Calculate title width when section becomes visible
            calculateTitleWidth();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Reduced threshold to trigger earlier
    );

    observer.observe(section);

    // Main animation sequence when section becomes visible
    const runEntranceAnimations = () => {
      // Animate section entrance with code-like scanning effect
      anime({
        targets: section,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: "easeOutExpo",
      });
    };

    // Calculate title width for typing animation
    const calculateTitleWidth = () => {
      // Create a temporary element to measure the text width
      const tempElement = document.createElement("span");
      tempElement.style.visibility = "hidden";
      tempElement.style.position = "absolute";
      tempElement.style.whiteSpace = "nowrap";
      tempElement.style.fontFamily = "inherit";
      tempElement.style.fontSize = "1rem"; // Adjust as needed to match your font size
      tempElement.style.fontWeight = "500"; // Match your font-medium class
      tempElement.innerText = label;

      document.body.appendChild(tempElement);
      const width = tempElement.offsetWidth;
      document.body.removeChild(tempElement);

      // Add a small buffer for better appearance
      setTitleWidth(width + 10);
    };

    return () => observer.disconnect();
  }, [sectionRef, label, glowAccent]);

  return { isActive, titleWidth };
};

export default useIntersectionAnimation;
