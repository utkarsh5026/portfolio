import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { sectionColorSchemes } from "./sec-utils";

type SectionColorScheme =
  (typeof sectionColorSchemes)[keyof typeof sectionColorSchemes];

interface SectionFooterProps {
  title?: string;
  colorScheme: SectionColorScheme;
  showHeader?: boolean;
}

const SectionFooter: React.FC<SectionFooterProps> = ({
  title,
  showHeader = false,
}) => {
  if (!showHeader || !title) {
    return null;
  }

  return (
    <Reveal effect="fade-up" duration={0.8}>
      <div className="flex flex-col items-start text-left mt-10 mb-2 font-source w-full opacity-70 hover:opacity-100 transition-opacity duration-300">
        <div className="text-ctp-overlay1 text-sm sm:text-base md:text-lg w-full">
          <div className="flex items-center gap-2">
            <span>/**</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 ml-4">
            <span>*</span>
            <span className="text-ctp-mauve font-semibold italic">
              Thank you for reading the{" "}
              <span className="text-ctp-green">@{title}</span> section.
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 ml-4">
            <span>*</span>
            <span className="text-ctp-subtext0">
              Feel free to explore other files in the explorer!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>*/</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default SectionFooter;
