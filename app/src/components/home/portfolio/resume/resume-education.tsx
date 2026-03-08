import React from "react";

import { education } from "@/components/home/portfolio/about/data/data";
import { Heading, Text } from "@/components/ui/text";

const ResumeEducation: React.FC = () => {
  return (
    <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
      <Heading
        as="h4"
        className="mb-4 text-xl border-b-2 border-ctp-surface2 pb-2 uppercase tracking-widest text-ctp-text"
      >
        Education
      </Heading>

      <div className="flex flex-col gap-4">
        {education.map((edu) => (
          <div key={edu.institution} className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div>
                <Text
                  as="span"
                  variant="subtitle"
                  className="text-base font-bold text-ctp-text transition-colors block"
                >
                  {edu.degree}
                </Text>
                <a
                  href={edu.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-subtext0 hover:text-ctp-text transition-colors text-sm  block"
                >
                  {edu.institution}
                </a>
              </div>
              <Text
                as="span"
                variant="caption"
                className="f text-ctp-overlay1 whitespace-nowrap"
              >
                {edu.duration}
              </Text>
            </div>
            {edu.highlights[0] && (
              <Text
                as="span"
                variant="caption"
                className="text-ctp-text font-medium"
              >
                {edu.highlights[0]}
              </Text>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeEducation;
