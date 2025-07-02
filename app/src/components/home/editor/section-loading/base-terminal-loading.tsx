import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalCommand {
  cmd: string;
  output?: string;
}

interface BaseTerminalLoadingProps {
  terminalTitle: string;
  commands: TerminalCommand[];
  promptColor: string;
  footerText: string;
  footerExtra?: React.ReactNode;
  interval?: number;
}

const BaseTerminalLoading: React.FC<BaseTerminalLoadingProps> = ({
  terminalTitle,
  commands,
  promptColor,
  footerText,
  footerExtra,
  interval = 800,
}) => {
  const [currentCmd, setCurrentCmd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCmd((prev) => (prev + 1) % commands.length);
    }, interval);
    return () => clearInterval(timer);
  }, [commands.length, interval]);

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-ctp-surface0/50 backdrop-blur-sm rounded-lg border border-ctp-surface1/30 p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
            </div>
            <span className="text-ctp-subtext0 text-sm font-mono ml-4">
              {terminalTitle}
            </span>
          </div>

          {/* Terminal Content */}
          <div className="space-y-3 font-mono text-sm">
            {commands.slice(0, currentCmd + 1).map((command, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <div className="flex items-center mb-1">
                  <span className={`${promptColor} mr-2`}>❯</span>
                  <span className="text-ctp-text">{command.cmd}</span>
                </div>
                {index < currentCmd && command.output && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-4 text-ctp-subtext1 text-xs"
                  >
                    {command.output}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-ctp-surface1/30">
            <div className="flex items-center justify-between text-xs text-ctp-subtext0">
              <span>{footerText}</span>
              {footerExtra}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTerminalLoading;
