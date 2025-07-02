import { TechnologyLearning } from "@/types";
import React from "react";
import { ArrowRight, Target, Code2 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { FaGithub } from "react-icons/fa";

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
    <Drawer open={isModalOpen} onOpenChange={closeModal}>
      <DrawerContent className="max-h-[90vh] bg-ctp-base border-ctp-surface1/50 z-[999999] w-full">
        {/* Header */}
        <DrawerHeader className="border-b border-ctp-surface1/50 p-2 sm:p-4">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-2xl bg-ctp-${categoryColor}/10 text-ctp-${categoryColor}`}
              >
                {selectedTech.icon}
              </div>
              <div className="flex-1">
                <DrawerTitle className="text-2xl font-bold text-ctp-text mb-1">
                  {selectedTech.name}
                </DrawerTitle>
              </div>
            </div>
          </div>
        </DrawerHeader>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6 space-y-6">
            {/* Description */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-ctp-blue" />
                <h3 className="font-semibold text-ctp-text">Overview</h3>
              </div>
              <p className="text-ctp-subtext0 leading-relaxed">
                {selectedTech.description}
              </p>
            </section>

            {/* Learning Goals */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-ctp-green" />
                <h3 className="font-semibold text-ctp-text">Learning Goals</h3>
              </div>

              <div className="space-y-3">
                {selectedTech.learningGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-ctp-surface0/30 rounded-xl border border-ctp-surface1/30 hover:bg-ctp-surface0/50 transition-colors duration-200"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-ctp-${categoryColor} mt-2 flex-shrink-0`}
                    />
                    <p className="text-sm text-ctp-subtext0 leading-relaxed">
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {selectedTech.repoLink && (
          <DrawerFooter className="border-t border-ctp-surface1/50">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
              <a
                href={selectedTech.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-ctp-${categoryColor}/10 hover:bg-ctp-${categoryColor}/20 text-ctp-${categoryColor} rounded-xl font-medium transition-all duration-200 hover:scale-105 group w-fit`}
              >
                <FaGithub className="w-4 h-4" />
                <span>View Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default LearningModal;
