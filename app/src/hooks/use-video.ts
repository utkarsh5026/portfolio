import { useState, useRef, useCallback, useEffect } from "react";

interface HTMLElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface DocumentWithFullscreen extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export type Video = {
  duration: number;
  volume: number;
  ready: boolean;
  muted: boolean;
  playing: boolean;
  currentTime: number;
  fullscreen: boolean;
  loading: false;
};

const useVideo = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const [videoState, setVideoState] = useState<Video>({
    duration: 0,
    volume: 1,
    ready: false,
    muted: false,
    playing: false,
    currentTime: 0,
    fullscreen: false,
    loading: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (videoState.playing) videoRef.current.pause();
    else videoRef.current.play();

    setVideoState((prev) => ({ ...prev, playing: !prev.playing }));
  }, [videoState.playing]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoState.muted;
    setVideoState((prev) => ({ ...prev, muted: videoState.muted }));
  }, [videoState.muted]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (videoRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoState.duration;
      }
    },
    [videoState.duration]
  );

  const handleVolumeChange = useCallback((volume: number) => {
    setVideoState((prev) => ({ ...prev, volume }));
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setVideoState((prev) => ({
        ...prev,
        fullscreen: isCurrentlyFullscreen,
      }));
    };

    // Add event listeners for all fullscreen change events
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        // Enter fullscreen - try different methods for browser compatibility
        const container = containerRef.current as HTMLElementWithFullscreen;
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          // Safari
          await container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          // Firefox
          await container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          // IE/Edge
          await container.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen - try different methods for browser compatibility
        const doc = document as DocumentWithFullscreen;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          // Safari
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          // Firefox
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          // IE/Edge
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn("Fullscreen operation failed:", error);
      setVideoState((prev) => ({
        ...prev,
        fullscreen: !!document.fullscreenElement,
      }));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && event.target === containerRef.current) {
        event.preventDefault();
        togglePlay();
      }
    };

    if (videoState.fullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoState.fullscreen, togglePlay]);

  return {
    toggleMute,
    toggleFullscreen,
    togglePlay,

    handleVolumeChange,
    handleSeek,

    videoState,
    setVideoState,

    containerRef,
    videoRef,
    shouldLoadVideo,
  };
};

export default useVideo;
