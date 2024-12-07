import React from "react";
import SkillCard from "./SkillCard";
import { Languages, Database, Server } from "lucide-react";
import Framework from "./Framework";
import Section from "@/components/base/Section";
import TechnologiesUsed from "./TechnologoiesUsed";
import SkillCardMoving from "./SkillCardMoving";

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
              items={["JavaScript", "TypeScript", "Python", "Java", "Golang"]}
            />
            <Framework
              frameworks={{
                "Javascript/Typescript": [
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "Socket.io",
                  "Express",
                ],
                Python: ["FastAPI", "Flask", "Django", "Pandas"],
                Golang: ["Gin", "Gorm"],
              }}
            />
            <SkillCard
              skill="Databases"
              icon={<Database className="w-4 h-4 mr-2" />}
              items={[
                "PostgreSQL",
                "SQLite",
                "MongoDB",
                "Redis",
                "Firebase",
                "Supabase",
              ]}
            />
            <SkillCard
              skill="Tools"
              icon={<Server className="w-4 h-4 mr-2" />}
              items={["Docker", "Git", "AWS", "Linux"]}
            />
          </div>
          <TechnologiesUsed technologies={[]} />
        </div>
      </div>
    </Section>
  );
};

export default Skills;
