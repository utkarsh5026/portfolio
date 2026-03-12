import { ArrowRight, ChevronDown } from "lucide-react";

import { AppColor } from "@/lib/ctp-colors";

import styles from "./about.module.css";

interface AboutSectionCardProps {
  section: {
    title: string;
    description: string;
    color: AppColor;
    gradient: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index: number;
  totalSections: number;
  isMobile: boolean;
  isOpen: boolean;
}

const AboutSectionCard: React.FC<AboutSectionCardProps> = ({
  section,
  index,
  totalSections,
  isMobile,
  isOpen,
}) => {
  const Icon = section.icon;

  return (
    <div className="relative w-full group">
      <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-ctp-mantle to-ctp-crust hover:bg-ctp-surface0/30 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:shadow-ctp-surface0/20">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${section.gradient} border-2 border-ctp-${section.color}/30 group-hover:border-ctp-${section.color}/60 transition-all duration-300 flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 text-ctp-${section.color}`} />
            </div>
          </div>

          {/* Connector line for desktop */}
          {!isMobile && index < totalSections - 1 && (
            <div className="absolute left-[19px] top-12 w-px h-6 bg-gradient-to-b from-ctp-surface2/50 to-transparent" />
          )}
        </div>

        {/* Center section: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`text-lg font-semibold text-ctp-text group-hover:text-ctp-${section.color} transition-colors duration-300`}
            >
              {section.title}
            </h3>
          </div>
          <p className="text-sm text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors duration-300">
            {section.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isMobile ? (
            <div className="flex items-center gap-1 text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          ) : (
            <div
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            >
              <ChevronDown
                className={`w-5 h-5 text-ctp-subtext0 group-hover:text-ctp-${section.color} transition-colors duration-300`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSectionCard;
