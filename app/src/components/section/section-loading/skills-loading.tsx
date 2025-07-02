import { motion } from "framer-motion";
import BaseTerminalLoading from "./base-terminal-loading";

const SkillsLoading = () => {
  const commands = [
    { cmd: "$ npm install skills" },
    { cmd: "react@18.2.0", output: "✓ installed" },
    { cmd: "typescript@5.0.0", output: "✓ installed" },
    { cmd: "nodejs@20.0.0", output: "✓ installed" },
    { cmd: "docker@24.0.0", output: "✓ installed" },
  ];

  const footerExtra = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
      className="w-3 h-3 border border-ctp-blue border-t-transparent rounded-full"
    />
  );

  return (
    <BaseTerminalLoading
      terminalTitle="package.json"
      commands={commands}
      promptColor="text-ctp-blue"
      footerText="Installing dependencies..."
      footerExtra={footerExtra}
      interval={700}
    />
  );
};

export default SkillsLoading;
