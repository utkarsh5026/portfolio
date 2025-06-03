import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Radio, Mail } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

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
  { name: "Email", status: "online", users: "∞", icon: Mail },
  { name: "LinkedIn", status: "active", users: "500+", icon: FaLinkedin },
  { name: "GitHub", status: "coding", users: "200+", icon: FaGithub },
  { name: "Twitter", status: "tweeting", users: "150+", icon: FaTwitter },
];

const ContactLoading = () => {
  const [connectionStep, setConnectionStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStep((prev) => (prev + 1) % connectionSteps.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* Network Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4 sm:p-6 rounded-t-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
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
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </motion.div>
            <div className="min-w-0">
              <h2 className="text-white text-lg sm:text-xl font-bold">
                Communication Hub
              </h2>
              <p className="text-cyan-100 text-sm sm:text-base">
                Establishing contact protocols...
              </p>
            </div>
          </div>
          <div className="text-cyan-100 text-xs sm:text-sm font-mono">
            Signal: Strong
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px] border border-gray-700 shadow-2xl">
        {/* Connection Status */}
        <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm mb-6 sm:mb-8">
          {connectionSteps.map((step, index) => (
            <motion.div
              key={`${step.phase}-${index}`}
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
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                {index < connectionStep ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                ) : index === connectionStep ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-600 rounded-full flex-shrink-0" />
                )}

                <div className="min-w-0 flex-1">
                  <div
                    className={`font-semibold ${step.color} text-xs sm:text-sm`}
                  >
                    {step.phase}
                  </div>
                  <div className="text-gray-400 text-xs truncate">
                    {step.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-3 sm:space-y-4"
        >
          <h3 className="text-white text-base sm:text-lg font-semibold">
            Communication Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {socialChannels.map((channel, index) => {
              const IconComponent = channel.icon;
              return (
                <motion.div
                  key={`${channel.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5 + index * 0.2 }}
                  className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                      <div>
                        <h4 className="text-white font-semibold text-sm sm:text-base">
                          {channel.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              channel.status === "online"
                                ? "bg-green-400"
                                : channel.status === "active"
                                ? "bg-blue-400"
                                : "bg-yellow-400"
                            }`}
                          />
                          <span className="capitalize">{channel.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-cyan-400 font-mono text-xs sm:text-sm">
                      {channel.users}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactLoading;
