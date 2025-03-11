import { motion } from "framer-motion";
import React from "react";
import { FaLaptopCode } from "react-icons/fa";

const Skills: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-gradient-to-r from-[#fab387] to-[#f9e2af] w-2 h-6 mr-3 rounded-sm"></div>
        <h3 className="text-[#fab387] font-medium text-lg flex items-center">
          <FaLaptopCode className="mr-2" /> Core Skills
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#fab387]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
            <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
              Frontend
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>React, Next.js, TypeScript</li>
              <li>Tailwind CSS, Styled Components</li>
              <li>Redux, React Query</li>
            </ul>
          </div>
          <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
            <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
              Backend
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Node.js, Express, Python, Go</li>
              <li>MongoDB, PostgreSQL, Redis, MySQL</li>
              <li>GraphQL, REST API Design</li>
            </ul>
          </div>
          <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
            <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
              DevOps & Cloud
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>AWS, Google Cloud Platform</li>
              <li>Docker, Kubernetes</li>
              <li>CI/CD, GitHub Actions</li>
            </ul>
          </div>
          <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
            <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
              Tools & Others
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Git, GitHub</li>
              <li>Agile Methodologies</li>
              <li>Unit Testing, E2E Testing</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
