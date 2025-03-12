import { TechnologyLearning } from "@/types";
import React from "react";
import { categoryInfo } from "./data";
import { ArrowRight, X } from "lucide-react";
import GhostButton from "@/components/utils/GhostButton";
import Modal from "@/components/utils/Modal";

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

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      size="4xl"
      showCloseButton={false}
    >
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(to right, ${
            categoryInfo[selectedTech.category].color
          }, ${categoryInfo[selectedTech.category].hoverColor})`,
        }}
      ></div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-5">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${
                  categoryInfo[selectedTech.category].color
                }, ${categoryInfo[selectedTech.category].hoverColor})`,
                boxShadow: `0 10px 25px -5px ${
                  categoryInfo[selectedTech.category].color
                }40`,
              }}
            >
              <div className="text-[#232634] text-2xl">{selectedTech.icon}</div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {selectedTech.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `${
                      categoryInfo[selectedTech.category].color
                    }30`,
                    color: categoryInfo[selectedTech.category].color,
                  }}
                >
                  {selectedTech.category}
                </span>
                <span className="text-sm px-3 py-1 rounded-full bg-[#414559] text-white font-medium">
                  {
                    ["Beginner", "Intermediate", "Advanced"][
                      Math.floor(Math.random() * 3)
                    ]
                  }
                </span>
              </div>
            </div>
          </div>
          <GhostButton
            icon={<X className="w-5 h-5 text-ctp-red" />}
            label="Close"
            onClick={closeModal}
            className="bg-ctp-surface1 rounded-full"
            labelDirection="top"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-[#232634] rounded-lg p-6 border border-[#414559]">
            <h4 className="text-white font-bold text-lg mb-3">Overview</h4>
            <p className="text-[#c6d0f5] leading-relaxed">
              {selectedTech.description}
            </p>
          </div>

          <div className="bg-[#232634] rounded-lg p-6 border border-[#414559]">
            <h4 className="text-white font-bold text-lg mb-3">
              Learning Goals
            </h4>
            <ul className="text-[#c6d0f5] space-y-3">
              {selectedTech.learningGoals.map((goal) => (
                <li key={goal} className="flex items-start gap-3">
                  <div className="mt-1 text-[#8caaee]">•</div>
                  <div>{goal}</div>
                </li>
              ))}
            </ul>
          </div>

          {selectedTech.repoLink && (
            <div className="flex justify-end pt-2">
              <a
                href={selectedTech.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-98"
                style={{
                  background: `linear-gradient(135deg, ${
                    categoryInfo[selectedTech.category].color
                  }, ${categoryInfo[selectedTech.category].hoverColor})`,
                  boxShadow: `0 10px 25px -5px ${
                    categoryInfo[selectedTech.category].color
                  }40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 15px 30px -5px ${
                    categoryInfo[selectedTech.category].color
                  }60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 10px 25px -5px ${
                    categoryInfo[selectedTech.category].color
                  }40`;
                }}
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LearningModal;
