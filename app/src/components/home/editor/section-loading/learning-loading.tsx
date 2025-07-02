import { motion } from "framer-motion";
import BaseTerminalLoading from "./base-terminal-loading";

const LearningLoading = () => {
  const commands = [
    { cmd: "$ curl -O learning-modules" },
    { cmd: "advanced-react.course", output: "📚 downloading..." },
    { cmd: "system-design.course", output: "📚 downloading..." },
    { cmd: "cloud-native.course", output: "📚 downloading..." },
    { cmd: "ml-fundamentals.course", output: "📚 downloading..." },
  ];

  const footerExtra = (
    <div className="flex gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full bg-ctp-yellow"
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="learning.sh"
      commands={commands}
      promptColor="text-ctp-yellow"
      footerText="Absorbing knowledge..."
      footerExtra={footerExtra}
      interval={750}
    />
  );
};

export default LearningLoading;
