import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

/**
 * TypeWriter Interface for exposing methods to parent components
 */
export interface CodeTypeWriterRef {
  start: () => void;
  stop: () => void;
  reset: () => void;
  isComplete: boolean;
  isTyping: boolean;
}

/**
 * Props for the CodeTypeWriter component
 */
interface CodeTypeWriterProps {
  /** The JavaScript code to type out */
  code: string;
  /** The typing speed in milliseconds */
  speed?: number;
  /** Initial delay before typing starts in milliseconds */
  delay?: number;
  /** Whether to start typing automatically */
  autoStart?: boolean;
  /** Callback function when typing completes */
  onComplete?: () => void;
  /** Additional CSS classes to apply */
  className?: string;
  /** Theme variant to use (default is 'mocha') */
  variant?: "latte" | "frappe" | "macchiato" | "mocha";
}

/**
 * Token types for syntax highlighting
 */
type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "method"
  | "property"
  | "operator"
  | "variable"
  | "type"
  | "plain";

/**
 * Interface for a token in the code
 */
interface Token {
  type: TokenType;
  content: string;
}

/**
 * Catppuccin theme color palettes
 * Based on the official Catppuccin palette: https://github.com/catppuccin/catppuccin
 */
const CATPPUCCIN_THEMES = {
  // Light theme
  latte: {
    background: "#eff1f5",
    text: "#4c4f69",
    keywords: "#8839ef", // mauve
    strings: "#d20f39", // red
    comments: "#9ca0b0", // subtext0
    numbers: "#fe640b", // peach
    functions: "#179299", // teal
    methods: "#04a5e5", // blue
    properties: "#40a02b", // green
    operators: "#8839ef", // mauve
    variables: "#4c4f69", // text
    types: "#df8e1d", // yellow
    cursor: "#4c4f69", // text
  },
  // Medium-dark theme
  frappe: {
    background: "#303446",
    text: "#c6d0f5",
    keywords: "#ca9ee6", // mauve
    strings: "#e78284", // red
    comments: "#737994", // subtext0
    numbers: "#ef9f76", // peach
    functions: "#81c8be", // teal
    methods: "#8caaee", // blue
    properties: "#a6d189", // green
    operators: "#ca9ee6", // mauve
    variables: "#c6d0f5", // text
    types: "#e5c890", // yellow
    cursor: "#c6d0f5", // text
  },
  // Dark theme
  macchiato: {
    background: "#24273a",
    text: "#cad3f5",
    keywords: "#c6a0f6", // mauve
    strings: "#ed8796", // red
    comments: "#6e738d", // subtext0
    numbers: "#f5a97f", // peach
    functions: "#8bd5ca", // teal
    methods: "#8aadf4", // blue
    properties: "#a6da95", // green
    operators: "#c6a0f6", // mauve
    variables: "#cad3f5", // text
    types: "#eed49f", // yellow
    cursor: "#cad3f5", // text
  },
  // Darker theme
  mocha: {
    background: "#1e1e2e",
    text: "#cdd6f4",
    keywords: "#cba6f7", // mauve
    strings: "#f38ba8", // red
    comments: "#6c7086", // subtext0
    numbers: "#fab387", // peach
    functions: "#94e2d5", // teal
    methods: "#89b4fa", // blue
    properties: "#a6e3a1", // green
    operators: "#cba6f7", // mauve
    variables: "#cdd6f4", // text
    types: "#f9e2af", // yellow
    cursor: "#cdd6f4", // text
  },
};

// JavaScript keywords
const KEYWORDS = [
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "class",
  "extends",
  "implements",
  "interface",
  "new",
  "this",
  "super",
  "import",
  "export",
  "from",
  "as",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "in",
  "of",
  "null",
  "undefined",
  "true",
  "false",
  "void",
  "delete",
  "yield",
];

/**
 * CodeTypeWriter Component
 *
 * A React functional component that creates a typewriter effect specifically for JavaScript code
 * with syntax highlighting using the Catppuccin theme.
 */
