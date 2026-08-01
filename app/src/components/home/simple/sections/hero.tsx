import React from "react";

import { articles } from "@/components/home/portfolio/articles/articles-dump";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";

import { contactLinks, profile } from "../data";
import styles from "../simple.module.css";

const Hero: React.FC = () => {
  const projects = useProjectStore((s) => s.projects);

  // Anchors for the eye at the top of a page that is otherwise all prose.
  // Every figure is counted from the data, so none of them can go stale.
  const techCount = new Set(projects.flatMap((p) => p.technologies)).size;
  const figures = [
    { value: projects.length || "—", label: "projects shipped" },
    { value: articles.length, label: "articles published" },
    { value: techCount || "—", label: "technologies used" },
  ];

  return (
    <header className="pb-14 pt-10 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-12 lg:pb-20 lg:pt-14">
      {/* Sits in the left margin on wide screens, above the name on narrow
          ones. personal-min.webp is the same 896×1200 source at a seventh of
          the weight — plenty at this size. */}
      <div className={cn("mb-8 lg:mb-0", styles.enter)}>
        <img
          src="/personal-min.webp"
          alt="Utkarsh Priyadarshi"
          width={896}
          height={1200}
          loading="eager"
          decoding="async"
          className="w-32 rounded-sm border border-ctp-surface1/60 object-cover sm:w-36 lg:w-full"
        />
      </div>

      <div>
        <h1
          className={cn(
            "text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ctp-text sm:text-[3rem]",
            styles.enter
          )}
        >
          {profile.name}
        </h1>

        <p
          className={cn(
            "mt-3 font-source text-[13px] text-ctp-overlay1",
            styles.enter
          )}
          style={{ animationDelay: "0.06s" }}
        >
          {profile.role}
        </p>

        <p
          className={cn(
            "mt-8 max-w-[36rem] text-[17px] leading-[1.65] text-ctp-subtext1",
            styles.enter
          )}
          style={{ animationDelay: "0.12s" }}
        >
          {profile.summary}
        </p>

        <dl
          className={cn("mt-10 flex flex-wrap gap-x-12 gap-y-6", styles.enter)}
          style={{ animationDelay: "0.18s" }}
        >
          {figures.map((figure) => (
            <div key={figure.label}>
              <dt className="font-source text-[1.75rem] leading-none tabular-nums text-ctp-text">
                {figure.value}
              </dt>
              <dd className="mt-2 font-source text-[11px] uppercase tracking-[0.14em] text-ctp-overlay0">
                {figure.label}
              </dd>
            </div>
          ))}
        </dl>

        <ul
          className={cn(
            "mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ctp-surface0/70 pt-6 font-source text-[12px]",
            styles.enter
          )}
          style={{ animationDelay: "0.24s" }}
        >
          <li className="mr-1 flex items-center gap-2 text-ctp-green">
            <span
              className="h-1.5 w-1.5 rounded-full bg-ctp-green"
              aria-hidden
            />
            Open to work
          </li>
          {contactLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={cn(
                  "text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
                  styles.link
                )}
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Hero;
