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

import React from "react";
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
  return (
    <div
      id={id}
      className={`mt-24 sm:mt-32 md:mt-48 ${className} relative group px-4 sm:px-6 md:px-8 lg:px-10 sm:py-12 lg:py-16 md:py-12`}
    >
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

      <div className="relative my-8 sm:my-10 md:my-12">
        <hr className="border-none h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/5 to-purple-500/0 blur-sm" />
      </div>

      <div className="relative z-10 animate-fadeIn backdrop-blur-sm max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

const Section = React.memo(SectionComponent);
export default Section;
