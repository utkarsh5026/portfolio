import { Sparkles } from "lucide-react";
import { skillCategories } from "./data";
import SkillCard from "./skill-card/skill-card";
import Section from "@/components/section/portfolio-section";
import { OutlineNode } from "@/components/home/editor/outline";

const SkillsSection: React.FC = () => {
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
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Skills Grid */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-5">
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
      </div>
    </Section>
  );
};

export default SkillsSection;
