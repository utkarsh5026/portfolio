import React, { useState } from "react";
import { Project } from "@/types";
import {
  Code,
  X,
  ChevronRight,
  Info,
  FileCode,
  List,
  Link,
  ArrowUpRight,
  Star,
  Lock,
} from "lucide-react";
import { FaGithub, FaInfoCircle, FaTags } from "react-icons/fa";
import GhostButton from "@/components/utils/GhostButton";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/utils/Modal";

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
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">(
    "overview"
  );

  if (!selectedProject) return null;

  const theme = getProjectTheme(selectedProject);

  // Create an item reveal animation for lists
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto overflow-x-hidden ">
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
                      {selectedProject.tags &&
                        selectedProject.tags.length > 0 && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium bg-ctp-${theme.main}/20 text-ctp-${theme.main}`}
                          >
                            {selectedProject.tags[0]}
                          </span>
                        )}
                      {selectedProject.tags &&
                        selectedProject.tags.length > 1 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-ctp-surface0 text-ctp-subtext0 font-medium">
                            +{selectedProject.tags.length - 1} tags
                          </span>
                        )}
                    </motion.div>
                  </div>
                </div>

                <GhostButton
                  onClick={closeModal}
                  className="absolute top-5 right-5"
                  icon={<X className="w-5 h-5" />}
                  label="Close"
                />
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

            {/* Scrollable content area */}
            <div className="overflow-y-auto h-[calc(85vh-8.5rem)] hide-scrollbar">
              <div className="px-8 py-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <TabContent key="overview">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left column: Overview description */}
                        <div className="lg:col-span-2">
                          <motion.div
                            className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div
                              className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.main}/10`}
                            >
                              <FaInfoCircle
                                className={`text-ctp-${theme.main}`}
                              />
                              <h4
                                className={`font-bold text-ctp-${theme.main}`}
                              >
                                Project Overview
                              </h4>
                            </div>
                            <div className="p-5">
                              <p className="text-ctp-text leading-relaxed">
                                {selectedProject.description}
                              </p>
                            </div>
                          </motion.div>

                          {/* Highlights section (if available) */}
                          {selectedProject.highlights && (
                            <motion.div
                              className="mt-6 bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <div
                                className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.secondary}/10`}
                              >
                                <Star
                                  className={`w-4 h-4 text-ctp-${theme.secondary}`}
                                />
                                <h4
                                  className={`font-bold text-ctp-${theme.secondary}`}
                                >
                                  Project Highlights
                                </h4>
                              </div>
                              <div className="p-5">
                                <ul className="space-y-2">
                                  {selectedProject.highlights?.map(
                                    (highlight) => (
                                      <li
                                        key={highlight}
                                        className="flex items-start gap-2 group"
                                      >
                                        <span
                                          className={`text-ctp-${theme.secondary} mt-1 group-hover:scale-110 transition-transform`}
                                        >
                                          •
                                        </span>
                                        <span className="text-ctp-subtext0 group-hover:text-ctp-text transition-colors">
                                          {highlight}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Right column: Links and info */}
                        <div className="space-y-6">
                          {/* Links card */}
                          <motion.div
                            className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <div
                              className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.main}/10`}
                            >
                              <Link
                                className={`w-4 h-4 text-ctp-${theme.main}`}
                              />
                              <h4
                                className={`font-bold text-ctp-${theme.main}`}
                              >
                                Project Links
                              </h4>
                            </div>
                            <div className="p-5 space-y-3">
                              {/* GitHub link */}
                              {selectedProject.githubLink !==
                              "private-repository" ? (
                                <motion.a
                                  href={selectedProject.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface0 border border-ctp-surface1 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                  <FaGithub
                                    className={`w-5 h-5 text-ctp-${theme.main} group-hover:scale-110 transition-transform`}
                                  />
                                  <span className="text-ctp-text font-medium">
                                    View Source Code
                                  </span>
                                  <ArrowUpRight className="w-4 h-4 ml-auto text-ctp-overlay0 group-hover:text-ctp-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </motion.a>
                              ) : (
                                <motion.div
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ctp-surface0/30 border border-ctp-surface0 text-ctp-subtext0"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                  <Lock className="w-5 h-5" />
                                  <span className="font-medium">
                                    Private Repository
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          {/* Tags section */}
                          {selectedProject.tags &&
                            selectedProject.tags.length > 0 && (
                              <div className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg">
                                <div
                                  className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.secondary}/10`}
                                >
                                  <FaTags
                                    className={`w-4 h-4 text-ctp-${theme.secondary}`}
                                  />
                                  <h4
                                    className={`font-bold text-ctp-${theme.secondary}`}
                                  >
                                    Project Tags
                                  </h4>
                                </div>
                                <div className="p-5">
                                  <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag, idx) => (
                                      <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          delay: 0.3 + idx * 0.05,
                                          duration: 0.3,
                                        }}
                                        className={`text-sm px-3 py-1 rounded-full 
                                        bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 transition-colors cursor-default`}
                                      >
                                        {tag}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
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
                          className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${theme.main}/10`}
                        >
                          <FileCode
                            className={`w-4 h-4 text-ctp-${theme.main}`}
                          />
                          <h4 className={`font-bold text-ctp-${theme.main}`}>
                            Technology Stack
                          </h4>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {selectedProject.technologies.map((tech, index) => (
                              <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.1 + index * 0.05,
                                  duration: 0.4,
                                }}
                                className="flex flex-col items-center"
                              >
                                <div
                                  className={`relative group p-4 w-full rounded-lg bg-ctp-surface0/70 hover:bg-ctp-surface0 border border-ctp-surface1 transition-all duration-300 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-1`}
                                >
                                  <div className="text-3xl">{tech.icon}</div>
                                  <span className="text-sm font-medium text-ctp-text">
                                    {tech.name}
                                  </span>

                                  {/* Decorative corner */}
                                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-transparent border-r-ctp-surface1/50 rounded-bl-lg transition-colors group-hover:border-r-ctp-surface1" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </TabContent>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Modal>
    </AnimatePresence>
  );
};

// Tab button component
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

// Helper function to generate theme colors
const getProjectTheme = (project: Project) => {
  const nameHash = project.name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const colorPairs = [
    { main: "blue", secondary: "lavender" },
    { main: "mauve", secondary: "pink" },
    { main: "red", secondary: "maroon" },
    { main: "peach", secondary: "yellow" },
    { main: "green", secondary: "teal" },
    { main: "sapphire", secondary: "sky" },
    { main: "lavender", secondary: "blue" },
  ];

  return colorPairs[nameHash % colorPairs.length];
};

export default ProjectModal;
