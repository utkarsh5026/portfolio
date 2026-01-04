import { memo, useMemo } from "react";
import { Star, Zap } from "lucide-react";
import type { Project } from "@/types";
import { type ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import { useMobileContext } from "@/hooks/use-mobile";

interface ProjectFeaturesProps {
  project: Project;
  theme: ProjectTheme;
}

const ProjectFeatures = memo<ProjectFeaturesProps>(function ProjectFeatures({
  project,
  theme,
}) {
  const { isMobile } = useMobileContext();
  const features = useMemo(
    () => project.keyFeatures || [],
    [project.keyFeatures]
  );

  if (features.length === 0) {
    return <EmptyState theme={theme} />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="text-left space-y-2 sm:space-y-3 lg:space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-ctp-${theme.main}/20`}
            >
              <Star
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-${theme.main}`}
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Key Features
            </h2>
          </div>
        </div>

        {/* Features List */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              theme={theme}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

interface FeatureCardProps {
  feature: { title: string; description: string };
  theme: ProjectTheme;
  isMobile: boolean;
}

const FeatureCard = memo<FeatureCardProps>(function FeatureCard({
  feature,
  theme,
  isMobile,
}) {
  if (isMobile) {
    return (
      <div
        className={`relative p-4 rounded-xl border-2 bg-ctp-surface0/50 border-ctp-surface1`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-ctp-${theme.main}/15`}>
            <Zap className={`w-4 h-4 text-ctp-${theme.main}`} />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-bold text-white">{feature.title}</h3>
            <p className="text-sm text-ctp-subtext1 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative p-4 sm:p-5 lg:p-6 rounded-xl border-2 bg-ctp-surface0/50 border-ctp-surface1 hover:border-ctp-${theme.main}/40 transition-colors`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`p-2 sm:p-2.5 rounded-lg bg-ctp-${theme.main}/10 group-hover:bg-ctp-${theme.main}/20 transition-colors`}
        >
          <Zap className={`w-4 h-4 sm:w-5 sm:h-5 text-ctp-${theme.main}`} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-ctp-subtext1 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});

const EmptyState = memo<{ theme: ProjectTheme }>(function EmptyState({
  theme,
}) {
  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-8">
      <div className="text-center space-y-3 sm:space-y-4 max-w-xs sm:max-w-md">
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-ctp-${theme.main}/20 flex items-center justify-center`}
        >
          <Star className={`w-6 h-6 sm:w-8 sm:h-8 text-ctp-${theme.main}`} />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          No Features Listed
        </h3>
        <p className="text-ctp-subtext1 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
          This project doesn't have detailed features documented yet. Check out
          the overview or tech stack for more information.
        </p>
      </div>
    </div>
  );
});

export default ProjectFeatures;
