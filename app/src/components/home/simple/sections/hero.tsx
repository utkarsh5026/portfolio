import React from "react";

import { cn } from "@/lib/utils";

import { contactLinks, profile } from "../data";
import styles from "../simple.module.css";

const Hero: React.FC = () => (
  <header className="pb-14 pt-10 lg:grid lg:grid-cols-[7rem_1fr] lg:gap-10 lg:pb-20 lg:pt-14">
    <div aria-hidden className="hidden lg:block" />

    <div>
      <h1
        className={cn(
          "text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ctp-text sm:text-[2.5rem]",
          styles.enter
        )}
      >
        {profile.name}
      </h1>

      <p
        className={cn(
          "mt-2 font-source text-[13px] text-ctp-overlay1",
          styles.enter
        )}
        style={{ animationDelay: "0.06s" }}
      >
        {profile.role}
      </p>

      <p
        className={cn(
          "mt-8 max-w-[38rem] text-[15px] leading-[1.75] text-ctp-subtext0",
          styles.enter
        )}
        style={{ animationDelay: "0.12s" }}
      >
        {profile.summary}
      </p>

      <p
        className={cn(
          "mt-6 text-[13px] leading-[1.7] text-ctp-overlay1",
          styles.enter
        )}
        style={{ animationDelay: "0.18s" }}
      >
        Currently open to work.
      </p>

      <ul
        className={cn(
          "mt-10 flex flex-wrap gap-x-6 gap-y-2 font-source text-[12px]",
          styles.enter
        )}
        style={{ animationDelay: "0.24s" }}
      >
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

export default Hero;
