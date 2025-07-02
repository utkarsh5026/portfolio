import React, { useMemo, useEffect } from "react";
import { useOutline } from "@/components/home/editor/outline/context/outlineContext";
import {
  useEditorContext,
  type SectionType,
} from "@/components/home/editor/context/explorer-context";
import MobileEditorDropdown from "./mobile-editor-dropdown";
import DesktopTabs from "./desktop-tabs";

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

  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  useEffect(
    () => setCurrentSection(activeSection),
    [activeSection, setCurrentSection]
  );

  return (
    <div className="sticky top-0 bg-ctp-mantle border-b border-ctp-surface0 z-10">
      <div className="md:hidden">
        <MobileEditorDropdown
          sectionKeys={sectionKeys}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div className="hidden md:block">
        <DesktopTabs
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionKeys={sectionKeys}
        />
      </div>
    </div>
  );
};

export default EditorTabs;
