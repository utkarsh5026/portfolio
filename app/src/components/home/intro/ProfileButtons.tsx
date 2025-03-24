import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useEditorContext } from "../editor/context/explorerContext";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * ProfileButtons component renders a set of buttons for user interaction.
 * It includes buttons to connect, view projects, and links to social media profiles.
 *
 * @component
 * @returns {JSX.Element} The rendered ProfileButtons component.
 */
const ProfileButtons: React.FC = () => {
  const { setActiveSection } = useEditorContext();
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <motion.button
        onClick={() => setActiveSection("contact")}
        className="group relative inline-flex items-center gap-x-2 rounded-lg bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] px-6 py-3 text-sm font-semibold text-[#1e1e2e] overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px 0 rgba(137, 180, 250, 0.5)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-ctp-blue to-ctp-purple opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        ></motion.span>
        <span className="relative z-10">Let's Connect</span>
        <FaTerminal className="relative z-10" />
      </motion.button>

      <button
        onClick={() => setActiveSection("projects")}
        className={cn(
          "group relative inline-flex items-center gap-x-2 rounded-lg border border-ctp-mauve bg-transparent px-6 py-3 text-sm font-semibold text-ctp-mauve overflow-hidden",
          "hover:scale-105 hover:shadow-md hover:shadow-ctp-mauve transition-all duration-300"
        )}
      >
        <span className="absolute inset-0 bg-ctp-mauve/10 opacity-0 group-hover:opacity-100"></span>
        <span className="relative z-10">View Projects</span>
      </button>

      {[
        {
          icon: <FaGithub />,
          href: "https://github.com/utkarsh5026",
        },
        {
          icon: <FaLinkedin />,
          href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
        },
        {
          icon: <HiOutlineDocumentDownload />,
          href: "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view",
        },
      ].map(({ icon, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-[#cdd6f4]",
            "hover:scale-105 hover:shadow-md hover:shadow-ctp-peach/50 transition-all duration-300"
          )}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default ProfileButtons;
