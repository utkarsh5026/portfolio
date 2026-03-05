import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";

import { sectionColorSchemes } from "./sec-utils";

type SectionColorScheme =
  (typeof sectionColorSchemes)[keyof typeof sectionColorSchemes];

interface SectionHeaderProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  colorScheme: SectionColorScheme;
  showHeader?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon: HeaderIcon,
  colorScheme,
  showHeader = false,
}) => {
  if (!showHeader || !title) {
    return null;
  }

  return (
    <Reveal effect="fade-up" duration={0.8}>
      <div className="flex flex-col items-start text-left mb-6 sm:mb-8 md:mb-10 font-source w-full">
        <div className="text-ctp-overlay1 text-sm sm:text-base md:text-lg w-full">
          <div className="flex items-center gap-2">
            <span>/**</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 ml-4">
            <span>*</span>
            {HeaderIcon && (
              <HeaderIcon
                className={`w-4 h-4 sm:w-5 sm:h-5 text-${colorScheme.primary}`}
              />
            )}
            <motion.h2
              className={`font-semibold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              @section {title}
            </motion.h2>
          </div>

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="ml-4 flex gap-2"
            >
              <span>*</span>
              <p className="max-w-2xl leading-relaxed">{description}</p>
            </motion.div>
          )}
          <div className="flex items-center gap-2">
            <span>*/</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default SectionHeader;
