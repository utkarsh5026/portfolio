import { motion } from "framer-motion";
import { useState } from "react";
import { skillCategories } from "../data";
import useMobile from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TriggerContent from "./trigger-content";
import ExpandedSkillsContent from "./expanded-content";

interface SkillCardProps {
  category: (typeof skillCategories)[number];
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isMobile } = useMobile();

  const handleToggle = () => {
    if (isMobile) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group w-full"
    >
      {isMobile ? (
        // Mobile: Use Drawer
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <div>
              <TriggerContent
                category={category}
                isMobile={isMobile}
                isDrawerOpen={isDrawerOpen}
                isExpanded={isExpanded}
                handleToggle={handleToggle}
              />
            </div>
          </DrawerTrigger>
          <DrawerContent className="max-h-[90vh] bg-ctp-base border-ctp-surface1/50 border-none z-[999999]">
            <DrawerHeader className="border-b border-ctp-surface1/50 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl bg-ctp-${category.color}/10 text-ctp-${category.color}`}
                >
                  {category.icon}
                </div>
                <div>
                  <DrawerTitle className="text-xl font-bold text-ctp-text">
                    {category.title}
                  </DrawerTitle>
                  <p className="text-sm text-ctp-subtext0 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </DrawerHeader>
            <div className="px-4 py-6 overflow-y-auto">
              <ExpandedSkillsContent category={category} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // Desktop: Use Collapsible with sticky trigger
        <div className="relative">
          {/* Sticky Trigger Content when expanded */}
          {isExpanded && (
            <div className="sticky top-4 z-50 mb-4">
              <TriggerContent
                category={category}
                isMobile={isMobile}
                isDrawerOpen={isDrawerOpen}
                isExpanded={isExpanded}
                handleToggle={handleToggle}
              />
            </div>
          )}

          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            {/* Normal Trigger Content when collapsed */}
            {!isExpanded && (
              <CollapsibleTrigger asChild>
                <div>
                  <TriggerContent
                    category={category}
                    isMobile={isMobile}
                    isDrawerOpen={isDrawerOpen}
                    isExpanded={isExpanded}
                    handleToggle={handleToggle}
                  />
                </div>
              </CollapsibleTrigger>
            )}

            <CollapsibleContent>
              <motion.div
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 sm:pt-4 border-none bg-transparent">
                  <ExpandedSkillsContent category={category} />
                </div>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;
