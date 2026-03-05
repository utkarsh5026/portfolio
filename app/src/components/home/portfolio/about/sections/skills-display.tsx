import { Cloud, Code2, Monitor, Server, Wrench } from "lucide-react";
import { FC } from "react";

import Reveal from "@/components/animations/reveal/Reveal";

import { skills } from "../data/data";
import { skillColors,skillIcons } from "../data/icon-map";
import SectionHeader from "./about-header";

const categoryColors = {
  Frontend: { primary: "blue", secondary: "sapphire" },
  Backend: { primary: "green", secondary: "teal" },
  "DevOps & Cloud": { primary: "mauve", secondary: "lavender" },
  "Tools & Others": { primary: "peach", secondary: "yellow" },
} as const;

const categoryIcons = {
  Frontend: Monitor,
  Backend: Server,
  "DevOps & Cloud": Cloud,
  "Tools & Others": Wrench,
} as const;

const Skills: FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-ctp-surface0/10 rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <SectionHeader
            icon={Code2}
            color="red"
            title="Core Skills"
            subtitle="Technologies I work with daily"
          />

          {/* Skills Categories */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {skills.map((skillCategory, index) => {
              const colors =
                categoryColors[
                  skillCategory.category as keyof typeof categoryColors
                ];
              const Icon =
                categoryIcons[
                  skillCategory.category as keyof typeof categoryIcons
                ];

              return (
                <Reveal
                  key={skillCategory.category}
                  effect="slide-in"
                  direction="left"
                  delay={0.1 + index * 0.1}
                  duration={0.6}
                >
                  <div
                    className={`relative bg-ctp-surface0/20 rounded-xl sm:rounded-2xl border border-none overflow-hidden w-full`}
                  >
                    <div className="p-3 sm:p-4 md:p-5 border-b border-ctp-surface1/30">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div
                          className={`p-2 sm:p-2.5 rounded-lg bg-ctp-${colors.primary}/10 text-ctp-${colors.primary} flex-shrink-0`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-sm sm:text-base md:text-lg font-bold text-ctp-text leading-tight`}
                          >
                            {skillCategory.category}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <SkillsList skillCategory={skillCategory} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkillsListProps {
  skillCategory: (typeof skills)[number];
}

const SkillsList: FC<SkillsListProps> = ({ skillCategory }) => {
  return (
    <div className="p-3 sm:p-4 md:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {skillCategory.skills.map((skill) => {
          const SkillIcon = skillIcons[skill];
          const iconColor = skillColors[skill];

          return (
            <div
              key={skill}
              className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-ctp-surface0/30 transition-colors duration-200 group"
            >
              {SkillIcon && (
                <div className="flex-shrink-0" style={{ color: iconColor }}>
                  <SkillIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-medium text-ctp-text">
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
