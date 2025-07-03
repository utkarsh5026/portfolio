import { motion } from "framer-motion";
import React from "react";
import AnimatedText from "./animated-text";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";
import { HiBookOpen, HiSparkles, HiFire } from "react-icons/hi2";
import { TbBrandVscode, TbTerminal2 } from "react-icons/tb";

const qaPairs = [
  {
    question: "whoami",
    answer: "Passionate full-stack developer",
    syntaxClass: "text-ctp-blue",
    icon: <TbBrandVscode className="text-ctp-blue" />,
  },
  {
    question: "cat skills.txt",
    answer:
      "Building scalable web applications with JavaScript, Python, and Go",
    syntaxClass: "text-ctp-green",
    icon: <TbTerminal2 className="text-ctp-green" />,
  },
  {
    question: "echo $PASSION",
    answer: "I love creating elegant solutions to complex problems",
    syntaxClass: "text-ctp-pink",
    icon: <HiFire className="text-ctp-pink" />,
  },
  {
    question: "ls current_projects/",
    answer: "Exploring modern web technologies and AI integration",
    syntaxClass: "text-ctp-purple",
    icon: <HiBookOpen className="text-ctp-purple" />,
  },
  {
    question: "status --availability",
    answer: "Available for exciting development opportunities",
    syntaxClass: "text-ctp-green",
    icon: <HiSparkles className="text-ctp-green" />,
  },
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
  const { isMobile } = useMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden",
        "bg-gradient-to-br from-ctp-crust to-ctp-mantle",
        "backdrop-blur-sm rounded-xl border-none",
        "shadow-2xl shadow-ctp-surface1/20",
        isMobile ? "p-3" : "p-6",
        "hover:shadow-3xl hover:shadow-ctp-green/10 transition-all duration-500",
        "hover:border-ctp-green/40 hover:scale-[1.02] hover:-translate-y-1"
      )}
    >
      {/* Terminal Header */}
      <div
        className={cn(
          "flex items-center justify-between mb-4 pb-3",
          "border-b border-ctp-surface1/40",
          "relative z-10"
        )}
      >
        <div className="flex items-center gap-2">
          {/* macOS-style window controls */}
          {[
            { color: "bg-ctp-red", hoverColor: "hover:bg-red-400" },
            { color: "bg-ctp-yellow", hoverColor: "hover:bg-yellow-400" },
            { color: "bg-ctp-green", hoverColor: "hover:bg-green-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full cursor-pointer transition-all duration-200",
                item.color,
                item.hoverColor,
                "hover:scale-125 hover:shadow-lg hover:shadow-current/50",
                isMobile && "w-2.5 h-2.5"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex items-center mb-3 relative z-10",
          isMobile ? "text-xs" : "text-sm"
        )}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{
            color: ["#6c7086", "#cdd6f4", "#a6e3a1", "#cdd6f4", "#6c7086"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <span className="text-ctp-green">❯</span>
          <span className="text-ctp-blue font-mono">utkarsh.me</span>
        </motion.div>
      </div>

      {/* Command output area */}
      <div
        className={cn(
          "relative z-10",
          "bg-gradient-to-r from-ctp-crust to-ctp-mantle",
          "backdrop-blur-sm",
          isMobile ? "p-3" : "p-4"
        )}
      >
        <AnimatedText qaPairs={qaPairs} />
      </div>
    </motion.div>
  );
};

export default Terminal;
