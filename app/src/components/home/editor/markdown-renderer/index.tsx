import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";
import { FiPlay, FiX, FiZoomIn } from "react-icons/fi";

import type { Components } from "react-markdown";

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

const MarkdownImage: React.FC<{ src?: string; alt?: string }> = ({
  src = "",
  alt = "",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const ytId = getYouTubeId(src);
  if (ytId) return <MarkdownYouTube id={ytId} title={alt} />;
  if (isVideoUrl(src)) return <MarkdownVideo src={src} alt={alt} />;

  return (
    <>
      {/* Lightbox overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
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

      <figure className="my-4 md:my-6 group">
        {/* Skeleton shown until image loads */}
        {!loaded && !error && (
          <div className="w-full h-32 md:h-48 rounded-xl bg-ctp-surface0 border border-ctp-surface1 animate-pulse" />
        )}

        {!error && (
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-ctp-surface1",
              "shadow-lg shadow-black/30 cursor-zoom-in",
              "transition-all duration-300 group-hover:border-ctp-blue/50 group-hover:shadow-ctp-blue/10",
              !loaded ? "sr-only" : "animate-fadeIn [animation-duration:1.5s]",
            )}
            onClick={() => setLightbox(true)}
          >
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className="w-full object-cover rounded-xl transition-transform duration-[1.5s] group-hover:scale-[1.02]"
            />
            {/* Zoom hint overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 rounded-xl">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-mono backdrop-blur-sm">
                <FiZoomIn className="w-3.5 h-3.5" />
                click to zoom
              </div>
            </div>
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

// ─── YouTube renderer ─────────────────────────────────────────────────────────

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

// ─── Native video renderer ────────────────────────────────────────────────────

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

// ─── Custom react-markdown renderers ─────────────────────────────────────────

const markdownComponents: Components = {
  // Media
  img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,

  // Headings
  h1: ({ children }) => (
    <h1 className="text-lg md:text-xl font-bold text-ctp-text mt-6 md:mt-8 mb-2 md:mb-3 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <div className="flex items-center gap-2 md:gap-3 mt-6 md:mt-8 mb-2 md:mb-3">
      <span className="w-0.5 h-3 md:h-4 rounded-full shrink-0 bg-ctp-mauve" />
      <h2 className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-ctp-subtext0">
        {children}
      </h2>
      <span className="flex-1 border-t border-ctp-surface1" />
    </div>
  ),
  h3: ({ children }) => (
    <h3 className="text-xs md:text-sm font-semibold text-ctp-blue mt-4 md:mt-6 mb-1 md:mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-[10px] md:text-xs font-semibold text-ctp-teal uppercase tracking-wider mt-3 md:mt-4 mb-1">
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="text-sm md:text-base text-ctp-subtext1 leading-relaxed md:leading-7 mb-3 md:mb-4">
      {children}
    </p>
  ),

  // Blockquote — styled as a callout / tagline
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-ctp-blue pl-3 md:pl-4 my-3 md:my-4 text-ctp-blue italic text-xs md:text-sm">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <div className="border-t border-ctp-surface1 my-4 md:my-6" />,

  // Lists
  ul: ({ children }) => (
    <ul className="space-y-1 md:space-y-1.5 mb-3 md:mb-4 pl-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1 md:space-y-1.5 mb-3 md:mb-4 pl-1 list-decimal list-inside text-sm md:text-base text-ctp-subtext1">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-ctp-subtext1 text-sm md:text-base leading-relaxed md:leading-6">
      <span className="text-ctp-mauve shrink-0 mt-0.5 md:mt-1">–</span>
      <span>{children}</span>
    </li>
  ),

  code: ({ children, className }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <code className={cn("text-[10px] md:text-xs", className)}>
          {children}
        </code>
      );
    }
    return (
      <code className="px-1 md:px-1.5 py-0.5 rounded bg-ctp-surface0 text-ctp-peach font-mono text-[10px] md:text-xs border border-ctp-surface1 break-words">
        {children}
      </code>
    );
  },

  pre: ({ children }) => (
    <div className="relative my-4 md:my-5 rounded-lg overflow-hidden border border-ctp-surface1 w-full max-w-[85vw] md:max-w-none">
      <div className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-ctp-crust border-b border-ctp-surface1">
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ctp-red opacity-70" />
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ctp-yellow opacity-70" />
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ctp-green opacity-70" />
      </div>
      <pre className="overflow-x-auto p-3 md:p-4 bg-ctp-mantle text-[10px] md:text-xs leading-relaxed md:leading-6 font-mono text-ctp-text scrollbar-thin">
        {children}
      </pre>
    </div>
  ),

  table: ({ children }) => (
    <div className="my-4 md:my-5 w-full max-w-[85vw] md:max-w-none overflow-x-auto rounded-lg border border-ctp-surface1 scrollbar-thin">
      <table className="w-full text-[10px] md:text-xs font-mono min-w-[max-content] md:min-w-full">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ctp-surface0 text-ctp-subtext0 uppercase text-[9px] md:text-[10px] tracking-wider">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-ctp-surface1">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-ctp-surface0/40 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 md:px-4 py-2 md:py-2.5 text-left font-semibold text-ctp-subtext0 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 md:px-4 py-2 md:py-2.5 text-ctp-subtext1 whitespace-nowrap md:whitespace-normal">
      {children}
    </td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ctp-blue hover:text-ctp-sky underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-ctp-text">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-ctp-subtext1">{children}</em>
  ),
};

interface MarkdownRenderProps {
  markdown: string;
}

export const MarkdownRender: React.FC<MarkdownRenderProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {markdown}
    </ReactMarkdown>
  );
};
