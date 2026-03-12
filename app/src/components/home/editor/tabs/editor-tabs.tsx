import React, { useEffect, useMemo } from "react";

import { type SectionType } from "@/components/home/editor/context/editor-store";
import { useSectionNav } from "@/hooks/use-editor-actions";
import useOutlineStore from "@/store/outline/outline-store";

import { useActiveSection } from "../context/editor-store";
import DesktopTabs from "./desktop-tabs";
import MobileEditorDropdown from "./mobile-editor-dropdown";

interface EditorTabsProps {
  sections: Record<SectionType, React.LazyExoticComponent<React.ComponentType>>;
}

/**
 * Modern EditorTabs component using Shadcn UI
 * Provides a sleek tab interface for switching between different sections
 * Optimized for both desktop and mobile with responsive design
 * Uses the project's Catppuccin color theme for visual consistency
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const setOutlineActiveSection = useOutlineStore((s) => s.setActiveSection);
  const activeSection = useActiveSection();
  const { setActiveSection } = useSectionNav();

  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  useEffect(
    () => setOutlineActiveSection(activeSection),
    [activeSection, setOutlineActiveSection]
  );

  return (
    <div className="sticky top-0 bg-ctp-mantle border-b border-ctp-surface0 z-10 w-full min-w-0">
      <div className="md:hidden">
        <MobileEditorDropdown
          sectionKeys={sectionKeys}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div className="hidden md:block w-full overflow-hidden">
        <DesktopTabs />
      </div>
    </div>
  );
};

export default EditorTabs;
