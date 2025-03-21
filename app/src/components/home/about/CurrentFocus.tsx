import { motion } from "framer-motion";
import React from "react";
import { GiBullseye } from "react-icons/gi";
import { focusAreas } from "./data";

const CurrentFocus: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="p-4 rounded-lg  backdrop-blur-sm border border-ctp-mantle/50 shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="bg-ctp-pink w-2 h-8 mr-3 rounded-full"></div>
        <h3 className="text-ctp-pink font-semibold text-xl flex items-center">
          <GiBullseye className="mr-2" /> Current Focus
        </h3>
      </div>
      <div className="text-ctp-text ml-5 flex flex-col gap-4">
        <p className="mb-3 text-[#bac2de]">
          I'm currently focused on deepening my expertise in:
        </p>
        <div className="bg-[#313244]/30 p-4 rounded-lg">
          <ul className="list-disc ml-5 space-y-2">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm italic text-[#bac2de] bg-[#313244]/20 p-3 rounded-md border-l-2 border-ctp-pink">
          These focus areas help me stay at the cutting edge of web development
          and deliver exceptional solutions.
        </p>
      </div>
    </motion.div>
  );
};

export default CurrentFocus;
