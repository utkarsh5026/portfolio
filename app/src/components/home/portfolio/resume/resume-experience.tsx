import { Building, ExternalLink } from "lucide-react";
import React from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import { experiences } from "@/components/home/portfolio/work/experienceDump";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";

const ResumeExperience: React.FC = () => {
  const ref = useGitComponent(ResumeExperience);

  return (
    <div
      ref={ref}
      className="animate-fadeIn"
      style={{ animationDelay: "0.1s" }}
    >
      <OutlineNode
        label="Experience"
        icon={<Building className="w-3 h-3" />}
        iconColor="green"
      >
        <Heading
          as="h4"
          className="mb-4 text-xl border-b-2 border-ctp-surface2 pb-2 uppercase tracking-widest text-ctp-text"
        >
          Experience
        </Heading>

        <div className="flex flex-col gap-6">
          {experiences.map((exp) => (
            <div key={exp.company} className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group"
                  >
                    <Heading
                      as="h3"
                      className="text-base font-bold text-ctp-text group-hover:text-ctp-subtext0 transition-colors"
                    >
                      {exp.company}
                    </Heading>
                    <ExternalLink className="w-3 h-3 text-ctp-overlay0 group-hover:text-ctp-text transition-colors" />
                  </a>
                  <Text
                    variant="subtitle"
                    className="text-ctp-subtext0  text-sm"
                  >
                    {exp.position}
                  </Text>
                </div>
                <Text
                  as="span"
                  variant="caption"
                  className=" text-ctp-overlay1 whitespace-nowrap"
                >
                  {exp.duration}
                </Text>
              </div>

              <ul className="flex flex-col gap-1 mb-3">
                {exp.achievements.map((ach, index) => (
                  <li key={ach.title} className="flex items-start gap-2">
                    <div>
                      <Text
                        as="span"
                        variant="caption"
                        className="text-ctp-text font-semibold mr-1"
                      >
                        {`${index + 1}. ${ach.title}:`}
                      </Text>
                      <Text
                        as="span"
                        variant="caption"
                        className="text-ctp-subtext0"
                      >
                        {ach.description[0]}
                      </Text>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-xs  text-ctp-overlay0"
                  >
                    {tech}
                    {index < exp.technologies.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OutlineNode>
    </div>
  );
};

export default ResumeExperience;
