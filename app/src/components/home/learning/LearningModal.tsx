import { TechnologyLearning } from "@/types";
import React from "react";
import { categoryInfo } from "./data";
import { ArrowRight, X } from "lucide-react";
import GhostButton from "@/components/utils/GhostButton";
import { motion } from "framer-motion";
import DialogModal from "@/components/utils/DialogModal";
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <DialogModal isOpen={isModalOpen} handleChange={closeModal}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
        className="relative overflow-hidden rounded-xl w-full"
        onClick={(e) => e.stopPropagation()}
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
              <motion.div
                initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
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
                <div className="text-[#232634] text-2xl">
                  {selectedTech.icon}
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedTech.name}
                </h3>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-2"
                >
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
                </motion.div>
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
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#232634] rounded-lg p-6 border border-[#414559]"
            >
              <h4 className="text-white font-bold text-lg mb-3">Overview</h4>
              <p className="text-[#c6d0f5] leading-relaxed">
                {selectedTech.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#232634] rounded-lg p-6 border border-[#414559]"
            >
              <h4 className="text-white font-bold text-lg mb-3">
                Learning Goals
              </h4>
              <ul className="text-[#c6d0f5] space-y-3">
                {selectedTech.learningGoals.map((goal, index) => (
                  <motion.li
                    key={goal}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1 text-[#8caaee] group-hover:scale-110 transition-transform">
                      •
                    </div>
                    <div className="group-hover:text-white transition-colors">
                      {goal}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {selectedTech.repoLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex justify-end pt-2"
              >
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
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </DialogModal>
  );
};

export default LearningModal;
