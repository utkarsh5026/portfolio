import { skillCategories } from "../data";

interface ExpandedSkillsContentProps {
  category: (typeof skillCategories)[number];
}

const ExpandedSkillsContent: React.FC<ExpandedSkillsContentProps> = ({
  category,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center gap-2 px-3 py-2 bg-ctp-surface1/15 hover:bg-ctp-surface1/30 rounded-lg transition-all duration-200 border-none group/skill"
        >
          <div
            className={`text-ctp-${skill.color} flex-shrink-0 group-hover/skill:scale-110 transition-transform duration-200`}
          >
            <div className="w-4 h-4">{skill.icon}</div>
          </div>
          <span className="text-sm text-ctp-subtext1 group-hover/skill:text-ctp-text font-medium transition-colors duration-200">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExpandedSkillsContent;
