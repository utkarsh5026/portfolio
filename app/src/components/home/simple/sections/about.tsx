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
    <div className="flex flex-col gap-10">
      <RevealOnScroll>
        <div className="flex max-w-[36rem] flex-col gap-4">
          {philosophy.map((line, index) => (
            <p
              key={line}
              className={
                index === 0
                  ? "text-[16px] leading-[1.7] text-ctp-subtext1"
                  : "text-[14px] leading-[1.75] text-ctp-subtext0"
              }
            >
              {line}
            </p>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="font-source text-[11px] uppercase tracking-[0.14em] text-ctp-overlay0">
          Working towards
        </p>
        <ul className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <li
              key={area}
              className="text-[14px] leading-[1.6] text-ctp-subtext0"
            >
              {area}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="font-source text-[11px] uppercase tracking-[0.14em] text-ctp-overlay0">
          Away from the keyboard
        </p>
        <ul className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {[...interests.technical, ...interests.nonTechnical].map((item) => (
            <li
              key={item}
              className="text-[14px] leading-[1.6] text-ctp-subtext0"
            >
              {item}
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </div>
  </SectionShell>
);

export default About;
