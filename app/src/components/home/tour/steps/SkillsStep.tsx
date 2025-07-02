import React, { useState, useEffect } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import {
  databases,
  languages,
  tools,
  frameworks,
} from "@/components/home/portfolio/skills/data";
import CodeTypeWriter from "../writer/JsTypeWriter";
import { cn } from "@/lib/utils";

const categories = ["databases", "languages", "tools", "frameworks"] as const;
type Category = (typeof categories)[number];

const skillsText =
  "I'm excited to share my technical toolkit with you! These are the technologies I love working with, and I'm always eager to add more to my repertoire. Take a look around! 😊";

const databaseCodeText = `
const databases = [
${databases.map((database) => `"${database}"`).join(",\n")}
]
`;

const languagesCodeText = `
const languages = [
${languages.map((language) => `"${language}"`).join(",\n")}
]
`;

const toolsCodeText = `
const tools = [
${tools.map((tool) => `"${tool}"`).join(",\n")}
]
`;

const frameworksCodeText = `
const frameworks = [
${Object.values(frameworks)
  .flat()
  .map((framework) => `"${framework}"`)
  .join(",\n")}
]
`;

const SkillsStep: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    return () => {
      document.querySelectorAll(".skill-highlight").forEach((el) => {
        el.classList.remove("skill-highlight");
      });
    };
  }, []);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);

    document.querySelectorAll(".skill-item").forEach((el) => {
      el.classList.remove("skill-highlight");
    });
    setTimeout(() => {
      document.querySelectorAll(`.${category}-skill`).forEach((el) => {
        el.classList.add("skill-highlight");
      });
    }, 100);
  };

  return (
    <Step
      section="skills"
      title="Skills & Expertise"
      onTitleComplete={() => setTypingComplete(true)}
    >
      {typingComplete && (
        <>
          <div className="tour-about-message">
            <TypeWriter text={skillsText} speed={20} delay={300} humanize />
          </div>

          <div className="tour-interactive">
            <p>Click a category to see my skills:</p>
            <div className="flex gap-2 mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "px-4 py-2 rounded-md",
                    selectedCategory === category
                      ? "bg-ctp-surface text-ctp-text"
                      : "bg-ctp-surface0 text-ctp-text"
                  )}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div className="selected-skills-info animate-fade-in">
              <div className="code-block">
                {selectedCategory === "databases" && (
                  <CodeTypeWriter code={databaseCodeText} speed={5} />
                )}
                {selectedCategory === "languages" && (
                  <CodeTypeWriter code={languagesCodeText} speed={5} />
                )}
                {selectedCategory === "tools" && (
                  <CodeTypeWriter code={toolsCodeText} speed={5} />
                )}
                {selectedCategory === "frameworks" && (
                  <CodeTypeWriter code={frameworksCodeText} speed={5} />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Step>
  );
};

export default SkillsStep;
