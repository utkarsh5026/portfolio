import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const modules = [
  {
    name: "Advanced React Patterns",
    size: "15.2MB",
    type: "Frontend",
    difficulty: "Advanced",
  },
  {
    name: "System Design Fundamentals",
    size: "28.7MB",
    type: "Architecture",
    difficulty: "Expert",
  },
  {
    name: "Cloud Native Development",
    size: "22.1MB",
    type: "DevOps",
    difficulty: "Intermediate",
  },
  {
    name: "Machine Learning Basics",
    size: "35.4MB",
    type: "AI/ML",
    difficulty: "Beginner",
  },
  {
    name: "Microservices Architecture",
    size: "19.8MB",
    type: "Backend",
    difficulty: "Advanced",
  },
];

const LearningLoading = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModule((prev) => {
        const next = (prev + 1) % modules.length;
        setDownloadProgress((prevProgress) => ({
          ...prevProgress,
          [prev]: 100,
          [next]: 0,
        }));
        return next;
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setDownloadProgress((prev) => ({
        ...prev,
        [currentModule]: Math.min(
          (prev[currentModule] || 0) + Math.random() * 25,
          100
        ),
      }));
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentModule]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Learning Platform Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">🎓</span>
            </motion.div>
            <div>
              <h2 className="text-white text-xl font-bold">
                Learning Management System
              </h2>
              <p className="text-indigo-100">
                Downloading knowledge modules...
              </p>
            </div>
          </div>
          <div className="text-indigo-100 text-sm font-mono">LMS v2024.1</div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="bg-gray-900 p-6 sm:p-8 min-h-[600px] border border-gray-700 shadow-2xl">
        <div className="space-y-6">
          {modules.map((module, index) => {
            const progress = downloadProgress[index] || 0;
            const isActive = index === currentModule;
            const isCompleted = progress === 100;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-xl border-2 transition-all duration-500 ${
                  isCompleted
                    ? "bg-green-900/20 border-green-400 shadow-lg shadow-green-400/20"
                    : isActive
                    ? "bg-blue-900/20 border-blue-400 shadow-lg shadow-blue-400/20"
                    : "bg-gray-800/50 border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {isCompleted ? (
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                    ) : isActive ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xl">📚</span>
                      </div>
                    )}

                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          isCompleted
                            ? "text-green-400"
                            : isActive
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        {module.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{module.size}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {module.type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${
                            module.difficulty === "Expert"
                              ? "bg-red-600"
                              : module.difficulty === "Advanced"
                              ? "bg-orange-600"
                              : module.difficulty === "Intermediate"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                          }`}
                        >
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        isCompleted
                          ? "text-green-400"
                          : isActive
                          ? "text-blue-400"
                          : "text-gray-500"
                      }`}
                    >
                      {Math.round(progress)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {isCompleted
                        ? "Complete"
                        : isActive
                        ? "Downloading"
                        : "Queued"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600"
                        : "bg-gray-600"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {isActive && progress < 100 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-blue-400 flex items-center space-x-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                    />
                    <span>Downloading neural pathways...</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-8 pt-6 border-t border-gray-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-400">120+</div>
              <div className="text-gray-400 text-sm">Hours Learned</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">15</div>
              <div className="text-gray-400 text-sm">Courses Completed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-400">8</div>
              <div className="text-gray-400 text-sm">Certifications</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">98%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningLoading;
