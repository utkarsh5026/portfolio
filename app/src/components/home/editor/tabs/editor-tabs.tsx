import React, { useEffect, useMemo } from "react";

import {
  type SectionType,
  useEditorContext,
} from "@/components/home/editor/context/explorer-context";
import useOutlineStore from "@/store/outline/outline-store";

import DesktopTabs from "./desktop-tabs";
import MobileEditorDropdown from "./mobile-editor-dropdown";

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
  const setOutlineActiveSection = useOutlineStore((s) => s.setActiveSection);
  const { activeSection, setActiveSection } = useEditorContext();

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
