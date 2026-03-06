import type { CSSProperties } from "react";
import React, { useState } from "react";
import { DiJava } from "react-icons/di";
import { FiCheck, FiCode, FiCopy } from "react-icons/fi";
import {
  SiCss,
  SiDocker,
  SiGnubash,
  SiGo,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiMysql,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript,
  SiYaml,
} from "react-icons/si";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

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

/** VS Code Dark+ themed Prism theme */
const vsCodeDarkPlusTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: "#d4d4d4",
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
    color: "#d4d4d4",
    background: "#1e1e1e",
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
  comment: { color: "#6a9955" },
  prolog: { color: "#6a9955" },
  doctype: { color: "#6a9955" },
  cdata: { color: "#6a9955" },
  punctuation: { color: "#d4d4d4" },
  property: { color: "#9cdcfe" },
  tag: { color: "#569cd6" },
  boolean: { color: "#569cd6" },
  number: { color: "#b5cea8" },
  constant: { color: "#9cdcfe" },
  symbol: { color: "#b5cea8" },
  deleted: { color: "#ce9178" },
  selector: { color: "#d7ba7d" },
  "attr-name": { color: "#9cdcfe" },
  string: { color: "#ce9178" },
  char: { color: "#ce9178" },
  builtin: { color: "#4ec9b0" },
  inserted: { color: "#b5cea8" },
  operator: { color: "#d4d4d4" },
  entity: { color: "#4ec9b0" },
  url: { color: "#d4d4d4" },
  variable: { color: "#9cdcfe" },
  atrule: { color: "#c586c0" },
  "attr-value": { color: "#ce9178" },
  function: { color: "#dcdcaa" },
  "class-name": { color: "#4ec9b0" },
  keyword: { color: "#569cd6" },
  regex: { color: "#d16969" },
  important: { color: "#569cd6", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

interface LangMeta {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const langMetaMap: Record<string, LangMeta> = {
  typescript: { icon: <SiTypescript />, label: "TypeScript", color: "#3178c6" },
  ts: { icon: <SiTypescript />, label: "TypeScript", color: "#3178c6" },
  tsx: { icon: <SiReact />, label: "TSX", color: "#61dafb" },
  javascript: { icon: <SiJavascript />, label: "JavaScript", color: "#f7df1e" },
  js: { icon: <SiJavascript />, label: "JavaScript", color: "#f7df1e" },
  jsx: { icon: <SiReact />, label: "JSX", color: "#61dafb" },
  python: { icon: <SiPython />, label: "Python", color: "#3776ab" },
  py: { icon: <SiPython />, label: "Python", color: "#3776ab" },
  rust: { icon: <SiRust />, label: "Rust", color: "#ce422b" },
  rs: { icon: <SiRust />, label: "Rust", color: "#ce422b" },
  go: { icon: <SiGo />, label: "Go", color: "#00acd7" },
  java: { icon: <DiJava />, label: "Java", color: "#ed8b00" },
  bash: { icon: <SiGnubash />, label: "Bash", color: "#4eaa25" },
  sh: { icon: <SiGnubash />, label: "Shell", color: "#4eaa25" },
  shell: { icon: <SiGnubash />, label: "Shell", color: "#4eaa25" },
  json: { icon: <SiJson />, label: "JSON", color: "#cbcb41" },
  yaml: { icon: <SiYaml />, label: "YAML", color: "#cb171e" },
  yml: { icon: <SiYaml />, label: "YAML", color: "#cb171e" },
  css: { icon: <SiCss />, label: "CSS", color: "#1572b6" },
  sql: { icon: <SiMysql />, label: "SQL", color: "#f29111" },
  markdown: { icon: <SiMarkdown />, label: "Markdown", color: "#083fa1" },
  md: { icon: <SiMarkdown />, label: "Markdown", color: "#083fa1" },
  docker: { icon: <SiDocker />, label: "Dockerfile", color: "#2496ed" },
  dockerfile: { icon: <SiDocker />, label: "Dockerfile", color: "#2496ed" },
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
  const meta = langMetaMap[displayLang.toLowerCase()];

  return (
    <div className="relative my-6 md:my-8 rounded-md overflow-hidden border border-[#3c3c3c] shadow-lg shadow-black/20 group/code">
      {/* Title bar (VS Code Tab style) */}
      <div className="flex items-center justify-between pr-4 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#1e1e1e] border-t border-[#007acc] text-[#cccccc] text-[12px] font-mono tracking-wide">
            {meta ? (
              <span
                style={{ color: meta.color }}
                className="flex items-center text-[13px]"
              >
                {meta.icon}
              </span>
            ) : (
              <FiCode className="text-[13px] text-[#858585]" />
            )}
            <span
              style={{
                fontFamily: '"Cascadia Code", "JetBrains Mono", monospace',
              }}
            >
              {meta ? meta.label : displayLang}
            </span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-[#858585] hover:text-[#cccccc] hover:bg-[#3c3c3c] transition-all duration-150 opacity-0 group-hover/code:opacity-100 my-1"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck className="w-3 h-3 text-[#569cd6]" />
              <span className="text-[#569cd6]">copied</span>
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
      <div className="overflow-x-auto scrollbar-thin bg-[#1e1e1e]">
        <SyntaxHighlighter
          language={displayLang}
          style={vsCodeDarkPlusTheme}
          wrapLongLines={false}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
