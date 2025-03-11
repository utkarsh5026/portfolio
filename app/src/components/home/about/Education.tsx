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

/**
 * Education Component
 *
 * This component displays the educational background of the user in a visually appealing manner.
 * It utilizes Framer Motion for animations and presents the information in a structured format.
 *
 * The component includes:
 * - A title with an icon indicating the section is about education.
 * - A list of educational qualifications, each with:
 *   - Degree name
 *   - Institution name (clickable link)
 *   - Duration of the course
 *   - Highlights of the degree
 *
 * The component is responsive and styled to fit within the overall theme of the application.
 */
const Education: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-4"
    >
      <div className="flex items-center mb-4">
        <div className="bg-[#89b4fa] w-2 h-8 mr-3 rounded-full"></div>
        <h3 className="text-[#89b4fa] font-semibold text-xl flex items-center">
          <FaGraduationCap className="mr-2" /> Education
        </h3>
      </div>
      <div className="text-[#cdd6f4] ml-5 space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-[#313244]/30 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="font-medium text-[#89b4fa] text-lg">
              {item.degree}
            </div>
            <div className="text-sm text-[#bac2de] flex flex-col sm:flex-row sm:justify-between mt-2 pb-3 border-b border-[#313244]/80">
              <span className="mb-2 sm:mb-0">
                <a
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#89b4fa] transition-colors cursor-pointer hover:underline flex items-center"
                >
                  <span className="mr-1 opacity-10">🏫</span> {item.institution}
                </a>
              </span>
              <span className="bg-[#313244]/70 px-3 py-1 rounded-full text-[#89b4fa] inline-flex items-center self-start sm:self-auto">
                <span className="mr-1 opacity-30">🗓️</span> {item.duration}
              </span>
            </div>
            <ul className="list-disc ml-5 mt-3 text-sm space-y-2">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Education;
