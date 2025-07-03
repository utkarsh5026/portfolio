import React from "react";
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

const MobileTabBar: React.FC<MobileTabBarProps> = ({
  theme,
  activeTab,
  setActiveTab,
  hasMedia,
  hasDemo,
}) => {
  const tabs = [
    { id: "overview", label: "Overview", enabled: true, icon: "📋" },
    { id: "features", label: "Features", enabled: true, icon: "⚡" },
    { id: "tech", label: "Tech", enabled: true, icon: "🔧" },
    { id: "media", label: "Media", enabled: hasMedia, icon: "🎥" },
    { id: "demo", label: "Demo", enabled: hasDemo, icon: "🚀" },
  ].filter((tab) => tab.enabled);

  return (
    <div className="w-full bg-ctp-surface0/30 backdrop-blur-sm border-b border-none">
      <div className="px-4 py-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Tab)}
          className="w-full"
        >
          <TabsList
            className={`
              grid w-full bg-ctp-surface1/30 border border-none 
              backdrop-blur-sm shadow-lg rounded-xl p-1.5 h-auto
              ${
                tabs.length === 3
                  ? "grid-cols-3"
                  : tabs.length === 4
                  ? "grid-cols-4"
                  : "grid-cols-5"
              }
            `}
            style={{
              background: `linear-gradient(135deg, 
                rgba(var(--ctp-surface1), 0.4) 0%, 
                rgba(var(--ctp-surface0), 0.2) 100%)`,
            }}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`
                  flex flex-col items-center gap-1 px-2 py-2.5 text-xs font-medium
                  rounded-lg transition-all duration-300 ease-out
                  data-[state=active]:shadow-lg data-[state=active]:shadow-ctp-${theme.main}/20
                  data-[state=active]:scale-[1.02] data-[state=active]:border-2
                  hover:scale-[1.01] hover:bg-ctp-surface2/40
                  text-ctp-subtext0 data-[state=active]:text-ctp-text
                  min-h-[60px] relative overflow-hidden group
                `}
                style={{
                  background:
                    activeTab === tab.id
                      ? `linear-gradient(135deg, 
                      rgba(var(--ctp-${theme.main}), 0.15) 0%, 
                      rgba(var(--ctp-${theme.main}), 0.05) 100%)`
                      : "transparent",
                  borderColor:
                    activeTab === tab.id
                      ? `rgba(var(--ctp-${theme.main}), 0.5)`
                      : "transparent",
                  color:
                    activeTab === tab.id
                      ? `rgba(var(--ctp-${theme.main}), 1)`
                      : undefined,
                }}
              >
                {/* Background glow effect for active tab */}
                {activeTab === tab.id && (
                  <div
                    className="absolute inset-0 opacity-20 blur-sm"
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(var(--ctp-${theme.main}), 0.3) 0%, 
                        transparent 70%)`,
                    }}
                  />
                )}

                {/* Icon */}
                <span className="text-lg leading-none group-hover:scale-110 transition-transform duration-200">
                  {tab.icon}
                </span>

                {/* Label */}
                <span className="leading-tight font-semibold">{tab.label}</span>

                {/* Active indicator */}
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: `rgba(var(--ctp-${theme.main}), 0.8)`,
                    }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileTabBar;
