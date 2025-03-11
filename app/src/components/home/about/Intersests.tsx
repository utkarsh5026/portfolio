import { motion } from "framer-motion";
import React from "react";
import { FaBook } from "react-icons/fa";

const interests = {
  technical: [
    "Reading code of open-source projects",
    "Experimenting with new programming languages",
    "Exploring AI/ML applications in web development",
    "Reading technical blogs and papers",
    "Dissecting Chrome's DevTools of some popular websites",
  ],
  nonTechnical: [
    "Watching Virat Kohli's batting",
    "Exploring new Music",
    "Going to Gym",
    "Playing PES (Pro Evolution Soccer) ⚽",
  ],
} as const;

/**
 * InterestsHobbies Component
 *
 * This component displays a list of personal interests and hobbies.
 * It is animated using Framer Motion to fade in and slide up when rendered.
 *
 * The component is structured as follows:
 * - A container that holds the title and the list of interests.
 * - Interests are categorized into technical and non-technical sections.
 * - Each category is displayed with a title and a list of items.
 *
 * Usage:
 * <InterestsHobbies />
 *
 * Note: Ensure that the 'interests' object is defined and contains the relevant data.
 */
const InterestsHobbies: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="p-4 rounded-lg bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244]/50 shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="bg-ctp-green w-2 h-8 mr-3 rounded-full"></div>
        <h3 className="text-ctp-green font-semibold text-xl flex items-center">
          <FaBook className="mr-2" /> Interests & Hobbies
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 flex flex-col gap-4">
        <p className="mb-3 text-[#bac2de]">
          When I'm not coding, you can find me engaged in various activities
          that keep me balanced and inspired:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(interests).map(([category, items]) => (
            <div
              key={category}
              className="bg-ctp-mantle p-4 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="font-medium text-ctp-green mb-3 text-lg border-b border-ctp-green/30 pb-2">
                {category
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
              <ul className="list-disc ml-5 space-y-2">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-ctp-text bg-[#313244]/20 p-3 rounded-md border-l-2 border-ctp-green">
          I'm always looking to connect with like-minded professionals for
          collaborations and knowledge exchange. Feel free to reach out!
        </p>
      </div>
    </motion.div>
  );
};

export default InterestsHobbies;
