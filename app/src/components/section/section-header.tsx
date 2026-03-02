import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
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
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
          {HeaderIcon && (
            <HeaderIcon
              className={`w-5 h-5 sm:w-6 sm:h-6 text-${colorScheme.primary}`}
            />
          )}

          <motion.h2
            className={`text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h2>
        </div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="px-4"
          >
            <p className="text-ctp-subtext1 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;
