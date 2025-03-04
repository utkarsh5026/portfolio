import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "./SkillCard";
import Framework from "./Framework";
import Section from "@/components/section/Section";
import { databases, languages, frameworks, tools } from "./data";
import { Languages, Database, Server, Code2 } from "lucide-react";
import SkillCardMovingComponent from "./SkillCardMoving";
import OutlineNode from "../editor/outline/OutlineNode";
import "./index.css";

const SKILL_ID = "skills";

const Skills: React.FC = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <Section id={SKILL_ID} label="Skills" icon="magic" matrix={true}>
      <div className="max-w-6xl mx-auto">
        <div className="mt-6 mb-12 text-center">
          <SkillCardMovingComponent />
        </div>
        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-6"
        >
          {/* Skill categories section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariant} className="flex flex-col gap-6">
              <OutlineNode
                id="skills-programming-languages"
                label="Programming Languages"
                level={1}
                parentId={SKILL_ID}
                icon={<Languages className="w-3 h-3 text-ctp-mauve" />}
              >
                <SkillCard
                  skill="Programming Languages"
                  icon={<Languages className="w-5 h-5 text-ctp-mauve" />}
                  items={[...languages]}
                  accentColor="mauve"
                />
              </OutlineNode>

              <OutlineNode
                id="skills-databases"
                label="Databases"
                level={1}
                parentId={SKILL_ID}
                icon={<Database className="w-3 h-3 text-ctp-sapphire" />}
              >
                <SkillCard
                  skill="Databases"
                  icon={<Database className="w-5 h-5 text-ctp-sapphire" />}
                  items={[...databases]}
                  accentColor="sapphire"
                />
              </OutlineNode>

              <OutlineNode
                id="skills-devops-tools"
                label="DevOps & Tools"
                level={1}
                parentId={SKILL_ID}
                icon={<Server className="w-3 h-3 text-ctp-teal" />}
              >
                <SkillCard
                  skill="DevOps & Tools"
                  icon={<Server className="w-5 h-5 text-ctp-teal" />}
                  items={[...tools]}
                  accentColor="teal"
                />
              </OutlineNode>
            </motion.div>
            <motion.div variants={itemVariant} className="mt-4">
              <OutlineNode
                id="skills-frameworks"
                label="Frameworks"
                level={1}
                parentId={SKILL_ID}
                icon={<Code2 className="w-3 h-3 text-ctp-red" />}
              >
                <Framework frameworks={frameworks} />
              </OutlineNode>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default Skills;
