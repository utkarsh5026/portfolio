import { motion } from "framer-motion";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Dr. Vishwanath Karad MIT World Peace University",
    duration: "2020 - 2024",
    highlights: [
      "Graduated with 9.52 CGPA",
      "Specialized in Web Technologies and Cloud Computing",
      "Final Year Project: Developed an intelligence engine for practicing code",
    ],
    institutionUrl: "https://mitwpu.edu.in/",
  },
  {
    degree: "Higher Secondary Education (Class XII)",
    institution: "Jawahar Vidya Mandir, Shyamali",
    duration: "2017 - 2019",
    highlights: ["Secured 89% in the CBSE Boards Examination"],
    institutionUrl: "https://www.jvmshyamali.com/home",
  },
  {
    degree: "Secondary School (Class X)",
    institution: "DAV Public School, urimari",
    duration: "2007 - 2017",
    highlights: ["Secured 10 CGPA in the CBSE Boards Examination"],
    institutionUrl: "https://davpsurimari.in/",
  },
];

const Education: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-gradient-to-r from-[#89b4fa] to-[#89dceb] w-2 h-6 mr-3 rounded-sm"></div>
        <h3 className="text-[#89b4fa] font-medium text-lg flex items-center">
          <FaGraduationCap className="mr-2" /> Education
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 space-y-4 bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#89b4fa]/30 flex flex-col gap-8">
        {education.map((item) => (
          <div key={item.degree}>
            <div className="font-medium text-[#89b4fa]">{item.degree}</div>
            <div className="text-sm text-[#bac2de] flex justify-between mt-1 pb-2 border-b border-[#313244]/50">
              <span>
                <a
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#89b4fa] transition-colors cursor-pointer hover:underline"
                >
                  {item.institution}
                </a>
              </span>
              <span className="bg-[#313244]/50 px-2 rounded">
                {item.duration}
              </span>
            </div>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Education;
