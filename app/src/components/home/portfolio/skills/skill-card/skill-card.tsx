import { Reveal, type RevealEffect } from "@/components/animations";
import IconBox from "@/components/ui/icon-box";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import { AppColor } from "@/lib/ctp-colors";

import { skillCategories } from "../data";
import ExpandedSkillsContent from "./expanded-content";

interface SkillCardProps {
  category: (typeof skillCategories)[number];
  index: number;
}

const effects: RevealEffect[] = ["fade-up", "slide-in", "blur-in", "glide"];

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const currentEffect = effects[index % effects.length];
  const gitRef = useGitComponent(SkillCard);

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
          <IconBox
            color={category.color as AppColor}
            size="md"
            className={`bg-ctp-${category.color}/15`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              {category.icon}
            </div>
          </IconBox>
          <div className="min-w-0 flex-1">
            <Heading as="h4" className="leading-tight break-words">
              {category.title}
            </Heading>
            <Text variant="caption" className="mt-0.5 break-words">
              {category.description}
            </Text>
          </div>
        </div>

        {/* All Skills */}
        <ExpandedSkillsContent category={category} />
      </div>
    </Reveal>
  );
};

export default SkillCard;
