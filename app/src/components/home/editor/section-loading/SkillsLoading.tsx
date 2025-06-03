import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const packages = [
  {
    name: "react",
    version: "18.2.0",
    description: "A JavaScript library for building user interfaces",
    size: "42.2kB",
  },
  {
    name: "typescript",
    version: "5.0.0",
    description: "TypeScript is a superset of JavaScript",
    size: "15.1MB",
  },
  {
    name: "next.js",
    version: "14.0.0",
    description: "The React Framework for Production",
    size: "128kB",
  },
  {
    name: "node.js",
    version: "20.0.0",
    description: "JavaScript runtime built on V8 engine",
    size: "51.2MB",
  },
  {
    name: "tailwindcss",
    version: "3.3.0",
    description: "A utility-first CSS framework",
    size: "2.4MB",
  },
  {
    name: "framer-motion",
    version: "10.16.0",
    description: "A production-ready motion library for React",
    size: "1.1MB",
  },
];

const SkillsLoading = () => {
  const [currentPackage, setCurrentPackage] = useState(0);
  const [installingState, setInstallingState] = useState<
    "downloading" | "installing" | "complete"
  >("downloading");

  useEffect(() => {
    const interval = setInterval(() => {
      if (installingState === "downloading") {
        setInstallingState("installing");
      } else if (installingState === "installing") {
        setInstallingState("complete");
      } else {
        setCurrentPackage((prev) => {
          if (prev < packages.length - 1) {
            setInstallingState("downloading");
            return prev + 1;
          }
          return prev;
        });
      }
    }, 800);
    return () => clearInterval(interval);
  }, [installingState, currentPackage]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Package Manager Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">npm</span>
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">
                Installing Skills Package
              </h2>
              <p className="text-green-200 text-sm">
                Building professional capabilities...
              </p>
            </div>
          </div>
          <div className="text-green-200 text-sm">v10.2.4</div>
        </div>
      </div>

      {/* Installation Progress */}
      <div className="bg-gray-900 p-6 sm:p-8 min-h-[600px] rounded-b-xl border border-gray-700 shadow-2xl">
        <div className="font-mono text-sm space-y-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-4 rounded-lg border-l-4 ${
                index < currentPackage
                  ? "bg-green-900/30 border-green-400"
                  : index === currentPackage
                  ? "bg-blue-900/30 border-blue-400"
                  : "bg-gray-800/30 border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {index < currentPackage ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : index === currentPackage ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full" />
                  )}

                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={
                          index <= currentPackage
                            ? "text-white font-semibold"
                            : "text-gray-400"
                        }
                      >
                        {pkg.name}@{pkg.version}
                      </span>
                      <span className="text-gray-500 text-xs">{pkg.size}</span>
                    </div>
                    <p
                      className={`text-xs ${
                        index <= currentPackage
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {index === currentPackage && (
                  <div className="text-right">
                    <div className="text-blue-400 text-xs capitalize">
                      {installingState}...
                    </div>
                    <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            installingState === "downloading"
                              ? "30%"
                              : installingState === "installing"
                              ? "80%"
                              : "100%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-8 pt-6 border-t border-gray-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {currentPackage + 1}
              </div>
              <div className="text-gray-400 text-sm">Installed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {packages.length}
              </div>
              <div className="text-gray-400 text-sm">Total</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">242MB</div>
              <div className="text-gray-400 text-sm">Downloaded</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">3.2s</div>
              <div className="text-gray-400 text-sm">Speed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsLoading;
