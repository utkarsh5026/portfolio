import React, { useEffect, useRef } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { Heading, Text } from "@/components/ui/text";
import { parseMarkdownHeadings, useMarkdownHeadingStore } from "@/store";

import { CodeBlock } from "./code-bock";
import { MarkdownImage } from "./media";

/** Slugify heading text into a stable DOM id. */
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 *  Extract plain text from React children (handles string + array).
 */
const childrenToText = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (
    React.isValidElement<{ children?: React.ReactNode }>(children) &&
    children.props.children
  )
    return childrenToText(children.props.children);
  return "";
};

const markdownComponents: Components = {
  img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,

  h1: ({ children }) => {
    const id = slugify(childrenToText(children));
    return (
      <Heading as="h1" id={id} className="mt-14 mb-8 md-heading md-h1">
        {children}
      </Heading>
    );
  },
  h2: ({ children }) => {
    const id = slugify(childrenToText(children));
    return (
      <div
        id={id}
        className="group flex items-center gap-4 mt-14 mb-8 md-heading md-h2"
      >
        <span className="w-1.5 h-8 rounded-full shrink-0 bg-gradient-to-b from-ctp-mauve to-ctp-blue shadow-lg shadow-ctp-mauve/20" />
        <Heading as="h2">{children}</Heading>
        <span className="flex-1 border-t border-ctp-surface1/60 ml-4 hidden md:block" />
      </div>
    );
  },
  h3: ({ children }) => {
    const id = slugify(childrenToText(children));
    return (
      <Heading
        as="h3"
        id={id}
        className="mt-10 mb-5 before:text-ctp-surface2 hover:before:text-ctp-mauve before:transition-colors before:duration-300 md-heading md-h3"
      >
        {children}
      </Heading>
    );
  },
  h4: ({ children }) => (
    <Heading as="h4" className="mt-8 mb-4">
      {children}
    </Heading>
  ),

  p: ({ children }) => (
    <Text as="p" className="mb-7">
      {children}
    </Text>
  ),

  blockquote: ({ children }) => (
    <blockquote className="relative flex border-l-[4px] border-ctp-mauve pl-6 my-10 bg-gradient-to-r from-ctp-surface0/50 to-transparent py-5 pr-6 rounded-2xl text-ctp-subtext0 italic text-lg shadow-sm">
      <div className="relative z-10">{children}</div>
    </blockquote>
  ),

  hr: () => (
    <div className="my-14 flex items-center justify-center gap-3 opacity-80">
      <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-ctp-surface2" />
      <span className="w-2 h-2 rounded-full bg-ctp-surface2" />
      <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-ctp-surface2" />
    </div>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-3 mb-8 ml-8 text-ctp-subtext0 text-base md:text-lg font-medium marker:text-ctp-lavender">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-3 mb-8 ml-8 text-ctp-subtext0 text-base md:text-lg font-medium marker:text-ctp-lavender marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-2">{children}</li>,

  pre: ({ children }) => <>{children}</>,

  code: ({ children, className, ...rest }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    const language = match ? match[1] : "";

    const isBlock = !!match;

    if (isBlock) {
      const code = String(children).replace(/\n$/, "");
      return <CodeBlock language={language} code={code} />;
    }

    return (
      <code
        className="px-2 py-0.5 rounded-md bg-ctp-surface0/80 text-ctp-lavender border border-ctp-surface0 font-mono text-[0.9em] whitespace-pre-wrap break-words font-semibold"
        {...rest}
      >
        {children}
      </code>
    );
  },

  table: ({ children }) => (
    <div className="my-10 w-full max-w-[85vw] md:max-w-none overflow-x-auto rounded-xl border border-ctp-surface1 shadow-lg bg-ctp-mantle/50 scrollbar-thin">
      <table className="w-full text-base min-w-[max-content] md:min-w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ctp-surface0 text-ctp-subtext0 uppercase text-xs font-bold tracking-wider">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-ctp-surface1/60">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-ctp-surface0/40 transition-colors duration-200">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-6 py-4 text-left font-bold text-ctp-text whitespace-nowrap border-b border-ctp-surface1/60">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 text-ctp-subtext0 whitespace-nowrap md:whitespace-normal font-medium leading-relaxed">
      {children}
    </td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative text-ctp-blue hover:text-ctp-sky font-semibold transition-colors duration-300 group inline-flex items-center gap-1"
    >
      <span>{children}</span>
      <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-ctp-sky/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
    </a>
  ),

  strong: ({ children }) => (
    <strong className="font-medium text-ctp-text px-0.5">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-ctp-subtext1">{children}</em>
  ),
};

interface MarkdownRenderProps {
  markdown: string;
}

export const MarkdownRender: React.FC<MarkdownRenderProps> = ({ markdown }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveHeadings = useMarkdownHeadingStore((s) => s.setActiveHeadings);
  const setHeadingTree = useMarkdownHeadingStore((s) => s.setHeadingTree);

  useEffect(() => {
    setHeadingTree(parseMarkdownHeadings(markdown));
    return () => setHeadingTree([]);
  }, [markdown, setHeadingTree]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>(".md-heading")
    );

    if (headings.length === 0) return;

    const updateBreadcrumbs = () => {
      const headings = Array.from(
        container.querySelectorAll<HTMLElement>(".md-heading")
      );

      if (headings.length === 0) return;

      // A heading is "active" once its top edge has scrolled ABOVE this
      // threshold (relative to the scroll container's top edge).
      // ~80 px ≈ tabs bar + breadcrumbs bar, so the breadcrumb switches
      // exactly as the heading disappears behind the toolbar.
      const THRESHOLD = 80;

      const scrollParent = container.closest<HTMLElement>(
        "[data-scroll-container]"
      );
      const parentTop = scrollParent?.getBoundingClientRect().top ?? 0;

      let h1: string | null = null;
      let h2: string | null = null;
      let h3: string | null = null;

      for (const el of headings) {
        const relTop = el.getBoundingClientRect().top - parentTop;

        // Stop as soon as we reach a heading still below the threshold —
        // everything after it is also below.
        if (relTop > THRESHOLD) break;

        const label = el.id
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        if (el.classList.contains("md-h1")) {
          h1 = label;
          h2 = null;
          h3 = null;
        } else if (el.classList.contains("md-h2")) {
          h2 = label;
          h3 = null;
        } else if (el.classList.contains("md-h3")) {
          h3 = label;
        }
      }

      setActiveHeadings({ h1, h2, h3 });
    };

    const scrollEl = container.closest("[data-scroll-container]") ?? window;
    scrollEl.addEventListener("scroll", updateBreadcrumbs, { passive: true });

    updateBreadcrumbs();

    return () => {
      scrollEl.removeEventListener("scroll", updateBreadcrumbs);
      setActiveHeadings({ h1: null, h2: null, h3: null });
    };
  }, [markdown, setActiveHeadings]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
