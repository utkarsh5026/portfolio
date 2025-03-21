import React from "react";
import { TerminalOutput } from "./use-terminal";
import { motion } from "framer-motion";

interface TerminalCommandOutputProps {
  outputBlocks: TerminalOutput[][];
}

/**
 * TerminalCommandOutput component renders the output of terminal commands.
 * It displays a series of output blocks, each containing multiple lines of text.
 * The output can include both command lines and their respective results.
 *
 * @component
 * @param {Object} props - The properties for the TerminalCommandOutput component.
 * @param {TerminalOutput[][]} props.outputBlocks - A 2D array of terminal output blocks,
 * where each block contains an array of lines of output.
 *
 * @returns {JSX.Element} The rendered TerminalCommandOutput component.
 */
const TerminalCommandOutput: React.FC<TerminalCommandOutputProps> = ({
  outputBlocks,
}) => {
  return (
    <>
      {outputBlocks.map((block, blockIndex) => (
        <motion.div
          key={`block-${block.map((line) => line.text).join("")}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(30, 30, 46, 0.5)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(49, 50, 68, 0.3)",
          }}
        >
          {block.map((line, lineIndex) => (
            <motion.div
              key={`line-${blockIndex}-${lineIndex}`}
              initial={{ opacity: 0, filter: "blur(2px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.2,
                delay: lineIndex * 0.03,
                ease: "easeOut",
              }}
              className={`px-5 py-3 ${
                line.isCommand
                  ? "bg-gradient-to-r from-ctp-mantle to-ctp-base border-b border-ctp-surface0/30"
                  : ""
              }`}
            >
              {line.isCommand ? (
                <div className="flex items-center">
                  <span className="mr-2 text-ctp-blue font-bold">$</span>
                  <span
                    className="text-ctp-green"
                    style={{
                      textShadow: "0 0 10px rgba(166, 227, 161, 0.3)",
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              ) : (
                <div
                  className="text-ctp-text pl-6 text-shadow-sm"
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.6",
                    letterSpacing: "0.01em",
                    textShadow: "0 0 1px rgba(205, 214, 244, 0.1)",
                  }}
                >
                  {line.text}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </>
  );
};

export default TerminalCommandOutput;
