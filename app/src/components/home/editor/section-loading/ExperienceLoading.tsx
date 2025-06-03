import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ExperienceLoading = () => {
  const [buildStep, setBuildStep] = useState(0);
  const [metrics, setMetrics] = useState({ files: 0, tests: 0, coverage: 0 });

  const buildSteps = [
    { phase: "Analysis", task: "Scanning work history...", duration: "2.3s" },
    { phase: "Processing", task: "Bundling experiences...", duration: "1.8s" },
    {
      phase: "Optimization",
      task: "Highlighting achievements...",
      duration: "3.1s",
    },
    { phase: "Testing", task: "Validating expertise...", duration: "1.2s" },
    { phase: "Deployment", task: "Ready for showcase!", duration: "0.5s" },
  ];

  const experiences = [
    {
      company: "Tech Corp",
      role: "Senior Developer",
      duration: "2 years",
      impact: "High",
    },
    {
      company: "StartUp Inc",
      role: "Full Stack Engineer",
      duration: "1.5 years",
      impact: "Critical",
    },
    {
      company: "Innovation Labs",
      role: "Lead Developer",
      duration: "1 year",
      impact: "Transformative",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildStep((prev) => (prev + 1) % buildSteps.length);
      setMetrics((prev) => ({
        files: prev.files + Math.floor(Math.random() * 5) + 1,
        tests: prev.tests + Math.floor(Math.random() * 3) + 1,
        coverage: Math.min(
          prev.coverage + Math.floor(Math.random() * 10) + 5,
          100
        ),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Build Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">⚙️</span>
            </motion.div>
            <div>
              <h2 className="text-white text-xl font-bold">
                Experience Builder
              </h2>
              <p className="text-blue-100">Compiling professional journey...</p>
            </div>
          </div>
          <div className="text-blue-100 text-sm font-mono">
            v{new Date().getFullYear()}.{new Date().getMonth() + 1}
          </div>
        </div>
      </div>

      {/* Build Process */}
      <div className="bg-gray-900 p-6 sm:p-8 min-h-[600px] border border-gray-700 shadow-2xl">
        {/* Build Steps */}
        <div className="space-y-6 font-mono text-sm">
          {buildSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                index < buildStep
                  ? "bg-green-900/30 border-green-400"
                  : index === buildStep
                  ? "bg-blue-900/30 border-blue-400"
                  : "bg-gray-800/30 border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-4">
                {index < buildStep ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : index === buildStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-8 h-8 border-3 border-blue-400 border-t-transparent rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 border-2 border-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">{index + 1}</span>
                  </div>
                )}

                <div>
                  <div
                    className={`font-semibold ${
                      index <= buildStep ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.phase}
                  </div>
                  <div
                    className={`text-sm ${
                      index <= buildStep ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {step.task}
                  </div>
                </div>
              </div>

              <div
                className={`text-sm ${
                  index <= buildStep ? "text-blue-400" : "text-gray-600"
                }`}
              >
                {step.duration}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 pt-6 border-t border-gray-700"
        >
          <h3 className="text-white text-lg font-semibold mb-4">
            Professional Timeline
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.3 }}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-purple-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{exp.company}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      exp.impact === "Transformative"
                        ? "bg-purple-600 text-white"
                        : exp.impact === "Critical"
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {exp.impact}
                  </span>
                </div>
                <div className="text-gray-300 text-sm mb-1">{exp.role}</div>
                <div className="text-gray-500 text-xs">{exp.duration}</div>
              </motion.div>
            ))}
          </div>

          {/* Build Metrics */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">
                {metrics.files}
              </div>
              <div className="text-gray-400 text-sm">Files Processed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {metrics.tests}
              </div>
              <div className="text-gray-400 text-sm">Tests Passed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">
                {metrics.coverage}%
              </div>
              <div className="text-gray-400 text-sm">Coverage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceLoading;
