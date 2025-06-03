import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { cmd: "> sudo rm -rf doubt/", output: "Removing all doubts..." },
  {
    cmd: "> git clone https://github.com/portfolio.git",
    output: "Cloning personal repository...",
  },
  {
    cmd: "> npm install --save awesomeness",
    output: "Installing capabilities...",
  },
  {
    cmd: "> yarn build:portfolio --mode=impressive",
    output: "Building something amazing...",
  },
  {
    cmd: '> echo "Welcome to my digital world"',
    output: "Welcome to my digital world",
  },
];

const HomeLoading = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % terminalLines.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Glass Container */}
      <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90"></div>

        {/* Terminal Header */}
        <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            {/* Window Controls */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg border border-red-300/30"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300/30"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg border border-green-300/30"></div>
              </div>
            </div>

            {/* Terminal Title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-1 border border-white/10">
                <span className="text-slate-200 font-medium text-sm">
                  utkarsh@portfolio
                </span>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white/10 rounded border border-white/20"></div>
              <div className="w-4 h-4 bg-white/10 rounded border border-white/20"></div>
            </div>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="relative bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl p-6 lg:p-8 font-mono text-sm lg:text-base min-h-[400px] sm:min-h-[450px]">
          {/* Content */}
          <div className="space-y-4">
            {terminalLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={`${line.cmd}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                className="space-y-3"
              >
                {/* Command Line */}
                <div className="flex items-start group">
                  <span className="text-emerald-400 mr-3 font-bold">❯</span>
                  <span className="text-slate-300/80 mr-2">~</span>
                  <span className="text-white font-medium break-all">
                    {line.cmd}
                  </span>
                  {index === currentLine && showCursor && (
                    <motion.span
                      className="text-emerald-400 ml-1 font-bold"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▊
                    </motion.span>
                  )}
                </div>

                {/* Output */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 + 0.3, duration: 0.4 }}
                  className="ml-8 pl-4 border-l-2 border-emerald-400/30 bg-white/5 backdrop-blur-sm rounded-r-lg p-3"
                >
                  <span className="text-slate-300/90 font-light">
                    {line.output}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* System Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "SKILLS", value: "∞", color: "emerald" },
                { label: "PROJECTS", value: "20+", color: "blue" },
                { label: "COFFEE", value: "9999+", color: "amber" },
                { label: "STATUS", value: "ONLINE", color: "green" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div
                    className={`text-${stat.color}-400 font-bold text-xs mb-2 tracking-wider`}
                  >
                    {stat.label}
                  </div>
                  <div
                    className={`text-${
                      stat.color === "green" ? "green-400" : "slate-200"
                    } font-mono font-semibold text-lg`}
                  >
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ambient Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
