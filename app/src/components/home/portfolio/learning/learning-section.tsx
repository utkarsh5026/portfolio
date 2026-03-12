import { BookOpen, FolderOpen, Lightbulb } from "lucide-react";
import React, { useEffect, useState } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/home/editor/section/portfolio-section";
import QuoteBlock from "@/components/ui/quote-block";
import { useGitComponent } from "@/hooks/use-git-component";
import type { TechnologyLearning } from "@/types";

import { currentLearningTechnologies } from "./data";
import styles from "./learning.module.css";
import LearningCard from "./learning-card";
import LearningJourney from "./learning-journey/learning-journey";
import LearningModal from "./learning-project-drawer";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const categorizedTech = currentLearningTechnologies.reduce(
  (acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  },
  {} as Record<Category, TechnologyLearning[]>
);

const CurrentLearning: React.FC = () => {
  const ref = useGitComponent(CurrentLearning);
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
    <Section
      id="learning"
      label="Learning Journey"
      title="Current Learning"
      description="Exploring new technologies and building projects to expand my knowledge"
      headerIcon={BookOpen}
      icon="code"
      showHeader={true}
    >
      <div ref={ref} className="w-full max-w-6xl mx-auto px-4 py-12">
        <Reveal effect="fade-up" duration={0.7} delay={0.1}>
          <QuoteBlock
            quote="Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
            attribution="— Martin Fowler"
            className="mb-8"
          />
        </Reveal>
        <Reveal
          effect="blur-in"
          duration={0.6}
          delay={0.2}
          className="text-center mb-8"
        >
          <button
            onClick={() => setIsJourneyOpen(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0/80 hover:bg-ctp-surface1/80 rounded-full text-ctp-text font-medium border border-ctp-surface1/50 hover:border-ctp-peach/80 transition-all duration-300 backdrop-blur-sm ${styles.interactiveBtn}`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Learning Journey</span>
          </button>
        </Reveal>

        {/* Category Sections */}
        <div className="space-y-12">
          {Object.entries(categorizedTech).map(
            ([category, techs], categoryIndex) => (
              <OutlineNode
                key={category}
                label={category}
                icon={
                  <FolderOpen
                    className={`w-3 h-3 text-ctp-${getCategoryColor(category)}`}
                  />
                }
              >
                <Reveal
                  effect="rise"
                  delay={categoryIndex * 0.15}
                  duration={0.7}
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
                      <OutlineNode
                        key={tech.name}
                        label={tech.name}
                        icon={tech.icon}
                      >
                        <LearningCard
                          tech={tech}
                          category={category}
                          onSelect={handleTechSelect}
                          delay={categoryIndex * 0.1 + techIndex * 0.05}
                          categoryColor={getCategoryColor(category)}
                        />
                      </OutlineNode>
                    ))}
                  </div>
                </Reveal>
              </OutlineNode>
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
