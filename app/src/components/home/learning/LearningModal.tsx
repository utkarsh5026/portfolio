import { TechnologyLearning } from "@/types";
import React from "react";
import { ArrowRight, X, ExternalLink, Target, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LearningModalProps {
  selectedTech: TechnologyLearning | null;
  closeModal: () => void;
  isModalOpen: boolean;
}

const LearningModal: React.FC<LearningModalProps> = ({
  selectedTech,
  closeModal,
  isModalOpen,
}) => {
  if (!selectedTech) return null;

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

  const categoryColor = getCategoryColor(selectedTech.category);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] bg-ctp-base rounded-3xl border border-ctp-surface1/50 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 sm:p-8 border-b border-ctp-surface1/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl bg-ctp-${categoryColor}/10 text-ctp-${categoryColor}`}
                  >
                    {selectedTech.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-ctp-text mb-1">
                      {selectedTech.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-3 py-1 rounded-full bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} font-medium`}
                      >
                        {selectedTech.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-ctp-${categoryColor}`}
                        />
                        <span className="text-sm text-ctp-subtext0">
                          Currently Learning
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  title="Close"
                  className="p-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh] p-6 sm:p-8 space-y-6">
              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-ctp-blue" />
                  <h3 className="font-semibold text-ctp-text">Overview</h3>
                </div>
                <p className="text-ctp-subtext0 leading-relaxed">
                  {selectedTech.description}
                </p>
              </motion.section>

              {/* Learning Goals */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-ctp-green" />
                  <h3 className="font-semibold text-ctp-text">
                    Learning Goals
                  </h3>
                </div>

                <div className="space-y-3">
                  {selectedTech.learningGoals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3 p-4 bg-ctp-surface0/30 rounded-xl border border-ctp-surface1/30 hover:bg-ctp-surface0/50 transition-colors duration-200"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-ctp-${categoryColor} mt-2 flex-shrink-0`}
                      />
                      <p className="text-sm text-ctp-subtext0 leading-relaxed">
                        {goal}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Footer */}
            {selectedTech.repoLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="p-6 sm:p-8 border-t border-ctp-surface1/50"
              >
                <a
                  href={selectedTech.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-ctp-${categoryColor}/10 hover:bg-ctp-${categoryColor}/20 text-ctp-${categoryColor} rounded-xl font-medium transition-all duration-200 hover:scale-105 group`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LearningModal;
