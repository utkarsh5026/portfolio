import React from "react";
import { VscGitCommit, VscSettingsGear } from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GhostButton from "@/components/ui/ghost-button";
import { Switch } from "@/components/ui/switch";
import useSettingsStore from "@/store/settings-store";

const SettingsPanel: React.FC = () => {
  const { gitBlameEnabled, toggleGitBlame } = useSettingsStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <GhostButton
            icon={<VscSettingsGear className="w-5 h-5 text-ctp-overlay1" />}
            label="Settings"
            onClick={() => {}}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        className="w-60 bg-ctp-surface0 border-ctp-surface2 text-ctp-text font-source"
      >
        <DropdownMenuLabel className="text-ctp-subtext0 text-xs uppercase tracking-widest">
          Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-ctp-surface2" />

        {/* Git Blame toggle */}
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2 text-sm">
            <VscGitCommit className="w-3.5 h-3.5 text-ctp-green flex-shrink-0" />
            <span>Git Blame</span>
          </div>
          <Switch
            checked={gitBlameEnabled}
            onCheckedChange={toggleGitBlame}
            className="data-[state=checked]:bg-ctp-green data-[state=unchecked]:bg-ctp-surface2"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsPanel;
