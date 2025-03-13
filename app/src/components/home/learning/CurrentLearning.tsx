import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Section from "@/components/section/Section";
import { currentLearningTechnologies } from "./data";
import LearningModal from "./LearningModal";
import FeaturedLearnings from "./FeaturedLearnings";
import type { TechnologyLearning } from "@/types";
import ParticlesAnimation from "./ParticlesAnimation";
import "./LearningAnimations.css";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const CurrentLearning: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechnologyLearning | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <Section
      id="learning"
      label="Learning Journey"
      icon="code"
      glowAccent="blue"
    >
      <div className="relative flex flex-col w-full min-h-[700px] bg-gradient-to-b from-[#1e1e2e] to-[#232634] rounded-xl overflow-hidden shadow-2xl">
        <ParticlesAnimation particlesCount={30} />
        <div className="p-8 z-20 relative">
          <motion.h2
            className="text-4xl font-bold text-white mb-3 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve">
              Learning Universe
            </span>
            <Sparkles className="w-6 h-6 text-ctp-lavender" />
          </motion.h2>
          <motion.p
            className="text-[#c6d0f5] max-w-2xl text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            An interactive exploration of technologies I'm currently learning,
            organized by domain and interconnected through shared concepts.
          </motion.p>
        </div>

        <FeaturedLearnings
          categorizedTech={categorizedTech}
          handleTechSelect={handleTechSelect}
        />

        <LearningModal
          isModalOpen={isModalOpen}
          selectedTech={selectedTech}
          closeModal={closeModal}
        />
      </div>
    </Section>
  );
};

export default CurrentLearning;
