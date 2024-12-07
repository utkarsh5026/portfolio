import React, { useEffect, useRef } from "react";
import anime from "animejs";
import {
  SiJavascript,
  SiDocker,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiGoland,
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
} from "react-icons/si";

const SkillCardMoving: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
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
    { icon: <SiGoland className="text-blue-500" />, name: "Golang" },
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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const itemsToClone = Array.from(element.children);
    itemsToClone.forEach((item) => {
      const clone = item.cloneNode(true);
      element.appendChild(clone);
    });

    const animation = anime({
      targets: element,
      translateX: [0, -element.scrollWidth / 2],
      duration: 80000,
      easing: "linear",
      loop: true,
    });

    return () => animation.pause();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black py-8 rounded-lg mb-8">
      <div ref={elementRef} className="flex whitespace-nowrap">
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="mx-8 flex items-center space-x-4 text-white"
          >
            <div className="text-xl">{skill.icon}</div>
            <span className="text-xl">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCardMoving;
