import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";
import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { Sparkles } from "lucide-react";

interface FeatureHeaderProps {
  project: Project;
  theme: ProjectTheme;
  majorFeaturesCount: number;
  totalSubFeatures: number;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  project,
  theme,
  majorFeaturesCount,
  totalSubFeatures,
}) => {
  return (
    <Reveal className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} shadow-lg`}
        >
          <Sparkles className="w-6 h-6 text-ctp-crust" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Core Features
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Major capabilities that power this project
          </p>
        </div>
      </div>

      {/* Enhanced Stats Bar */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-lg mx-auto">
        <div className="text-center">
          <div className={`text-xl font-bold text-ctp-${theme.main}`}>
            {majorFeaturesCount}
          </div>
          <div className="text-xs text-white/60">Major Features</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className={`text-xl font-bold text-ctp-${theme.secondary}`}>
            {totalSubFeatures}
          </div>
          <div className="text-xs text-white/60">Capabilities</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-xl font-bold text-ctp-green">
            {project.media?.gallery?.length || 0}
          </div>
          <div className="text-xs text-white/60">Demos</div>
        </div>
      </div>
    </Reveal>
  );
};

export default FeatureHeader;
