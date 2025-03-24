import { motion } from "framer-motion";
import React from "react";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";

const statements = [
  "I build things for the web",
  "I love creating user interfaces",
  "I speak JavaScript, Python & Go",
  "I want to write code that humans can read",
  "I am currently exploring databases and LLMs",
];

/**
 * Terminal component displays a terminal-like interface with animations.
 * It includes a terminal header with a close button, minimize button, and a title.
 * The component also displays a set of statements with a typewriting effect.
 *
 * @component
 * @returns {JSX.Element} The rendered Terminal component.
 */
const Terminal: React.FC = () => {
  return (
    <div
      className={cn(
        "bg-[#11111b]/80 backdrop-blur-md rounded-md border border-[#313244] p-5 shadow-lg",
        "hover:shadow-xl transition-all hover:cursor-pointer hover:border-2 hover:border-ctp-green hover:shadow-ctp-green/10 hover:scale-110 hover:translate-y-[-5px] duration-300"
      )}
    >
      <div className="flex items-center mb-3 border-b border-[#313244]/80 pb-2">
        {[
          { color: "bg-ctp-red" },
          { color: "bg-ctp-yellow" },
          { color: "bg-ctp-green" },
        ].map((item) => (
          <div
            key={item.color}
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              "hover:scale-150 transition-all duration-100",
              item.color
            )}
          ></div>
        ))}

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
    </div>
  );
};

export default Terminal;
