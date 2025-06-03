import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const articles = [
  {
    title: "Building Scalable React Applications",
    category: "Frontend",
    readTime: "8 min",
    status: "published",
  },
  {
    title: "Microservices: A Practical Guide",
    category: "Architecture",
    readTime: "12 min",
    status: "draft",
  },
  {
    title: "TypeScript Best Practices 2024",
    category: "Development",
    readTime: "6 min",
    status: "published",
  },
  {
    title: "Cloud Migration Strategies",
    category: "DevOps",
    readTime: "10 min",
    status: "review",
  },
  {
    title: "AI in Modern Web Development",
    category: "AI/ML",
    readTime: "15 min",
    status: "published",
  },
];

const processingSteps = [
  "Parsing markdown files...",
  "Rendering content...",
  "Optimizing images...",
  "Generating previews...",
  "Publishing articles...",
];

const ArticlesLoading = () => {
  const [processingStep, setProcessingStep] = useState(0);
  const [articleProgress, setArticleProgress] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStep((prev) => (prev + 1) % processingSteps.length);

      // Update article progress
      setArticleProgress((prev) => {
        const newProgress = { ...prev };
        articles.forEach((_, index) => {
          if (!newProgress[index]) newProgress[index] = 0;
          newProgress[index] = Math.min(
            newProgress[index] + Math.random() * 20,
            100
          );
        });
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* CMS Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-4 sm:p-6 rounded-t-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <span className="text-xl sm:text-2xl">📝</span>
            </motion.div>
            <div className="min-w-0">
              <h2 className="text-white text-lg sm:text-xl font-bold leading-tight">
                Content Management System
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base">
                Processing articles and blog posts...
              </p>
            </div>
          </div>
          <div className="text-emerald-100 text-xs sm:text-sm font-mono">
            CMS v3.2.1
          </div>
        </div>
      </div>

      {/* Content Processing */}
      <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px] border border-gray-700 shadow-2xl">
        {/* Processing Status */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 className="text-white text-base sm:text-lg font-semibold">
              Processing Pipeline
            </h3>
            <div className="text-emerald-400 font-mono text-xs sm:text-sm">
              Step {processingStep + 1} of {processingSteps.length}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-emerald-400 border-t-transparent rounded-full flex-shrink-0"
              />
              <span className="text-emerald-400 font-mono text-xs sm:text-sm truncate">
                {processingSteps[processingStep]}
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((processingStep + 1) / processingSteps.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Recent Articles
          </h3>

          {articles.map((article, index) => {
            const progress = articleProgress[index] || 0;
            const isComplete = progress >= 100;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-4 sm:p-6 rounded-lg border transition-all duration-500 ${
                  isComplete
                    ? "bg-emerald-900/20 border-emerald-400"
                    : "bg-gray-800/50 border-gray-600"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h4
                        className={`text-base sm:text-lg font-semibold leading-tight ${
                          isComplete ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {article.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs self-start ${
                          article.status === "published"
                            ? "bg-green-600 text-white"
                            : article.status === "review"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span>{article.readTime} read</span>
                      <span>{Math.round(progress)}% processed</span>
                    </div>

                    {/* Processing Progress */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-full rounded-full ${
                          isComplete
                            ? "bg-gradient-to-r from-emerald-500 to-green-500"
                            : "bg-gradient-to-r from-teal-500 to-cyan-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>

                  <div className="sm:ml-6 self-center sm:self-start">
                    {isComplete ? (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg sm:text-xl">✓</span>
                      </div>
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-teal-400 rounded-full flex items-center justify-center"
                      >
                        <span className="text-teal-400 text-lg sm:text-xl">
                          📄
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Publishing Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                42
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Published</div>
            </div>
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-teal-400">
                12K
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Total Views
              </div>
            </div>
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                3.2K
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Reactions</div>
            </div>
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                85%
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Engagement</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlesLoading;
