import { SiReact, SiCss3, SiJavascript } from "react-icons/si";
import { CodeType } from "../code";

export const getSyntaxClass = (content: string, language: string): string => {
  if (language === "jsx" || language === "javascript") {
    if (
      content.match(
        /import|export|from|const|let|var|function|return|=>|class|extends|if|else|switch|case|break|default/
      )
    )
      return "text-[#c678dd]"; // Keywords
    if (content.match(/".*"|'.*'|`.*`/)) return "text-[#98c379]"; // Strings
    if (content.match(/\b\d+\b/)) return "text-[#d19a66]"; // Numbers
    if (content.match(/\b(true|false|null|undefined)\b/))
      return "text-[#d19a66]"; // Constants
    if (content.match(/\bconsole\b|\balert\b|\bdocument\b|\bwindow\b/))
      return "text-[#e06c75]"; // Built-ins
    if (content.match(/\/\/.*/)) return "text-[#7f848e]"; // Comments
  } else if (language === "css") {
    if (content.match(/@media|@keyframes|@import|@font-face/))
      return "text-[#c678dd]"; // At-rules
    if (content.match(/\b[a-z-]+:/)) return "text-[#d19a66]"; // Properties
    if (content.match(/\#[0-9a-f]{3,6}\b|rgba?\([^)]+\)/))
      return "text-[#98c379]"; // Colors
    if (content.match(/\d+(%|px|em|rem|vh|vw)/)) return "text-[#d19a66]"; // Units
    if (content.match(/\.[a-zA-Z][\w-]*/)) return "text-[#e06c75]"; // Classes
    if (content.match(/\/\*.+\*\//)) return "text-[#7f848e]"; // Comments
  }
  return "text-[#abb2bf]"; // Default text color
};

export const getFileInfo = (codeFile: CodeType) => {
  switch (codeFile) {
    case "reactComponent":
      return {
        icon: <SiReact className="text-blue-400" />,
        language: "jsx",
        extension: "jsx",
        filename: "Portfolio.jsx",
        problems: 0,
      };
    case "cssStyles":
      return {
        icon: <SiCss3 className="text-blue-500" />,
        language: "css",
        extension: "css",
        filename: "Portfolio.css",
        problems: 2,
      };
    case "animation":
      return {
        icon: <SiJavascript className="text-yellow-400" />,
        language: "javascript",
        extension: "js",
        filename: "Animation.js",
        problems: 1,
      };
    default:
      return {
        icon: <SiJavascript />,
        language: "javascript",
        extension: "js",
        filename: "Unknown",
        problems: 0,
      };
  }
};
