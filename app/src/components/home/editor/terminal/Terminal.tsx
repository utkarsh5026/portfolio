import React, { useEffect, useState } from "react";
import useTerminal from "./use-terminal";
import "./Terminal.css";
import { motion, AnimatePresence } from "framer-motion";
import TerminalHeader from "./TerminalHeader";
import { useEditorContext } from "../context/explorer-context";
import TerminalInput from "./TerminalInput";
import TerminalCommandSuggestions from "./TerminalCommandSuggestions";
import TerminalCommandOutput from "./TerminalCommandOutput";

/**
 * Terminal Component
 *
 * This component represents a terminal interface where users can input commands and receive outputs.
 *
 * Features:
 * - Command Input: Users can type commands into the terminal.
 * - Command Suggestions: As users type, suggestions for commands will appear.
 * - Command History: Users can navigate through previously entered commands.
 * - Clear Output: Users can clear the terminal output.
 * - Maximize/Minimize: Users can toggle the terminal between maximized and minimized states.
 * - Responsive Design: The terminal adjusts its size based on the user's screen.
 *
 * Usage:
 * 1. Type a command in the input area.
 * 2. Press Enter to execute the command.
 * 3. Use the Tab key for command suggestions.
 * 4. Click on suggestions to auto-complete commands.
 * 5. Click the terminal header to maximize or minimize the terminal.
 */
const Terminal: React.FC = () => {
  const { setTerminalOpen } = useEditorContext();
  const [isVisible, setIsVisible] = useState(false);

  const {
    input,
    suggestions,
    selectedSuggestionIndex,
    showSuggestions,
    inputRef,
    terminalRef,
    handleSuggestionSelect,
    handleKeyDown,
    handleSubmit,
    handleTerminalClick,
    setInput,
    clearOutput,
    fontSize,
    isMaximized,
    toggleMaximize,
    commandBlocks,
  } = useTerminal();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.4,
          }}
          className="w-full rounded-xl flex flex-col overflow-hidden font-mono text-sm shadow-2xl relative group bg-ctp-crust"
          style={{
            height: isMaximized ? "100vh" : "min(60vh, 600px)",
            fontSize: `${fontSize}px`,
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(91, 100, 124, 0.2) inset",
            border: "1px solid rgba(49, 50, 68, 0.3)",
          }}
          onClick={handleTerminalClick}
        >
          {/* Terminal header with frosted glass effect */}
          <TerminalHeader
            clearOutput={clearOutput}
            setTerminalOpen={setTerminalOpen}
            isMaximized={isMaximized}
            toggleMaximize={toggleMaximize}
          />

          {/* Main terminal content area with frosted glass background */}
          <div
            ref={terminalRef}
            className="flex-grow overflow-y-auto custom-scrollbar"
            style={{
              backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(203, 166, 247, 0.05) 0%, transparent 30%),
                radial-gradient(circle at 90% 80%, rgba(137, 180, 250, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(166, 227, 161, 0.03) 0%, transparent 60%)
              `,
              backgroundSize: "cover",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="p-6 space-y-6">
              <TerminalCommandOutput outputBlocks={commandBlocks} />
              <TerminalInput
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
                ref={inputRef}
              />
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <TerminalCommandSuggestions
              suggestions={suggestions}
              selectedSuggestionIndex={selectedSuggestionIndex}
              handleSuggestionSelect={handleSuggestionSelect}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
