import { motion } from "framer-motion";
import React from "react";
import { FaLaptopCode } from "react-icons/fa";

const skills = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Styled Components",
      "Redux",
      "React Query",
    ],
  },

  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Go",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "MySQL",
      "GraphQL",
      "REST API Design",
    ],
  },

  {
    category: "DevOps & Cloud",
    skills: [
      "AWS",
      "Google Cloud Platform",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
    ],
  },

  {
    category: "Tools & Others",
    skills: [
      "Git",
      "GitHub",
      "Agile Methodologies",
      "Unit Testing",
      "E2E Testing",
    ],
  },
] as const;

/**
 * Skills Component
 *
 * This component displays the core skills of the user, categorized into different sections.
 * It utilizes Framer Motion for animations to enhance the user experience.
 *
 * The component includes:
 * - A title indicating the section is about core skills.
 * - A grid layout that organizes skills into categories such as Frontend, Backend, DevOps & Cloud, and Tools & Others.
 * - Each category is displayed with its name and a list of relevant skills.
 *
 * The component is styled to fit within the overall theme of the application, ensuring a visually appealing presentation.
 */
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
          {skills.map((skill) => (
            <div
              className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50"
              key={skill.category}
            >
              <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
                {skill.category}
              </div>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {skill.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
