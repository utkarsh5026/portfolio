import React from "react";
import { HiBookOpen, HiFire,HiSparkles } from "react-icons/hi2";
import { TbBrandVscode, TbTerminal2 } from "react-icons/tb";

import SketchBorder from "@/components/ui/sketch-border";
import { cn } from "@/lib/utils";

import AnimatedText from "./animated-text";
import styles from "./statements-terminal.module.css";

const qaPairs = [
  {
    question: "whoami",
    answer:
      "Passionate full-stack developer crafting immersive web experiences.",
    syntaxClass: "text-ctp-blue",
    icon: <TbBrandVscode className="text-ctp-blue w-5 h-5 flex-shrink-0" />,
  },
  {
    question: "cat skills.txt",
    answer:
      "Building scalable applications with JavaScript, React, Python, and Go.",
    syntaxClass: "text-ctp-green",
    icon: <TbTerminal2 className="text-ctp-green w-5 h-5 flex-shrink-0" />,
  },
  {
    question: "echo $PASSION",
    answer:
      "I love turning complex problems into elegant, minimalist interfaces.",
    syntaxClass: "text-ctp-red",
    icon: <HiFire className="text-ctp-red w-5 h-5 flex-shrink-0" />,
  },
  {
    question: "ls current_projects/",
    answer: "Exploring modern frontend architectures and AI integration.",
    syntaxClass: "text-ctp-mauve",
    icon: <HiBookOpen className="text-ctp-mauve w-5 h-5 flex-shrink-0" />,
  },
  {
    question: "status --availability",
    answer:
      "Always open to collaborating on innovative and challenging projects.",
    syntaxClass: "text-ctp-yellow",
    icon: <HiSparkles className="text-ctp-yellow w-5 h-5 flex-shrink-0" />,
  },
];

const Terminal: React.FC = () => {
  return (
    <SketchBorder
      primaryColor="green"
      secondaryColor="blue"
      className="w-full"
      tertiaryColor="sky"
    >
      <div
        className={cn(
          "overflow-hidden w-full",
          "bg-gradient-to-br from-ctp-crust to-ctp-mantle",
          "rounded-2xl shadow-xl shadow-black/20 font-source",
          styles.terminalContainer,
        )}
      >
        {/* Terminal Bar */}
        <div className="flex items-center px-4 py-3 border-b border-ctp-surface0 bg-ctp-crust relative z-10">
          <div className="flex gap-2 relative z-20">
            <div className="w-3 h-3 rounded-full bg-ctp-red border border-ctp-maroon" />
            <div className="w-3 h-3 rounded-full bg-ctp-yellow border border-ctp-peach" />
            <div className="w-3 h-3 rounded-full bg-ctp-green border border-ctp-teal" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center font-source text-[11px] sm:text-xs text-ctp-overlay0 font-medium tracking-wider pointer-events-none">
            utkarsh — bash
          </div>
        </div>

        {/* Terminal Body */}
        <div className="relative h-[220px] sm:h-[180px] p-5 md:p-6 flex flex-col font-source text-sm sm:text-base selection:bg-ctp-surface2">
          <AnimatedText qaPairs={qaPairs} />
        </div>
      </div>
    </SketchBorder>
  );
};

export default Terminal;
