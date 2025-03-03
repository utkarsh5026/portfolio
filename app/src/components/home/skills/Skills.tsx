import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "./SkillCard";
import Framework from "./Framework";
import Section from "@/components/base/Section";
import { databases, languages, frameworks, tools } from "./data";
import { Languages, Database, Server } from "lucide-react";
import SkillCardMovingComponent from "./SkillCardMoving";
import "./index.css";

const Skills: React.FC = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Trigger animations when section is in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
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

  return (
    <Section id="skills" label="Skills" icon="magic" matrix={true}>
      <div className="max-w-6xl mx-auto">
        {/* Section introduction */}
        <div className="mt-6 mb-12 text-center">
          <SkillCardMovingComponent />
        </div>

        {/* Skills grid with animations */}
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
              <SkillCard
                skill="Programming Languages"
                icon={<Languages className="w-5 h-5 text-ctp-mauve" />}
                items={[...languages]}
                accentColor="mauve"
              />

              <SkillCard
                skill="Databases"
                icon={<Database className="w-5 h-5 text-ctp-sapphire" />}
                items={[...databases]}
                accentColor="sapphire"
              />

              <SkillCard
                skill="DevOps & Tools"
                icon={<Server className="w-5 h-5 text-ctp-teal" />}
                items={[...tools]}
                accentColor="teal"
              />
            </motion.div>
            <motion.div variants={itemVariant} className="mt-4">
              <Framework frameworks={frameworks} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Skills;
