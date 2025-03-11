import { motion } from "framer-motion";
import React from "react";
import { FaBook } from "react-icons/fa";

const InterestsHobbies: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <div className="bg-[#a6e3a1] w-2 h-6 mr-3"></div>
        <h3 className="text-[#a6e3a1] font-medium text-lg flex items-center">
          <FaBook className="mr-2" /> Interests & Hobbies
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5">
        <p className="mb-3">
          When I'm not coding, you can find me engaged in various activities
          that keep me balanced and inspired:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-medium text-[#a6e3a1] mb-1">Technical</div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Contributing to open-source projects</li>
              <li>Experimenting with new programming languages</li>
              <li>Exploring AI/ML applications in web development</li>
              <li>Reading technical blogs and papers</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-[#a6e3a1] mb-1">Non-Technical</div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Photography and digital art</li>
              <li>Hiking and outdoor adventures</li>
              <li>Chess and strategy games</li>
              <li>Reading science fiction and philosophy</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm italic">
          I'm always looking to connect with like-minded professionals for
          collaborations and knowledge exchange. Feel free to reach out!
        </p>
      </div>
    </motion.div>
  );
};

export default InterestsHobbies;
