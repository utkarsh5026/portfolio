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

const Section: React.FC<SectionProps> = ({
  id,
  label,
  className,
  children,
}) => {
  return (
    <div
      id={id}
      className={`mt-32 sm:mt-48 md:mt-64 ${className} relative group px-4 sm:px-2 md:px-8 lg:px-10`}
    >
      <div className="absolute -right-20 -top-20 w-1/2 h-96 rounded-full bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-xl transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute -left-32 top-10 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500/5 to-purple-500/5 blur-xl transform group-hover:scale-110 transition-transform duration-700" />

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

      <div className="relative">
        <GradientText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-right tracking-tight transform transition-all duration-500 hover:scale-[1.02] hover:tracking-normal">
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

export default Section;
