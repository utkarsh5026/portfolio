import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineCode } from "react-icons/hi";

import { technologies } from "@/components/base/technologies";

import { MarkdownRender } from "@/components/home/editor/markdown-renderer";
import { Heading, Text } from "@/components/ui/text";

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const COVER_GRADIENTS = [
  "from-ctp-mauve/40 via-ctp-mantle to-ctp-base",
  "from-ctp-blue/40 via-ctp-mantle to-ctp-base",
  "from-ctp-green/40 via-ctp-mantle to-ctp-base",
  "from-ctp-peach/40 via-ctp-mantle to-ctp-base",
  "from-ctp-pink/40 via-ctp-mantle to-ctp-base",
  "from-ctp-teal/40 via-ctp-mantle to-ctp-base",
  "from-ctp-yellow/40 via-ctp-mantle to-ctp-base",
  "from-ctp-red/40 via-ctp-mantle to-ctp-base",
] as const;

function pickGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
}

const SectionHeading: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = "bg-ctp-blue" }) => (
  <div className="flex items-center gap-3 mt-10 mb-4">
    <span className={cn("w-0.5 h-4 rounded-full shrink-0", color)} />
    <Heading as="h6">{children}</Heading>
    <span className="flex-1 border-t border-ctp-surface1" />
  </div>
);

const CoverBand: React.FC<{ coverImage?: string; name: string }> = ({
  coverImage,
  name,
}) => {
  const gradient = pickGradient(name);

  if (coverImage) {
    return (
      <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
        <img
          src={coverImage}
          alt={`${name} cover`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ctp-base/40 to-ctp-base/90" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-36 rounded-t-xl bg-gradient-to-b",
        gradient,
      )}
    >
      {/* Subtle noise texture via repeating tiny radial */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,_hsl(var(--ctp-overlay2))_1px,_transparent_1px)] [background-size:20px_20px]" />
    </div>
  );
};

const PageIcon: React.FC<{ icon?: string; name: string }> = ({
  icon,
  name,
}) => {
  const label = icon ?? name.charAt(0).toUpperCase();
  const isEmoji = icon !== undefined;

  return (
    <div
      className={cn(
        "relative -mt-14 ml-6 flex items-center justify-center z-10",
        "w-24 h-24 rounded-2xl shadow-md ring-[6px] ring-ctp-base",
        "bg-ctp-base text-5xl select-none",
        !isEmoji && "bg-ctp-surface0 text-ctp-mauve font-bold text-4xl",
      )}
    >
      {label}
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="mt-8 space-y-3 animate-pulse px-6">
    {[80, 60, 90, 50, 70].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded bg-ctp-surface1"
        style={{ width: `${w}%` }}
      />
    ))}
  </div>
);

