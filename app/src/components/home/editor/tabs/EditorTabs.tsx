import React, { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { useOutline } from "@/components/home/editor/outline/context/outlineContext";
import {
  useEditorContext,
  type SectionType,
} from "@/components/home/editor/context/explorerContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface EditorTabsProps {
  sections: Record<SectionType, React.ReactNode>;
}

/**
 * Modern EditorTabs component using Shadcn UI
 * Provides a sleek tab interface for switching between different sections
 * Optimized for both desktop and mobile with responsive design
 * Uses the project's Catppuccin color theme for visual consistency
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  // Extract section keys from the sections object
  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  // Update the current section in the outline context when active section changes
  useEffect(
    () => setCurrentSection(activeSection),
    [activeSection, setCurrentSection]
  );

  // Gets icon color based on section type for consistent visual cues
  const getIconColor = (section: SectionType): string => {
    switch (section) {
      case "home":
        return "text-ctp-red";
      case "projects":
        return "text-ctp-green";
      case "skills":
        return "text-ctp-yellow";
      case "about":
        return "text-ctp-blue";
      case "experience":
        return "text-ctp-mauve";
      case "contact":
        return "text-ctp-pink";
      case "articles":
        return "text-ctp-teal";
      case "learning":
        return "text-ctp-sapphire";
      default:
        return "text-ctp-blue";
    }
  };

  // Gets color for active tab indicator
  const getActiveTabColor = (section: SectionType): string => {
    switch (section) {
      case "home":
        return "from-ctp-red to-ctp-peach";
      case "projects":
        return "from-ctp-green to-ctp-teal";
      case "skills":
        return "from-ctp-yellow to-ctp-peach";
      case "about":
        return "from-ctp-blue to-ctp-lavender";
      case "experience":
        return "from-ctp-mauve to-ctp-pink";
      case "contact":
        return "from-ctp-pink to-ctp-red";
      case "articles":
        return "from-ctp-teal to-ctp-green";
      case "learning":
        return "from-ctp-sapphire to-ctp-blue";
      default:
        return "from-ctp-blue to-ctp-lavender";
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-ctp-mantle border-b border-ctp-surface0">
      <Tabs
        value={activeSection}
        onValueChange={(value) => setActiveSection(value as SectionType)}
        className="w-full"
      >
        <div className="w-full overflow-x-auto scrollbar-hide">
          <TabsList className="h-10 bg-transparent px-2 py-0 w-max min-w-full flex items-center  rounded-none justify-start">
            {sectionKeys.map((section) => (
              <TabsTrigger
                key={section}
                value={section}
                className={cn(
                  "relative h-9 px-4 rounded-none font-mono text-xs transition-all duration-200",
                  "data-[state=inactive]:bg-ctp-surface0/50 data-[state=inactive]:text-ctp-subtext0",
                  "data-[state=active]:bg-ctp-base data-[state=active]:text-ctp-text",
                  "hover:bg-ctp-surface0 hover:text-ctp-text",
                  "focus-visible:ring-ctp-lavender focus-visible:ring-opacity-50"
                )}
              >
                <div className="flex items-center gap-2">
                  <FaCode className={cn("w-3 h-3", getIconColor(section))} />
                  <span>{section}</span>
                </div>

                {/* Animated active indicator */}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r",
                      getActiveTabColor(section)
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default EditorTabs;
