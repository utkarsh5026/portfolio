import React from "react";
import { VscCheck, VscGitCommit, VscSettingsGear } from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GhostButton from "@/components/ui/ghost-button";
import { Switch } from "@/components/ui/switch";
import useSettingsStore, { CatppuccinFlavor } from "@/store/settings-store";

const FLAVORS: {
  id: CatppuccinFlavor;
  label: string;
  swatches: string[];
}[] = [
  {
    id: "mocha",
    label: "Mocha",
    swatches: ["#cba6f7", "#89b4fa", "#a6e3a1", "#f38ba8", "#fab387"],
  },
  {
    id: "macchiato",
    label: "Macchiato",
    swatches: ["#c6a0f6", "#8aadf4", "#a6da95", "#ed8796", "#f5a97f"],
  },
  {
    id: "frappe",
    label: "Frappe",
    swatches: ["#ca9ee6", "#8caaee", "#a6d189", "#e78284", "#ef9f76"],
  },
  {
    id: "latte",
    label: "Latte",
    swatches: ["#8839ef", "#1e66f5", "#40a02b", "#d20f39", "#fe640b"],
  },
];

const SettingsPanel: React.FC = () => {
  const { gitBlameEnabled, toggleGitBlame, flavor, setFlavor } =
    useSettingsStore();

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

        <DropdownMenuSeparator className="bg-ctp-surface2" />
        <DropdownMenuLabel className="text-ctp-subtext0 text-xs uppercase tracking-widest">
          Theme
        </DropdownMenuLabel>

        {/* Flavor picker */}
        <div className="px-2 py-1 space-y-1">
          {FLAVORS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFlavor(f.id)}
              className="w-full flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-ctp-surface1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {f.swatches.map((color) => (
                    <span
                      key={color}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>{f.label}</span>
              </div>
              {flavor === f.id && (
                <VscCheck className="w-3.5 h-3.5 text-ctp-green flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsPanel;
