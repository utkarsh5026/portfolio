import React, { useState, useEffect } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import { currentLearningTechnologies } from "@/components/home/learning/data";
import CodeTypeWriter from "../writer/JsTypeWriter";
import { Info, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const codeText = `
const learningProjects = {
  total: ${currentLearningTechnologies.length},
  topics: [
    ${currentLearningTechnologies.map((cat) => `'${cat.name}'`).join(",\n\t")}
    ],
  focus: 'Hands-on building'
};
`;

const categories = [
  "Frontend",
  "Backend",
  "AI/ML",
  "DevOps",
  "Database",
] as const;

type Category = (typeof categories)[number];

const getCategoryColor = (category: Category) => {
  const colors = {
    Frontend: "bg-ctp-blue",
    Backend: "bg-ctp-green",
    "AI/ML": "bg-ctp-mauve",
    DevOps: "bg-ctp-peach",
    Database: "bg-ctp-red",
  };
  return colors[category] || "bg-ctp-lavender";
};

const getCategoryTextColor = (category: Category) => {
  const colors = {
    Frontend: "text-ctp-blue",
    Backend: "text-ctp-green",
    "AI/ML": "text-ctp-mauve",
    DevOps: "text-ctp-peach",
    Database: "text-ctp-red",
  };
  return colors[category] || "text-ctp-lavender";
};

const LearningStep: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => {
    // Clean up
    return () => {
      const learningSection = document.querySelector("#learning");
      if (learningSection) {
        learningSection.classList.remove("tour-highlight");
      }

      // Remove any category highlights
      document.querySelectorAll(".category-highlight").forEach((el) => {
        el.classList.remove("category-highlight");
      });
    };
  }, []);

  // Reset expanded project when category changes
  useEffect(() => {
    setExpandedProject(null);
    setIsExplaining(false);
  }, [selectedCategory]);

  // Filter technologies by selected category
  const filteredTechnologies = selectedCategory
    ? currentLearningTechnologies.filter(
        (tech) => tech.category === selectedCategory
      )
    : [];

  // Toggle project explanation
  const toggleExplanation = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null);
      setIsExplaining(false);
    } else {
      setExpandedProject(index);
      setIsExplaining(true);
    }
  };

  return (
    <Step
      section="learning"
      title="Learning Journey"
      onTitleComplete={() => setTypingComplete(true)}
    >
      {typingComplete && (
        <>
          {/* Introduction message with typewriter effect */}
          <div className="tour-message text-ctp-text">
            <TypeWriter
              text="Technologies I'm currently exploring through hands-on projects."
              speed={20}
              delay={300}
            />
          </div>

          {/* Code block with syntax highlighting in dark theme */}
          <div className="code-block mt-3 p-3 rounded text-xs bg-ctp-crust text-ctp-text shadow-md overflow-auto border border-ctp-surface0">
            <CodeTypeWriter
              code={codeText}
              speed={5}
              delay={1500}
              className="code-text font-mono"
            />
          </div>

          {/* Category filter section - Simplified with smaller buttons */}
          <div className="tour-interactive mt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-ctp-subtext0">
                Filter by category:
              </p>
              {selectedCategory && (
                <button
                  className="text-xs px-2 py-1 rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-subtext1 transition-all duration-300 flex items-center"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </button>
              )}
            </div>
            <div className="tour-interactive-buttons flex flex-wrap gap-1.5 mt-2">
              {/* Smaller Category selection buttons */}
              {categories.map((category) => (
                <button
                  key={category}
                  className={`text-xs px-3 py-1 rounded-full transition-all duration-300 
                    ${
                      selectedCategory === category
                        ? `${getCategoryColor(
                            category
                          )} text-ctp-crust font-medium`
                        : "bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-subtext0"
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Project list - Compact view with explanation toggle */}
          {selectedCategory && filteredTechnologies.length > 0 && (
            <div className="mt-3 max-h-[200px] overflow-y-auto overflow-x-hidden p-2 rounded-lg shadow-inner bg-ctp-mantle border border-ctp-surface0">
              {/* Header with category indicator */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <div
                  className={`w-2 h-2 rounded-full ${getCategoryColor(
                    selectedCategory
                  )}`}
                ></div>
                <h4 className="text-xs font-semibold text-ctp-text">
                  {selectedCategory} Projects
                </h4>
              </div>

              {/* Compact Project list */}
              <ul className="space-y-1.5">
                {filteredTechnologies.map((tech, index) => (
                  <li
                    key={`${tech.name}-${index}`}
                    className={`rounded transition-colors duration-200 ${
                      expandedProject === index
                        ? "bg-ctp-surface0"
                        : "hover:bg-ctp-surface0"
                    }`}
                  >
                    {/* Project header with icon - more compact */}
                    <div className="flex items-center justify-between p-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1 rounded ${getCategoryColor(
                            selectedCategory
                          )} bg-opacity-20`}
                        >
                          <span
                            className={`${getCategoryTextColor(
                              selectedCategory
                            )}`}
                          >
                            {tech.icon}
                          </span>
                        </div>
                        <span className="font-medium text-xs text-ctp-text">
                          {tech.name}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleExplanation(index)}
                        className={`text-ctp-subtext1 hover:${getCategoryTextColor(
                          selectedCategory
                        )} transition-colors p-1 rounded-full hover:bg-ctp-surface1`}
                        title="Expand project"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {expandedProject === index && (
                      <div className="px-2 pb-2 pt-1">
                        <div className="pl-7 pr-1 border-l border-ctp-surface1">
                          {isExplaining && (
                            <TypeWriter
                              text={tech.description}
                              speed={10}
                              className="text-xs text-ctp-subtext0"
                            />
                          )}
                          {tech.repoLink && (
                            <a
                              href={tech.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 text-xs inline-flex items-center gap-1 text-ctp-blue hover:text-ctp-sapphire"
                            >
                              <FaGithub className="w-3 h-3 mr-1" />
                              Repository
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Step>
  );
};

export default LearningStep;
