import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Sparkles } from "lucide-react";
import { skillCategories } from "./data";
import SkillCard from "./skill-card/skill-card";
import SkillsJourney from "./skills-journey/skills-journey";
import Section from "@/components/section/Section";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";

const SkillsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section id="skills" label="Skills" icon="code">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 backdrop-blur-sm flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-ctp-blue" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent text-center break-words">
              Technical Skills
            </h2>
          </div>

          <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2 leading-relaxed break-words">
            Technologies and tools I use to bring ideas to life
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-ctp-surface0/80 hover:bg-ctp-surface1/80 rounded-full text-ctp-text font-medium border border-ctp-surface1/50 hover:border-ctp-surface2/80 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
          >
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>My Journey</span>
          </motion.button>
        </motion.div>

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
