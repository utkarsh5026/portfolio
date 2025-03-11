import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import React from "react";

const Background: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] w-2 h-6 mr-3 rounded-sm"></div>
        <h3 className="text-[#cba6f7] font-medium text-lg flex items-center">
          <FaCode className="mr-2" /> Background
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 leading-relaxed text-base bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#cba6f7]/30">
        <p className="mb-2">
          I am Utkarsh Priyadarshi, a passionate Full-Stack Developer and DevOps
          Engineer with a knack for building scalable web applications. My
          journey in tech started with simple HTML pages during my early college
          days and has evolved to complex web applications using modern
          frameworks and cloud technologies.
        </p>
        <p>
          With expertise spanning front-end aesthetics to back-end architecture,
          I specialize in creating robust infrastructure systems that deliver
          exceptional user experiences while maintaining clean, efficient
          codebases.
        </p>
      </div>
    </motion.div>
  );
};

export default Background;
