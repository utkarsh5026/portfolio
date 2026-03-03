import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import type { Components } from "react-markdown";

import { CodeBlock } from "./code-bock";
import { MarkdownImage } from "./media";
import { Heading, Text } from "@/components/ui/text";

const markdownComponents: Components = {
  img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,

  h1: ({ children }) => (
    <Heading as="h1" className="mt-14 mb-8">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <div className="group flex items-center gap-4 mt-14 mb-8">
      <span className="w-1.5 h-8 rounded-full shrink-0 bg-gradient-to-b from-ctp-mauve to-ctp-blue shadow-lg shadow-ctp-mauve/20" />
      <Heading as="h2">{children}</Heading>
      <span className="flex-1 border-t border-ctp-surface1/60 ml-4 hidden md:block" />
    </div>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      className="mt-10 mb-5 before:text-ctp-surface2 hover:before:text-ctp-mauve before:transition-colors before:duration-300"
    >
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" className="mt-8 mb-4">
      {children}
    </Heading>
  ),

  // Paragraph
  p: ({ children }) => (
    <Text as="p" className="mb-7">
      {children}
    </Text>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="relative flex border-l-[4px] border-ctp-mauve pl-6 my-10 bg-gradient-to-r from-ctp-surface0/50 to-transparent py-5 pr-6 rounded-r-2xl text-ctp-subtext0 italic text-lg shadow-sm">
      <div className="relative z-10">{children}</div>
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <div className="my-14 flex items-center justify-center gap-3 opacity-80">
      <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-ctp-surface2" />
      <span className="w-2 h-2 rounded-full bg-ctp-surface2" />
      <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-ctp-surface2" />
    </div>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-3 mb-8 ml-8 text-ctp-subtext0 text-base md:text-lg font-medium marker:text-ctp-mauve">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-3 mb-8 ml-8 text-ctp-subtext0 text-base md:text-lg font-medium marker:text-ctp-blue marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-2">{children}</li>,

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
        className="px-2 py-0.5 rounded-md bg-ctp-surface0/80 text-ctp-pink border border-ctp-surface0 font-mono text-[0.9em] whitespace-pre-wrap break-words font-semibold"
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
    <strong className="font-bold text-ctp-text px-0.5">{children}</strong>
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
