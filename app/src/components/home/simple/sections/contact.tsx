import React from "react";

import { cn } from "@/lib/utils";

import { contactLinks } from "../data";
import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Contact: React.FC = () => (
  <SectionShell id="contact" title="Contact">
    <RevealOnScroll>
      <p className="max-w-[38rem] text-[14px] leading-[1.75] text-ctp-subtext0">
        Email is the surest way to reach me.
      </p>

      <dl className="mt-6 flex flex-col gap-2.5">
        {contactLinks.map((link) => (
          <div key={link.href} className="flex gap-4 font-source text-[13px]">
            <dt className="w-16 shrink-0 text-ctp-overlay0">{link.label}</dt>
            <dd className="min-w-0">
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={cn(
                  "break-all text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
                  styles.link
                )}
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </RevealOnScroll>
  </SectionShell>
);

export default Contact;
