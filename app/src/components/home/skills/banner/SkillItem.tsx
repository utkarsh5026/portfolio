import { motion } from "framer-motion";

interface SkillItemProps {
  skill: {
    icon: React.ReactNode;
    name: string;
  };
  isHovered: boolean;
  color: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, isHovered, color }) => {
  return (
    <motion.div
      className={`
                    flex items-center gap-2 px-3 py-1 rounded-full
                    bg-ctp-surface0/50 backdrop-blur-sm
                    border border-ctp-surface0 hover:border-ctp-${color}
                    transition-all duration-300
                    ${isHovered ? `shadow-md shadow-ctp-${color}/20` : ""}
                  `}
      animate={{
        scale: isHovered ? 1.05 : 1,
        y: isHovered ? -2 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon with dynamic color */}
      <div
        className={`
                    text-ctp-${color} text-xs sm:text-sm md:text-base
                    transition-all duration-300
                    ${isHovered ? "scale-110" : ""}
                  `}
      >
        {skill.icon}
      </div>

      {/* Skill name */}
      <span
        className={`
                    text-sm  font-medium
                    transition-colors duration-300
                    ${isHovered ? `text-ctp-${color}` : "text-ctp-text"}
                  `}
      >
        {skill.name}
      </span>

      {/* Hover indicator dot */}
      {isHovered && (
        <motion.div
          className={`absolute -right-1 -top-1 w-2 h-2 rounded-full bg-ctp-${color}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default SkillItem;
