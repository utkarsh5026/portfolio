import React from "react";

import { skills } from "@/components/home/portfolio/about/data/data";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";

/** Two columns here so this section doesn't share the shape of its neighbours. */
const Skills: React.FC = () => (
  <SectionShell id="skills" title="Skills">
    <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
      {skills.map((group) => (
        <RevealOnScroll key={group.category}>
          <dt className="font-source text-[11px] uppercase tracking-[0.14em] text-ctp-overlay0">
            {group.category}
          </dt>
          <dd className="mt-2 text-[14px] leading-[1.7] text-ctp-subtext1">
            {group.skills.join(", ")}
          </dd>
        </RevealOnScroll>
      ))}
    </dl>
  </SectionShell>
);

export default Skills;
