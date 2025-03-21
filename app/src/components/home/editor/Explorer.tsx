import React from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useEditorContext } from "./context/explorerContext";
import Logo from "@/components/home/appbar/Logo";
import OutlinePanel from "./outline/OutlinePanel";

/**
 * Explorer Component
 *
 * The Explorer component serves as a navigation panel within the editor interface.
 * It allows users to browse through their project files and manage their workspace effectively.
 *
 * Key Features:
 * - Displays a list of files in the current project, allowing users to select and view different sections.
 * - Highlights the active section to provide visual feedback on the current selection.
 * - Includes a logo at the top for branding purposes.
 * - Provides an outline panel for additional navigation or organizational features.
 * - Contains a section for extensions, where users can access settings related to themes and preferences.
 *
 * Usage:
 * - The component utilizes the `useEditorContext` hook to access the current state of the editor, including the active section,
 *   the list of files, and whether the mobile menu is open.
 * - Users can click on a file button to set the active section, which updates the main content area of the editor.
 *
 * @component
 * @returns {JSX.Element} The rendered Explorer component.
 */
const Explorer: React.FC = () => {
  const { activeSection, setActiveSection, files, mobileMenuOpen } =
    useEditorContext();
  return (
    <div
      className={cn(
        "editor-explorer w-52 bg-[#181825] border-r border-[#313244] py-4 overflow-y-auto z-40 h-screen max-h-screen",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="px-4 text-[#cdd6f4] text-sm mb-2">
        <Logo />
      </div>
      <div className="text-[#6c7086] text-xs px-4 pt-2 pb-1">PORTFOLIO</div>

      <div className="space-y-1 px-2">
        <div className="mt-2">
          <div className="px-2 py-1 text-[#6c7086] text-xs font-semibold">
            SRC
          </div>

          {files.map((file) => (
            <button
              key={file.name}
              className={cn(
                "w-full text-left px-2 py-1 text-sm rounded-sm flex items-center relative",
                activeSection === file.section
                  ? "bg-[#313244] text-[#cdd6f4]"
                  : "text-[#6c7086] hover:text-[#cdd6f4]"
              )}
              onClick={() => setActiveSection(file.section)}
            >
              <FaCode className="w-3 h-3 mr-2" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        <OutlinePanel />
      </div>

      <div className="mt-6 px-4 text-[#cdd6f4] text-sm">EXTENSIONS</div>
      <div className="mt-2 px-2 space-y-1">
        <div className="flex items-center text-[#6c7086] px-2 py-1 text-xs hover:text-[#cdd6f4]">
          <IoSettingsSharp className="w-3 h-3 mr-2" />
          Theme
        </div>
        <div className="flex items-center text-[#6c7086] px-2 py-1 text-xs hover:text-[#cdd6f4]">
          <IoSettingsSharp className="w-3 h-3 mr-2" />
          Preferences
        </div>
      </div>
    </div>
  );
};

export default Explorer;
