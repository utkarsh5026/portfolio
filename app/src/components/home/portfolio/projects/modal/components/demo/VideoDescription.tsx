import Reveal from "@/components/animations/reveal/Reveal";
import { Eye } from "lucide-react";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import type { Project, ProjectDemoVideo } from "@/types";

interface VideoDescriptionProps {
  demoVideo: ProjectDemoVideo;
  theme: ProjectTheme;
  project: Project;
}

const VideoDescription: React.FC<VideoDescriptionProps> = ({
  demoVideo,
  theme,
  project,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {/* Description Card */}
      <Reveal className="space-y-4">
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Eye className={`w-5 h-5 text-ctp-${theme.main}`} />
            About This Demo
          </h3>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
            {demoVideo.description ??
              `Watch ${project.name} in action! This demo showcases the key features and functionality of the project.`}
          </p>
        </div>
      </Reveal>

      {/* Video Stats */}
      <Reveal className="space-y-4">
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Video Details
          </h3>
          <div className="space-y-3">
            {demoVideo.duration && (
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Duration</span>
                <span className="text-white text-sm font-medium">
                  {demoVideo.duration}
                </span>
              </div>
            )}
            {demoVideo.fileSize && (
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">File Size</span>
                <span className="text-white text-sm font-medium">
                  {demoVideo.fileSize}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Quality</span>
              <span className="text-white text-sm font-medium">HD 1080p</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default VideoDescription;
