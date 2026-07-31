import React from "react";

import { skills } from "@/components/home/portfolio/about/data/data";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";

const Skills: React.FC = () => (
  <SectionShell
    id="skills"
    title="Skills"
    accentClass="bg-ctp-green"
    eyebrow={`${skills.reduce((total, group) => total + group.skills.length, 0)} technologies across ${skills.length} areas`}
  >
    <dl className="flex flex-col divide-y divide-ctp-surface0 border-y border-ctp-surface0">
      {skills.map((group, index) => (
        <RevealOnScroll key={group.category} delay={index * 0.05}>
          <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt className="font-source text-xs uppercase tracking-wider text-ctp-overlay1 sm:pt-1">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-x-2.5 gap-y-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-ctp-surface0/40 px-2.5 py-1 text-[12px] font-medium text-ctp-subtext1"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        </RevealOnScroll>
      ))}
    </dl>
  </SectionShell>
);

export default Skills;
