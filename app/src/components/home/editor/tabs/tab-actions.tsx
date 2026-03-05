import {
  VscArrowLeft,
  VscArrowRight,
  VscClearAll,
  VscEllipsis,
  VscFolderOpened,
} from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TabActionsProps {
  openTabsCount: number;
  hasLeft: boolean;
  hasRight: boolean;
  hasProjects: boolean;
  activeTabId: string | null;
  closeAllTabs: () => void;
  closeTabsToLeft: (id: string) => void;
  closeTabsToRight: (id: string) => void;
  closeAllProjects: () => void;
}

export const TabActions = ({
  openTabsCount,
  hasLeft,
  hasRight,
  hasProjects,
  activeTabId,
  closeAllTabs,
  closeTabsToLeft,
  closeTabsToRight,
  closeAllProjects,
}: TabActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          title="Tab Actions"
          className="h-10 px-2.5 flex-shrink-0 flex items-center justify-center border-l border-ctp-surface0/60 text-ctp-subtext0 hover:bg-ctp-surface0 hover:text-ctp-text transition-colors data-[state=open]:bg-ctp-surface1 data-[state=open]:text-ctp-text"
        >
          <VscEllipsis className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[220px] bg-ctp-mantle border-ctp-surface0 text-ctp-text font-source"
      >
        {/* ── Group 1: Close All ── */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={openTabsCount === 0}
            onSelect={closeAllTabs}
            className="gap-2.5 text-ctp-red focus:bg-ctp-red/10 focus:text-ctp-red data-[disabled]:opacity-40 cursor-pointer"
          >
            <VscClearAll className="w-3.5 h-3.5 flex-shrink-0" />
            Close All Tabs
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-ctp-surface0" />

        {/* ── Group 2: Directional close ── */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={!hasLeft}
            onSelect={() => activeTabId && closeTabsToLeft(activeTabId)}
            className="gap-2.5 text-ctp-text focus:bg-ctp-surface0 data-[disabled]:opacity-40 cursor-pointer"
          >
            <VscArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
            Close Tabs to the Left
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!hasRight}
            onSelect={() => activeTabId && closeTabsToRight(activeTabId)}
            className="gap-2.5 text-ctp-text focus:bg-ctp-surface0 data-[disabled]:opacity-40 cursor-pointer"
          >
            <VscArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            Close Tabs to the Right
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-ctp-surface0" />

        {/* ── Group 3: Projects ── */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={!hasProjects}
            onSelect={closeAllProjects}
            className="gap-2.5 text-ctp-red focus:bg-ctp-red/10 focus:text-ctp-red data-[disabled]:opacity-40 cursor-pointer"
          >
            <VscFolderOpened className="w-3.5 h-3.5 flex-shrink-0" />
            Close All Projects
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
