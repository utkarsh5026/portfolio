import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";
import DemoVideoNotAvailable from "./DemoVideoNotAvailable";
import VideoHighlights from "./VideoHighlights";
import VideoDescription from "./VideoDescription";
import DemoHeader from "./DemoHeader";
import useVideo from "@/hooks/use-video";

interface DemoVideoProps {
  project: Project;
  theme: ProjectTheme;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const DemoVideo: React.FC<DemoVideoProps> = ({ project, theme }) => {
  const { demoVideo } = project;
  const {
    containerRef,
    videoRef,
    videoState,
    toggleFullscreen,
    toggleMute,
    shouldLoadVideo,
    setVideoState,
    togglePlay,
    handleVolumeChange,
    handleSeek,
  } = useVideo();

  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (videoState.playing && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoState.playing, isHovering]);

  if (!demoVideo) {
    return (
      <Reveal className="p-8">
        <DemoVideoNotAvailable />
      </Reveal>
    );
  }

  return (
    <div className="p-4 sm:p-8 h-full">
      {/* Header */}
      <Reveal className="mb-6 sm:mb-8">
        <DemoHeader
          demoVideoTitle={demoVideo.title ?? `${project.name} in action`}
          theme={theme}
          projectName={project.name}
        />
      </Reveal>

      {/* Video Player */}
      <Reveal className="mb-6 sm:mb-8">
        <div
          ref={containerRef}
          className={cn(
            "relative group rounded-2xl overflow-hidden",
            "bg-gradient-to-br from-black to-ctp-surface0",
            "shadow-2xl border border-white/10",
            videoState.fullscreen
              ? "fixed inset-0 z-[9999] rounded-none"
              : "aspect-video"
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Always show thumbnail */}
          <img
            src={demoVideo.thumbnail}
            alt={`${project.name} demo`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              videoState.ready
                ? "opacity-0 absolute inset-0 pointer-events-none"
                : "opacity-100"
            )}
          />

          {/* Load video only when needed */}
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              preload="metadata"
              onCanPlay={() =>
                setVideoState((prev) => ({ ...prev, ready: true }))
              }
              onLoadedMetadata={() => {
                setVideoState((prev) => ({
                  ...prev,
                  duration: videoRef.current?.duration ?? 0,
                  loading: false,
                }));
              }}
              onTimeUpdate={() => {
                setVideoState((prev) => ({
                  ...prev,
                  currentTime: videoRef.current?.currentTime ?? 0,
                }));
              }}
              onPlay={() =>
                setVideoState((prev) => ({ ...prev, playing: true }))
              }
              onPause={() =>
                setVideoState((prev) => ({ ...prev, playing: false }))
              }
              onClick={togglePlay}
            >
              <source src={demoVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Loading Overlay */}
          <AnimatePresence>
            {videoState.loading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full border-4 border-ctp-${theme.main}/30 border-t-ctp-${theme.main} mx-auto mb-4`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <p className="text-white/80">Loading demo video...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Play Button Overlay */}
          <AnimatePresence>
            {!videoState.playing && !videoState.loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <motion.div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-ctp-${theme.main}/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-2 border-white/20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-ctp-crust ml-1" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Controls */}
          <AnimatePresence>
            {showControls && !videoState.loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6"
              >
                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    className="w-full h-2 bg-white/20 rounded-full cursor-pointer group"
                    onClick={handleSeek}
                  >
                    <div
                      className={`h-full bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} rounded-full transition-all duration-150`}
                      style={{
                        width: `${
                          (videoState.currentTime / videoState.duration) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Play/Pause */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {videoState.playing ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                      )}
                    </motion.button>

                    {/* Volume Control */}
                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {videoState.muted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={videoState.volume}
                        onChange={(e) =>
                          handleVolumeChange(parseFloat(e.target.value))
                        }
                        className={`w-20 accent-ctp-${theme.main}`}
                        title="Volume"
                      />
                    </div>

                    {/* Time Display */}
                    <div className="hidden sm:flex items-center gap-1 text-white/80 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatTime(videoState.currentTime)} /{" "}
                        {formatTime(videoState.duration)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Mobile Volume */}
                    <button
                      onClick={toggleMute}
                      className="sm:hidden w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {videoState.muted ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {videoState.fullscreen ? (
                        <Minimize2 className="w-4 h-4 text-white" />
                      ) : (
                        <Maximize2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* Video Information */}
      <VideoDescription demoVideo={demoVideo} theme={theme} project={project} />

      {/* Highlights */}
      {demoVideo.highlights && demoVideo.highlights.length > 0 && (
        <Reveal className="mt-6 sm:mt-8">
          <VideoHighlights highlights={demoVideo.highlights} theme={theme} />
        </Reveal>
      )}
    </div>
  );
};

export default DemoVideo;
