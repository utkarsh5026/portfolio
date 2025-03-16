import React, { useState } from "react";
import { Project } from "@/types";
import { Code, ChevronRight, Info, FileCode, List, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/utils/Modal";
import TechStackDisplay from "./TechStackDisplay";
import ProjectOverview from "./ProjectOverview";
import { useProjectTheme } from "../context/ThemeContext";
import { cn } from "@/lib/utils";
import ExplainItToMe from "./ExplainItToMe";

type Tab = "overview" | "features" | "tech";

interface ProjectModalProps {
  isModalOpen: boolean;
  selectedProject: Project | null;
  closeModal: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isModalOpen,
  selectedProject,
  closeModal,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { getProjectTheme } = useProjectTheme();
  const [explainOpen, setExplainOpen] = useState(false);

  if (!selectedProject) return null;

  const theme = getProjectTheme(selectedProject);

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
    <AnimatePresence>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeOnOutsideClick
        showCloseButton
        size="full"
      >
        <div className="inset-0 z-[1000] flex items-center justify-center overflow-y-auto overflow-x-hidden ">
          {/* Modal Container - Fixed width */}
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
            className="relative w-[90vw] max-w-6xl h-[85vh] bg-ctp-mantle border border-ctp-surface0 rounded-xl shadow-xl overflow-hidden z-[1001]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
              <div
                className={`absolute -top-8 -left-8 w-16 h-16 rotate-45 bg-ctp-${theme.main}/30`}
              ></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div
                className={`absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-ctp-${theme.secondary}/30`}
              ></div>
            </div>

            {/* Colored accent line */}
            <div
              className={`h-1.5 w-full bg-gradient-to-r from-ctp-${theme.main} via-ctp-${theme.main}/70 to-ctp-${theme.secondary}`}
            />

            {/* Fixed header area */}
            <ModalHeader
              theme={theme}
              selectedProject={selectedProject}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              explainOpen={explainOpen}
              setExplainOpen={setExplainOpen}
            />

            {/* Scrollable content area */}
            <div className="overflow-y-auto h-[calc(85vh-8.5rem)] hide-scrollbar">
              <div className="px-8 py-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <TabContent key="overview">
                      <ProjectOverview project={selectedProject} />
                    </TabContent>
                  )}

                  {activeTab === "features" && (
                    <TabContent key="features">
                      <motion.div
                        className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div
                          className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.main}/10`}
                        >
                          <List className={`w-4 h-4 text-ctp-${theme.main}`} />
                          <h4 className={`font-bold text-ctp-${theme.main}`}>
                            Key Features
                          </h4>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {selectedProject.features.map((feature) => (
                              <motion.div
                                key={feature}
                                custom={feature}
                                initial="hidden"
                                animate="visible"
                                variants={itemVariants}
                                className="flex items-start gap-3 group"
                              >
                                <div
                                  className={`p-1.5 rounded-full bg-ctp-${theme.main}/10 text-ctp-${theme.main} mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform`}
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-ctp-subtext0 group-hover:text-ctp-text transition-colors">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </TabContent>
                  )}

                  {activeTab === "tech" && (
                    <TabContent key="tech">
                      <motion.div
                        className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div
                          className={`p-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.main}/10`}
                        >
                          <FileCode
                            className={`w-4 h-4 text-ctp-${theme.main}`}
                          />
                          <h4 className={`font-bold text-ctp-${theme.main}`}>
                            Technology Stack
                          </h4>
                        </div>
                        {selectedProject.techStack && (
                          <TechStackDisplay
                            techStack={selectedProject.techStack}
                            theme={theme}
                          />
                        )}
                      </motion.div>
                    </TabContent>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Modal
              isOpen={explainOpen}
              onClose={() => setExplainOpen(false)}
              size="4xl"
            >
              <ExplainItToMe project={selectedProject} />
            </Modal>
          </motion.div>
        </div>
      </Modal>
    </AnimatePresence>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  theme: { main: string; secondary: string };
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  icon,
  label,
  theme,
}) => (
  <button
    className={`relative px-4 py-3 flex items-center gap-2 text-sm font-medium transition-colors ${
      isActive
        ? `text-ctp-${theme.main}`
        : "text-ctp-subtext0 hover:text-ctp-text"
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
    {isActive && (
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-${theme.main}`}
        layoutId="activeProjectTab"
      />
    )}
  </button>
);

const TabContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

interface ModalHeaderProps {
  theme: {
    main: string;
    secondary: string;
  };
  selectedProject: Project;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  explainOpen: boolean;
  setExplainOpen: (open: boolean) => void;
}
const ModalHeader: React.FC<ModalHeaderProps> = ({
  theme,
  selectedProject,
  activeTab,
  setActiveTab,
  explainOpen,
  setExplainOpen,
}: ModalHeaderProps) => {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-md bg-ctp-mantle/95 border-b border-ctp-surface0 shadow-sm">
      {/* Project title and info */}
      <div className="px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <motion.div
            initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`rounded-xl p-3 bg-gradient-to-br from-ctp-${theme.main} to-ctp-${theme.secondary} shadow-lg`}
            style={{
              boxShadow: `0 8px 20px -6px var(--ctp-${theme.main}40)`,
            }}
          >
            <Code className="w-6 h-6 text-ctp-crust" />
          </motion.div>

          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-ctp-text to-ctp-text bg-clip-text text-transparent">
              {selectedProject.name}
            </h3>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 mt-1"
            >
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium bg-ctp-${theme.main}/20 text-ctp-${theme.main}`}
                >
                  {selectedProject.tags[0]}
                </span>
              )}
              {selectedProject.tags && selectedProject.tags.length > 1 && (
                <span className="text-xs px-3 py-1 rounded-full bg-ctp-surface0 text-ctp-subtext0 font-medium">
                  +{selectedProject.tags.length - 1} tags
                </span>
              )}
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => setExplainOpen(!explainOpen)}
          className={cn(
            "relative py-2.5 px-5 rounded-lg text-white font-medium",
            `border-2 border-ctp-${theme.main}`,
            `shadow-md shadow-ctp-${theme.main}/20`
          )}
          whileHover={{
            y: -2,
            className: `shadow-2xl shadow-ctp-${theme.main}/20`,
          }}
          whileTap={{
            y: 2,
            className: cn(`shadow-md shadow-ctp-${theme.main}/20`),
          }}
        >
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            <span>Explain It To Me</span>
          </div>
        </motion.button>
      </div>

      {/* Tab navigation */}
      <div className="flex px-8 border-t border-ctp-surface0">
        <TabButton
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
          icon={<Info className="w-4 h-4" />}
          label="Overview"
          theme={theme}
        />
        <TabButton
          isActive={activeTab === "features"}
          onClick={() => setActiveTab("features")}
          icon={<List className="w-4 h-4" />}
          label="Features"
          theme={theme}
        />
        <TabButton
          isActive={activeTab === "tech"}
          onClick={() => setActiveTab("tech")}
          icon={<FileCode className="w-4 h-4" />}
          label="Tech Stack"
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ProjectModal;
