import React from "react";
import { cn } from "@/lib/utils";
import type { SectionType } from "@/components/home/editor/context/explorer-context";
import { sectionIconMap, getIconColor } from "./tab-style";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaFilePdf, FaCode } from "react-icons/fa";
import Logo from "@/components/home/appbar/Logo";

interface MobileEditorDropdownProps {
  sectionKeys: SectionType[];
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

const externalLinks = [
  {
    label: "GitHub Profile",
    icon: <FaGithub className="w-4 h-4" />,
    url: "https://github.com/utkarsh5026",
    colorClass: "text-ctp-lavender",
    hoverClass: "hover:text-ctp-blue hover:bg-ctp-lavender/10",
    description: "View my repositories",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin className="w-4 h-4" />,
    url: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    colorClass: "text-ctp-sapphire",
    hoverClass: "hover:text-ctp-blue hover:bg-ctp-sapphire/10",
    description: "Professional network",
  },
  {
    label: "Resume",
    icon: <FaFilePdf className="w-4 h-4" />,
    url: "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing",
    colorClass: "text-ctp-red",
    hoverClass: "hover:text-ctp-pink hover:bg-ctp-red/10",
    description: "Download PDF",
  },
  {
    label: "Source Code",
    icon: <FaCode className="w-4 h-4" />,
    url: "https://github.com/utkarsh5026/Portfolio",
    colorClass: "text-ctp-mauve",
    hoverClass: "hover:text-ctp-pink hover:bg-ctp-mauve/10",
    description: "Portfolio repository",
  },
];

const MobileEditorDropdown: React.FC<MobileEditorDropdownProps> = ({
  sectionKeys,
  activeSection,
  setActiveSection,
}) => {
  const handleExternalLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center justify-between px-4 h-12 w-full bg-gradient-to-r from-ctp-base via-ctp-mantle to-ctp-base border-b border-ctp-surface0/50">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 bg-gradient-to-br from-ctp-surface0/40 to-ctp-surface1/20 hover:from-ctp-surface1/60 hover:to-ctp-surface2/30 border border-ctp-surface0/30 hover:border-ctp-surface1/50 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <Menu className="h-4 w-4 text-ctp-text transition-transform duration-200 hover:scale-110" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-72 bg-gradient-to-b from-ctp-base to-ctp-mantle border border-ctp-surface0/50 rounded-xl shadow-2xl z-[99999] backdrop-blur-sm p-2 max-h-[60vh] overflow-y-auto"
        >
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-ctp-subtext1 uppercase tracking-wider">
              Navigation
            </h3>
          </div>

          {/* Navigation Sections */}
          <div className=" mb-3">
            {sectionKeys.map((section) => (
              <DropdownMenuItem
                key={section}
                className={cn(
                  "group flex items-center gap-3  text-left cursor-pointer font-mono text-sm rounded-lg transition-all duration-200 text-ctp-text"
                )}
                onClick={() => setActiveSection(section)}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                    activeSection === section
                      ? `bg-gradient-to-br ${getIconColor(section).replace(
                          "text-",
                          "from-"
                        )}/20 ${getIconColor(section).replace(
                          "text-",
                          "to-"
                        )}/10 shadow-sm`
                      : "group-hover:bg-ctp-surface1/30"
                  )}
                >
                  <span
                    className={cn(
                      "transition-all duration-200",
                      getIconColor(section)
                    )}
                  >
                    {sectionIconMap[section]}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="capitalize font-medium">{section}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>

          {/* Elegant Separator */}
          <div className="relative my-3">
            <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-ctp-surface1/50 to-transparent" />
          </div>

          {/* Links Header */}
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-ctp-subtext1 uppercase tracking-wider">
              Quick Links
            </h3>
          </div>

          {/* External Links */}
          <div className="space-y-1">
            {externalLinks.map((link) => (
              <DropdownMenuItem
                key={link.label}
                className={cn(
                  "group flex items-center gap-3 py-3 px-3 text-left cursor-pointer font-mono text-sm rounded-lg transition-all duration-200",
                  "text-ctp-subtext0 hover:text-ctp-text hover:shadow-sm",
                  link.hoverClass
                )}
                onClick={() => handleExternalLinkClick(link.url)}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105",
                    "bg-gradient-to-br from-ctp-surface1/30 to-ctp-surface0/20 group-hover:shadow-sm"
                  )}
                >
                  <span
                    className={cn(
                      "transition-all duration-200",
                      link.colorClass
                    )}
                  >
                    {link.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-ctp-subtext1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </div>
                  <div className="text-xs text-ctp-subtext1 mt-0.5 truncate">
                    {link.description}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 px-3 py-2">
            <div className="text-xs text-ctp-subtext1 text-center opacity-75">
              Built with ❤️ using React & TypeScript
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileEditorDropdown;
