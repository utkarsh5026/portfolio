import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "@/components/section/Section";
import { databases, languages, frameworks, tools } from "./data";
import { Languages, Database, Server, Code2, Sparkles } from "lucide-react";
import OutlineNode from "../editor/outline/OutlineNode";
import "./index.css";

import SkillCard from "./SkillCard";
import Framework from "./Framework";
import SKillCardMoving from "./SkillCardMoving";
import WhatDoIKnow from "./WhatDoIKnow";

const SKILL_ID = "skills";

const Skills: React.FC = () => {
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
    <Section id={SKILL_ID} label="Skills" icon="magic">
      <div className="max-w-6xl mx-auto relative flex flex-col gap-8">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-ctp-mauve/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-ctp-blue/5 blur-3xl animate-pulse-slow"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-r from-ctp-blue to-ctp-lavender p-2 rounded-lg shadow-lg shadow-ctp-blue/10">
              <Sparkles className="w-5 h-5 text-ctp-base" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve">
              Technical Expertise
            </h2>
          </motion.div>

          <motion.button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-ctp-mauve/20 to-ctp-blue/20 text-white shadow-md hover:shadow-lg transition-all duration-300 border border-white/10"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-medium">What do you know 🤔</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 overflow-hidden rounded-xl shadow-lg"
        >
          <SKillCardMoving />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariant}
              className="flex flex-col gap-8 z-10"
            >
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
            </motion.div>

            <motion.div variants={itemVariant} className="z-10">
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
      delayChildren: 0.3,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.45, 0.27, 0.9],
    },
  },
};

export default Skills;
