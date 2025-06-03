import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const gitOps = [
  {
    cmd: "git clone https://github.com/projects.git",
    status: "Cloning repositories...",
    progress: 25,
  },
  {
    cmd: "git log --oneline --graph",
    status: "Reading commit history...",
    progress: 50,
  },
  {
    cmd: "git status --porcelain",
    status: "Checking project status...",
    progress: 75,
  },
  {
    cmd: "git showcase --impressive",
    status: "Ready to present amazing work!",
    progress: 100,
  },
];

const projects = [
  { name: "E-Commerce Platform", commits: 142, status: "production" },
  { name: "Task Management App", commits: 89, status: "development" },
  { name: "Portfolio Website", commits: 67, status: "production" },
  { name: "AI Chat Bot", commits: 234, status: "beta" },
];

const ProjectsLoading = () => {
  const [currentOp, setCurrentOp] = useState(0);
  const [commitCount, setCommitCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOp((prev) => (prev + 1) % gitOps.length);
      setCommitCount((prev) => prev + Math.floor(Math.random() * 15) + 5);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Git Dashboard Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 sm:p-6 rounded-t-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm sm:text-base">
                Git
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg sm:text-xl font-bold truncate">
                Project Repository
              </h2>
              <p className="text-orange-100 text-sm sm:text-base">
                Showcasing development journey
              </p>
            </div>
          </div>
          <div className="text-orange-100 text-xs sm:text-sm font-mono">
            main branch
          </div>
        </div>
      </div>

      {/* Git Operations */}
      <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-2xl">
        <div className="font-mono text-xs sm:text-sm space-y-4 sm:space-y-6">
          {gitOps.slice(0, currentOp + 1).map((op, index) => (
            <motion.div
              key={`${op.cmd}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5 }}
              className="space-y-2 sm:space-y-3"
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-orange-400 flex-shrink-0">$</span>
                <span className="text-white break-all">{op.cmd}</span>
              </div>

              <div className="ml-4 sm:ml-6 space-y-2">
                <div className="text-gray-300 text-xs sm:text-sm">
                  {op.status}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${op.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.5 + 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.2 }}
                className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 hover:border-orange-400 transition-all"
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight">
                    {project.name}
                  </h3>
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      project.status === "production"
                        ? "bg-green-400"
                        : project.status === "development"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  />
                </div>
                <div className="text-gray-400 text-xs mb-1">
                  {project.commits} commits
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {project.status}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Commit Activity */}
          <div className="mt-4 sm:mt-6 bg-gray-800 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <h3 className="text-white font-semibold text-sm sm:text-base">
                Commit Activity
              </h3>
              <span className="text-orange-400 font-mono text-xs sm:text-sm">
                {commitCount} total commits
              </span>
            </div>
            <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto">
              {Array.from({ length: 52 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 3 + i * 0.02 }}
                  className={`w-2 sm:w-3 h-8 sm:h-12 rounded-sm flex-shrink-0 ${
                    Math.random() > 0.3
                      ? "bg-orange-400"
                      : Math.random() > 0.6
                      ? "bg-orange-600"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsLoading;
