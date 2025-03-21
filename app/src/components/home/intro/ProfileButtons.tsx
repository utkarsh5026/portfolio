import { motion, AnimationControls } from "framer-motion";
import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useEditorContext } from "../editor/context/explorerContext";
import React from "react";

interface ProfileButtonsProps {
  buttonControls: AnimationControls;
}

/**
 * ProfileButtons component renders a set of buttons for user interaction.
 * It includes buttons to connect, view projects, and links to social media profiles.
 *
 * @component
 * @param {ProfileButtonsProps} props - The props for the component.
 * @param {AnimationControls} props.buttonControls - Animation controls for the button animations.
 * @returns {JSX.Element} The rendered ProfileButtons component.
 */
const ProfileButtons: React.FC<ProfileButtonsProps> = ({ buttonControls }) => {
  const { setActiveSection } = useEditorContext();
  return (
    <motion.div
      className="mt-8 flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={buttonControls}
    >
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
          className="absolute inset-0 bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] opacity-0 group-hover:opacity-100"
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

      <motion.button
        onClick={() => setActiveSection("projects")}
        className="group relative inline-flex items-center gap-x-2 rounded-lg border border-[#cba6f7] bg-transparent px-6 py-3 text-sm font-semibold text-[#cba6f7] overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px 0 rgba(203, 166, 247, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="absolute inset-0 bg-[#cba6f7]/10 opacity-0 group-hover:opacity-100"
          initial={{ y: "100%" }}
          whileHover={{ y: "0%" }}
          transition={{ duration: 0.3 }}
        ></motion.span>
        <span className="relative z-10">View Projects</span>
      </motion.button>

      {/* Additional Social Buttons */}
      <motion.div className="flex gap-2">
        <motion.a
          href="https://github.com/utkarsh5026"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(203, 166, 247, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(137, 180, 250, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin />
        </motion.a>

        <motion.a
          href="https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(166, 227, 161, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineDocumentDownload />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ProfileButtons;
