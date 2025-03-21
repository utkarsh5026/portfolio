import { motion } from "framer-motion";
import React from "react";

interface TerminalInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * TerminalInput component renders an input field for the terminal interface.
 * It allows users to type commands and submit them.
 *
 * @component
 * @param {string} input - The current value of the input field.
 * @param {Function} setInput - Function to update the input value.
 * @param {Function} handleSubmit - Function to handle form submission.
 * @param {Function} handleKeyDown - Function to handle key down events.
 * @param {React.Ref} ref - Ref to the input element for focus management.
 *
 * @returns {JSX.Element} The rendered TerminalInput component.
 */
const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ input, setInput, handleSubmit, handleKeyDown }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-xl overflow-hidden terminal-input-block"
        style={{
          background: "rgba(30, 30, 46, 0.6)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(203, 166, 247, 0.1) inset",
          border: "1px solid rgba(49, 50, 68, 0.3)",
        }}
      >
        <div className="px-5 py-3 flex items-center bg-gradient-to-r from-ctp-surface0/20 to-ctp-mantle/10">
          <span
            className="mr-2 text-ctp-blue font-bold"
            style={{ textShadow: "0 0 10px rgba(137, 180, 250, 0.5)" }}
          >
            $
          </span>
          <form onSubmit={handleSubmit} className="flex-grow flex">
            <input
              ref={ref}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-ctp-green"
              style={{
                caretColor: "#cba6f7", // ctp-mauve
                textShadow: "0 0 10px rgba(166, 227, 161, 0.3)",
                letterSpacing: "0.02em",
              }}
              spellCheck="false"
              autoComplete="off"
              aria-label="Terminal input"
            />
            {input === "" && (
              <span
                className="h-5 w-0.5 bg-ctp-mauve animate-pulse"
                style={{
                  boxShadow: "0 0 15px rgba(203, 166, 247, 0.8)",
                }}
              ></span>
            )}
          </form>
        </div>
      </motion.div>
    );
  }
);

TerminalInput.displayName = "TerminalInput";
export default TerminalInput;
