import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useEditorContext } from "../editor/context/explorer-context";
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
    <div className="w-full overflow-auto p-4">
      <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 w-full">
        <motion.button
          onClick={() => setActiveSection("contact")}
          className="group relative inline-flex items-center justify-center gap-x-1.5 sm:gap-x-2 rounded-lg bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#1e1e2e] overflow-hidden w-full sm:w-auto min-h-[44px] flex-shrink-0"
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
          <span className="relative z-10 break-words leading-tight">
            Let's Connect
          </span>
          <FaTerminal className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        </motion.button>

        <button
          onClick={() => setActiveSection("projects")}
          className={cn(
            "group relative inline-flex items-center justify-center gap-x-1.5 sm:gap-x-2 rounded-lg border border-ctp-mauve bg-transparent px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-ctp-mauve overflow-hidden w-full sm:w-auto min-h-[44px] flex-shrink-0",
            "hover:scale-105 hover:shadow-md hover:shadow-ctp-mauve transition-all duration-300"
          )}
        >
          <span className="absolute inset-0 bg-ctp-mauve/10 opacity-0 group-hover:opacity-100"></span>
          <span className="relative z-10 break-words leading-tight">
            View Projects
          </span>
        </button>

        <div className="flex gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center sm:justify-start">
          {[
            {
              icon: <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />,
              href: "https://github.com/utkarsh5026",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
              href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
              label: "LinkedIn",
            },
            {
              icon: (
                <HiOutlineDocumentDownload className="w-4 h-4 sm:w-5 sm:h-5" />
              ),
              href: "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view",
              label: "Resume",
            },
          ].map(({ icon, href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "p-2.5 sm:p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-[#cdd6f4] min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0",
                "hover:scale-105 hover:shadow-md hover:shadow-ctp-peach/50 transition-all duration-300"
              )}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileButtons;
