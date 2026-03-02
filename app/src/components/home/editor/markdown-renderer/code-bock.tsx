import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("rs", rust);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("yml", yaml);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("md", markdown);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("dockerfile", docker);

import type { CSSProperties } from "react";

/** Catppuccin Mocha–flavoured Prism theme */
const catppuccinTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: "#cdd6f4",
    background: "none",
    fontFamily:
      '"Cascadia Code", "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace',
    fontSize: "0.8125rem",
    lineHeight: "1.75",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#cdd6f4",
    background: "#1e1e2e",
    fontFamily:
      '"Cascadia Code", "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace',
    fontSize: "0.8125rem",
    lineHeight: "1.75",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
    padding: "1.25rem 1.5rem",
    margin: "0",
    overflow: "auto",
  },
  comment: { color: "#6c7086", fontStyle: "italic" },
  prolog: { color: "#6c7086" },
  doctype: { color: "#6c7086" },
  cdata: { color: "#6c7086" },
  punctuation: { color: "#cdd6f4" },
  property: { color: "#cba6f7" },
  tag: { color: "#f38ba8" },
  boolean: { color: "#fab387" },
  number: { color: "#fab387" },
  constant: { color: "#fab387" },
  symbol: { color: "#a6e3a1" },
  deleted: { color: "#f38ba8" },
  selector: { color: "#a6e3a1" },
  "attr-name": { color: "#a6e3a1" },
  string: { color: "#a6e3a1" },
  char: { color: "#a6e3a1" },
  builtin: { color: "#89dceb" },
  inserted: { color: "#a6e3a1" },
  operator: { color: "#89dceb" },
  entity: { color: "#f9e2af" },
  url: { color: "#89dceb" },
  variable: { color: "#cdd6f4" },
  atrule: { color: "#cba6f7" },
  "attr-value": { color: "#a6e3a1" },
  function: { color: "#89b4fa" },
  "class-name": { color: "#f9e2af" },
  keyword: { color: "#cba6f7" },
  regex: { color: "#fab387" },
  important: { color: "#fab387", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

export const CodeBlock: React.FC<{ language: string; code: string }> = ({
  language,
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const displayLang = language || "text";

  return (
    <div className="relative my-6 md:my-8 rounded-xl overflow-hidden border border-none shadow-lg shadow-black/20 group/code">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-ctp-crust border-b border-ctp-surface1">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-mono text-ctp-overlay0 uppercase tracking-widest"
            style={{
              fontFamily: '"Cascadia Code", "JetBrains Mono", monospace',
            }}
          >
            {displayLang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0 transition-all duration-150 opacity-0 group-hover/code:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck className="w-3 h-3 text-ctp-green" />
              <span className="text-ctp-green">copied</span>
            </>
          ) : (
            <>
              <FiCopy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Highlighted code */}
      <div className="overflow-x-auto scrollbar-thin bg-[#1e1e2e]">
        <SyntaxHighlighter
          language={displayLang}
          style={catppuccinTheme}
          wrapLongLines={false}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
