import { LucideIcon } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import IconBox from "@/components/ui/icon-box";

interface SectionHeaderProps {
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  duration?: number;
  delay?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  color,
  title,
  subtitle,
  duration = 0.6,
  delay = 0,
}) => {
  return (
    <Reveal effect="fade-up" duration={duration} delay={delay}>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
        <IconBox color={color} size="xs">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </IconBox>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-ctp-subtext0">{subtitle}</p>
        </div>
      </div>
    </Reveal>
  );
};

export { SectionHeader };
export default SectionHeader;
