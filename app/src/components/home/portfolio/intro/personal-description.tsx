import React from "react";
import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const texts = [
  "Passionate developer with a knack for crafting elegant solutions to complex problems.",
  "I specialize in building scalable web applications and robust infrastructure systems that deliver exceptional user experiences.",
  "With expertise spanning front-end aesthetics to back-end architecture, I bridge the gap between user needs and technical implementation.",
];

/**
 * PersonalDescription Component
 *
 * This component displays a personal description in a styled motion div.
 * It utilizes Framer Motion for animations and is designed to be visually appealing
 * with a responsive layout.
 */
const PersonalDescription: React.FC = () => {
  const { isMobile } = useMobile();

  return (
    <div
      className={cn(
        "mb-8 text-ctp-text p-6  bg-gradient-to-br from-ctp-mantle to-ctp-crust rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-2xl",
        !isMobile && "border-ctp-peach border-l-4"
      )}
    >
      {texts.map((text, index) => (
        <p
          key={text}
          className={`mb-4 leading-relaxed`}
          style={{
            textShadow: index === 0 ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
            animation: `fadeIn ${0.5 + index * 0.2}s ease-out`,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default PersonalDescription;
