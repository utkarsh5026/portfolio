import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import React from "react";
import { background } from "./data";

/**
 * Background Component
 *
 * This component displays the background information of the user in a visually appealing manner.
 * It utilizes Framer Motion for animations, providing a smooth entrance effect.
 *
 * The component includes:
 * - A title with an icon indicating the section is about background.
 * - A list of paragraphs that describe the user's background.
 * - Decorative elements to enhance the visual presentation of the background information.
 *
 * Usage:
 * <Background />
 *
 * Note: Ensure that the 'background' array is defined and contains the relevant data.
 */
const Background: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded-lg bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244]/50 shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] w-2 h-8 mr-3 rounded-full"></div>
        <h3 className="text-[#cba6f7] font-semibold text-xl flex items-center">
          <FaCode className="mr-2" /> Background
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 leading-relaxed">
        <div className="bg-[#313244]/30 p-5 rounded-lg border-l-2 border-[#cba6f7]/50 space-y-4">
          {background.map((paragraph) => (
            <p key={paragraph} className="text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Background;
