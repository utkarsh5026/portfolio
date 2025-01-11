import React, { useEffect, useRef, useState } from "react";
import Section from "@/components/base/Section";
import { experiences } from "./experienceDump";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaDatabase, FaSearch, FaDocker } from "react-icons/fa";
import TechBadge from "@/components/base/TechBadge";
// Fix icon mapping - change from IconType to JSX.Element
const iconMap: { [key: string]: JSX.Element } = {
  FaDatabase: <FaDatabase />,
  FaSearchDatabase: <FaSearch />,
  FaDocker: <FaDocker />,
};

const WorkExperience: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleExperienceClick = (index: number) => {
    setSelectedExp(index);
  };

  // Create a rounded rectangle path
  const cornerRadius = 8;
  const offset = 4;
  const width = dimensions.width - 2 * offset;
  const height = dimensions.height - 2 * offset;

  const pathD = `
    M${offset + cornerRadius},${offset}
    L${width - cornerRadius + offset},${offset}
    Q${width + offset},${offset} ${width + offset},${offset + cornerRadius}
    L${width + offset},${height - cornerRadius + offset}
    Q${width + offset},${height + offset} ${width - cornerRadius + offset},${
    height + offset
  }
    L${cornerRadius + offset},${height + offset}
    Q${offset},${height + offset} ${offset},${height - cornerRadius + offset}
    L${offset},${cornerRadius + offset}
    Q${offset},${offset} ${cornerRadius + offset},${offset}
  `;

  return (
    <Section id="work" label="Work Experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr,2fr] md:grid-cols-[1.2fr,2fr] gap-4 sm:gap-6 lg:gap-8">
          {/* Timeline */}
          <div className="space-y-3 sm:space-y-4">
            {experiences.map((exp, index) => (
              <button
                key={`${exp.duration}-${index}`}
                className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all
                  ${
                    selectedExp === index
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-800 hover:bg-blue-100"
                  }`}
                onClick={() => handleExperienceClick(index)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                      <AvatarImage src={exp.imageSrc} alt={exp.company} />
                    </Avatar>
                    <h3 className="font-bold text-sm sm:text-base">
                      {exp.company}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm opacity-80 ml-7 sm:ml-8">
                    {exp.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <div
            ref={containerRef}
            className="bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-lg shadow-lg relative min-h-[300px]"
          >
            {/* Border Container for SVG Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
                  </linearGradient>
                </defs>

                <path
                  d={pathD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                  className="text-blue-500"
                />

                {/* Animated tracing effect */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-blue-500"
                  strokeDasharray="8 3"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-22"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Glowing dot */}
                <circle r="3" className="text-blue-500 fill-current">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path={pathD}
                    rotate="auto"
                  >
                    <animate
                      attributeName="r"
                      values="3;4;3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold">
                {experiences[selectedExp].position}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start align-middle my-4">
              <button
                className="text-blue-500 hover:underline"
                onClick={() =>
                  window.open(experiences[selectedExp].companyUrl, "_blank")
                }
                aria-label={`Visit ${experiences[selectedExp].company} website`}
              >
                {experiences[selectedExp].company}
              </button>
            </div>

            <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
              {experiences[selectedExp].achievements.map(
                (achievement, index) => (
                  <div
                    key={`project-${index}-${achievement.title}`}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-100 dark:border-gray-800"
                  >
                    {achievement.icon && iconMap[achievement.icon] && (
                      <div className="flex-shrink-0 p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <div className="text-sm sm:text-base">
                          {iconMap[achievement.icon]}
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base mb-2 text-blue-600 dark:text-blue-400">
                        {achievement.title}
                      </h4>
                      <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed list-disc pl-4">
                        {achievement.description.map((desc, i) => (
                          <li
                            key={`${index}-${i}`}
                            className="text-green-500 marker:text-green-500"
                          >
                            <span className="text-gray-600 dark:text-gray-300">
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {experiences[selectedExp].technologies.map((tech, index) => (
                <TechBadge tech={tech} key={`${tech}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
