import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Section from "@/components/section/Section";
import { databases, languages, tools } from "./data";
import { Languages, Database, Server, Code2, Sparkles } from "lucide-react";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import SkillCard from "./SkillCard";
import Framework from "./framework/Framework";
import SkillCardMoving from "./banner/SkillCardMoving";
import WhatDoIKnow from "./modal/WhatDoIKnow";
import { cn } from "@/lib/utils";
import Reveal from "@/components/animations/reveal/Reveal";
import useMobile from "@/hooks/use-mobile";

const SKILL_ID = "skills";

const Skills: React.FC = () => {
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobile();

  return (
    <Section id={SKILL_ID} label="Skills" icon="magic">
      <div ref={ref} className="max-w-6xl mx-auto relative flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Reveal effect="fade-up" duration={0.8}>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-ctp-blue to-ctp-lavender p-2 rounded-lg shadow-lg shadow-ctp-blue/10">
                <Sparkles className="w-5 h-5 text-ctp-base" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve">
                Technical Expertise
              </h2>
            </div>
          </Reveal>

          <Reveal
            effect="slide-in"
            direction="right"
            duration={0.8}
            delay={0.2}
          >
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "group flex items-center gap-2 px-4 py-2 rounded-lg relative z-50",
                "bg-gradient-to-r from-ctp-mauve/20 to-ctp-blue/20",
                "text-white shadow-md hover:shadow-lg transition-all duration-300 border border-white/10"
              )}
            >
              <span className="font-medium">What do you know 🤔</span>
            </button>
          </Reveal>
        </div>

        {!isMobile && (
          <Reveal effect="fade-up" duration={0.8} delay={0.3}>
            <div className="relative z-10 overflow-auto rounded-xl shadow-lg">
              <SkillCardMoving />
            </div>
          </Reveal>
        )}

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8 z-10">
              <Reveal effect="fade-up" duration={0.7} delay={0.4}>
                <OutlineNode
                  id="skills-programming-languages"
                  label="Programming Languages"
                  level={1}
                  parentId={SKILL_ID}
                  icon={<Languages className="w-3 h-3 text-ctp-pink" />}
                >
                  <SkillCard
                    skill="Programming Languages"
                    icon={<Languages className="w-5 h-5 text-ctp-pink" />}
                    items={[...languages]}
                    accentColor="lavender"
                    description="Core languages I use to bring ideas to life"
                  />
                </OutlineNode>
              </Reveal>

              <Reveal effect="fade-up" duration={0.7} delay={0.5}>
                <OutlineNode
                  id="skills-databases"
                  label="Databases"
                  level={1}
                  parentId={SKILL_ID}
                  icon={<Database className="w-3 h-3 text-ctp-lavender" />}
                >
                  <SkillCard
                    skill="Databases"
                    icon={<Database className="w-5 h-5 text-ctp-lavender" />}
                    items={[...databases]}
                    accentColor="blue"
                    description="Data storage solutions I'm experienced with"
                  />
                </OutlineNode>
              </Reveal>

              <Reveal effect="fade-up" duration={0.7} delay={0.6}>
                <OutlineNode
                  id="skills-devops-tools"
                  label="DevOps & Tools"
                  level={1}
                  parentId={SKILL_ID}
                  icon={<Server className="w-3 h-3 text-ctp-sky" />}
                >
                  <SkillCard
                    skill="DevOps & Tools"
                    icon={<Server className="w-5 h-5 text-ctp-sky" />}
                    items={[...tools]}
                    accentColor="teal"
                    description="Tools that power my development workflow"
                  />
                </OutlineNode>
              </Reveal>
            </div>

            <Reveal
              effect="slide-in"
              direction="right"
              duration={0.8}
              delay={0.4}
            >
              <OutlineNode
                id="skills-frameworks"
                label="Frameworks"
                level={1}
                parentId={SKILL_ID}
                icon={<Code2 className="w-3 h-3 text-ctp-peach" />}
              >
                <Framework />
              </OutlineNode>
            </Reveal>
          </div>
        </div>
      </div>

      <WhatDoIKnow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Section>
  );
};

export default Skills;
