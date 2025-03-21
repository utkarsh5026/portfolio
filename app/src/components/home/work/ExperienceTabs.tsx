import { motion } from "framer-motion";
import { experiences } from "./experienceDump";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ExperienceTabsProps {
  selectedExp: number;
  handleExperienceClick: (index: number) => void;
}

/**
 * ExperienceTabs component displays a list of experience tabs for the user to select from.
 * Each tab represents a work experience and includes the company name, duration, and an avatar.
 * When a tab is clicked, it triggers the handleExperienceClick function to update the selected experience.
 *
 * @param {ExperienceTabsProps} props - The properties for the ExperienceTabs component.
 * @param {number} props.selectedExp - The index of the currently selected experience.
 * @param {function} props.handleExperienceClick - A function to handle the click event on an experience tab.
 *
 * @returns {JSX.Element} The rendered ExperienceTabs component.
 */
const ExperienceTabs: React.FC<ExperienceTabsProps> = ({
  selectedExp,
  handleExperienceClick,
}) => {
  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <motion.button
          key={`${exp.duration}-${index}`}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300
                      ${
                        selectedExp === index
                          ? "bg-gradient-to-r from-ctp-lavender to-ctp-blue text-ctp-base shadow-lg shadow-ctp-lavender/20"
                          : "bg-ctp-mantle hover:bg-ctp-surface0 border border-ctp-surface0 hover:border-ctp-lavender/30"
                      }`}
          onClick={() => handleExperienceClick(index)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-10 h-10 ring-2 ring-offset-2 ring-offset-ctp-mantle ring-ctp-lavender/20">
                <AvatarImage src={exp.imageSrc} alt={exp.company} />
              </Avatar>
              <h3 className="font-bold text-lg">{exp.company}</h3>
            </div>
            <p className="text-sm opacity-80 mt-1">{exp.duration}</p>
            <div
              className={`h-0.5 w-0 bg-gradient-to-r from-ctp-lavender to-ctp-blue mt-3 transition-all duration-500 ${
                selectedExp === index ? "w-full" : ""
              }`}
            ></div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ExperienceTabs;
