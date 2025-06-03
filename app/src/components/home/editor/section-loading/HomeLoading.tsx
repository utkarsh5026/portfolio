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
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-xl p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
          </div>
          <div className="text-gray-300 font-mono text-sm">
            bash - utkarsh@portfolio
          </div>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-black rounded-b-xl p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[400px] border border-gray-700 shadow-2xl">
        <div className="space-y-4">
          {terminalLines.slice(0, currentLine + 1).map((line, index) => (
            <motion.div
              key={`${line.cmd}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center">
                <span className="text-green-400 mr-2">➜</span>
                <span className="text-blue-400 mr-2">~</span>
                <span className="text-white">{line.cmd}</span>
                {index === currentLine && showCursor && (
                  <span className="text-green-400 ml-1 animate-pulse">█</span>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.5 }}
                className="text-gray-300 ml-6 pl-4 border-l-2 border-green-400/30"
              >
                {line.output}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* System Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 pt-6 border-t border-gray-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="text-center">
              <div className="text-green-400 font-bold">SKILLS</div>
              <div className="text-gray-300">∞</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">PROJECTS</div>
              <div className="text-gray-300">20+</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">COFFEE</div>
              <div className="text-gray-300">9999+</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">STATUS</div>
              <div className="text-green-400">ONLINE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeLoading;
