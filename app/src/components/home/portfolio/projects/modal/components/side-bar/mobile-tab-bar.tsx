import { useMemo, memo } from "react";
import { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tab } from "./tab";

interface MobileTabBarProps {
  theme: ProjectTheme;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  hasMedia: boolean;
  hasDemo: boolean;
}

const MobileTabBar = memo<MobileTabBarProps>(function MobileTabBar({
  theme,
  activeTab,
  setActiveTab,
  hasMedia,
  hasDemo,
}) {
  const tabs = useMemo(
    () =>
      [
        { id: "overview", label: "Overview", enabled: true, icon: "📋" },
        { id: "features", label: "Features", enabled: true, icon: "⚡" },
        { id: "media", label: "Media", enabled: hasMedia, icon: "🎥" },
        { id: "demo", label: "Demo", enabled: hasDemo, icon: "🚀" },
      ].filter((tab) => tab.enabled),
    [hasMedia, hasDemo],
  );

  const gridColsClass =
    tabs.length === 3
      ? "grid-cols-3"
      : tabs.length === 4
        ? "grid-cols-4"
        : "grid-cols-5";

  return (
    <div className="w-full bg-ctp-surface0/50 border-b border-none">
      <div className="px-4 py-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Tab)}
          className="w-full"
        >
          <TabsList
            className={`grid w-full bg-ctp-surface1/40 rounded-xl p-1.5 h-auto ${gridColsClass}`}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-1 px-2 py-2.5 text-xs font-medium rounded-lg text-ctp-subtext0 data-[state=active]:text-ctp-text min-h-[60px] relative"
                  style={{
                    background: isActive
                      ? `rgba(var(--ctp-${theme.main}), 0.15)`
                      : "transparent",
                    borderWidth: isActive ? 2 : 0,
                    borderColor: isActive
                      ? `rgba(var(--ctp-${theme.main}), 0.5)`
                      : "transparent",
                    color: isActive
                      ? `rgba(var(--ctp-${theme.main}), 1)`
                      : undefined,
                  }}
                >
                  <span className="text-lg leading-none">{tab.icon}</span>
                  <span className="leading-tight font-semibold">
                    {tab.label}
                  </span>

                  {isActive && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{
                        backgroundColor: `rgba(var(--ctp-${theme.main}), 0.8)`,
                      }}
                    />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
});

export default MobileTabBar;
