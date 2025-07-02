import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaBuilding,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaChevronRight,
} from "react-icons/fa";
import { experiences } from "./experienceDump";
import useMobile from "@/hooks/use-mobile";

interface ExperienceHeaderProps {
  selectedExp: number;
}

const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ selectedExp }) => {
  const experience = experiences[selectedExp];
  const { isMobile } = useMobile();

  return (
    <div className="relative bg-transparent backdrop-blur-2xl">
      <div className={isMobile ? "p-4 pb-6" : "p-4 sm:p-5 md:p-6 lg:p-8"}>
        <div
          className={isMobile ? "space-y-4" : "flex flex-col gap-4 sm:gap-6"}
        >
          <div className="flex-1">
            {/* Main content section */}
            <div
              className={
                isMobile
                  ? "flex items-start gap-3 mb-4"
                  : "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
              }
            >
              {/* Company Logo */}
              <div className="relative flex-shrink-0">
                <div
                  className={
                    isMobile
                      ? "w-12 h-12 rounded-lg bg-ctp-surface0/80 backdrop-blur-sm border border-ctp-surface1/50 overflow-hidden ring-1 ring-ctp-surface0/30"
                      : "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-ctp-surface0/80 backdrop-blur-sm border border-ctp-surface1/50 overflow-hidden ring-2 ring-ctp-surface0/30"
                  }
                >
                  <img
                    src={experience.imageSrc}
                    alt={experience.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active indicator */}
                <div
                  className={
                    isMobile
                      ? "absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-ctp-green rounded-full border-2 border-ctp-base flex items-center justify-center"
                      : "absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-ctp-green rounded-full border-2 border-ctp-base flex items-center justify-center"
                  }
                >
                  <div
                    className={
                      isMobile
                        ? "w-1.5 h-1.5 bg-ctp-base rounded-full"
                        : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-ctp-base rounded-full"
                    }
                  />
                </div>
              </div>

              {/* Title and Company */}
              <div className="min-w-0 flex-1">
                <h2
                  className={
                    isMobile
                      ? "text-lg font-bold text-ctp-text mb-2 leading-tight break-words"
                      : "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-ctp-text mb-2 sm:mb-3 leading-tight break-words"
                  }
                >
                  {experience.position}
                </h2>

                <div
                  className={
                    isMobile
                      ? "flex flex-col gap-1 text-ctp-subtext0"
                      : "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-ctp-subtext0"
                  }
                >
                  <div className="flex items-center gap-2">
                    <FaBuilding
                      className={
                        isMobile
                          ? "w-3 h-3 text-ctp-blue flex-shrink-0"
                          : "w-4 h-4 sm:w-5 sm:h-5 text-ctp-blue flex-shrink-0"
                      }
                    />
                    <span
                      className={
                        isMobile ? "text-sm" : "text-sm sm:text-base md:text-lg"
                      }
                    >
                      at
                    </span>
                  </div>
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      isMobile
                        ? "text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1 font-medium text-sm break-words active:text-ctp-lavender"
                        : "text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1 font-medium text-base sm:text-lg md:text-xl break-words"
                    }
                  >
                    {experience.company}
                    <FaExternalLinkAlt
                      className={
                        isMobile
                          ? "w-2.5 h-2.5 opacity-70 flex-shrink-0"
                          : "w-3 h-3 sm:w-4 sm:h-4 opacity-70 flex-shrink-0"
                      }
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Duration Badge */}
            <div
              className={
                isMobile
                  ? "mb-4"
                  : "flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4"
              }
            >
              <Badge
                variant="outline"
                className={
                  isMobile
                    ? "bg-ctp-surface0/50 text-ctp-blue border-ctp-blue/30 px-3 py-2 hover:bg-ctp-surface1/50 text-sm self-start"
                    : "bg-ctp-surface0/50 text-ctp-blue border-ctp-blue/30 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-ctp-surface1/50 text-sm sm:text-base md:text-lg self-start"
                }
              >
                <FaCalendarAlt
                  className={
                    isMobile
                      ? "w-3 h-3 mr-2"
                      : "w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3"
                  }
                />
                {experience.duration}
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          {experience.docsUrl && (
            <motion.div
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              className={isMobile ? "w-full" : "self-start sm:self-end"}
            >
              <Button
                variant="default"
                className={
                  isMobile
                    ? "w-full bg-ctp-blue hover:bg-ctp-lavender active:bg-ctp-lavender text-ctp-base font-medium px-4 py-3 rounded-lg shadow-lg shadow-ctp-blue/20 hover:shadow-ctp-lavender/20 transition-all duration-300 border-none text-sm"
                    : "bg-ctp-blue hover:bg-ctp-lavender text-ctp-base font-medium px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg shadow-ctp-blue/20 hover:shadow-ctp-lavender/20 transition-all duration-300 border-none text-sm sm:text-base md:text-lg"
                }
                onClick={() => window.open(experience.docsUrl, "_blank")}
              >
                <FaFileAlt
                  className={
                    isMobile
                      ? "w-4 h-4 mr-2"
                      : "w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                  }
                />
                Show Project Info
                <FaChevronRight
                  className={
                    isMobile
                      ? "w-4 h-4 ml-2"
                      : "w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                  }
                />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceHeader;
