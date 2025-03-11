import { motion } from "framer-motion";
import React from "react";
import { FaBrain } from "react-icons/fa";

const Philosophy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-gradient-to-r from-[#f38ba8] to-[#f5c2e7] w-2 h-6 mr-3 rounded-sm"></div>
        <h3 className="text-[#f38ba8] font-medium text-lg flex items-center">
          <FaBrain className="mr-2" /> Philosophy
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 leading-relaxed text-base bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#f38ba8]/30">
        <div className="relative">
          <div className="absolute -left-8 top-0 text-[#f38ba8] opacity-40 text-2xl">
            "
          </div>
          <p className="mb-3 pl-2">
            I firmly believe in writing clean, maintainable code that follows
            best practices and industry standards. My approach to development is
            holistic — focusing not just on functionality but also on
            performance, security, and accessibility.
          </p>
          <p className="pl-2">
            I value continuous learning and embrace challenges that push me
            outside my comfort zone. I'm constantly exploring new technologies
            and methodologies to stay at the forefront of web development, and I
            enjoy sharing my knowledge with the community through contributions
            to open-source projects.
          </p>
          <div className="absolute -right-2 bottom-0 text-[#f38ba8] opacity-40 text-2xl">
            "
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Philosophy;
