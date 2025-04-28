import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface AnimatedTabsTriggerProps {
  value: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  color?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const AnimatedTabsTrigger: React.FC<AnimatedTabsTriggerProps> = ({
  value,
  children,
  className,
  icon,
  color = "blue",
  activeColor,
  inactiveColor = "text-muted-foreground",
}) => {
  const activeColorClass = activeColor ?? `text-ctp-${color}`;

  return (
    <TabsTrigger
      value={value}
      className={cn(
        "relative px-4 py-3 flex items-center gap-2 text-sm font-medium transition-colors",
        "rounded-none shadow-none",
        "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        "focus:outline-none focus:ring-0",
        "data-[state=active]:" + activeColorClass,
        "data-[state=inactive]:" + inactiveColor,
        "hover:text-foreground",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>

      {/* Animated underline that appears when active */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-current",
          `data-[state=active]:bg-ctp-${color}`,
          "origin-left"
        )}
        layoutId="activeAnimatedTab"
        transition={{ duration: 0.3 }}
        style={{
          opacity: 0,
          scaleX: 0,
        }}
        data-state="inactive"
        variants={{
          active: {
            opacity: 1,
            scaleX: 1,
          },
          inactive: {
            opacity: 0,
            scaleX: 0,
          },
        }}
        animate="inactive"
        data-active={value === value ? "true" : "false"}
      />
    </TabsTrigger>
  );
};

export default AnimatedTabsTrigger;
