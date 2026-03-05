import React, { useEffect } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineCode } from "react-icons/hi";

import { technologies } from "@/components/base/technologies";
import { MarkdownRender } from "@/components/home/editor/markdown-renderer";
import { Heading, Text } from "@/components/ui/text";
import { useMarkdownOutlineBridge } from "@/hooks/use-markdown-outline-bridge";
import { cn } from "@/lib/utils";
import { useMarkdownHeadingStore } from "@/store";
import useProjectStore from "@/store/projects/projects-store";
import { getProjectSlug } from "@/utils/project-slug";

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
}) => {
  let title = feature;
  let description = "";
  const splitIndex = feature.indexOf(": ");
  if (splitIndex !== -1) {
    title = feature.substring(0, splitIndex);
    description = feature.substring(splitIndex + 2);
  }

  return (
    <li className="relative pl-5 py-0.5">
      <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-ctp-surface2" />
      <span className="text-sm font-medium text-ctp-text">{title}</span>
      {description && (
        <span className="text-[13px] text-ctp-subtext0 block mt-1 leading-relaxed">
          {description}
        </span>
      )}
    </li>
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
        <ul className="grid grid-cols-1 sm:grid-cols-1 gap-y-4">
          {keyFeatures.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </ul>
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
    <div className="flex items-center gap-1 px-6 mt-6 border-b border-ctp-surface1 font-source">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 text-xs border-b-2 transition-colors -mb-px",
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

  const slug = project ? getProjectSlug(project.name) : "";
  const markdown = useProjectStore((s) => s.markdownCache[slug] ?? "");
  const loadState = useProjectStore(
    (s) => (s.markdownStates[slug] as LoadState) ?? "loading",
  );

  const [activeTab, setActiveTab] = React.useState<Tab>("overview");
  useMarkdownOutlineBridge(project?.name ?? projectId);
  const setIsDeepDive = useMarkdownHeadingStore((s) => s.setIsDeepDive);
  const setActiveHeadings = useMarkdownHeadingStore((s) => s.setActiveHeadings);

  useEffect(() => {
    setIsDeepDive(activeTab === "deepdive");
    if (activeTab !== "deepdive") {
      setActiveHeadings({ h1: null, h2: null, h3: null });
    }
  }, [activeTab, setIsDeepDive, setActiveHeadings]);

  useEffect(() => {
    return () => {
      setIsDeepDive(false);
      setActiveHeadings({ h1: null, h2: null, h3: null });
    };
  }, [setIsDeepDive, setActiveHeadings]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-ctp-overlay0 font-source text-sm">
        Loading project…
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto font-source text-sm text-ctp-text leading-relaxed mt-4">
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
            <div className="px-6 pb-10 font-sans">
              <MarkdownRender markdown={markdown} />
            </div>
          )}

          {loadState === "error" && (
            <Text
              variant="caption"
              className="px-6 mt-8 text-ctp-red font-source"
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
