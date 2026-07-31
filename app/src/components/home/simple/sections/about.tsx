import React from "react";

import {
  focusAreas,
  interests,
  philosophy,
} from "@/components/home/portfolio/about/data/data";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";

const About: React.FC = () => (
  <SectionShell id="about" title="About">
    <div className="flex flex-col gap-8">
      <RevealOnScroll>
        <div className="flex max-w-[38rem] flex-col gap-4">
          {philosophy.map((line) => (
            <p
              key={line}
              className="text-[14px] leading-[1.75] text-ctp-subtext0"
            >
              {line}
            </p>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="font-source text-[12px] text-ctp-overlay1">
          Working towards
        </p>
        <p className="mt-1 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
          {focusAreas.join(". ")}.
        </p>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="font-source text-[12px] text-ctp-overlay1">
          Away from the keyboard
        </p>
        <p className="mt-1 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
          {[...interests.technical, ...interests.nonTechnical].join(", ")}.
        </p>
      </RevealOnScroll>
    </div>
  </SectionShell>
);

export default About;
