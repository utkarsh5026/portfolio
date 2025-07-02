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
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
        <div className="flex flex-col items-center justify-center gap-2 mb-3 sm:mb-4">
          {HeaderIcon && (
            <motion.div
              className={`p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-${colorScheme.primary}/20 to-${colorScheme.secondary}/20 backdrop-blur-sm flex-shrink-0`}
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <HeaderIcon
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-${colorScheme.primary}`}
              />
            </motion.div>
          )}

          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent text-center leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h2>
        </div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 mb-4 sm:mb-6 px-1"
          >
            <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2 leading-relaxed text-center">
              {description}
            </p>
          </motion.div>
        )}

        {/* Animated decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`h-px bg-gradient-to-r from-transparent via-${colorScheme.primary}/50 to-transparent mx-auto w-24 sm:w-32 md:w-48 lg:w-64`}
        />
      </div>
    </Reveal>
  );
};

export default SectionHeader;
