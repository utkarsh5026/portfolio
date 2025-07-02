import React from "react";
import FloatingElement from "@/components/animations/FloatingElement";
import {
  SiTypescript,
  SiTailwindcss,
  SiKubernetes,
  SiPython,
  SiGo,
} from "react-icons/si";
import { FaNodeJs, FaGitAlt, FaDocker, FaReact } from "react-icons/fa";

type Tech = {
  icon: React.ElementType;
  name: string;
  color: string;
  bg: string;
  intensity: "medium" | "low" | "high";
  delay: number;
};

const techs: Tech[] = [
  {
    icon: FaReact,
    name: "React",
    color: "#89b4fa",
    bg: "#89b4fa/15",
    intensity: "medium",
    delay: 0,
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    color: "#89b4fa",
    bg: "#89b4fa/15",
    intensity: "low",
    delay: 300,
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind",
    color: "#74c7ec",
    bg: "#74c7ec/15",
    intensity: "medium",
    delay: 400,
  },
  {
    icon: FaNodeJs,
    name: "Node.js",
    color: "#a6e3a1",
    bg: "#a6e3a1/15",
    intensity: "low",
    delay: 500,
  },
  {
    icon: SiPython,
    name: "Python",
    color: "#f9e2af",
    bg: "#f9e2af/15",
    intensity: "medium",
    delay: 600,
  },
  {
    icon: SiGo,
    name: "Go",
    color: "#89b4fa",
    bg: "#89b4fa/15",
    intensity: "low",
    delay: 700,
  },
  {
    icon: FaGitAlt,
    name: "Git",
    color: "#f38ba8",
    bg: "#f38ba8/15",
    intensity: "medium",
    delay: 800,
  },
  {
    icon: FaDocker,
    name: "Docker",
    color: "#74c7ec",
    bg: "#74c7ec/15",
    intensity: "low",
    delay: 900,
  },
  {
    icon: SiKubernetes,
    name: "K8s",
    color: "#cba6f7",
    bg: "#cba6f7/15",
    intensity: "medium",
    delay: 1000,
  },
];

const TechSkillsComponent = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center mt-10 max-w-4xl mx-auto">
      {techs.map((tech, index) => (
        <FloatingElement
          key={`${tech.name}-${index}`}
          intensity={tech.intensity}
          delay={tech.delay}
        >
          <div
            className={`p-4 bg-${tech.bg} backdrop-blur-sm rounded-lg border border-[#313244] flex flex-col items-center gap-2 min-w-[100px] shadow-lg hover:shadow-xl hover:border-${tech.color}/30 transition-all duration-300`}
          >
            {React.createElement(tech.icon, {
              className: `text-[${tech.color}] text-2xl`,
            })}
            <span className="text-sm text-[#cdd6f4]">{tech.name}</span>
          </div>
        </FloatingElement>
      ))}
    </div>
  );
};

const TechSkills = React.memo(TechSkillsComponent);
export default TechSkills;