const FeatureCard: React.FC<{ feature: string; index: number }> = ({
  feature,
  index,
}) => {
  const accentColors = [
    {
      bg: "bg-ctp-blue",
      text: "text-ctp-blue",
      border: "border-ctp-blue/20 hover:border-ctp-blue/50",
    },
    {
      bg: "bg-ctp-mauve",
      text: "text-ctp-mauve",
      border: "border-ctp-mauve/20 hover:border-ctp-mauve/50",
    },
    {
      bg: "bg-ctp-green",
      text: "text-ctp-green",
      border: "border-ctp-green/20 hover:border-ctp-green/50",
    },
    {
      bg: "bg-ctp-peach",
      text: "text-ctp-peach",
      border: "border-ctp-peach/20 hover:border-ctp-peach/50",
    },
    {
      bg: "bg-ctp-pink",
      text: "text-ctp-pink",
      border: "border-ctp-pink/20 hover:border-ctp-pink/50",
    },
    {
      bg: "bg-ctp-teal",
      text: "text-ctp-teal",
      border: "border-ctp-teal/20 hover:border-ctp-teal/50",
    },
    {
      bg: "bg-ctp-yellow",
      text: "text-ctp-yellow",
      border: "border-ctp-yellow/20 hover:border-ctp-yellow/50",
    },
    {
      bg: "bg-ctp-red",
      text: "text-ctp-red",
      border: "border-ctp-red/20 hover:border-ctp-red/50",
    },
  ];
  const accent = accentColors[index % accentColors.length];

  let title = feature;
  let description = "";
  const splitIndex = feature.indexOf(": ");
  if (splitIndex !== -1) {
    title = feature.substring(0, splitIndex);
    description = feature.substring(splitIndex + 2);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-4 rounded-xl transition-colors duration-200",
        "bg-ctp-surface0/20 border",
        accent.border,
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", accent.bg)} />
        <Heading as="h3" className="text-sm font-semibold text-ctp-text">
          {title}
        </Heading>
      </div>
      {description && (
        <ul className="space-y-1.5 mt-1 ml-3.5">
          <li className="text-[13px] text-ctp-subtext0 leading-relaxed list-disc list-outside ml-2 marker:text-ctp-surface2">
            <span>{description}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

const OverviewTab: React.FC<{
  description: string;
  keyFeatures: string[];
}> = ({ description, keyFeatures }) => (
  <div className="px-6 pb-12 space-y-10 font-source">
    {/* Description */}
    <div className="space-y-4">
      <SectionHeading color="bg-ctp-mauve">Project Overview</SectionHeading>
      <div className="p-6 rounded-2xl bg-gradient-to-br from-ctp-surface0/20 to-transparent border border-ctp-surface0/50">
        <Text variant="subtitle" className="leading-relaxed text-ctp-subtext1">
          {description}
        </Text>
      </div>
    </div>

    {/* Features */}
    {keyFeatures && keyFeatures.length > 0 && (
      <div className="space-y-6">
        <SectionHeading color="bg-ctp-green">Key Features</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {keyFeatures.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    )}
  </div>
);

// ─── Tab bar ─────────────────────────────────────────────────────
type Tab = "overview" | "deepdive";

const TabBar: React.FC<{
  active: Tab;
  onChange: (t: Tab) => void;
}> = ({ active, onChange }) => {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <HiOutlineBookOpen className="w-3.5 h-3.5" />,
    },
    {
      id: "deepdive",
      label: "Deep Dive",
      icon: <HiOutlineCode className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="flex items-center gap-1 px-6 mt-6 border-b border-ctp-surface1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border-b-2 transition-colors -mb-px",
            active === tab.id
              ? "border-ctp-blue text-ctp-blue"
              : "border-transparent text-ctp-subtext0 hover:text-ctp-text",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ─── Types ───────────────────────────────────────────────────────
type LoadState = "loading" | "loaded" | "error";

interface ProjectMarkdownProps {
  projectId: string;
}

const ProjectMarkdown: React.FC<ProjectMarkdownProps> = ({ projectId }) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.name === projectId),
  );

  const [markdown, setMarkdown] = useState<string>("");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!project) return;

    const slug = nameToSlug(project.name);
    const url = `/data/projects/${slug}.md`;

    setLoadState("loading");
    setMarkdown("");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoadState("loaded");
      })
      .catch(() => setLoadState("error"));
  }, [project]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-ctp-overlay0 font-mono text-sm">
        Loading project…
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto font-mono text-sm text-ctp-text leading-relaxed mt-4">
      <CoverBand coverImage={project.coverImage} name={project.name} />
      <PageIcon icon={project.icon} name={project.name} />

      <div className="px-6 mt-6 mb-4 font-source">
        <Heading as="h1">{project.name}</Heading>
        {project.tagline && (
          <Text variant="lead" className="mt-3">
            {project.tagline}
          </Text>
        )}
      </div>

      <div className="flex items-center gap-3 px-6 mt-3 font-source">
        {project.githubLink && project.githubLink !== "private-repository" && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-ctp-subtext1 hover:text-ctp-mauve transition-colors"
          >
            <FaGithub className="w-3.5 h-3.5" />
            GitHub
          </a>
        )}
        {project.liveLink && (
          <>
            <span className="text-ctp-surface2">·</span>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-ctp-subtext1 hover:text-ctp-blue transition-colors"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Live Demo
            </a>
          </>
        )}
      </div>

      {project.technologies.length > 0 && (
        <div className="px-6">
          <SectionHeading color="bg-ctp-yellow">Tech Stack</SectionHeading>
          <div className="flex flex-wrap gap-2 font-source">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-ctp-surface1/15 hover:bg-ctp-surface1/30 rounded-md transition-all duration-200 group/tech"
              >
                <div className="flex-shrink-0 flex items-center justify-center group-hover/tech:scale-110 transition-transform duration-200">
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    {technologies[tech].icon}
                  </div>
                </div>
                <span className="text-[11px] sm:text-sm text-ctp-subtext1 group-hover/tech:text-ctp-text font-medium transition-colors duration-200 -mt-[1px]">
                  {technologies[tech].name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab bar */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* Tab panels */}
      {activeTab === "overview" && (
        <div className="mt-6">
          <OverviewTab
            description={project.description ?? ""}
            keyFeatures={(project.keyFeatures as string[]) ?? []}
          />
        </div>
      )}

      {activeTab === "deepdive" && (
        <div className="mt-6">
          {loadState === "loading" && <LoadingSkeleton />}

          {loadState === "loaded" && markdown && (
            <div className="px-6 pb-10">
              <MarkdownRender markdown={markdown} />
            </div>
          )}

          {loadState === "error" && (
            <Text
              variant="caption"
              className="px-6 mt-8 text-ctp-red font-mono"
            >
              ⚠ Could not load project notes.
            </Text>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectMarkdown;
