import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  delay?: number;
}

const FloatingElementComponent: React.FC<FloatingElementProps> = ({
  children,
  intensity = "medium",
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const intensityValues = {
      low: { distance: 5, duration: 3000 },
      medium: { distance: 10, duration: 4000 },
      high: { distance: 15, duration: 5000 },
    };

    const config = intensityValues[intensity] || intensityValues.medium;

    const randomOffset = Math.random() * 1000;

    const animation = anime({
      targets: element,
      translateY: [
        { value: config.distance * -1, duration: config.duration },
        { value: 0, duration: config.duration },
      ],
      translateX: [
        { value: config.distance * 0.5, duration: config.duration * 0.8 },
        { value: config.distance * -0.5, duration: config.duration * 1.2 },
        { value: 0, duration: config.duration * 1 },
      ],
      rotate: [
        { value: 1, duration: config.duration * 1.2 },
        { value: -1, duration: config.duration * 1.8 },
        { value: 0, duration: config.duration * 0.8 },
      ],
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
      delay: delay + randomOffset,
    });

    return () => {
      animation.pause();
    };
  }, [intensity, delay]);

  return (
    <div ref={elementRef} className="inline-block">
      {children}
    </div>
  );
};

const FloatingElement = React.memo(FloatingElementComponent);
export default FloatingElement;
