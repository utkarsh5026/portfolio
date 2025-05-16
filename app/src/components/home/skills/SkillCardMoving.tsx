import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSkillAnimation, useCloneElements } from "./hooks";
import {
  SiJavascript,
  SiDocker,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiKubernetes,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiAmazon,
  SiDjango,
  SiFirebase,
  SiTailwindcss,
  SiFastapi,
  SiExpress,
  SiLangchain,
  SiGo,
} from "react-icons/si";
import { motion } from "framer-motion";

// Map skills to Catppuccin colors
const skillColors: Record<string, string> = {
  JavaScript: "yellow",
  Docker: "blue",
  React: "sapphire",
  TypeScript: "lavender",
  "Node.js": "green",
  Python: "yellow",
  Golang: "blue",
  Kubernetes: "blue",
  Git: "maroon",
  MongoDB: "green",
  PostgreSQL: "blue",
  Redis: "red",
  AWS: "peach",
  Django: "green",
  Firebase: "peach",
  Tailwind: "blue",
  FastAPI: "green",
  Express: "mauve",
  Langchain: "pink",
};

const skills = [
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <SiDocker />, name: "Docker" },
  { icon: <SiReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiPython />, name: "Python" },
  { icon: <SiGo />, name: "Golang" },
  { icon: <SiKubernetes />, name: "Kubernetes" },
  { icon: <SiGit />, name: "Git" },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "AWS", icon: <SiAmazon /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "Langchain", icon: <SiLangchain /> },
];

const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) => {
  let timeoutId: number;
  return (...args: Parameters<T>): void => {
    if (timeoutId) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};

const SkillCardMoving: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const elementRef = useRef<HTMLDivElement>(null);
  const { startAnimation, stopAnimation, updateAnimation } =
    useSkillAnimation(elementRef);
  const { isInitialized, initializeClones } = useCloneElements(elementRef);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    if (!elementRef.current || isInitialized) return;
    initializeClones();
  }, [isInitialized, initializeClones]);

  useEffect(() => {
    if (!isInitialized) return;

    if (inView) startAnimation();
    else stopAnimation();

    const handleResize = debounce(() => {
      updateAnimation();
    }, 150);

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      stopAnimation();
    };
  }, [inView, isInitialized, startAnimation, stopAnimation, updateAnimation]);

  return (
    <div
      ref={ref}
      className="w-full overflow-auto rounded-xl relative max-w-full"
      style={{
        willChange: "transform",
        contain: "content",
      }}
    >
      {/* Decorative background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ctp-crust via-ctp-mantle to-ctp-crust z-0"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--ctp-overlay0) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Skills slider */}
      <div className="relative py-3 sm:py-4 md:py-5 z-10">
        <div
          ref={elementRef}
          className="flex whitespace-nowrap"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {skills.map((skill, index) => {
            const isHovered = hoveredSkill === `${skill.name}-${index}`;
            const color = skillColors[skill.name] || "ctp-text";

            return (
              <div
                key={`${skill.name}-${index}`}
                className="mx-4 sm:mx-6 md:mx-8"
                onMouseEnter={() => setHoveredSkill(`${skill.name}-${index}`)}
              >
                <motion.div
                  className={`
                    flex items-center gap-2 px-3 py-1 rounded-full
                    bg-ctp-surface0/50 backdrop-blur-sm
                    border border-ctp-surface0 hover:border-ctp-${color}
                    transition-all duration-300
                    ${isHovered ? `shadow-md shadow-ctp-${color}/20` : ""}
                  `}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon with dynamic color */}
                  <div
                    className={`
                    text-ctp-${color} text-xs sm:text-sm md:text-base
                    transition-all duration-300
                    ${isHovered ? "scale-110" : ""}
                  `}
                  >
                    {skill.icon}
                  </div>

                  {/* Skill name */}
                  <span
                    className={`
                    text-sm  font-medium
                    transition-colors duration-300
                    ${isHovered ? `text-ctp-${color}` : "text-ctp-text"}
                  `}
                  >
                    {skill.name}
                  </span>

                  {/* Hover indicator dot */}
                  {isHovered && (
                    <motion.div
                      className={`absolute -right-1 -top-1 w-2 h-2 rounded-full bg-ctp-${color}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkillCardMovingComponent = React.memo(SkillCardMoving);

export default SkillCardMovingComponent;
