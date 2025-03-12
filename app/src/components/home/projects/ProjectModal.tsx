import { Project } from "@/types";
import React from "react";
import { Code, ExternalLink, X, ChevronRight, Tags } from "lucide-react";
import { FaGithub, FaInfoCircle, FaLink, FaTags } from "react-icons/fa";
import TechBadge from "@/components/base/TechBadge";
import GhostButton from "@/components/utils/GhostButton";
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
  if (!selectedProject) return null;
  const theme = getProjectTheme(selectedProject);

  return (
    <Modal
      showCloseButton={false}
      isOpen={isModalOpen}
      onClose={closeModal}
      size="4xl"
      centered
      animation="slide-up"
    >
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-5">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center shadow-lg
                  bg-gradient-to-br from-ctp-${theme.main} to-ctp-${theme.secondary}`}
              style={{
                boxShadow: `0 10px 25px -5px var(--ctp-${theme.main}40)`,
              }}
            >
              <Code className="text-ctp-crust text-xl md:text-2xl" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-ctp-text mb-1">
                {selectedProject.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs md:text-sm px-3 py-1 rounded-full font-medium
                      bg-ctp-${theme.main}/20 text-ctp-${theme.main}`}
                >
                  {selectedProject.tags?.[0] || "Project"}
                </span>
                {selectedProject.tags && selectedProject.tags.length > 1 && (
                  <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-ctp-surface0 text-ctp-subtext0 font-medium">
                    +{selectedProject.tags.length - 1} tags
                  </span>
                )}
              </div>
            </div>
          </div>
          <GhostButton
            icon={<X className="w-5 h-5 text-ctp-red" />}
            label="Close"
            onClick={closeModal}
            className="bg-ctp-surface1 hover:bg-ctp-surface0 rounded-full transition-colors"
            labelDirection="top"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
              <h4
                className={`text-ctp-${theme.main} font-bold text-lg mb-3 flex items-center gap-2`}
              >
                <FaInfoCircle className="w-4 h-4" />
                Overview
              </h4>
              <p className="text-ctp-text leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
              <h4
                className={`text-ctp-${theme.main} font-bold text-lg mb-4 flex items-center gap-2`}
              >
                <ChevronRight className="w-5 h-5" />
                Key Features
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {selectedProject.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 group">
                    <span
                      className={`text-ctp-${theme.main} mt-1 group-hover:scale-110 transition-transform`}
                    >
                      •
                    </span>
                    <span className="text-ctp-subtext0 group-hover:text-ctp-text transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
              <h4
                className={`text-ctp-${theme.main} font-bold text-lg mb-4 flex items-center gap-2`}
              >
                <Tags className="w-5 h-5" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProject.technologies.map((tech) => (
                  <TechBadge key={tech.name} tech={tech.name} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - right 1/3 */}
          <div className="space-y-5 md:space-y-6">
            <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
              <h4
                className={`text-ctp-${theme.secondary} font-bold text-lg mb-4 flex items-center gap-2`}
              >
                <FaLink className="w-4 h-4" />
                Project Links
              </h4>

              <div className="space-y-3">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface0 border border-ctp-surface1 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                >
                  <FaGithub className={`w-5 h-5 text-ctp-${theme.main}`} />
                  <span className="text-ctp-text font-medium">
                    View Source Code
                  </span>
                </a>

                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg
                        bg-ctp-${theme.main}/10 hover:bg-ctp-${theme.main}/20
                        border border-ctp-${theme.main}/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md`}
                  >
                    <ExternalLink
                      className={`w-5 h-5 text-ctp-${theme.main}`}
                    />
                    <span className="text-ctp-text font-medium">
                      Visit Live Demo
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Project highlights box */}
            {selectedProject.highlights && (
              <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
                <h4
                  className={`text-ctp-${theme.secondary} font-bold text-lg mb-3 flex items-center gap-2`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ctp-${theme.secondary}"></span>
                  Highlights
                </h4>
                <ul className="space-y-3">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-ctp-subtext0 flex items-start gap-2 group"
                    >
                      <span
                        className={`text-ctp-${theme.secondary} group-hover:scale-110 transition-transform`}
                      >
                        •
                      </span>
                      <span className="group-hover:text-ctp-text transition-colors">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project tags */}
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div className="bg-ctp-crust rounded-lg p-5 md:p-6 border border-ctp-surface0 hover:border-ctp-surface1 transition-colors shadow-sm">
                <h4
                  className={`text-ctp-${theme.secondary} font-bold text-lg mb-3 flex items-center gap-2`}
                >
                  <FaTags className="w-4 h-4" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-sm px-3 py-1 rounded-full 
                          bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 transition-colors cursor-default`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

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
