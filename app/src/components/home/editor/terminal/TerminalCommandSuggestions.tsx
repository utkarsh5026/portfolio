import React from "react";
import type { Suggestion } from "./use-terminal";

interface TerminalCommandSuggestionsProps {
  suggestions: Suggestion[];
  selectedSuggestionIndex: number;
  handleSuggestionSelect: (suggestion: string) => void;
}

const TerminalCommandSuggestions: React.FC<TerminalCommandSuggestionsProps> = ({
  suggestions,
  selectedSuggestionIndex,
  handleSuggestionSelect,
}) => {
  return (
    <div
      className="absolute left-6 right-6 max-h-64 overflow-y-auto custom-scrollbar z-50 rounded-xl"
      style={{
        bottom: "auto",
        background: "rgba(24, 24, 37, 0.85)",
        backdropFilter: "blur(16px)",
        boxShadow:
          "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(203, 166, 247, 0.1) inset",
        border: "1px solid rgba(49, 50, 68, 0.4)",
      }}
    >
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.text}
            className={`px-4 py-2 cursor-pointer transition-all duration-150 ${
              index === selectedSuggestionIndex
                ? "bg-ctp-blue/20"
                : "hover:bg-ctp-surface0/50"
            }`}
            style={{
              borderLeft:
                index === selectedSuggestionIndex
                  ? "2px solid var(--ctp-blue)"
                  : "2px solid transparent",
            }}
            onClick={() => handleSuggestionSelect(suggestion.text)}
          >
            <div
              className={`font-medium ${
                index === selectedSuggestionIndex
                  ? "text-ctp-blue"
                  : "text-ctp-text"
              }`}
              style={{
                textShadow:
                  index === selectedSuggestionIndex
                    ? "0 0 8px rgba(137, 180, 250, 0.5)"
                    : "none",
              }}
            >
              {suggestion.text}
            </div>
            {suggestion.description && (
              <div
                className={`text-xs mt-1 ${
                  index === selectedSuggestionIndex
                    ? "text-ctp-subtext0"
                    : "text-ctp-subtext1"
                }`}
              >
                {suggestion.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalCommandSuggestions;
