import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const connectionSteps = [
  {
    phase: "Initializing",
    status: "Booting communication protocols...",
    color: "text-blue-400",
  },
  {
    phase: "Handshake",
    status: "Establishing secure connection...",
    color: "text-yellow-400",
  },
  {
    phase: "Authentication",
    status: "Verifying contact channels...",
    color: "text-purple-400",
  },
  {
    phase: "Encryption",
    status: "Securing communication channel...",
    color: "text-green-400",
  },
  {
    phase: "Connected",
    status: "Ready to receive messages!",
    color: "text-green-400",
  },
];

const socialChannels = [
  { name: "Email", status: "online", users: "∞", icon: "📧" },
  { name: "LinkedIn", status: "active", users: "500+", icon: "💼" },
  { name: "GitHub", status: "coding", users: "200+", icon: "🐙" },
  { name: "Twitter", status: "tweeting", users: "150+", icon: "🐦" },
];

const ContactLoading = () => {
  const [connectionStep, setConnectionStep] = useState(0);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStep((prev) => (prev + 1) % connectionSteps.length);
      setActiveNodes((prev) => {
        const newNode = Math.floor(Math.random() * 8);
        const updatedNodes = [...prev, newNode];
        return updatedNodes.slice(-4); // Keep only last 4 active nodes
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Network Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">📡</span>
            </motion.div>
            <div>
              <h2 className="text-white text-xl font-bold">
                Communication Hub
              </h2>
              <p className="text-cyan-100">Establishing contact protocols...</p>
            </div>
          </div>
          <div className="text-cyan-100 text-sm font-mono">Signal: Strong</div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-gray-900 p-6 sm:p-8 min-h-[600px] border border-gray-700 shadow-2xl">
        {/* Connection Status */}
        <div className="space-y-4 font-mono text-sm mb-8">
          {connectionSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.4 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                index < connectionStep
                  ? "bg-green-900/30"
                  : index === connectionStep
                  ? "bg-blue-900/30"
                  : "bg-gray-800/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                {index < connectionStep ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                ) : index === connectionStep ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-6 h-6 bg-blue-500 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-600 rounded-full" />
                )}

                <div>
                  <div className={`font-semibold ${step.color}`}>
                    {step.phase}
                  </div>
                  <div className="text-gray-400 text-xs">{step.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Network Nodes Visualization */}
        <div className="relative mb-8">
          <div className="text-center mb-4">
            <h3 className="text-white text-lg font-semibold">
              Network Topology
            </h3>
          </div>

          <div className="relative h-64 bg-gray-800 rounded-lg p-4 overflow-hidden">
            {/* Central Hub */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold">HUB</span>
            </motion.div>

            {/* Connection Nodes */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = i * 45 * (Math.PI / 180);
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = activeNodes.includes(i);

              return (
                <motion.div
                  key={i}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                    isActive ? "bg-green-500" : "bg-gray-600"
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />

                  {/* Connection Line */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1 }}
                      className="absolute w-px bg-green-400 origin-bottom"
                      style={{
                        height: `${radius}px`,
                        transform: `rotate(${
                          -angle * (180 / Math.PI) + 90
                        }deg)`,
                        bottom: "50%",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-4"
        >
          <h3 className="text-white text-lg font-semibold mb-4">
            Active Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.2 }}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-cyan-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{channel.icon}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs">
                      {channel.status}
                    </span>
                  </div>
                </div>
                <div className="text-white font-semibold">{channel.name}</div>
                <div className="text-gray-400 text-sm">
                  {channel.users} connections
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactLoading;
