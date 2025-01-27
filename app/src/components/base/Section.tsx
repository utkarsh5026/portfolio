/**
 * This is our main Section component - it's used all over the app to create those
 * fancy content sections with the cool hover effects and gradient backgrounds.
 *
 * Each section comes with:
 * - A big gradient title that animates on hover
 * - Some floating background blobs that move around
 * - A subtle gradient overlay that appears on hover
 * - Those three little animated dots above the title
 * - A fancy divider line below the heading
 *
 * You'll see these sections used for things like the About, Projects,
 * and Contact areas of the site.
 */

import React, { useEffect, useRef } from "react";
import GradientText from "../utils/GradientText";

interface SectionProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

const SectionComponent: React.FC<SectionProps> = ({
  id,
  label,
  className,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`mt-24 sm:mt-32 md:mt-48 ${className} relative group px-4 sm:px-6 md:px-8 lg:px-10 sm:py-12 lg:py-16 md:py-12 section-animate`}
    >
      <div className="relative bg-slate-950 rounded-2xl overflow-hidden section-gradient-border">
        <div className="relative p-6 sm:p-8 md:p-12">
          <div className="relative">
            <GradientText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-right tracking-tight">
              {label}
            </GradientText>

            <div className="absolute -top-2 sm:-top-3 md:-top-4 right-0 flex gap-1 sm:gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`${i}-${label}`}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-8 sm:my-10 md:my-12">
            <hr className="border-none h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/5 to-purple-500/0 blur-sm" />
          </div>

          {/* Content */}
          <div className="relative z-10 animate-fadeIn backdrop-blur-sm max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Smoke effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="smoke-1 absolute inset-0" />
        <div className="smoke-2 absolute inset-0" />
        <div className="smoke-3 absolute inset-0" />
      </div>
    </div>
  );
};

const Section = React.memo(SectionComponent);
export default Section;
