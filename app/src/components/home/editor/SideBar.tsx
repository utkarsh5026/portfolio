import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaCode,
  FaFolder,
  FaFolderOpen,
  FaGithub,
  FaTerminal,
  FaLinkedin,
  FaEye,
} from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./context/explorerContext";

// Sidebar Button component
interface SideBarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  className = "",
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "p-3 relative group transition-colors duration-200",
        isActive ? "text-[#f38ba8]" : "text-[#cdd6f4] hover:text-[#89b4fa]",
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </Button>
  );
};

const SideBar: React.FC = () => {
  const { mobileMenuOpen, setActiveSection, explorerOpen, setExplorerOpen } =
    useEditorContext();
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-14 bg-[#181825] border-r border-[#313244] flex flex-col items-center py-4 z-50 fixed inset-y-0 left-0 transition-transform duration-200",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <SideBarButton
        icon={<FaCode className="w-5 h-5 text-ctp-green" />}
        label="Home"
        onClick={() => setActiveSection("home")}
        className="mb-6"
      />

      <SideBarButton
        icon={<BsLayoutSidebarInset className="w-5 h-5" />}
        label={explorerOpen ? "Hide Explorer" : "Show Explorer"}
        onClick={() => setExplorerOpen(!explorerOpen)}
        isActive={explorerOpen}
      />

      <SideBarButton
        icon={<FaFolder className="w-5 h-5" />}
        label="Projects"
        onClick={() => setActiveSection("projects")}
      />

      <SideBarButton
        icon={<FaGithub className="w-4 h-4" />}
        label="GitHub"
        onClick={() => window.open("https://github.com/utkarsh5026", "_blank")}
        className="text-ctp-lavender hover:text-ctp-blue"
      />

      <SideBarButton
        icon={<FaLinkedin className="w-4 h-4" />}
        label="LinkedIn"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
            "_blank"
          )
        }
        className="text-ctp-sapphire hover:text-ctp-blue"
      />

      <SideBarButton
        icon={<FaEye className="w-5 h-5 text-ctp-red" />}
        label="View Resume"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing"
          )
        }
      />

      <div className="flex-1"></div>

      <SideBarButton
        icon={<FaFolderOpen className="w-5 h-5 text-ctp-mauve" />}
        label="Github Repo for Portfolio"
        onClick={() => window.open("https://github.com/utkarsh5026/Portfolio")}
      />

      <SideBarButton
        icon={<FaTerminal className="w-5 h-5 text-ctp-peach" />}
        label="Terminal"
        onClick={() => setTerminalOpen(!terminalOpen)}
        isActive={terminalOpen}
      />
    </div>
  );
};

export default SideBar;
