import React from "react";

import {
  background,
  focusAreas,
  interests,
  philosophy,
} from "@/components/home/portfolio/about/data/data";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";

const About: React.FC = () => (
  <SectionShell id="about" title="About" accentClass="bg-ctp-lavender">
    <div className="flex flex-col gap-10">
      <RevealOnScroll>
        <dl className="flex flex-col gap-4">
          {background.map((item) => (
            <div
              key={item.question}
              className="sm:grid sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <dt className="font-source text-xs text-ctp-overlay1 sm:pt-0.5">
                {item.question}
              </dt>
              <dd className="mt-1 text-[13px] sm:mt-0 sm:text-sm leading-relaxed text-ctp-subtext0">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </RevealOnScroll>

      <RevealOnScroll>
        <h3 className="font-source text-xs uppercase tracking-wider text-ctp-overlay1">
          How I work
        </h3>
        <div className="mt-3 flex flex-col gap-3 border-l-2 border-ctp-lavender/30 pl-5">
          {philosophy.map((line) => (
            <p
              key={line}
              className="text-[13px] sm:text-sm leading-relaxed text-ctp-subtext0"
            >
              {line}
            </p>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <h3 className="font-source text-xs uppercase tracking-wider text-ctp-overlay1">
          Current focus
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <li
              key={area}
              className="flex gap-2.5 text-[13px] leading-relaxed text-ctp-subtext0"
            >
              <span
                className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ctp-lavender"
                aria-hidden
              />
              {area}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll>
        <h3 className="font-source text-xs uppercase tracking-wider text-ctp-overlay1">
          Outside the editor
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...interests.technical, ...interests.nonTechnical].map((item) => (
            <span
              key={item}
              className="rounded-full border border-ctp-surface0 px-3 py-1 text-[12px] text-ctp-subtext0"
            >
              {item}
            </span>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </SectionShell>
);

export default About;
