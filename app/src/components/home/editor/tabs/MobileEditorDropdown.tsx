import React from "react";
import { cn } from "@/lib/utils";
import type { SectionType } from "@/components/home/editor/context/explorerContext";
import { sectionIconMap, getIconColor } from "./tab-style";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "@/components/home/appbar/Logo";

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
    <div className="flex items-center justify-between px-4 h-10 w-full">
      <Logo />

      {/* Menu dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-ctp-surface0/30 hover:bg-ctp-surface0"
          >
            <Menu className="h-4 w-4 text-ctp-text" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 bg-ctp-base border-ctp-surface0 rounded-md shadow-lg z-[99999]"
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
    </div>
  );
};

export default MobileEditorDropdown;
