import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";

interface FeaturesContentProps {
  project: Project;
  theme: ProjectTheme;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  project,
  theme,
}) => {
  return (
    <Reveal>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Key Features</h2>
          <p className="text-white/60">
            Explore what makes this project special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.features.map((feature) => (
            <Reveal
              key={feature}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-3 h-3 rounded-full bg-ctp-${theme.main} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`}
                />
                <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors">
                  {feature}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default FeaturesContent;
