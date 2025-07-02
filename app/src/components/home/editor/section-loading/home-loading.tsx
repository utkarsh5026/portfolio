import { motion } from "framer-motion";
import BaseTerminalLoading from "./base-terminal-loading";

const HomeLoading = () => {
  const commands = [
    { cmd: "$ ssh utkarsh@portfolio" },
    { cmd: "$ whoami" },
    { cmd: "$ cat /home/introduction.txt" },
    { cmd: "$ ready --to-connect" },
  ];

  const footerExtra = (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-ctp-blue"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="terminal"
      commands={commands}
      promptColor="text-ctp-green"
      footerText="Initializing..."
      footerExtra={footerExtra}
    />
  );
};

export default HomeLoading;
