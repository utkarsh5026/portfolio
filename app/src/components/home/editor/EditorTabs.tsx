import React, { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

import { FaCode } from "react-icons/fa";
import { useOutline } from "./outline/context/outlineContext";
import { useEditorContext, type SectionType } from "./context/explorerContext";

interface EditorTabsProps {
  sections: Record<SectionType, ReactNode>;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection, setCurrentSection]);

  return (
    <div className="bg-[#1e1e2e] border-b border-[#313244] font-roboto-mono sticky top-0 z-30 overflow-x-auto scrollbar-hide md:h-9">
      <div className="flex items-center h-full">
        {Object.entries(sections).map(([id]) => (
          <button
            key={id}
            className={cn(
              "h-full px-4 whitespace-nowrap border-r border-[#313244] hover:bg-[#181825] transition-colors text-sm flex items-center gap-2",
              activeSection === id
                ? "bg-[#181825] text-[#cdd6f4] border-b-2 border-b-[#89b4fa]"
                : "text-[#6c7086]"
            )}
            onClick={() => {
              setActiveSection(id as SectionType);
            }}
          >
            <FaCode
              className={cn("w-3 h-3", {
                "text-ctp-red": id === "home",
                "text-ctp-green": id === "projects",
                "text-ctp-yellow": id === "skills",
                "text-ctp-blue": id === "about",
                "text-ctp-mauve": id === "experience",
                "text-ctp-pink": id === "contact",
                "text-ctp-teal": id === "articles",
                "text-ctp-sapphire": id === "learning",
              })}
            />
            {id}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              ×
            </span>
          </button>
        ))}

        <div className="flex-1 border-b border-[#313244]"></div>
      </div>
    </div>
  );
};

export default EditorTabs;
