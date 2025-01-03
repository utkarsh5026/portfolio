import React from "react";
import SkillCard from "./SkillCard";
import { Languages, Database, Server } from "lucide-react";
import Framework from "./Framework";
import Section from "@/components/base/Section";
import CurrentLearning from "./CurrentLearning";
import SkillCardMoving from "./SkillCardMoving";
import {
  currentLearningTechnologies,
  databases,
  languages,
  frameworks,
  tools,
} from "./data";

const Skills: React.FC = () => {
  return (
    <Section id="skills" label="Skills">
      <div className="flex flex-col gap-4">
        <SkillCardMoving />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 flex-2">
            <SkillCard
              skill="Languages"
              icon={<Languages className="w-4 h-4 mr-2" />}
              items={[...languages]}
            />
            <Framework frameworks={frameworks} />
            <SkillCard
              skill="Databases"
              icon={<Database className="w-4 h-4 mr-2" />}
              items={[...databases]}
            />
            <SkillCard
              skill="Tools"
              icon={<Server className="w-4 h-4 mr-2" />}
              items={[...tools]}
            />
          </div>
          <CurrentLearning technologies={currentLearningTechnologies} />
        </div>
      </div>
    </Section>
  );
};

export default Skills;
