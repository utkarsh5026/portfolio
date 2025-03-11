import { motion } from "framer-motion";
import React from "react";
import { GiBullseye } from "react-icons/gi";
const CurrentFocus: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center mb-2">
        <div className="bg-[#f5c2e7] w-2 h-6 mr-3"></div>
        <h3 className="text-[#f5c2e7] font-medium text-lg flex items-center">
          <GiBullseye className="mr-2" /> Current Focus
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5">
        <p className="mb-2">
          I'm currently focused on deepening my expertise in:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Advanced microservices architectures with Kubernetes</li>
          <li>Exploring LLM applications in web development</li>
          <li>Performance optimization techniques for modern web apps</li>
          <li>Mastering database design and optimization strategies</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default CurrentFocus;
