import React from "react";

import { skills } from "@/components/home/portfolio/about/data/data";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";

const Skills: React.FC = () => (
  <SectionShell id="skills" title="Skills">
    <dl className="flex flex-col gap-6">
      {skills.map((group) => (
        <RevealOnScroll key={group.category}>
          <dt className="font-source text-[12px] text-ctp-overlay1">
            {group.category}
          </dt>
          <dd className="mt-1 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
            {group.skills.join(", ")}
          </dd>
        </RevealOnScroll>
      ))}
    </dl>
  </SectionShell>
);

export default Skills;
