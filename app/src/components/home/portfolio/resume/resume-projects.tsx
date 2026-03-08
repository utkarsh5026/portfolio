import { Code2, ExternalLink, Github } from "lucide-react";
import React from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";

interface Project {
  name: string;
  tagline: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

const featuredProjects: Project[] = [
  {
    name: "StoreMy",
    tagline:
      "Production-grade relational database built from scratch in Go (~100K lines)",
    technologies: ["Go", "Docker"],
    githubLink: "https://github.com/utkarsh5026/storemy",
  },
  {
    name: "Enigma",
    tagline:
      "Full-featured interpreter for a custom programming language running in the browser",
    technologies: ["TypeScript", "React", "Monaco"],
    githubLink: "https://github.com/utkarsh5026/enigma",
  },
  {
    name: "First Principles",
    tagline:
      "Mobile-first documentation platform with 1,881+ curated technical documents",
    technologies: ["React", "TypeScript", "Vite", "Redux"],
    githubLink: "https://github.com/utkarsh5026/firstprinciples",
  },
  {
    name: "SourceControl",
    tagline: "Production-grade Git implementation from scratch in pure Go",
    technologies: ["Go", "CLI", "Cobra"],
    githubLink: "https://github.com/utkarsh5026/source-control",
  },
  {
    name: "Mayonation",
    tagline:
      "Lightweight TypeScript animation library with GPU acceleration, <5kb gzipped",
    technologies: ["TypeScript", "Vite"],
    githubLink: "https://github.com/utkarsh5026/mayonation",
  },
  {
    name: "AuthGuard",
    tagline:
      "Enterprise authentication microservice with OAuth2, SAML and MFA support",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
    githubLink: "https://github.com/utkarsh5026/authguard",
  },
];

const ResumeProjects: React.FC = () => {
  const ref = useGitComponent(ResumeProjects);

  return (
    <div
      ref={ref}
      className="animate-fadeIn"
      style={{ animationDelay: "0.3s" }}
    >
      <OutlineNode
        label="Projects"
        icon={<Code2 className="w-3 h-3" />}
        iconColor="mauve"
      >
        <Heading
          as="h4"
          className="mb-4 text-xl border-b-2 border-ctp-surface2 pb-2 uppercase tracking-widest text-ctp-text"
        >
          Notable Projects
        </Heading>

        <div className="flex flex-col gap-5">
          {featuredProjects.map((project) => (
            <div key={project.name} className="flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <Text
                  as="span"
                  variant="caption"
                  className="text-ctp-text font-bold text-base"
                >
                  {project.name}
                </Text>
                <div className="flex items-center gap-1 shrink-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-overlay0 hover:text-ctp-text transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-overlay0 hover:text-ctp-text transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <Text
                variant="muted"
                className="text-xs leading-snug mb-2 text-ctp-subtext0"
              >
                {project.tagline}
              </Text>

              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span key={tech} className="text-xs text-ctp-overlay0">
                    {tech}
                    {index < project.technologies.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OutlineNode>
    </div>
  );
};

export default ResumeProjects;
