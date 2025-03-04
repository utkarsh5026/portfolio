import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaCode,
  FaFolder,
  FaGithub,
  FaTerminal,
  FaLinkedin,
} from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./context/explorerContext";

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
      <Button
        variant="ghost"
        className="p-3 text-[#cdd6f4] hover:text-[#89b4fa] mb-6 relative group"
        onClick={() => setActiveSection("home")}
      >
        <FaCode className="w-5 h-5" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Home
        </span>
      </Button>

      <Button
        variant="ghost"
        className={cn(
          "p-3 relative group transition-colors duration-200",
          explorerOpen
            ? "text-[#f38ba8]"
            : "text-[#cdd6f4] hover:text-[#89b4fa]"
        )}
        onClick={() => setExplorerOpen(!explorerOpen)}
      >
        <BsLayoutSidebarInset className="w-5 h-5" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {explorerOpen ? "Hide Explorer" : "Show Explorer"}
        </span>
      </Button>

      <Button
        variant="ghost"
        className="p-3 text-[#cdd6f4] hover:text-[#89b4fa] relative group"
        onClick={() => setActiveSection("projects")}
      >
        <FaFolder className="w-5 h-5" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Projects
        </span>
      </Button>

      <Button
        className="p-3 text-ctp-lavender hover:text-ctp-blue relative group"
        onClick={() => window.open("https://github.com/utkarsh5026", "_blank")}
      >
        <FaGithub className="w-4 h-4" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          GitHub
        </span>
      </Button>

      <Button
        variant="ghost"
        className="p-3 text-ctp-sapphire hover:text-ctp-blue relative group"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
            "_blank"
          )
        }
      >
        <FaLinkedin className="w-4 h-4" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          LinkedIn
        </span>
      </Button>

      <div className="flex-1"></div>

      <Button
        variant="ghost"
        className={cn(
          "p-3 relative group transition-colors duration-200",
          terminalOpen
            ? "text-[#f38ba8]"
            : "text-[#cdd6f4] hover:text-[#89b4fa]"
        )}
        onClick={() => setTerminalOpen(!terminalOpen)}
      >
        <FaTerminal className="w-5 h-5" />
        <span className="absolute left-14 px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Terminal
        </span>
      </Button>
    </div>
  );
};

export default SideBar;