const CodeTypeWriter = forwardRef<CodeTypeWriterRef, CodeTypeWriterProps>(
  (
    {
      code = "",
      speed = 40,
      delay = 0,
      autoStart = true,
      onComplete = () => {},
      className = "",
      variant = "mocha",
    },
    ref
  ) => {
    // Get the theme colors
    const theme = CATPPUCCIN_THEMES[variant];

    // State to track displayed code and typing status
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // References to track and clear timeouts
    const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Simple tokenizer for JavaScript
    const tokenize = (code: string): Token[] => {
      const tokens: Token[] = [];
      let i = 0;

      while (i < code.length) {
        const char = code[i];

        // Handle whitespace
        if (/\s/.test(char)) {
          let whitespace = "";
          while (i < code.length && /\s/.test(code[i])) {
            whitespace += code[i];
            i++;
          }
          tokens.push({ type: "plain", content: whitespace });
          continue;
        }

        // Handle comments
        if (char === "/" && i + 1 < code.length) {
          // Line comment
          if (code[i + 1] === "/") {
            let comment = "";
            while (i < code.length && code[i] !== "\n") {
              comment += code[i];
              i++;
            }
            tokens.push({ type: "comment", content: comment });
            continue;
          }

          // Block comment
          if (code[i + 1] === "*") {
            let comment = "";
            i += 2; // Skip /*
            while (
              i < code.length &&
              (code[i] !== "*" || code[i + 1] !== "/")
            ) {
              comment += code[i];
              i++;
              if (i >= code.length) break;
            }
            if (i < code.length) {
              comment += "*/";
              i += 2; // Skip */
            }
            tokens.push({ type: "comment", content: "/*" + comment });
            continue;
          }
        }

        // Handle strings
        if (char === '"' || char === "'" || char === "`") {
          const quote = char;
          let string = quote;
          i++;

          while (i < code.length) {
            if (code[i] === "\\" && i + 1 < code.length) {
              // Handle escape sequences
              string += code[i] + code[i + 1];
              i += 2;
              continue;
            }

            if (code[i] === quote) {
              string += quote;
              i++;
              break;
            }

            string += code[i];
            i++;
          }

          tokens.push({ type: "string", content: string });
          continue;
        }

        // Handle numbers
        if (
          /[0-9]/.test(char) ||
          (char === "." && /[0-9]/.test(code[i + 1] || ""))
        ) {
          let number = "";

          // Handle hex, octal, and binary numbers
          if (
            char === "0" &&
            i + 1 < code.length &&
            /[xXoObB]/.test(code[i + 1])
          ) {
            number += code[i] + code[i + 1];
            i += 2;

            while (i < code.length && /[0-9a-fA-F]/.test(code[i])) {
              number += code[i];
              i++;
            }

            tokens.push({ type: "number", content: number });
            continue;
          }

          // Handle decimal numbers
          while (
            i < code.length &&
            (/[0-9]/.test(code[i]) || code[i] === ".")
          ) {
            number += code[i];
            i++;
          }

          // Handle scientific notation
          if (i < code.length && (code[i] === "e" || code[i] === "E")) {
            number += code[i];
            i++;

            if (i < code.length && (code[i] === "+" || code[i] === "-")) {
              number += code[i];
              i++;
            }

            while (i < code.length && /[0-9]/.test(code[i])) {
              number += code[i];
              i++;
            }
          }

          tokens.push({ type: "number", content: number });
          continue;
        }

        // Handle identifiers and keywords
        if (/[a-zA-Z_$]/.test(char)) {
          let identifier = "";

          while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
            identifier += code[i];
            i++;
          }

          // Check if it's a keyword
          if (KEYWORDS.includes(identifier)) {
            tokens.push({ type: "keyword", content: identifier });
          }
          // Check if it's a function call
          else if (i < code.length && code[i] === "(") {
            tokens.push({ type: "function", content: identifier });
          }
          // Otherwise, it's a variable or property
          else {
            tokens.push({ type: "variable", content: identifier });
          }

          continue;
        }

        // Handle operators and other characters
        if (/[+\-*/%=&|<>!?:;,.(){}[\]]/.test(char)) {
          tokens.push({ type: "operator", content: char });
          i++;
          continue;
        }

        // Handle any other character
        tokens.push({ type: "plain", content: char });
        i++;
      }

      return tokens;
    };

    // Get color for token type
    const getColorForToken = (type: TokenType): string => {
      switch (type) {
        case "keyword":
          return theme.keywords;
        case "string":
          return theme.strings;
        case "comment":
          return theme.comments;
        case "number":
          return theme.numbers;
        case "function":
          return theme.functions;
        case "method":
          return theme.methods;
        case "property":
          return theme.properties;
        case "operator":
          return theme.operators;
        case "variable":
          return theme.variables;
        case "type":
          return theme.types;
        default:
          return theme.text;
      }
    };

    // Start typing effect
    const startTyping = () => {
      // Reset the state
      setDisplayedText("");
      setCurrentIndex(0);
      setIsComplete(false);

      // Clear any existing timers
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

      // Start typing after delay
      delayTimerRef.current = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    };

    // Stop typing effect
    const stopTyping = () => {
      setIsTyping(false);

      // Clear any existing timers
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      start: startTyping,
      stop: stopTyping,
      reset: startTyping, // Reset is the same as starting over
      isComplete,
      isTyping,
    }));

    // Effect to handle automatic start if enabled
    useEffect(() => {
      if (autoStart) {
        startTyping();
      }

      // Clean up timers when component unmounts
      return () => {
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      };
    }, [code, autoStart]); // Re-run when code or autoStart changes

    // Effect to handle the typing process
    useEffect(() => {
      if (!isTyping || currentIndex >= code.length) return;

      // Type the next character
      typingTimerRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + code[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        // Check if typing is complete
        if (currentIndex + 1 >= code.length) {
          setIsTyping(false);
          setIsComplete(true);
          onComplete();
        }
      }, speed);

      // Clean up the timer when component unmounts or typing stops
      return () => {
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      };
    }, [isTyping, currentIndex, code, speed, onComplete]);

    // Add blinking cursor animation using CSS keyframes
    useEffect(() => {
      const styleId = "code-typewriter-cursor-style";

      // Create style element if it doesn't exist
      if (!document.getElementById(styleId)) {
        const styleEl = document.createElement("style");
        styleEl.id = styleId;
        styleEl.textContent = `
        @keyframes code-typewriter-cursor-blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .code-typewriter-cursor {
          display: inline-block;
          width: 0.5em;
          height: 1.2em;
          background-color: ${theme.cursor};
          margin-left: 1px;
          vertical-align: middle;
          animation: code-typewriter-cursor-blink 1s step-end infinite;
        }
      `;
        document.head.appendChild(styleEl);
      }

      // Clean up when component unmounts
      return () => {
        const existingStyle = document.getElementById(styleId);
        if (
          existingStyle &&
          document.querySelectorAll(".code-typewriter").length <= 1
        ) {
          existingStyle.remove();
        }
      };
    }, [theme.cursor]);

    // Tokenize the currently displayed text
    const tokens = tokenize(displayedText);

    return (
      <div
        className={`code-typewriter ${className}`}
        style={{
          position: "relative",
          backgroundColor: theme.background,
          color: theme.text,
          padding: "1rem",
          borderRadius: "0.5rem",
          fontFamily:
            '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Andale Mono", monospace',
          fontSize: "14px",
          lineHeight: "1.5",
          overflow: "auto",
        }}
      >
        {/* Code display with syntax highlighting using React components (not dangerouslySetInnerHTML) */}
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            minHeight: "1em",
          }}
        >
          <code>
            {tokens.map((token, index) => (
              <span key={index} style={{ color: getColorForToken(token.type) }}>
                {token.content}
              </span>
            ))}
            {!isComplete && (
              <span
                className="code-typewriter-cursor"
                aria-hidden="true"
              ></span>
            )}
          </code>
        </pre>
      </div>
    );
  }
);

// Display name for debugging
CodeTypeWriter.displayName = "CodeTypeWriter";

export default CodeTypeWriter;
