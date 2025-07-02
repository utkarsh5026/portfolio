import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";

interface VideoHighlightsProps {
  highlights: string[];
  theme: ProjectTheme;
}

const VideoHighlights: React.FC<VideoHighlightsProps> = ({
  highlights,
  theme,
}) => {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Sparkles className={`w-5 h-5 text-ctp-${theme.main}`} />
        Demo Highlights
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div
              className={`w-2 h-2 rounded-full bg-ctp-${theme.main} mt-2 flex-shrink-0`}
            />
            <span className="text-white/80 text-sm">{highlight}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoHighlights;
