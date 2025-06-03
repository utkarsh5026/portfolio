import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileCode2,
  Check,
  Terminal,
  Loader2,
  Heart,
  Coffee,
  Cpu,
  GitBranch,
} from "lucide-react";
import { SiTypescript, SiReact } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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
];

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

const AboutLoading = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => Math.min(prev + 1, codeLines.length));
      setProgress((prev) => Math.min(prev + 9, 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* VS Code-like IDE Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-800 border border-gray-600 rounded-t-xl shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
            <div className="flex items-center space-x-2">
              <VscVscode className="text-blue-400 w-4 h-4" />
              <span className="text-gray-300 text-sm font-medium">
                Visual Studio Code
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <SiTypescript className="w-4 h-4 text-blue-400" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <SiReact className="w-4 h-4 text-cyan-400" />
              <span>React</span>
            </div>
            <div className="text-xs text-gray-400">UTF-8</div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center px-4 py-1 bg-gray-750">
          <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1.5 rounded-t-md border-t-2 border-blue-400">
            <FileCode2 className="w-4 h-4 text-blue-400" />
            <span className="text-gray-200 text-sm font-mono">about-me.ts</span>
            <span className="text-gray-400 text-xs">●</span>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[550px] rounded-b-xl border-x border-b border-gray-700 shadow-2xl">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-gray-500 text-right pr-6 select-none border-r border-gray-700 mr-6">
            {Array.from({ length: Math.max(currentLine, 12) }, (_, i) => (
              <div
                key={i}
                className="h-6 leading-6 hover:text-gray-300 transition-colors"
              >
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
                transition={{ delay: index * 0.3, ease: "easeOut" }}
                className={`h-6 leading-6 ${getLineColor(
                  line.type
                )} hover:bg-gray-800/30 px-2 -mx-2 rounded transition-colors`}
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

        {/* Status Bar & Compilation Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: codeLines.length * 0.1 }}
          className="mt-8 pt-6 border-t border-gray-700 space-y-4"
        >
          {/* Build Process */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {progress < 100 ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 text-green-400" />
                )}
                <span className="text-blue-400 text-sm font-medium">
                  {progress < 100
                    ? "Compiling TypeScript..."
                    : "Build Complete"}
                </span>
              </div>
              <span className="text-gray-300 text-sm font-mono">
                {progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Success Message */}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-900/20 border border-green-700 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">
                    Compilation successful!
                  </span>
                </div>
                <span className="text-gray-300">
                  Ready to showcase amazing work.
                </span>
              </div>
            </motion.div>
          )}

          {/* Status Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">main</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">TypeScript 5.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Node.js v20</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400 text-sm">Caffeine: 100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-gray-400 text-sm">
                  Code Quality: Perfect
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutLoading;
