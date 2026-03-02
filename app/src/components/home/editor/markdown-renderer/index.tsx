import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import type { Components } from "react-markdown";

import { CodeBlock } from "./code-bock";
import { MarkdownImage } from "./media";

const markdownComponents: Components = {
  img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,

  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-bold text-ctp-text tracking-tight mt-8 md:mt-10 mb-5 leading-snug">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <div className="flex items-center gap-2 md:gap-3 mt-10 md:mt-12 mb-5">
      <span className="w-1 h-5 rounded-full shrink-0 bg-ctp-mauve" />
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ctp-text">
        {children}
      </h2>
      <span className="flex-1 border-t border-ctp-surface1 ml-3" />
    </div>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-semibold text-ctp-text mt-8 mb-4 tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base md:text-lg font-medium text-ctp-subtext0 mt-6 mb-3">
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="text-sm md:text-base text-ctp-subtext1 leading-7 mb-5">
      {children}
    </p>
  ),

  // Blockquote — styled as a callout / tagline
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-ctp-blue pl-4 my-5 md:my-7 bg-ctp-surface0/30 py-3 pr-4 rounded-r-lg text-ctp-subtext1 italic text-sm md:text-base">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <div className="border-t border-ctp-surface1 my-8 md:my-10" />,

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-2 mb-5 ml-5 text-ctp-subtext1 text-sm md:text-base marker:text-ctp-mauve">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-2 mb-5 ml-5 text-ctp-subtext1 text-sm md:text-base marker:text-ctp-blue">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,

  // Intercept <pre> so react-markdown doesn't double-wrap the code block
  pre: ({ children }) => <>{children}</>,

  code: ({ children, className, ...rest }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    const language = match ? match[1] : "";
    // Block code: triple-backtick fences get a "language-xxx" className
    const isBlock = !!match;

    if (isBlock) {
      const code = String(children).replace(/\n$/, "");
      return <CodeBlock language={language} code={code} />;
    }

    return (
      <code
        className="px-1.5 py-1 rounded-md bg-ctp-surface0/80 text-ctp-mauve/80 font-mono text-sm border border-none whitespace-pre-wrap break-words"
        {...rest}
      >
        {children}
      </code>
    );
  },

  table: ({ children }) => (
    <div className="my-4 md:my-6 w-full max-w-[85vw] md:max-w-none overflow-x-auto rounded-lg border border-ctp-surface1 shadow-sm scrollbar-thin">
      <table className="w-full text-sm min-w-[max-content] md:min-w-full">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ctp-surface0 text-ctp-subtext1 uppercase text-[11px] font-semibold tracking-wider">
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
    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-bold text-ctp-text whitespace-nowrap border-b border-ctp-surface1">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 md:px-4 py-2 md:py-3 text-ctp-subtext0 whitespace-nowrap md:whitespace-normal">
      {children}
    </td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ctp-blue hover:text-ctp-sky font-medium underline underline-offset-4 decoration-ctp-blue/30 hover:decoration-ctp-sky transition-all"
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
