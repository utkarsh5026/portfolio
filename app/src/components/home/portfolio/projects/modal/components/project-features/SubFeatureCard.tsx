import { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import { SubFeature } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap } from "lucide-react";

interface SubFeatureCardProps {
  subFeature: SubFeature;
  theme: ProjectTheme;
  index: number;
  priority: "high" | "medium" | "low";
}

const SubFeatureCard: React.FC<SubFeatureCardProps> = ({
  subFeature,
  theme,
  index,
  priority,
}) => {
  const priorityColors = {
    high: `ctp-${theme.main}`,
    medium: `ctp-${theme.secondary}`,
    low: "ctp-subtext1",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut",
      }}
      className={cn(
        "relative p-4 rounded-xl group/sub",
        "bg-gradient-to-br from-white/10 to-white/5",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:scale-105",
        subFeature.isHighlight && `ring-2 ring-${priorityColors[priority]}/30`
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "p-1.5 rounded-lg flex-shrink-0 mt-0.5",
            `bg-${priorityColors[priority]}/20`
          )}
        >
          <CheckCircle2
            className={`w-4 h-4 text-${priorityColors[priority]}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover/sub:text-white/90 transition-colors">
            {subFeature.title}
          </h4>
          {subFeature.description && (
            <p className="text-white/70 text-xs leading-relaxed mb-2">
              {subFeature.description}
            </p>
          )}
          {subFeature.metrics && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                `bg-${priorityColors[priority]}/20 text-${priorityColors[priority]}`
              )}
            >
              <Zap className="w-3 h-3" />
              {subFeature.metrics}
            </div>
          )}
        </div>
      </div>

      {subFeature.isHighlight && (
        <div className="absolute top-2 right-2">
          <div
            className={`w-2 h-2 rounded-full bg-${priorityColors[priority]} animate-pulse`}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SubFeatureCard;
