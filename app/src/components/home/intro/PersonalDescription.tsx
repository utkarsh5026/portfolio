import React from "react";

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
  return (
    <div className="mb-8 text-[#bac2de] p-6 border-l-4 border-ctp-peach bg-gradient-to-br from-[#1e1e2e]/80 to-[#1e1e2e]/60 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
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
