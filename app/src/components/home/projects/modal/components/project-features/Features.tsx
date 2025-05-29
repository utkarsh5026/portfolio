import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import type { MediaItem, Project } from "@/types";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import FeatureHeader from "./Header";
import FeatureCard from "./FeatureCard";
import MediaLightbox from "./MediaLightBox";

interface FeaturesContentProps {
  project: Project;
  theme: ProjectTheme;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  project,
  theme,
}) => {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [allMedia] = useState<MediaItem[]>(project.media?.gallery || []);

  // Transform flat features into hierarchical structure
  const majorFeatures = project.projectFeatures;
  const toggleFeatureExpansion = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  const openLightbox = (mediaIndex: number) => {
    setSelectedMediaIndex(mediaIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMediaIndex(null);
  };

  const navigateMedia = (direction: "prev" | "next") => {
    if (selectedMediaIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (selectedMediaIndex - 1 + allMedia.length) % allMedia.length
        : (selectedMediaIndex + 1) % allMedia.length;
    setSelectedMediaIndex(newIndex);
  };

  return (
    <div className="space-y-6 p-4 sm:p-8">
      {/* Header Section */}
      <FeatureHeader
        project={project}
        theme={theme}
        majorFeaturesCount={majorFeatures.length}
        totalSubFeatures={majorFeatures.reduce(
          (sum, f) => sum + f.subFeatures.length,
          0
        )}
      />

      {/* Major Features */}
      {majorFeatures.length > 0 ? (
        <div className="space-y-6">
          {majorFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              theme={theme}
              index={index}
              isExpanded={expandedFeatures.has(feature.id)}
              onToggleExpansion={() => toggleFeatureExpansion(feature.id)}
              onMediaClick={openLightbox}
              allMedia={allMedia}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div
            className={`w-16 h-16 mx-auto mb-4 bg-ctp-${theme.main}/20 rounded-2xl flex items-center justify-center`}
          >
            <Sparkles className={`w-8 h-8 text-ctp-${theme.main}`} />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            No Features Available
          </h3>
          <p className="text-white/60">
            This project doesn't have detailed features listed yet.
          </p>
        </div>
      )}

      {/* Media Lightbox */}
      <MediaLightbox
        isOpen={isLightboxOpen}
        media={allMedia}
        selectedIndex={selectedMediaIndex}
        onClose={closeLightbox}
        onNavigate={navigateMedia}
      />
    </div>
  );
};

export default FeaturesContent;
