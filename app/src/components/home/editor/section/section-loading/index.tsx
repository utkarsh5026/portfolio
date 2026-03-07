"use client";

import React, { useEffect, useState } from "react";

import { SectionType } from "../../context/editor-store";
import BaseTerminalLoading from "./base-terminal-loading";
import styles from "./section-loading.module.css";

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
      <div className={`h-full bg-ctp-mauve ${styles.progressBar}`} />
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

const connections = [
  "ping linkedin.com",
  "ssh github.com",
  "telnet email.server",
  "open --connection-ready",
];

const connectionOutputs = [
  "Connection established",
  "Authentication successful",
  "Mail server ready",
  "All channels open",
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
            <span className="text-ctp-subtext0 text-sm font-source ml-4">
              network.sh
            </span>
          </div>

          <div className="space-y-3 font-source text-sm">
            {connections.slice(0, currentConn + 1).map((conn, index) => (
              <div
                key={index}
                className={styles.connectionRow}
                style={{ "--delay": `${index * 0.3}s` } as React.CSSProperties}
              >
                <div className="flex items-center mb-1">
                  <span className="text-ctp-pink mr-2">❯</span>
                  <span className="text-ctp-text">{conn}</span>
                </div>
                {index < currentConn && (
                  <div
                    className={`ml-4 text-ctp-subtext1 text-xs ${styles.connectionOutput}`}
                  >
                    {connectionOutputs[index]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-ctp-surface1/30">
            <div className="flex items-center justify-between text-xs text-ctp-subtext0">
              <span>Establishing connections...</span>
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full bg-ctp-green ${styles.pulseDot}`}
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
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full bg-ctp-blue ${styles.pulseDot}`}
          style={{ "--delay": `${i * 0.2}s` } as React.CSSProperties}
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
        <div
          key={i}
          className={`w-1 h-1 rounded-full bg-ctp-yellow ${styles.pulseScaleDot}`}
          style={{ "--delay": `${i * 0.2}s` } as React.CSSProperties}
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

const SkillsLoading = () => {
  const commands = [
    { cmd: "$ npm install skills" },
    { cmd: "react@18.2.0", output: "✓ installed" },
    { cmd: "typescript@5.0.0", output: "✓ installed" },
    { cmd: "nodejs@20.0.0", output: "✓ installed" },
    { cmd: "docker@24.0.0", output: "✓ installed" },
  ];

  const footerExtra = (
    <div
      className={`w-3 h-3 border border-ctp-blue border-t-transparent rounded-full ${styles.spinner}`}
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

const sectionLoadingMap: Record<string, React.FC> = {
  home: HomeLoading,
  about: AboutLoading,
  skills: SkillsLoading,
  projects: ProjectsLoading,
  experience: ExperienceLoading,
  contact: ContactLoading,
  learning: LearningLoading,
  articles: ArticlesLoading,
};

interface SectionLoadingScreenProps {
  section: SectionType;
}

export const SectionLoadingScreen: React.FC<SectionLoadingScreenProps> = ({
  section,
}) => {
  const Component = sectionLoadingMap[section] ?? HomeLoading;
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-8 min-h-[70vh] w-full ${styles.screenEnter}`}
    >
      <Component />
    </div>
  );
};
