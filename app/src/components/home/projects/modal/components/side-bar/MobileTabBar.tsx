import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
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
    { id: "overview", label: "Overview", enabled: true },
    { id: "features", label: "Features", enabled: true },
    { id: "tech", label: "Tech", enabled: true },
    { id: "media", label: "Media", enabled: hasMedia },
    { id: "demo", label: "Demo", enabled: hasDemo },
  ].filter((tab) => tab.enabled);

  return (
    <div className="border-b border-ctp-surface1/50 bg-ctp-surface0/30 backdrop-blur-sm">
      <div className="flex overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? `border-ctp-${theme.main} text-ctp-${theme.main} bg-ctp-${theme.main}/10`
                : "border-transparent text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface1/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabBar;
