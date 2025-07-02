import BaseTerminalLoading from "./base-terminal-loading";

const ExperienceLoading = () => {
  const commands = [
    { cmd: "make resume", output: "Compiling work history..." },
    { cmd: "grep -r 'achievements' ./", output: "Found: multiple successes" },
    { cmd: "sort -k2 experience.log", output: "Sorted by impact level" },
    { cmd: "cat professional_summary.md", output: "Ready for display" },
  ];

  const footerExtra = (
    <div className="flex gap-1">
      <span className="w-2 h-1 bg-ctp-blue rounded"></span>
      <span className="w-4 h-1 bg-ctp-blue rounded"></span>
      <span className="w-3 h-1 bg-ctp-surface1 rounded"></span>
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="makefile"
      commands={commands}
      promptColor="text-ctp-blue"
      footerText="Building professional timeline..."
      footerExtra={footerExtra}
    />
  );
};

export default ExperienceLoading;
