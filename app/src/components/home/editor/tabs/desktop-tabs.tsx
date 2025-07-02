import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionType } from "../context/explorer-context";
import { cn } from "@/lib/utils";
import { getIconColor, sectionIconMap, getActiveTabColor } from "./tab-style";
import { motion } from "framer-motion";

interface DesktopTabsProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  sectionKeys: SectionType[];
}

const DesktopTabs: React.FC<DesktopTabsProps> = ({
  activeSection,
  setActiveSection,
  sectionKeys,
}) => {
  return (
    <Tabs
      value={activeSection}
      onValueChange={(value) => setActiveSection(value as SectionType)}
      className="w-full"
    >
      <div className="w-full overflow-x-auto scrollbar-hide">
        <TabsList className="h-10 bg-transparent px-2 py-0 w-max min-w-full flex items-center rounded-none justify-start">
          {sectionKeys.map((section) => {
            const iconColor = getIconColor(section);
            return (
              <TabsTrigger
                key={section}
                value={section}
                className={cn(
                  "relative h-9 px-4 rounded-none font-mono text-xs transition-all duration-200",
                  "data-[state=inactive]:bg-ctp-surface0/50 data-[state=inactive]:text-ctp-subtext0",
                  "data-[state=active]:bg-ctp-base data-[state=active]:text-ctp-text",
                  "hover:bg-ctp-surface0 hover:text-ctp-text",
                  "focus-visible:ring-ctp-lavender focus-visible:ring-opacity-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn("w-3 h-3", iconColor)}>
                    {sectionIconMap[section]}
                  </span>
                  <span className="text-sm font-medium text-ctp-text capitalize">
                    {section}
                  </span>
                </div>

                {/* Animated active indicator */}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r",
                      getActiveTabColor(section)
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
};

export default DesktopTabs;
