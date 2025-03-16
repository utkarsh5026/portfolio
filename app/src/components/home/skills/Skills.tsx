import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "./SkillCard";
import Framework from "./Framework";
import Section from "@/components/section/Section";
import { databases, languages, frameworks, tools } from "./data";
import { Languages, Database, Server, Code2, Sparkles } from "lucide-react";
import SkillCardMovingComponent from "./SkillCardMoving";
import OutlineNode from "../editor/outline/OutlineNode";
import "./index.css";
import WhatDoIKnow from "./WhatDoIKnow";

const SKILL_ID = "skills";

const Skills: React.FC = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <Section id={SKILL_ID} label="Skills" icon="magic" matrix={true}>
      <div className="max-w-6xl mx-auto relative flex flex-col gap-6">
        {/* Container for the SkillCardMovingComponent with positioned button */}
        <div className="relative mb-12">
          {/* Positioned button on the right side above the moving component */}
          <div className="flex justify-end">
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-ctp-crust to-ctp-mantle text-white shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">What do you know 🤔</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <SkillCardMovingComponent />
          </div>
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
                icon={<Languages className="w-3 h-3 text-ctp-pink" />}
              >
                <SkillCard
                  skill="Programming Languages"
                  icon={<Languages className="w-5 h-5 text-ctp-pink" />}
                  items={[...languages]}
                  accentColor="lavender"
                />
              </OutlineNode>

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
                  accentColor="lavender"
                />
              </OutlineNode>

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
                />
              </OutlineNode>
            </motion.div>
            <motion.div variants={itemVariant} className="mt-4">
              <OutlineNode
                id="skills-frameworks"
                label="Frameworks"
                level={1}
                parentId={SKILL_ID}
                icon={<Code2 className="w-3 h-3 text-ctp-peach" />}
              >
                <Framework frameworks={frameworks} />
              </OutlineNode>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <WhatDoIKnow isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
