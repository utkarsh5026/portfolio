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

interface ExperienceHeaderProps {
  selectedExp: number;
}

const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ selectedExp }) => {
  const experience = experiences[selectedExp];

  return (
    <div className="relative mb-4 sm:mb-6 md:mb-8">
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ctp-crust/50 via-ctp-mantle/30 to-ctp-crust/50 rounded-xl sm:rounded-2xl -z-10" />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-ctp-surface0/80 backdrop-blur-sm border border-ctp-surface1/50 overflow-hidden ring-2 ring-ctp-surface0/30">
                  <img
                    src={experience.imageSrc}
                    alt={experience.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-ctp-green rounded-full border-2 border-ctp-base flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ctp-base rounded-full" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-ctp-text mb-1 sm:mb-2 leading-tight break-words">
                  {experience.position}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-ctp-subtext0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FaBuilding className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-blue flex-shrink-0" />
                    <span className="text-xs sm:text-sm">at</span>
                  </div>
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1 font-medium text-sm sm:text-base break-words"
                  >
                    {experience.company}
                    <FaExternalLinkAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-70 flex-shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Duration and status */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
              <Badge
                variant="outline"
                className="bg-ctp-surface0/50 text-ctp-blue border-ctp-blue/30 px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-ctp-surface1/50 text-xs sm:text-sm self-start"
              >
                <FaCalendarAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-2" />
                {experience.duration}
              </Badge>

              <Badge
                variant="outline"
                className="bg-ctp-green/10 text-ctp-green border-ctp-green/30 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm self-start"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ctp-green rounded-full mr-1 sm:mr-2 animate-pulse" />
                Experience Completed
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          {experience.docsUrl && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="self-start sm:self-end"
            >
              <Button
                variant="default"
                className="bg-ctp-blue hover:bg-ctp-lavender text-ctp-base font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg shadow-ctp-blue/20 hover:shadow-ctp-lavender/20 transition-all duration-300 border-none text-sm sm:text-base"
                onClick={() => window.open(experience.docsUrl, "_blank")}
              >
                <FaFileAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                View Details
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceHeader;
