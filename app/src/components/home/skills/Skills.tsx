import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Sparkles } from "lucide-react";
import { skillCategories } from "./data";
import SkillCard from "./SkillCard";
import WhatDoIKnow from "./modal/WhatDoIKnow";
import Section from "@/components/section/Section";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section id="skills" label="Skills" icon="code">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-ctp-blue" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent">
              Technical Skills
            </h2>
          </div>

          <p className="text-ctp-subtext0 text-lg max-w-2xl mx-auto mb-8">
            Technologies and tools I use to bring ideas to life
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0/80 hover:bg-ctp-surface1/80 rounded-full text-ctp-text font-medium border border-ctp-surface1/50 hover:border-ctp-surface2/80 transition-all duration-300 backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4" />
            <span>My Journey</span>
          </motion.button>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-6 sm:gap-8">
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

        {/* Simple Modal */}
        {isModalOpen && (
          <WhatDoIKnow
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </Section>
  );
};

export default Skills;
