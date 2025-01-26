import React, { useEffect, useRef } from "react";
import anime from "animejs";
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

const skills = [
  {
    icon: <SiJavascript className="text-yellow-500" />,
    name: "JavaScript",
  },
  { icon: <SiDocker className="text-blue-500" />, name: "Docker" },
  { icon: <SiReact className="text-blue-500" />, name: "React" },
  { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
  { icon: <SiNodedotjs className="text-green-500" />, name: "Node.js" },
  { icon: <SiPython className="text-yellow-500" />, name: "Python" },
  { icon: <SiGo className="text-blue-500" />, name: "Golang" },
  { icon: <SiKubernetes className="text-blue-500" />, name: "Kubernetes" },
  { icon: <SiGit className="text-red-800" />, name: "Git" },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
  { name: "Redis", icon: <SiRedis className="text-red-700" /> },
  { name: "AWS", icon: <SiAmazon className="text-orange-500" /> },
  { name: "Django", icon: <SiDjango className="text-green-500" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-blue-500" /> },
  { name: "FastAPI", icon: <SiFastapi className="text-green-500" /> },
  { name: "Express", icon: <SiExpress className="text-red-500" /> },
  { name: "Langchain", icon: <SiLangchain className="text-red-500" /> },
];

const SkillCardMoving: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const itemsToClone = Array.from(element.children);
    itemsToClone.forEach((item) => {
      const clone = item.cloneNode(true);
      element.appendChild(clone);
    });

    const updateAnimation = () => {
      const duration = Math.max(45000, window.innerWidth * 75);

      return anime({
        targets: element,
        translateX: [0, -element.scrollWidth / 2],
        duration: duration,
        easing: "linear",
        loop: true,
      });
    };

    let animation = updateAnimation();

    const handleResize = () => {
      animation.pause();
      animation = updateAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      animation.pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black py-4 sm:py-6 md:py-8 rounded-lg mb-8">
      <div ref={elementRef} className="flex whitespace-nowrap">
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="mx-4 sm:mx-6 md:mx-8 flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-white"
          >
            <div className="text-base sm:text-lg md:text-xl">{skill.icon}</div>
            <span className="text-base sm:text-lg md:text-xl">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCardMoving;
