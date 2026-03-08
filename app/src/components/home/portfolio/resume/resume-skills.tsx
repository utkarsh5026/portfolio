import React from "react";

import { skillCategories } from "@/components/home/portfolio/skills/data";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";

const ResumeSkills: React.FC = () => {
  const ref = useGitComponent(ResumeSkills);

  return (
    <div ref={ref} className="animate-fadeIn">
      <Heading
        as="h4"
        className="mb-4 text-xl border-b-2 border-ctp-surface2 pb-2 uppercase tracking-widest text-ctp-text"
      >
        Skills
      </Heading>

      <div className="flex flex-col gap-3">
        {skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
          >
            <Text
              as="span"
              variant="caption"
              className=" font-bold text-ctp-text whitespace-nowrap sm:w-32 shrink-0 pt-0.5"
            >
              {cat.title}
            </Text>
            <div className="flex-1">
              <Text
                variant="muted"
                className="text-ctp-subtext0 text-sm leading-relaxed"
              >
                {cat.skills.map((s) => s.name).join(", ")}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSkills;
