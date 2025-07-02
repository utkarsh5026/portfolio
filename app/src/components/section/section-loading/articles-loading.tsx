import BaseTerminalLoading from "./base-terminal-loading";

const ArticlesLoading = () => {
  const commands = [
    { cmd: "markdown --parse *.md", output: "Processing markdown files..." },
    { cmd: "prettier --write articles/", output: "Formatting complete" },
    { cmd: "lighthouse --audit content", output: "SEO optimized" },
    { cmd: "publish --platform=web", output: "Articles ready" },
  ];

  const footerExtra = (
    <div className="flex items-center gap-1">
      <span className="text-ctp-teal">📝</span>
      <span>markdown</span>
    </div>
  );

  return (
    <BaseTerminalLoading
      terminalTitle="content.md"
      commands={commands}
      promptColor="text-ctp-teal"
      footerText="Preparing content..."
      footerExtra={footerExtra}
      interval={900}
    />
  );
};

export default ArticlesLoading;
