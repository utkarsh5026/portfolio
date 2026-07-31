import { ArrowDown, FileText, MapPin } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { contactLinks, profile, RESUME_URL } from "../data";
import styles from "../simple.module.css";

const Hero: React.FC = () => (
  <header className="relative scroll-mt-24 pt-16 pb-14 sm:pt-24 sm:pb-20">
    <div
      className={cn(
        "absolute inset-x-0 -top-24 h-80 pointer-events-none",
        styles.heroGlow
      )}
      aria-hidden
    />

    <div className="relative">
      <p
        className={cn(
          "font-source text-xs sm:text-sm text-ctp-overlay1 mb-5",
          styles.enter
        )}
      >
        <span className="text-ctp-green">❯</span> whoami
      </p>

      <h1
        className={cn(
          "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ctp-text",
          styles.enter
        )}
        style={{ animationDelay: "0.08s" }}
      >
        {profile.name}
      </h1>

      <p
        className={cn(
          "mt-3 text-lg sm:text-xl md:text-2xl font-medium",
          styles.enter
        )}
        style={{ animationDelay: "0.16s" }}
      >
        <span className="text-ctp-peach">Full-Stack Developer</span>
        <span className="text-ctp-overlay0"> & </span>
        <span className="text-ctp-teal">DevOps Engineer</span>
      </p>

      <p
        className={cn(
          "mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-ctp-subtext0",
          styles.enter
        )}
        style={{ animationDelay: "0.24s" }}
      >
        {profile.summary}
      </p>

      <ul
        className={cn(
          "mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ctp-subtext1",
          styles.enter
        )}
        style={{ animationDelay: "0.32s" }}
      >
        {profile.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className="h-1 w-1 rounded-full bg-ctp-overlay0"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Availability + location */}
      <div
        className={cn("mt-8 flex flex-wrap items-center gap-4", styles.enter)}
        style={{ animationDelay: "0.4s" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-ctp-green/25 bg-ctp-green/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ctp-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ctp-green" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ctp-green">
            Available for work
          </span>
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs text-ctp-overlay1">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </span>
      </div>

      {/* Actions */}
      <div
        className={cn("mt-9 flex flex-wrap items-center gap-3", styles.enter)}
        style={{ animationDelay: "0.48s" }}
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-ctp-mauve/90 px-4 py-2.5 text-sm font-semibold text-ctp-crust transition-colors duration-300 hover:bg-ctp-mauve"
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg border border-ctp-surface1 px-4 py-2.5 text-sm font-medium text-ctp-text transition-colors duration-300 hover:border-ctp-overlay0 hover:bg-ctp-surface0/50"
        >
          <ArrowDown className="h-4 w-4" />
          See the work
        </a>
      </div>

      {/* Contact row */}
      <div
        className={cn(
          "mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-ctp-surface0 pt-6",
          styles.enter
        )}
        style={{ animationDelay: "0.56s" }}
      >
        {contactLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={cn(
              "font-source text-xs sm:text-sm text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-text",
              styles.link
            )}
          >
            <span className={cn("mr-2", link.color)}>{link.label}</span>
            {link.value}
          </a>
        ))}
      </div>
    </div>
  </header>
);

export default Hero;
