import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const connections = [
  "ping linkedin.com",
  "ssh github.com",
  "telnet email.server",
  "open --connection-ready",
];

const ContactLoading = () => {
  const [currentConn, setCurrentConn] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConn((prev) => (prev + 1) % connections.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-ctp-surface0/50 backdrop-blur-sm rounded-lg border border-ctp-surface1/30 p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
            </div>
            <span className="text-ctp-subtext0 text-sm font-mono ml-4">
              network.sh
            </span>
          </div>

          <div className="space-y-3 font-mono text-sm">
            {connections.slice(0, currentConn + 1).map((conn, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <div className="flex items-center mb-1">
                  <span className="text-ctp-pink mr-2">❯</span>
                  <span className="text-ctp-text">{conn}</span>
                </div>
                {index < currentConn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-4 text-ctp-subtext1 text-xs"
                  >
                    {index === 0 && "Connection established"}
                    {index === 1 && "Authentication successful"}
                    {index === 2 && "Mail server ready"}
                    {index === 3 && "All channels open"}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-ctp-surface1/30">
            <div className="flex items-center justify-between text-xs text-ctp-subtext0">
              <span>Establishing connections...</span>
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-ctp-green"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLoading;
