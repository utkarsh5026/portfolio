import { FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { experiences } from "./experienceDump";

interface ExperienceHeaderProps {
  selectedExp: number;
}

/**
 * ExperienceHeader component displays the header information for a selected work experience.
 * It includes the position held, the company name with a link to the company's website,
 * and the duration of the experience. If available, it also provides a link to detailed
 * documentation of the experience.
 *
 * @param {ExperienceHeaderProps} props - The properties for the ExperienceHeader component.
 * @param {number} props.selectedExp - The index of the selected experience from the experiences array,
 * which determines which experience details to display.
 *
 * @returns {JSX.Element} The rendered ExperienceHeader component.
 */
const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ selectedExp }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-ctp-surface0">
      <div>
        <h3 className="text-xl font-bold text-ctp-lavender mb-1">
          {experiences[selectedExp].position}
        </h3>
        <div className="flex items-center gap-2 text-ctp-subtext0">
          <span>at</span>
          <a
            href={experiences[selectedExp].companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1"
          >
            {experiences[selectedExp].company}
            <FaExternalLinkAlt className="text-xs opacity-70" />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-ctp-surface0 text-ctp-blue">
          {experiences[selectedExp].duration}
        </div>

        {experiences[selectedExp].docsUrl && (
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full 
                                  bg-ctp-blue text-ctp-base hover:bg-ctp-lavender 
                                  transition-colors shadow-md shadow-ctp-blue/20"
            href={experiences[selectedExp].docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View detailed experience"
          >
            <FaFileAlt className="text-xs" />
            <span>Details</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ExperienceHeader;
