import { ArrowUpRight, FileText, Mail } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { contactLinks, RESUME_URL } from "../data";
import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Contact: React.FC = () => (
  <SectionShell
    id="contact"
    title="Get in touch"
    accentClass="bg-ctp-mauve"
    eyebrow="Open to full-stack, backend and DevOps roles"
  >
    <RevealOnScroll>
      <div className="rounded-xl border border-ctp-surface0 bg-ctp-mantle/40 p-6 sm:p-8">
        <p className="max-w-xl text-sm leading-relaxed text-ctp-subtext0">
          If any of this looks like a fit, the fastest way to reach me is email
          — I reply to everything.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="mailto:utkarshpriyadarshi5026@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-ctp-mauve/90 px-4 py-2.5 text-sm font-semibold text-ctp-crust transition-colors duration-300 hover:bg-ctp-mauve"
          >
            <Mail className="h-4 w-4" />
            Email me
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-ctp-surface1 px-4 py-2.5 text-sm font-medium text-ctp-text transition-colors duration-300 hover:border-ctp-overlay0 hover:bg-ctp-surface0/50"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-ctp-surface0 pt-5">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 font-source text-xs text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-text",
                styles.link
              )}
            >
              <span className={link.color}>{link.label}</span>
              <ArrowUpRight className="h-3 w-3 text-ctp-overlay0" />
            </a>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  </SectionShell>
);

export default Contact;
