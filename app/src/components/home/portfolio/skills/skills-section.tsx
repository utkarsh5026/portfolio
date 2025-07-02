import { useState } from "react";
import { Sparkles } from "lucide-react";
import { skillCategories } from "./data";
import SkillCard from "./skill-card/skill-card";
import SkillsJourney from "./skills-journey/skills-journey";
import Section from "@/components/section/portfolio-section";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";

const SkillsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section
      id="skills"
      label="Skills"
      title="Technical Skills"
      description="Technologies and tools I use to bring ideas to life"
      headerIcon={Sparkles}
      icon="code"
      showHeader={true}
    >
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Skills Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <OutlineNode
              key={category.id}
              id={category.id}
              level={1}
              label={category.title}
              parentId="skills"
            >
              <SkillCard key={category.id} category={category} index={index} />
            </OutlineNode>
          ))}
        </div>

        <SkillsJourney
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Section>
  );
};

export default SkillsSection;
