import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";

interface DemoHeaderProps {
  demoVideoTitle: string;
  theme: ProjectTheme;
  projectName: string;
}

const DemoHeader: React.FC<DemoHeaderProps> = ({
  demoVideoTitle,
  theme,
  projectName,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <motion.div
        className={`p-3 rounded-xl bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} shadow-lg`}
        animate={{
          boxShadow: [
            `0 0 20px rgba(var(--ctp-${theme.main}), 0.3)`,
            `0 0 30px rgba(var(--ctp-${theme.main}), 0.5)`,
            `0 0 20px rgba(var(--ctp-${theme.main}), 0.3)`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6 text-ctp-crust" />
      </motion.div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Demo Showcase
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          {demoVideoTitle ?? `${projectName} in action`}
        </p>
      </div>
    </div>
  );
};

export default DemoHeader;
