import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import React from "react";

const background = [
  "Hi there! I'm Utkarsh Priyadarshi, a Full-Stack Developer and DevOps Engineer who loves solving problems through code.",
  "My journey began with simple HTML pages during college, and over time I've been fortunate to learn and work with various web technologies and cloud platforms.",
  "I enjoy working on both front-end interfaces and back-end systems, and I'm always looking to improve my skills while creating useful applications that help people accomplish their goals.",
  "I'm a quick learner and always eager to take on new challenges. Let's connect and see how we can work together to create something amazing ❤️!",
];

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
