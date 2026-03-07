import { Reveal, type RevealEffect } from "@/components/animations";
import { useGitComponent } from "@/hooks/use-git-component";

import { skillCategories } from "../data";
import ExpandedSkillsContent from "./expanded-content";

interface SkillCardProps {
  category: (typeof skillCategories)[number];
  index: number;
}

const effects: RevealEffect[] = ["fade-up", "slide-in", "blur-in", "glide"];

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const currentEffect = effects[index % effects.length];
  const gitRef = useGitComponent("SkillCard");

  return (
    <Reveal
      effect={currentEffect}
      delay={index * 0.1}
      duration={0.5}
      className="group w-full"
    >
      <div
        ref={gitRef}
        className="bg-ctp-surface0/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border-none w-full overflow-hidden"
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
          <div
            className={`p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl bg-ctp-${category.color}/15 text-ctp-${category.color} flex-shrink-0`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              {category.icon}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-ctp-text leading-tight break-words">
              {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-ctp-subtext0 mt-0.5 break-words font-medium leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* All Skills */}
        <ExpandedSkillsContent category={category} />
      </div>
    </Reveal>
  );
};

export default SkillCard;
