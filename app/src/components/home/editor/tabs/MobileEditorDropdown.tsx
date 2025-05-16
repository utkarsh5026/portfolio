import React from "react";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";
import type { SectionType } from "@/components/home/editor/context/explorerContext";
import { sectionIconMap, getIconColor } from "./tab-style";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MobileEditorDropdownProps {
  sectionKeys: SectionType[];
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

const MobileEditorDropdown: React.FC<MobileEditorDropdownProps> = ({
  sectionKeys,
  activeSection,
  setActiveSection,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-between w-full h-10 px-4 py-2 bg-ctp-mantle hover:bg-ctp-surface0 rounded-none border-0 font-mono text-sm"
        >
          <div className="flex items-center gap-2">
            <span className={cn("w-3 h-3", getIconColor(activeSection))}>
              {sectionIconMap[activeSection]}
            </span>
            <span className="capitalize font-medium text-ctp-text">
              {activeSection}
            </span>
          </div>
          <FaChevronDown className="h-3 w-3 text-ctp-subtext0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] bg-ctp-base border-ctp-surface0 rounded-md shadow-lg z-50"
      >
        {sectionKeys.map((section) => (
          <DropdownMenuItem
            key={section}
            className={cn(
              "flex items-center gap-2 py-2 px-4 text-left cursor-pointer font-mono text-sm",
              activeSection === section
                ? "bg-ctp-surface0 text-ctp-text"
                : "text-ctp-subtext0 hover:bg-ctp-surface0 hover:text-ctp-text"
            )}
            onClick={() => setActiveSection(section)}
          >
            <span className={cn("w-3 h-3", getIconColor(section))}>
              {sectionIconMap[section]}
            </span>
            <span className="capitalize">{section}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileEditorDropdown;
