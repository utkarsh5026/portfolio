import React, { useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";

import { useImageLoad } from "@/hooks/use-image-load";
import { cn } from "@/lib/utils";

/** Extract a YouTube video ID from common YouTube URL formats */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/** True for mp4 / webm / ogg video URLs */
function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export const MarkdownImage: React.FC<{ src?: string; alt?: string }> = ({
  src = "",
  alt = "",
}) => {
  const { loaded, error, imgProps } = useImageLoad();
  const [lightbox, setLightbox] = useState(false);

  const PLACEHOLDER_HOSTS = new Set([
    "placehold.co",
    "via.placeholder.com",
    "dummyimage.com",
  ]);
  try {
    const { hostname } = new URL(src);
    if (PLACEHOLDER_HOSTS.has(hostname)) return null;
  } catch {
    // relative or invalid URL — not a placeholder
  }

  const ytId = getYouTubeId(src);
  if (ytId) return <MarkdownYouTube id={ytId} title={alt} />;
  if (isVideoUrl(src)) return <MarkdownVideo src={src} alt={alt} />;

  return (
    <>
      {/* Lightbox overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 transition-colors"
            onClick={() => setLightbox(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {alt && (
            <p className="absolute bottom-4 text-ctp-subtext0 text-xs font-mono">
              {alt}
            </p>
          )}
        </div>
      )}

      <figure className="my-4 md:my-6">
        {/* Skeleton shown until image loads */}
        {!loaded && !error && (
          <div className="w-full h-32 md:h-48 rounded-xl bg-ctp-surface0 border border-ctp-surface1 animate-pulse" />
        )}

        {!error && (
          <div
            className={cn(
              "flex justify-center rounded-xl border border-none p-2",
              "shadow-lg shadow-black/30 cursor-zoom-in bg-transparent",
              !loaded ? "sr-only" : "animate-fadeIn [animation-duration:1.5s]"
            )}
            onClick={() => setLightbox(true)}
          >
            <img
              src={src}
              alt={alt}
              {...imgProps}
              className="max-w-full h-auto block object-contain rounded-xl"
            />
          </div>
        )}

        {error && (
          <div className="w-full h-24 md:h-32 rounded-xl bg-ctp-surface0 border border-ctp-surface1 flex items-center justify-center">
            <span className="text-ctp-overlay0 text-xs font-mono">
              ⚠ image unavailable
            </span>
          </div>
        )}

        {alt && loaded && !error && (
          <figcaption className="mt-1.5 md:mt-2 text-center text-[10px] md:text-[11px] text-ctp-overlay0 font-mono italic">
            {alt}
          </figcaption>
        )}
      </figure>
    </>
  );
};

const MarkdownYouTube: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  const [revealed, setRevealed] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <figure className="my-4 md:my-6">
      <div className="relative overflow-hidden rounded-xl border border-ctp-surface1 shadow-lg shadow-black/30">
        {!revealed ? (
          /* Thumbnail + play button */
          <div
            className="relative cursor-pointer group"
            onClick={() => setRevealed(true)}
          >
            <img
              src={thumb}
              alt={title || "YouTube video"}
              className="w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-ctp-red flex items-center justify-center shadow-xl shadow-ctp-red/40 group-hover:scale-110 transition-transform duration-200">
                <FiPlay className="w-5 h-5 md:w-7 md:h-7 text-white fill-white ml-0.5 md:ml-1" />
              </div>
            </div>
            {/* YouTube badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/80 backdrop-blur-sm">
              YouTube
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        )}
      </div>
      {title && (
        <figcaption className="mt-1.5 md:mt-2 text-center text-[10px] md:text-[11px] text-ctp-overlay0 font-mono italic">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

const MarkdownVideo: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <figure className="my-4 md:my-6">
    <div className="overflow-hidden rounded-xl border border-ctp-surface1 shadow-lg shadow-black/30 bg-black">
      <video
        src={src}
        controls
        preload="metadata"
        className="w-full max-h-[480px] object-contain"
      />
    </div>
    {alt && (
      <figcaption className="mt-1.5 md:mt-2 text-center text-[10px] md:text-[11px] text-ctp-overlay0 font-mono italic">
        {alt}
      </figcaption>
    )}
  </figure>
);
