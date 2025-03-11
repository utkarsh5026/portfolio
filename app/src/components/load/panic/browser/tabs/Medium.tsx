import React, { useState } from "react";
import {
  BookOpen,
  Heart,
  Share2,
  MessageSquare,
  Bookmark,
  MoreHorizontal,
  Coffee,
  Code,
  Monitor,
  Briefcase,
  Server,
  Zap,
  Clock,
  Calendar,
  Star,
  Check,
  Layout,
  Globe,
  Image,
  FileText,
  Link,
  Box,
  Users,
} from "lucide-react";
import { mediumData } from "./data";
import { FaFigma, FaGithub } from "react-icons/fa";

const { relatedArticles } = mediumData;

const MediumPortfolio: React.FC = () => {
  const [claps, setClaps] = useState(428);
  const [bookmarked, setBookmarked] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 bg-[#121212] text-gray-200 font-sans">
      {/* Header section */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              className="w-12 h-12 text-white mr-3"
              viewBox="0 0 1043.63 592.71"
              fill="currentColor"
            >
              <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-white">Medium</h1>
              <div className="text-sm text-gray-400">
                Where good ideas find you
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 rounded-full text-sm transition-colors flex items-center">
              <BookOpen size={14} className="mr-1.5" />
              Discover
            </button>
            <button className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 rounded-full text-sm transition-colors flex items-center">
              <Bookmark size={14} className="mr-1.5" />
              Reading list
            </button>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-400 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#2d2e32] text-green-400 mr-4 text-xs flex items-center">
            <Star size={12} className="mr-1" />
            FEATURED
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            11 min read
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Code size={14} className="mr-1.5" />
            Development
          </span>
        </div>

        <div className="h-1 w-full bg-[#2d2e32] rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
        </div>
      </header>

      <article>
        {/* Article title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          The Complete Guide to Building a Developer Portfolio That Gets You
          Hired
        </h2>

        {/* Author information with interactive elements */}
        <div className="flex items-center mb-8">
          <ProfileAvatar />
          <div className="ml-4">
            <div className="text-white font-medium">Sarah Chen</div>
            <div className="text-gray-400 text-sm flex items-center">
              <span className="flex items-center">
                <Calendar size={12} className="mr-1" />
                Feb 12, 2023
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Coffee size={12} className="mr-1" />
                Member-only story
              </span>
            </div>
          </div>

          <div className="ml-auto flex space-x-3">
            <button className="p-2 rounded-full bg-[#2d2e32] text-gray-300 hover:bg-[#3d3e42] transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full bg-[#2d2e32] text-gray-300 hover:bg-[#3d3e42] transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Abstract SVG header instead of image */}
        <div className="mb-8">
          <AbstractArticleHeader />
          <div className="text-gray-400 text-sm italic text-center">
            A well-crafted developer portfolio can be your ticket to landing
            interviews
          </div>
        </div>

        {/* Article content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4 leading-relaxed">
            Your developer portfolio is often the first impression potential
            employers have of you. In today's competitive job market, a standard
            resume no longer cuts it. Employers want to see what you can build,
            not just read about what you claim you can do.
          </p>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Whether you're a newcomer to the industry or a seasoned
            professional, an effective portfolio establishes your brand,
            showcases your work, and demonstrates your technical abilities. This
            comprehensive guide will walk you through creating a portfolio that
            stands out and gets you noticed by recruiters and hiring managers.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center">
            <span className="w-7 h-7 rounded-full bg-green-500 text-black flex items-center justify-center mr-2 text-sm font-bold">
              1
            </span>
            Planning Your Portfolio Structure
          </h3>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Before diving into code, take some time to plan your portfolio's
            content and structure. A well-organized portfolio should include:
          </p>

          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#212121] p-5 rounded-lg mb-6 border-l-4 border-green-500">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">
                    Home/Landing Page:
                  </strong>{" "}
                  <span className="text-gray-300">
                    A clean introduction with your name, title, and a brief
                    statement about what you do.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">
                    About Section:
                  </strong>{" "}
                  <span className="text-gray-300">
                    Your background, skills, and what makes you unique as a
                    developer.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">
                    Projects Gallery:
                  </strong>{" "}
                  <span className="text-gray-300">
                    Showcases of your best work with descriptions and links.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">
                    Skills Section:
                  </strong>{" "}
                  <span className="text-gray-300">
                    Visual representation of your technical abilities.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">
                    Contact Information:
                  </strong>{" "}
                  <span className="text-gray-300">
                    Multiple ways to get in touch with you.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3 text-black">
                  <Check size={12} />
                </div>
                <div>
                  <strong className="text-white font-medium">Resume:</strong>{" "}
                  <span className="text-gray-300">
                    A downloadable version of your traditional resume.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center">
            <span className="w-7 h-7 rounded-full bg-green-500 text-black flex items-center justify-center mr-2 text-sm font-bold">
              2
            </span>
            Recommended Tech Stack
          </h3>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Choose technologies that align with your career goals. Here's a
            solid foundation:
          </p>

          {/* Interactive sections with toggle functionality */}
          <SectionToggle
            title="Project Structure Example"
            isExpanded={expandedSection === "structure"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "structure" ? null : "structure"
              )
            }
          >
            <div className="font-mono text-sm text-gray-300 overflow-x-auto">
              <div className="flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">src/</span>
              </div>
              <div className="ml-6 flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">components/</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>Header.jsx</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>ProjectCard.jsx</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>Skills.jsx</span>
              </div>
              <div className="ml-6 flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">pages/</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>Home.jsx</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>Projects.jsx</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>About.jsx</span>
              </div>
              <div className="ml-12 flex items-center mb-2">
                <File size={16} className="mr-2 text-gray-400" />
                <span>Contact.jsx</span>
              </div>
              <div className="ml-6 flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">assets/</span>
              </div>
              <div className="ml-6 flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">hooks/</span>
              </div>
              <div className="ml-6 flex items-center mb-2">
                <Folder size={16} className="mr-2 text-gray-400" />
                <span className="text-blue-400">utils/</span>
              </div>
            </div>
          </SectionToggle>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] rounded-lg p-5 border-t-2 border-blue-500">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Monitor size={18} className="text-blue-500 mr-2" />
                Frontend Options
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  React or Next.js for component-based UI
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Tailwind CSS for rapid styling
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  TypeScript for type safety
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Framer Motion for animations
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border-t-2 border-purple-500">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Server size={18} className="text-purple-500 mr-2" />
                Deployment Options
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                  Vercel for Next.js applications
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                  Netlify for static sites
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                  GitHub Pages for simple portfolios
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                  AWS Amplify for full-stack applications
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Remember that your portfolio itself is a demonstration of your
            coding abilities. Recruiters will judge not only the design but also
            your code quality, performance optimization, and attention to
            detail.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center">
            <span className="w-7 h-7 rounded-full bg-green-500 text-black flex items-center justify-center mr-2 text-sm font-bold">
              3
            </span>
            Showcasing Your Projects Effectively
          </h3>

          <p className="text-gray-300 mb-2 leading-relaxed">
            For each project, include:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#1a1a1a] p-3 rounded-lg flex items-start">
              <div className="w-8 h-8 rounded-lg bg-green-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                <Image size={16} className="text-green-500" />
              </div>
              <div className="text-gray-300 text-sm">
                Clear screenshots or GIFs demonstrating functionality
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg flex items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                <FileText size={16} className="text-blue-500" />
              </div>
              <div className="text-gray-300 text-sm">
                Concise explanation of the problem the project solves
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg flex items-start">
              <div className="w-8 h-8 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                <Code size={16} className="text-purple-500" />
              </div>
              <div className="text-gray-300 text-sm">
                Tech stack and your role in development
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg flex items-start">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                <Link size={16} className="text-yellow-500" />
              </div>
              <div className="text-gray-300 text-sm">
                Links to both the live demo and source code
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-lg flex items-start sm:col-span-2">
              <div className="w-8 h-8 rounded-lg bg-red-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                <Zap size={16} className="text-red-500" />
              </div>
              <div className="text-gray-300 text-sm">
                Any notable challenges and how you overcame them
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4 my-8 py-2 bg-[#1a1a1a] bg-opacity-50 rounded-r-md">
            <p className="text-gray-200 italic flex">
              <Quote
                size={18}
                className="text-green-500 mr-2 flex-shrink-0 mt-1"
              />
              <span>
                "Quality over quantity. Three excellent, well-documented
                projects are more impressive than ten half-finished ones."
              </span>
            </p>
          </div>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Stay tuned for Part 2 of this guide where we'll cover designing for
            impact, performance optimization, and strategies to get your
            portfolio noticed by the right people.
          </p>
        </div>

        {/* Article footer with interactive elements */}
        <div className="mt-12 pt-6 border-t border-[#333]">
          <div className="flex flex-wrap gap-3 mb-8">
            {["Web Development", "Career Advice", "Portfolio", "React"].map(
              (tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 rounded-full text-sm cursor-pointer transition-colors flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-full border ${
                  bookmarked
                    ? "border-green-500 text-green-500"
                    : "border-[#333] text-gray-300 hover:bg-[#2d2e32]"
                } transition-colors`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark
                  size={18}
                  className={bookmarked ? "fill-green-500" : ""}
                />
              </button>
              <div className="text-gray-400 text-sm">{claps}</div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full border border-[#333] text-gray-300 hover:bg-[#2d2e32] transition-colors">
                <MessageSquare size={18} />
              </button>
              <button
                className="p-2 rounded-full border border-[#333] text-gray-300 hover:bg-[#2d2e32] transition-colors"
                onClick={() => setClaps(claps + 1)}
              >
                <Heart size={18} />
              </button>
              <button className="p-2 rounded-full border border-[#333] text-gray-300 hover:bg-[#2d2e32] transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* More from Medium section with enhanced UI */}
      <div className="mt-12 pt-6 border-t border-[#333]">
        <h3 className="text-white font-medium mb-6 flex items-center">
          <BookOpen size={18} className="text-green-500 mr-2" />
          More from Medium
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((article, index) => (
            <div
              key={article.id}
              className="flex items-start cursor-pointer group hover:bg-[#1a1a1a] p-3 rounded-lg transition-colors"
            >
              <div className="mr-4 flex flex-col items-center">
                <div className="text-gray-500 text-sm font-medium">
                  0{index + 1}
                </div>
                <div className="mt-2 w-8 h-8 rounded-full bg-[#2d2e32] flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                  {article.icon}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-white font-medium mb-2 group-hover:text-green-400 transition-colors leading-tight">
                  {article.title}
                </h4>

                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    {article.author.split(" ")[0][0]}
                    {article.author.split(" ")[1][0]}
                  </div>
                  <span className="text-gray-400">{article.author}</span>
                </div>

                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock size={10} className="mr-1" />
                    {article.time}
                  </span>
                  <span className="mx-1">·</span>
                  <span className="flex items-center">
                    <Calendar size={10} className="mr-1" />
                    {article.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Author recommendations and follow section */}
      <div className="mt-10 bg-[#1a1a1a] rounded-lg p-6">
        <div className="flex items-start">
          <ProfileAvatar />

          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Written by Sarah Chen</h4>
              <button className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-black font-medium rounded-full text-sm transition-colors">
                Follow
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-2 mb-4">
              Frontend developer specializing in React and UI/UX. Writing about
              web development, career advice, and creating effective developer
              portfolios.
            </p>

            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <FileText size={14} className="mr-1" />
                87 Stories
              </span>
              <span className="mx-3">·</span>
              <span className="flex items-center">
                <Users size={14} className="mr-1" />
                12.4K Followers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="mt-10 bg-gradient-to-r from-[#133929] to-[#071b14] rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6 md:flex-1">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Mail size={16} className="text-green-400 mr-2" />
              Stay updated on web development trends
            </h4>
            <p className="text-gray-300 text-sm">
              Get the latest articles on portfolio building, frontend
              technologies, and career advice delivered to your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto flex">
            <input
              type="email"
              placeholder="your-email@example.com"
              className="bg-[#0d1f17] text-white border border-[#1e4635] rounded-l-md px-4 py-2 text-sm flex-1 md:w-64 focus:outline-none focus:border-green-500"
            />
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-black font-medium px-4 py-2 rounded-r-md whitespace-nowrap text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IconProps {
  size: number;
  className: string;
}
const Folder: React.FC<IconProps> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const File: React.FC<IconProps> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const Quote: React.FC<IconProps> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
  </svg>
);

const Mail: React.FC<IconProps> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ProfileAvatar = () => (
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
    SC
  </div>
);

interface SectionToggleProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SectionToggle: React.FC<SectionToggleProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => (
  <div className="mb-6">
    <button
      className="flex items-center justify-between w-full text-left bg-[#1a1a1a] hover:bg-[#252525] transition-colors p-3 rounded-t-lg"
      onClick={onToggle}
    >
      <span className="text-white font-medium">{title}</span>
      <span className="text-gray-400">{isExpanded ? "−" : "+"}</span>
    </button>
    {isExpanded && (
      <div className="bg-[#1a1a1a] p-4 rounded-b-lg border-t border-[#333]">
        {children}
      </div>
    )}
  </div>
);

const AbstractArticleHeader = () => (
  <div className="relative h-64 md:h-80 w-full mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center">
    <div className="absolute inset-0 opacity-10">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div className="relative z-10 flex flex-col items-center">
      <div className="w-80 h-40 border-2 border-green-400 rounded-lg flex items-center justify-center relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-green-400"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-green-400"></div>

        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center">
            <Layout size={28} className="text-green-400 mb-2" />
            <div className="h-16 w-1 bg-green-400"></div>
          </div>

          <div className="flex flex-col items-center">
            <Code size={28} className="text-white mb-2" />
            <div className="h-24 w-1 bg-white"></div>
          </div>

          <div className="flex flex-col items-center">
            <Monitor size={28} className="text-green-400 mb-2" />
            <div className="h-20 w-1 bg-green-400"></div>
          </div>

          <div className="flex flex-col items-center">
            <Briefcase size={28} className="text-white mb-2" />
            <div className="h-12 w-1 bg-white"></div>
          </div>
        </div>
      </div>

      <div className="text-green-400 mt-8 flex items-center text-lg font-semibold">
        <FileText size={20} className="mr-2" />
        <span>PORTFOLIO JOURNEY</span>
      </div>
    </div>

    {/* Floating elements */}
    <div className="absolute top-10 left-10 opacity-40">
      <FaGithub size={24} className="text-white" />
    </div>
    <div className="absolute bottom-10 left-16 opacity-40">
      <FaFigma size={24} className="text-white" />
    </div>
    <div className="absolute top-16 right-10 opacity-40">
      <Globe size={24} className="text-white" />
    </div>
    <div className="absolute bottom-14 right-20 opacity-40">
      <Box size={24} className="text-white" />
    </div>
  </div>
);

export default MediumPortfolio;
