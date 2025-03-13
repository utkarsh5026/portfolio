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

  const availableCommands = useMemo(() => {
    return {
      ...linuxCommands,
      ...sectionCommands,
      ...utilityCommands,
    };
  }, [linuxCommands, sectionCommands, utilityCommands]);

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

  const allCommands = useMemo(() => {
    return {
      ...availableCommands,
      help: helpCommand,
    };
  }, [availableCommands, helpCommand]);

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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTabCompletion = useCallback(() => {
    const inputParts = input.trim().split(" ");
    const commandPart = inputParts[0];

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

  useEffect(() => {
    const clearEvent = listenForFontSizeChange();
    return () => clearEvent();
  }, [listenForFontSizeChange]);

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

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const clearOutput = useCallback(() => {
    setOutput([
      {
        text: "Welcome to Utkarsh's Terminal Portfolio! Type 'help' to see available commands.",
        isCommand: false,
        id: `welcome-${Date.now()}`,
      },
    ]);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const commandId = `cmd-${Date.now()}`;

      const addToOutput = (text: string, isCommand: boolean, id?: string) => {
        setOutput((prev) => [
          ...prev,
          { text, isCommand, id: id ?? commandId },
        ]);
      };

      const updateUi = () => {
        setShowSuggestions(false);
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        addToOutput(input, true);
      };

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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, commandBlocks]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [output.length]);

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
