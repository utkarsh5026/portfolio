import { motion } from "framer-motion";

interface SkillItemProps {
  skill: {
    icon: React.ReactNode;
    name: string;
  };
  color: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, color }) => {
  return (
    <motion.div
      className={`
        relative flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-ctp-surface0/50 backdrop-blur-sm
        border border-ctp-surface0
        cursor-default select-none
      `}
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <span className={`text-ctp-${color} text-sm md:text-base leading-none`}>
        {skill.icon}
      </span>
      <span className="text-sm font-medium text-ctp-subtext1 whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default SkillItem;
