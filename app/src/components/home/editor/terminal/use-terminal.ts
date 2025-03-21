import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  useLinuxCommands,
  useSectionCommands,
  useUtilityCommands,
  type Command,
} from "./use-command";

export type TerminalOutput = {
  text: string;
  isCommand: boolean;
  id?: string;
};

export type Suggestion = {
  text: string;
  description?: string;
};

/**
 * Custom hook for managing terminal functionality in a portfolio website.
 *
 * This hook provides a complete terminal experience with features including:
 * - Command input and execution
 * - Command history navigation
 * - Tab completion and suggestions
 * - Terminal output management
 * - Font size adjustment
 * - Terminal maximization/minimization
 *
 * @returns {Object} An object containing terminal state and functions
 */
export const useTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<TerminalOutput[]>([
    {
      text: "Welcome to Utkarsh's Terminal Portfolio! Type 'help' to see available commands.",
      isCommand: false,
      id: "welcome-1",
    },
    {
      text: `
      
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓████████▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░         ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓████████▓▒░  ░▒▓██████▓▒░   ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓████████▓▒░ ░▒▓████████▓▒░ ░▒▓████████▓▒░  ░▒▓██████▓▒░  
                                                       
      `,
      isCommand: false,
      id: "welcome-2",
    },
    {
      text: "Press Tab for command completion.",
      isCommand: false,
      id: "welcome-3",
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(14);

  const linuxCommands = useLinuxCommands();
  const sectionCommands = useSectionCommands();
  const utilityCommands = useUtilityCommands();

  /**
   * Combines all available commands into a single object for easy access
   */
  const availableCommands = useMemo(() => {
    return {
      ...linuxCommands,
      ...sectionCommands,
      ...utilityCommands,
    };
  }, [linuxCommands, sectionCommands, utilityCommands]);

  /**
   * Creates a help command that displays information about available commands
   */
  const helpCommand = useMemo(() => {
    return {
      name: "help",
      description: "Show available commands",
      usage: "help [command]",
      args: () => Object.keys(availableCommands),
      execute: (args: string[]) => {
        const command = args[0];

        if (command) {
          const cmd = availableCommands[command];
          if (cmd) {
            return `
Command: ${command}
-------------
Description: ${cmd.description}
Usage: ${cmd.usage}
            `;
          }
          return `Unknown command: ${command}`;
        }

        return `
Available Commands:
-----------------
${Object.entries(availableCommands)
  .map(([name, cmd]) => `  ${name.padEnd(10)}${cmd.description}`)
  .join("\n")}

Type "help [command]" for more information on a specific command.
        `;
      },
    } as Command;
  }, [availableCommands]);

  /**
   * Combines all commands including the help command
   */
  const allCommands = useMemo(() => {
    return {
      ...availableCommands,
      help: helpCommand,
    };
  }, [availableCommands, helpCommand]);

  /**
   * Organizes terminal output into logical blocks for display
   * Each command and its output are grouped together
   */
  const commandBlocks = useMemo(() => {
    const blocks = [];
    let currentBlock: TerminalOutput[] = [];
    for (const outputItem of output) {
      if (outputItem.isCommand && currentBlock.length > 0) {
        blocks.push(currentBlock);
        currentBlock = [outputItem];
      } else {
        currentBlock.push(outputItem);
      }
    }
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }
    return blocks;
  }, [output]);

  /**
   * Focuses the input field when the terminal is mounted
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Handles tab completion for commands and arguments
   * Provides intelligent suggestions based on current input
   */
  const handleTabCompletion = useCallback(() => {
    const inputParts = input.trim().split(" ");
    const commandPart = inputParts[0];

    /**
     * Shows all available commands when input is empty
     */
    const handleEmptyInput = () => {
      const allCommandSuggestions = Object.entries(allCommands).map(
        ([name, cmd]) => ({
          text: name,
          description: cmd.description,
        })
      );

      setSuggestions(allCommandSuggestions);
      setShowSuggestions(true);
    };

    /**
     * Handles partial command names by showing matching commands
     */
    const handleUncompletedCommand = () => {
      const matchingCommands = Object.entries(allCommands)
        .filter(([name]) => name.startsWith(commandPart))
        .map(([name, cmd]) => ({
          text: name,
          description: cmd.description,
        }));

      if (matchingCommands.length === 1) {
        // Single match - auto-complete
        setInput(matchingCommands[0].text + " ");
        setShowSuggestions(false);
      } else if (matchingCommands.length > 1) {
        // Multiple matches - show suggestions
        setSuggestions(matchingCommands);
        setShowSuggestions(true);
      }
    };

    /**
     * Provides argument suggestions for commands that support them
     */
    const findCommandAppropriateCommandArgs = () => {
      // Tab completing an argument
      const command = allCommands[commandPart as keyof typeof allCommands];
      if (!command) return;

      // Get arguments excluding the command
      const args = inputParts.slice(1).filter((arg) => arg !== "");

      // Get possible argument completions from the command
      if (command.args) {
        const possibleArgs = command.args(args);
        const currentArg = inputParts[inputParts.length - 1] || "";

        // Filter argument suggestions based on partial input
        const matchingArgs = possibleArgs
          .filter((arg) =>
            arg.toLowerCase().startsWith(currentArg.toLowerCase())
          )
          .map((arg) => ({ text: arg }));

        if (matchingArgs.length === 1) {
          // Single match - auto-complete this argument
          const newInput = inputParts.slice(0, -1).join(" ");
          setInput(`${newInput ? newInput + " " : ""}${matchingArgs[0].text} `);
          setShowSuggestions(false);
        } else if (matchingArgs.length > 1) {
          // Multiple matches - show suggestions
          setSuggestions(matchingArgs);
          setShowSuggestions(true);
        }
      }
    };

    if (inputParts.length === 1) {
      if (commandPart === "") {
        handleEmptyInput();
        return;
      }
      handleUncompletedCommand();
    } else findCommandAppropriateCommandArgs();
  }, [input, allCommands]);

  /**
   * Sets up keyboard shortcuts for adjusting terminal font size
   * Ctrl/Cmd + Plus: Increase font size
   * Ctrl/Cmd + Minus: Decrease font size
   */
  const listenForFontSizeChange = useCallback(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      const isCtrlKey = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (isCtrlKey) {
        if (key === "+") {
          e.preventDefault();
          setFontSize((prevSize) => Math.min(prevSize + 2, 28));
        } else if (key === "-") {
          e.preventDefault();
          setFontSize((prevSize) => Math.max(prevSize - 2, 10));
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, []);

  /**
   * Sets up the font size change listener
   */
  useEffect(() => {
    const clearEvent = listenForFontSizeChange();
    return () => clearEvent();
  }, [listenForFontSizeChange]);

  /**
   * Handles selection of a suggestion from the suggestion list
   * Updates the input field with the selected suggestion
   *
   * @param {string} suggestion - The selected suggestion text
   */
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      const inputParts = input.trim().split(" ");

      if (inputParts.length === 1) {
        setInput(suggestion + " ");
      } else {
        const newInput = inputParts.slice(0, -1).join(" ");
        setInput(`${newInput ? newInput + " " : ""}${suggestion} `);
      }

      setShowSuggestions(false);
      inputRef.current?.focus();
    },
    [input]
  );

  /**
   * Handles keyboard navigation in the terminal
   * Supports tab completion, history navigation, and suggestion selection
   *
   * @param {React.KeyboardEvent} e - The keyboard event
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle Tab key for command completion
      if (e.key === "Tab") {
        e.preventDefault();

        if (showSuggestions) {
          // Cycle through suggestions
          const nextIndex = (selectedSuggestionIndex + 1) % suggestions.length;
          setSelectedSuggestionIndex(nextIndex);
        } else {
          // Generate new suggestions
          handleTabCompletion();
        }
        return;
      }

      // Hide suggestions when pressing Escape
      if (e.key === "Escape") {
        setShowSuggestions(false);
        return;
      }

      // Select current suggestion with Enter when suggestions are shown
      if (e.key === "Enter" && showSuggestions) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[selectedSuggestionIndex].text);
        return;
      }

      // Navigate command history with up/down arrows
      if (e.key === "ArrowUp") {
        if (showSuggestions) {
          e.preventDefault();
          const prevIndex =
            (selectedSuggestionIndex - 1 + suggestions.length) %
            suggestions.length;
          setSelectedSuggestionIndex(prevIndex);
        } else {
          e.preventDefault();
          if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]);
          }
        }
      } else if (e.key === "ArrowDown") {
        if (showSuggestions) {
          e.preventDefault();
          const nextIndex = (selectedSuggestionIndex + 1) % suggestions.length;
          setSelectedSuggestionIndex(nextIndex);
        } else {
          e.preventDefault();
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]);
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setInput("");
          }
        }
      }
    },
    [
      history,
      historyIndex,
      selectedSuggestionIndex,
      showSuggestions,
      suggestions,
      handleSuggestionSelect,
      handleTabCompletion,
    ]
  );

  /**
   * Focuses the input field when the terminal is clicked
   */
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  /**
   * Clears the terminal output and resets to welcome message
   */
  const clearOutput = useCallback(() => {
    setOutput([
      {
        text: "Welcome to Utkarsh's Terminal Portfolio! Type 'help' to see available commands.",
        isCommand: false,
        id: `welcome-${Date.now()}`,
      },
    ]);
  }, []);

  /**
   * Handles command submission and execution
   * Processes the input, executes the command, and updates the terminal output
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const commandId = `cmd-${Date.now()}`;

      /**
       * Adds a new line to the terminal output
       *
       * @param {string} text - The text to add
       * @param {boolean} isCommand - Whether this is a command or output
       * @param {string} id - Optional unique identifier
       */
      const addToOutput = (text: string, isCommand: boolean, id?: string) => {
        setOutput((prev) => [
          ...prev,
          { text, isCommand, id: id ?? commandId },
        ]);
      };

      /**
       * Updates the UI state after command submission
       */
      const updateUi = () => {
        setShowSuggestions(false);
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        addToOutput(input, true);
      };

      /**
       * Processes and executes the submitted command
       */
      const processCommand = () => {
        const [command, ...args] = input.trim().split(" ");

        if (!command || !(command in allCommands)) {
          addToOutput(`Command not found: ${command}`, false);
          return;
        }

        try {
          const result =
            allCommands[command as keyof typeof allCommands].execute(args);

          if (result === "CLEAR_TERMINAL") clearOutput();
          else addToOutput(result, false, `output-${commandId}`);
        } catch (error) {
          addToOutput(
            `Error: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            false,
            `error-${commandId}`
          );
        }
      };

      updateUi();
      processCommand();
      setInput("");
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 10);
    },
    [input, allCommands, clearOutput]
  );

  /**
   * Scrolls to the bottom of the terminal when output changes
   */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, commandBlocks]);

  /**
   * Focuses the input field when output changes
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, [output.length]);

  /**
   * Toggles between maximized and normal terminal view
   */
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return {
    input,
    output,
    history,
    historyIndex,
    suggestions,
    selectedSuggestionIndex,
    showSuggestions,
    inputRef,
    terminalRef,
    allCommands,
    availableCommands,
    handleTabCompletion,
    handleSuggestionSelect,
    handleKeyDown,
    handleTerminalClick,
    handleSubmit,
    setInput,
    clearOutput,
    setHistory,
    setHistoryIndex,
    setSuggestions,
    setShowSuggestions,
    fontSize,
    isMaximized,
    toggleMaximize,
    commandBlocks,
  };
};

export default useTerminal;
