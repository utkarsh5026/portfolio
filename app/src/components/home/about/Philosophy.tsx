import { motion } from "framer-motion";
import React from "react";
import { FaBrain } from "react-icons/fa";
import { philosophy } from "./data";

/**
 * Philosophy Component
 *
 * This component displays the user's personal philosophy in a visually appealing manner.
 * It utilizes Framer Motion for animations, providing a smooth entrance effect.
 *
 * The component includes:
 * - A title with an icon indicating the section is about philosophy.
 * - A list of philosophical statements that reflect the user's beliefs and approach to development.
 * - Decorative quotation marks to enhance the visual presentation of the philosophy statements.
 *
 * Usage:
 * <Philosophy />
 *
 * Note: Ensure that the 'philosophy' array is defined and contains the relevant data.
 */
const Philosophy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-gradient-to-r from-ctp-red to-ctp-pink w-2 h-6 mr-3 rounded-sm"></div>
        <h3 className="text-ctp-red font-medium text-lg flex items-center">
          <FaBrain className="mr-2" /> Philosophy
        </h3>
      </div>
      <div className="text-ctp-text ml-5 leading-relaxed text-base bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-ctp-red/30">
        <div className="relative">
          <div className="absolute -left-8 top-0 text-ctp-red opacity-40 text-2xl">
            "
          </div>
          {philosophy.map((item) => (
            <p key={item} className="mb-3 pl-2">
              {item}
            </p>
          ))}
          <div className="absolute -right-2 bottom-0 text-ctp-red opacity-40 text-2xl">
            "
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Philosophy;
