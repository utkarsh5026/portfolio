import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import Section from "@/components/section/Section";
import { currentLearningTechnologies } from "./data";
import LearningModal from "./LearningModal";
import LearningJourney from "./LearningJourney";
import type { TechnologyLearning } from "@/types";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const CurrentLearning: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechnologyLearning | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  const categorizedTech = currentLearningTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<Category, TechnologyLearning[]>);

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
        {/* Clean Header */}
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

// Helper function to get category colors
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

// LearningCard.tsx - Clean, modern card design
interface LearningCardProps {
  tech: TechnologyLearning;
  category: string;
  onSelect: (tech: TechnologyLearning) => void;
  delay?: number;
}

const LearningCard: React.FC<LearningCardProps> = ({
  tech,
  category,
  onSelect,
  delay = 0,
}) => {
  const categoryColor = getCategoryColor(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onSelect(tech)}
    >
      <div className="h-full bg-ctp-surface0/50 backdrop-blur-sm rounded-2xl p-6 border border-ctp-surface1/50 hover:border-ctp-surface2/80 transition-all duration-300 hover:bg-ctp-surface0/80">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} group-hover:scale-105 transition-transform duration-300`}
          >
            {tech.icon}
          </div>

          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ x: 2 }}
          >
            <ArrowRight className="w-4 h-4 text-ctp-subtext0" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ctp-text group-hover:text-ctp-lavender transition-colors duration-300">
            {tech.name}
          </h3>

          <p className="text-sm text-ctp-subtext0 line-clamp-3 leading-relaxed">
            {tech.description}
          </p>

          {/* Learning Goals Preview */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-1 h-1 rounded-full bg-ctp-${categoryColor}`} />
              <span className="text-xs font-medium text-ctp-subtext1">
                Learning Focus
              </span>
            </div>
            <p className="text-xs text-ctp-subtext0 line-clamp-2">
              {tech.learningGoals[0]}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-ctp-surface1/30">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} font-medium`}
            >
              {category}
            </span>

            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full bg-ctp-${categoryColor}`}
              />
              <span className="text-xs text-ctp-subtext0">Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentLearning;
