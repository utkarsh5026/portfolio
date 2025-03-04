import React, { useEffect, useRef, useState } from "react";
import Section from "@/components/section/Section";
import { experiences } from "./experienceDump";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  FaDatabase,
  FaSearch,
  FaDocker,
  FaFileAlt,
  FaCode,
  FaTerminal,
} from "react-icons/fa";
import TechBadge from "@/components/base/TechBadge";

const iconMap: { [key: string]: JSX.Element } = {
  FaDatabase: <FaDatabase />,
  FaSearchDatabase: <FaSearch />,
  FaDocker: <FaDocker />,
  FaCode: <FaCode />,
  FaTerminal: <FaTerminal />,
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
    <Section id="work" label="Work Experience" icon="database">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative">
          {/* Subtle header - more readable */}
          <div className="mb-4 font-medium text-ctp-text dark:text-ctp-subtext0">
            My Professional Experience
          </div>

          <div
            className={`grid ${
              experiences.length === 1
                ? "grid-cols-1"
                : "lg:grid-cols-[1fr,2fr] md:grid-cols-[1.2fr,2fr]"
            } gap-4 sm:gap-6 lg:gap-8`}
          >
            {experiences.length > 1 && (
              <div className="space-y-3 sm:space-y-4">
                {experiences.map((exp, index) => (
                  <button
                    key={`${exp.duration}-${index}`}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all
                      ${
                        selectedExp === index
                          ? "bg-ctp-lavender text-ctp-crust"
                          : "bg-ctp-base dark:bg-ctp-mantle hover:bg-ctp-surface0"
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
            )}

            <div
              ref={containerRef}
              className="bg-ctp-base dark:bg-ctp-crust p-4 sm:p-6 rounded-lg shadow-lg relative min-h-[300px]"
            >
              {/* Cleaner header with subtle code styling */}
              <div className="flex items-center gap-2 mb-3 border-b border-ctp-surface0 pb-2">
                <span className="font-medium text-ctp-yellow">
                  {experiences[selectedExp].position}
                </span>
              </div>

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
                      <stop offset="0%" stopColor="#89b4fa" stopOpacity="1" />
                      <stop offset="50%" stopColor="#b4befe" stopOpacity="1" />
                      <stop offset="100%" stopColor="#89b4fa" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  <path
                    d={pathD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity="0.1"
                    className="text-ctp-lavender"
                  />

                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-ctp-lavender"
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
                </svg>
              </div>

              <div className="ml-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-ctp-mauve">
                    Position:
                  </span>
                  <span className="text-base sm:text-lg font-bold text-ctp-text">
                    {experiences[selectedExp].position}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-start align-middle my-4">
                  <span className="font-semibold text-ctp-mauve">Company:</span>
                  <button
                    className="text-ctp-blue hover:text-ctp-lavender hover:underline"
                    onClick={() =>
                      window.open(experiences[selectedExp].companyUrl, "_blank")
                    }
                    aria-label={`Visit ${experiences[selectedExp].company} website`}
                  >
                    {experiences[selectedExp].company}
                  </button>
                  {experiences[selectedExp].docsUrl && (
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-ctp-surface0 text-ctp-blue hover:bg-ctp-surface1 transition-colors dark:bg-ctp-surface0 dark:text-ctp-sky dark:hover:bg-ctp-surface1"
                      onClick={() =>
                        window.open(experiences[selectedExp].docsUrl, "_blank")
                      }
                      aria-label="View detailed experience"
                    >
                      <FaFileAlt className="text-xs" />
                      <span>View Details</span>
                    </button>
                  )}
                </div>

                <div className="font-semibold text-ctp-mauve mb-2">
                  Achievements:
                </div>
                <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8 ml-4">
                  {experiences[selectedExp].achievements.map(
                    (achievement, index) => (
                      <div
                        key={`project-${index}-${achievement.title}`}
                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all hover:bg-ctp-surface0 dark:hover:bg-ctp-surface0 border border-ctp-surface0 dark:border-ctp-surface1"
                      >
                        {achievement.icon && iconMap[achievement.icon] && (
                          <div className="flex-shrink-0 p-1.5 sm:p-2 bg-ctp-surface0 dark:bg-ctp-surface0 rounded-lg text-ctp-sky">
                            <div className="text-sm sm:text-base">
                              {iconMap[achievement.icon]}
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm sm:text-base mb-2 text-ctp-blue dark:text-ctp-sky">
                            {achievement.title}
                          </h4>
                          <ul className="text-xs sm:text-sm text-ctp-subtext1 dark:text-ctp-subtext0 leading-relaxed list-disc pl-4">
                            {achievement.description.map((desc, i) => (
                              <li
                                key={`${index}-${i}`}
                                className="marker:text-ctp-green"
                              >
                                <span className="text-ctp-subtext1 dark:text-ctp-subtext0">
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

                <div className="font-semibold text-ctp-mauve mb-2">
                  Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 ml-4 mb-4">
                  {experiences[selectedExp].technologies.map((tech, index) => (
                    <TechBadge tech={tech} key={`${tech}-${index}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
