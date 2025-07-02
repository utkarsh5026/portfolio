import BaseTerminalLoading from "./base-terminal-loading";

const ProjectsLoading = () => {
  const commands = [
    { cmd: "git log --oneline", output: "20+ commits found" },
    { cmd: "git status", output: "Working tree clean" },
    { cmd: "git show --name-only", output: "Multiple projects active" },
    { cmd: "git remote -v", output: "Remote repositories ready" },
  ];

  const footerExtra = (
    <div className="flex items-center gap-1 text-xs text-ctp-peach">
      <span className="w-2 h-2 rounded-full bg-ctp-peach"></span>
      <span>main</span>
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="git-bash"
      commands={commands}
      promptColor="text-ctp-peach"
      footerText="Fetching repositories..."
      footerExtra={footerExtra}
      interval={850}
    />
  );
};

export default ProjectsLoading;
