import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutLoading = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  const codeLines = [
    { type: "comment", content: "// Initializing developer profile..." },
    {
      type: "import",
      content: "import { passion, creativity, skills } from 'developer';",
    },
    { type: "comment", content: "// Building identity..." },
    { type: "const", content: "const developer = {" },
    { type: "property", content: '  name: "Utkarsh Priyadarshi",' },
    { type: "property", content: '  role: "Full Stack Engineer",' },
    {
      type: "property",
      content: '  passion: ["coding", "problem-solving", "innovation"],',
    },
    {
      type: "property",
      content: '  currentStatus: "building amazing things",',
    },
    {
      type: "property",
      content: '  motto: "Code with purpose, design with passion"',
    },
    { type: "const", content: "};" },
    { type: "export", content: "export default developer;" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => Math.min(prev + 1, codeLines.length));
      setProgress((prev) => Math.min(prev + 9, 100));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment":
        return "text-gray-400";
      case "import":
        return "text-purple-400";
      case "const":
        return "text-blue-400";
      case "property":
        return "text-green-400";
      case "export":
        return "text-yellow-400";
      default:
        return "text-white";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* IDE Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 rounded-t-xl border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-300 text-sm font-mono">about-me.ts</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-400">TypeScript React</div>
            <div className="text-xs text-gray-400">UTF-8</div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="bg-gray-900 p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[500px] rounded-b-xl border border-gray-700 shadow-2xl">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-gray-500 text-right pr-4 select-none">
            {Array.from({ length: Math.max(currentLine, 12) }, (_, i) => (
              <div key={i} className="h-6 leading-6">
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1">
            {codeLines.slice(0, currentLine).map((line, index) => (
              <motion.div
                key={`${line.type}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className={`h-6 leading-6 ${getLineColor(line.type)}`}
              >
                {line.content}
              </motion.div>
            ))}
            {currentLine < codeLines.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-6 leading-6 border-l-2 border-blue-400 ml-0 w-3"
              />
            )}
          </div>
        </div>

        {/* Compilation Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 pt-6 border-t border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-400 text-sm">
              Compiling TypeScript...
            </span>
            <span className="text-gray-300 text-sm">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-sm mt-2 flex items-center"
            >
              <span className="mr-2">✓</span>
              Compilation successful! Ready to showcase.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutLoading;
