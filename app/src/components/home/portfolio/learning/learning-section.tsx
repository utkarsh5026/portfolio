import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb } from "lucide-react";
import Section from "@/components/section/Section";
import { currentLearningTechnologies } from "./data";
import LearningModal from "./learning-project-drawer";
import LearningJourney from "./learning-journey/learning-journey";
import type { TechnologyLearning } from "@/types";
import LearningCard from "./learning-card";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const categorizedTech = currentLearningTechnologies.reduce((acc, tech) => {
  if (!acc[tech.category]) {
    acc[tech.category] = [];
  }
  acc[tech.category].push(tech);
  return acc;
}, {} as Record<Category, TechnologyLearning[]>);

const CurrentLearning: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechnologyLearning | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  const handleTechSelect = (tech: TechnologyLearning) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <Section id="learning" label="Learning Journey" icon="code">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-ctp-green/20 to-ctp-teal/20 backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-ctp-green" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-ctp-green via-ctp-teal to-ctp-blue bg-clip-text text-transparent">
              Current Learning
            </h2>
          </div>

          <p className="text-ctp-subtext0 text-lg max-w-2xl mx-auto mb-8">
            Exploring new technologies and building projects to expand my
            knowledge
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsJourneyOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0/80 hover:bg-ctp-surface1/80 rounded-full text-ctp-text font-medium border border-ctp-surface1/50 hover:border-ctp-surface2/80 transition-all duration-300 backdrop-blur-sm"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Learning Journey</span>
          </motion.button>
        </motion.div>

        {/* Category Sections */}
        <div className="space-y-12">
          {Object.entries(categorizedTech).map(
            ([category, techs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ctp-surface1 to-transparent" />
                  <div className="flex items-center gap-2 px-4 py-2 bg-ctp-surface0/50 rounded-full border border-ctp-surface1/50">
                    <div
                      className={`w-2 h-2 rounded-full bg-ctp-${getCategoryColor(
                        category
                      )}`}
                    />
                    <span className="text-sm font-medium text-ctp-text">
                      {category}
                    </span>
                    <span className="text-xs text-ctp-subtext0">
                      ({techs.length})
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ctp-surface1 to-transparent" />
                </div>

                {/* Technology Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techs.map((tech, techIndex) => (
                    <LearningCard
                      key={tech.name}
                      tech={tech}
                      category={category}
                      onSelect={handleTechSelect}
                      delay={categoryIndex * 0.1 + techIndex * 0.05}
                      categoryColor={getCategoryColor(category)}
                    />
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Modals */}
        <LearningModal
          isModalOpen={isModalOpen}
          selectedTech={selectedTech}
          closeModal={closeModal}
        />

        <LearningJourney
          isOpen={isJourneyOpen}
          onClose={() => setIsJourneyOpen(false)}
        />
      </div>
    </Section>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Database: "blue",
    Backend: "mauve",
    Frontend: "red",
    DevOps: "teal",
    "AI/ML": "pink",
  };
  return colors[category] || "text";
};

export default CurrentLearning;
