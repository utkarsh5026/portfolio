import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TechnologyLearning } from "@/types";
import { X } from "lucide-react";
import Section from "@/components/section/Section";
import { categoryInfo, currentLearningTechnologies } from "./data";
import LearningModal from "./LearningModal";
import FeaturedLearnings from "./FeaturedLearnings";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const CurrentLearning: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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

  console.log(categorizedTech);

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
      <div className="relative w-full h-[700px] bg-[#232634] rounded-xl overflow-hidden shadow-2xl border border-[#414559]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-8 z-20">
          <h2 className="text-4xl font-bold text-white mb-3">
            Learning Universe
          </h2>
          <p className="text-[#c6d0f5] max-w-2xl text-lg">
            An interactive exploration of technologies I'm currently learning,
            organized by domain and interconnected through shared concepts.
          </p>
        </div>

        {/* Technology items - show when category is selected */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <motion.button
                  className="absolute top-20 right-6 z-30 bg-[#414559] text-white p-2 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Category info */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-20 left-6 z-20 max-w-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: categoryInfo[selectedCategory].color,
                      }}
                    >
                      {categoryInfo[selectedCategory].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedCategory}
                      </h3>
                      <p className="text-[#c6d0f5]">
                        {categoryInfo[selectedCategory].description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Technology items in orbital pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {categorizedTech[selectedCategory]?.map((tech, index) => {
                    // Calculate position in a circle
                    const totalItems = categorizedTech[selectedCategory].length;
                    const angle = (index / totalItems) * Math.PI * 2;
                    const radius = 200; // pixels from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={tech.name}
                        className="absolute"
                        style={{
                          left: "calc(50% + " + x + "px)",
                          top: "calc(50% + " + y + "px)",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <motion.div
                          className="w-[180px] -translate-x-1/2 -translate-y-1/2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div
                            className="bg-[#303446] rounded-xl shadow-xl p-5 cursor-pointer border border-[#414559] backdrop-blur-sm hover:bg-[#353c54] transition-colors duration-300"
                            style={{
                              boxShadow: `0 10px 25px -5px ${categoryInfo[selectedCategory].color}20`,
                            }}
                            onClick={() => handleTechSelect(tech)}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${categoryInfo[selectedCategory].color}, ${categoryInfo[selectedCategory].hoverColor})`,
                                }}
                              >
                                <div className="text-[#232634]">
                                  {tech.icon}
                                </div>
                              </div>
                              <h4 className="font-bold text-white">
                                {tech.name}
                              </h4>
                            </div>
                            <div className="border-t border-[#414559] pt-3 mt-2">
                              <p className="text-[#c6d0f5] text-sm line-clamp-2">
                                {tech.description.substring(0, 80)}...
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FeaturedLearnings
          categorizedTech={categorizedTech}
          handleTechSelect={handleTechSelect}
          selectedCategory={selectedCategory}
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
