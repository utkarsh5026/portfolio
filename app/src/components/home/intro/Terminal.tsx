import { motion, AnimationControls } from "framer-motion";
import React from "react";
import AnimatedText from "./AnimatedText";

const statements = [
  "I build things for the web",
  "I love creating user interfaces",
  "I speak JavaScript, Python & Go",
  "I want to write code that humans can read",
  "I am currently exploring databases and LLMs",
];

interface TerminalProps {
  terminalControls: AnimationControls;
}

/**
 * Terminal component displays a terminal-like interface with animations.
 * It includes a terminal header with a close button, minimize button, and a title.
 * The component also displays a set of statements with a typewriting effect.
 *
 * @component
 * @param {TerminalProps} props - The properties for the component.
 * @param {AnimationControls} props.terminalControls - Animation controls for the terminal.
 * @returns {JSX.Element} The rendered Terminal component.
 */
const Terminal: React.FC<TerminalProps> = ({ terminalControls }) => {
  return (
    <motion.div
      className="bg-[#11111b]/80 backdrop-blur-md rounded-md border border-[#313244] p-5 shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={terminalControls}
      whileHover={{
        borderColor: "#89b4fa",
        boxShadow: "0 0 20px 0 rgba(137, 180, 250, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="flex items-center mb-3 border-b border-[#313244]/80 pb-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#f38ba8] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.div
          className="w-2 h-2 rounded-full bg-[#f9e2af] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.div
          className="w-2 h-2 rounded-full bg-[#a6e3a1] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.span
          className="text-xs text-[#6c7086]"
          animate={{
            color: ["#6c7086", "#cdd6f4", "#6c7086"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          terminal@utkarsh:~$
        </motion.span>
      </div>
      <AnimatedText statements={statements} />
    </motion.div>
  );
};

export default Terminal;
