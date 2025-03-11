import React, { useEffect, useState } from "react";
import { TechnologyLearning } from "@/types";
import { categoryInfo, currentLearningTechnologies } from "./data";
import OutlineNode from "../editor/outline/OutlineNode";

type Category = (typeof currentLearningTechnologies)[number]["category"];

interface FeaturedLearningsProps {
  categorizedTech: Record<Category, TechnologyLearning[]>;
  handleTechSelect: (tech: TechnologyLearning) => void;
  selectedCategory: Category | null;
}

const FeaturedLearnings: React.FC<FeaturedLearningsProps> = ({
  categorizedTech,
  handleTechSelect,
  selectedCategory,
}) => {
  const [shouldRender, setShouldRender] = useState(!selectedCategory);
  const [isVisible, setIsVisible] = useState(!selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [selectedCategory]);

  if (!shouldRender) return null;

  return (
    <div
      className={`absolute bottom-6 left-0 right-0 px-6 z-20 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h3 className="text-xl font-bold text-white mb-6">
        Featured Technologies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categorizedTech).flatMap(([category, techs]) => {
          const currCategoryInfo = categoryInfo[category as Category];

          return techs.slice(0, 2).map((tech) => (
            <OutlineNode
              key={tech.name}
              id={tech.name}
              label={tech.name}
              icon={tech.icon}
              level={1}
              parentId="learning"
              className="flex"
            >
              <div
                key={tech.name}
                className="bg-[#292c3c] rounded-xl shadow-md overflow-hidden cursor-pointer border border-[#414559] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  boxShadow: `0 8px 20px -5px ${currCategoryInfo.color}15`,
                }}
                onClick={() => handleTechSelect(tech)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 25px -5px ${currCategoryInfo.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 20px -5px ${currCategoryInfo.color}15`;
                }}
              >
                <div
                  className="h-1"
                  style={{
                    background: `linear-gradient(to right, ${currCategoryInfo.color}90, ${currCategoryInfo.hoverColor}90)`,
                  }}
                ></div>
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${currCategoryInfo.color}90, ${currCategoryInfo.hoverColor}90)`,
                      }}
                    >
                      <div className="text-[#232634]">{tech.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">
                        {tech.name}
                      </h4>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${currCategoryInfo.color}20`,
                          color: `${currCategoryInfo.color}e0`,
                        }}
                      >
                        {category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#414559]">
                    <p className="text-[#b8c0e0] text-sm line-clamp-2 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            </OutlineNode>
          ));
        })}
      </div>
    </div>
  );
};

export default FeaturedLearnings;
