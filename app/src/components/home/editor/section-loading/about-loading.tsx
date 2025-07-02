import { motion } from "framer-motion";
import BaseTerminalLoading from "./base-terminal-loading";

const AboutLoading = () => {
  const commands = [
    { cmd: "$ cat profile.json", output: "Loading developer profile..." },
    {
      cmd: "$ grep -i 'passion' * ",
      output: "Found: coding, innovation, problem-solving",
    },
    { cmd: "$ ls experience/", output: "2+ years of experience" },
    { cmd: "$ echo $DEVELOPER_MODE", output: "active" },
  ];

  const footerExtra = (
    <div className="w-32 h-1 bg-ctp-surface1 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-ctp-mauve"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="about.sh"
      commands={commands}
      promptColor="text-ctp-mauve"
      footerText="Compiling identity..."
      footerExtra={footerExtra}
      interval={900}
    />
  );
};

export default AboutLoading;
