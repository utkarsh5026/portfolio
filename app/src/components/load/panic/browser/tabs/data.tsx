import {
  Code,
  Compass,
  Layers,
  Layout,
  Mail,
  Monitor,
  Smartphone,
  Sparkles,
  Square,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";
import { FaJs, FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiGithub,
  SiVercel,
} from "react-icons/si";

export const twitterData = {
  tweets: [
    {
      id: 1,
      name: "React Team",
      username: "@reactjs",
      verified: true,
      time: "2h",
      content:
        "React 19 is coming with significant improvements to the rendering engine! Server Components are now stable and fully integrated with Suspense for a better user experience. Check the beta docs for migration guides.",
      icon: <FaReact className="text-blue-500 h-6 w-6" />,
      loves: 1862,
      retweets: 2567,
      replies: 342,
      shares: "1.4K",
      hasMedia: false,
      isPinned: false,
      hasThread: true,
      threadCount: 4,
      hashtags: ["#React19", "#ServerComponents", "#WebDev"],
    },
    {
      id: 2,
      name: "Tailwind CSS",
      username: "@tailwindcss",
      verified: true,
      time: "5h",
      content:
        "Just released Tailwind CSS v3.3 with even more color utilities, expanded animation options, and better responsive variants! Perfect for your next portfolio project.",
      icon: <SiTailwindcss className="text-cyan-400 h-6 w-6" />,
      loves: 934,
      retweets: 756,
      replies: 218,
      shares: "824",
      hasMedia: true,
      mediaType: "code",
      codeSnippet: `
// New color opacity utilities
<div class="bg-blue-500/75">
  <!-- 75% opacity blue background -->
</div>

// Animation improvements
<button class="animate-bounce hover:animate-pulse">
  Click me!
</button>
      `,
      isPinned: false,
      hasThread: false,
      hashtags: ["#TailwindCSS", "#CSSFramework"],
    },
    {
      id: 3,
      name: "TypeScript",
      username: "@typescript",
      verified: true,
      time: "1d",
      content:
        "TypeScript 5.3 is now available! This release brings performance improvements, better type inference, and new features that will make your development experience even smoother.",
      icon: <SiTypescript className="text-blue-600 h-6 w-6" />,
      loves: 1352,
      retweets: 879,
      replies: 156,
      shares: "2.4K",
      hasMedia: true,
      mediaType: "code",
      codeSnippet: `
// New in TypeScript 5.3
type Colors = 'red' | 'green' | 'blue';
type RGB = [red: number, green: number, blue: number];

// Improved type inference
const getColor = (color: Colors): RGB => {
  const colorMap = {
    red: [255, 0, 0],
    green: [0, 255, 0],
    blue: [0, 0, 255]
  };
  return colorMap[color];
};
      `,
      isPinned: false,
      hasThread: false,
      hashtags: ["#TypeScript", "#JavaScript", "#WebDevelopment"],
    },
    {
      id: 4,
      name: "Next.js",
      username: "@nextjs",
      verified: true,
      time: "6h",
      content:
        "Next.js 14 introduces Turbopack, our new Rust-based bundler with up to 700x faster updates than Webpack. The future of web development is here, and it's blazing fast! 🚀",
      icon: <SiNextdotjs className="text-white h-6 w-6" />,
      loves: 2943,
      retweets: 1785,
      replies: 328,
      shares: "3.2K",
      hasMedia: false,
      isPinned: false,
      hasThread: true,
      threadCount: 2,
      hashtags: ["#NextJS", "#Turbopack", "#WebPerformance"],
    },
    {
      id: 5,
      name: "Sarah Developer",
      username: "@sarahcodes",
      verified: false,
      time: "12h",
      content:
        "Just launched my new portfolio site built with React and Tailwind CSS! It features dark mode, animations with Framer Motion, and a blog section powered by MDX. Check it out and let me know what you think! ✨",
      icon: (
        <div className="bg-purple-600 text-white h-full w-full flex items-center justify-center font-bold">
          S
        </div>
      ),
      loves: 347,
      retweets: 42,
      replies: 93,
      shares: "121",
      hasMedia: true,
      mediaType: "graph",
      isPinned: false,
      hasThread: false,
      hashtags: ["#WebDev", "#Portfolio", "#ReactJS"],
      link: {
        url: "sarahdev.com/portfolio",
        title: "Sarah's Web Development Portfolio",
        description:
          "Frontend developer specializing in React, Next.js, and modern CSS",
      },
    },
    {
      id: 6,
      name: "JavaScript Daily",
      username: "@JavaScriptDaily",
      verified: true,
      time: "15h",
      content:
        "🔥 5 JavaScript features you might not know about:\n\n1. Optional chaining (?.) \n2. Nullish coalescing operator (??)\n3. Array.prototype.at() for negative indexing\n4. Promise.allSettled() for error handling\n5. Object.hasOwn() replacing Object.prototype.hasOwnProperty",
      icon: <FaJs className="text-yellow-400 h-6 w-6" />,
      loves: 5280,
      retweets: 3427,
      replies: 210,
      shares: "6.7K",
      hasMedia: false,
      isPinned: false,
      hasThread: false,
      hashtags: ["#JavaScript", "#WebDev", "#CodeTips"],
    },
    {
      id: 7,
      name: "DevOps Central",
      username: "@devopscentral",
      verified: true,
      time: "3h",
      content:
        "Docker + GitHub Actions = CI/CD heaven. Here's how we reduced our deployment time by 78% and eliminated manual deployments entirely. Our complete pipeline from commit to production:",
      icon: (
        <div className="bg-blue-700 text-white h-full w-full flex items-center justify-center font-bold">
          D
        </div>
      ),
      loves: 827,
      retweets: 634,
      replies: 148,
      shares: "1.2K",
      hasMedia: true,
      mediaType: "diagram",
      isPinned: false,
      hasThread: true,
      threadCount: 5,
      hashtags: ["#DevOps", "#CI/CD", "#Docker", "#GitHubActions"],
    },
    {
      id: 8,
      name: "Node.js",
      username: "@nodejs",
      verified: true,
      time: "8h",
      content:
        "Node.js 20 enters LTS status today! This release brings a 30% performance boost for HTTP workloads, improved error messaging, and better native module support. Time to upgrade your projects!",
      icon: <SiNodedotjs className="text-green-600 h-6 w-6" />,
      loves: 1754,
      retweets: 932,
      replies: 184,
      shares: "1.1K",
      hasMedia: false,
      isPinned: false,
      hasThread: false,
      hashtags: ["#NodeJS", "#JavaScript", "#Backend"],
    },
    {
      id: 9,
      name: "CSS Tricks",
      username: "@css",
      verified: true,
      time: "1d",
      content:
        "CSS Grid or Flexbox? The eternal debate continues, but here's when to use each:\n\n🔹 Grid: Two-dimensional layouts (rows AND columns)\n🔹 Flexbox: One-dimensional layouts (rows OR columns)\n\nThey work great together too!",
      icon: (
        <div className="bg-teal-500 text-white h-full w-full flex items-center justify-center font-bold">
          CSS
        </div>
      ),
      loves: 2134,
      retweets: 1756,
      replies: 296,
      shares: "2.8K",
      hasMedia: true,
      mediaType: "graph",
      isPinned: false,
      hasThread: false,
      hashtags: ["#CSS", "#WebDesign", "#FrontEnd"],
    },
    {
      id: 10,
      name: "Alex Johnson",
      username: "@alexjdev",
      verified: false,
      time: "4h",
      content:
        "After 6 months of learning to code, I just accepted my first job offer as a junior frontend developer! 🎉 Thanks to this community for all the support and resources. Special shoutout to @freeCodeCamp and @TheOdinProject!",
      icon: (
        <div className="bg-yellow-500 text-white h-full w-full flex items-center justify-center font-bold">
          A
        </div>
      ),
      loves: 8429,
      retweets: 1249,
      replies: 752,
      shares: "3.4K",
      hasMedia: false,
      isPinned: false,
      hasThread: false,
      hashtags: ["#CodeNewbie", "#CareerChange", "#WebDev"],
    },
  ],

  // Trending topics data
  trendingTopics: [
    { id: 1, category: "Technology", name: "React 19", tweets: "121.4K" },
    {
      id: 2,
      category: "Programming",
      name: "#TypeScriptLove",
      tweets: "55.2K",
    },
    { id: 3, category: "WebDev", name: "Astro 3.0", tweets: "32.7K" },
    {
      id: 4,
      category: "Technology",
      name: "#ServerComponents",
      tweets: "18.9K",
    },
    { id: 5, category: "Programming", name: "CSS Grid", tweets: "27.5K" },
  ],

  // Who to follow data
  whoToFollow: [
    {
      id: 1,
      name: "GitHub",
      username: "@github",
      icon: <SiGithub className="text-white h-5 w-5" />,
    },
    {
      id: 2,
      name: "Vercel",
      username: "@vercel",
      icon: <SiVercel className="text-white h-5 w-5" />,
    },
  ],
} as const;

export const redditData = {
  commentData: [
    {
      id: 1,
      username: "DevPortfolioGuy",
      initial: "D",
      color: "#24a0ed",
      badge: "New Dev",
      timeAgo: "12h",
      content: `Hi everyone! I just finished my portfolio site after 3 months of learning web development: https://my-dev-portfolio.com

I built it with React, Tailwind CSS, and Framer Motion for animations. I'm targeting junior developer positions.

Would love feedback on the overall design, performance, and mobile responsiveness. Does it look professional enough?`,
      portfolio: {
        tech: ["React", "Tailwind CSS", "Framer Motion"],
        features: ["Project showcase", "Skills section", "Contact form"],
        goal: "Junior developer positions",
      },
      upvotes: 12,
      downvotes: 2,
      replies: 4,
    },
    {
      id: 2,
      username: "JSenthusiast",
      initial: "J",
      color: "#ff7b00",
      badge: "Mid Level",
      timeAgo: "1d",
      content: `Just rebuilt my portfolio with Next.js and Three.js: https://jsdev-portfolio.vercel.app

I've been developing for about 2 years and I'm looking for mid-level positions. The 3D elements are pretty heavy - would love feedback on performance optimization.

Also, is the dark theme too hard to read?`,
      portfolio: {
        tech: ["Next.js", "Three.js", "GSAP", "Vercel"],
        features: ["3D animations", "Interactive UI", "Dark theme"],
        goal: "Mid-level positions",
      },
      upvotes: 27,
      downvotes: 1,
      replies: 8,
    },
    {
      id: 3,
      username: "SeniorFrontEnd",
      initial: "S",
      color: "#ff4500",
      badge: "Pro",
      timeAgo: "2d",
      content: `After 5 years as a front-end dev, I've finally updated my portfolio: https://senior-frontend-dev.com

Built with Astro, Tailwind, and minimal JS. I'm targeting potential clients for freelance work.

Looking for feedback on the project descriptions and case studies - do they effectively communicate my problem-solving skills?`,
      portfolio: {
        tech: ["Astro", "Tailwind CSS", "Minimal JS"],
        features: [
          "Case studies",
          "Project descriptions",
          "Client testimonials",
        ],
        goal: "Freelance clients",
      },
      upvotes: 35,
      downvotes: 0,
      replies: 12,
    },
  ],

  portfolioTips: [
    {
      id: 1,
      title: "Contact Information Accessibility",
      icon: <Mail size={16} />,
      tip: "Make sure your contact information is easy to find",
      details:
        "Place your contact information in a prominent location such as the header or footer. Include multiple contact methods (email, LinkedIn, GitHub). Consider adding a dedicated contact form for better engagement.",
    },
    {
      id: 2,
      title: "In-depth Case Studies",
      icon: <Layout size={16} />,
      tip: "Add detailed case studies, not just screenshots",
      details:
        "For each project, explain the problem you were solving, your approach, challenges you encountered, and how you overcame them. Include your design process, iterations, and the results or impact of your work.",
    },
    {
      id: 3,
      title: "Performance Optimization",
      icon: <Zap size={16} />,
      tip: "Optimize image sizes for faster loading",
      details:
        "Use modern image formats like WebP, compress all images, and implement lazy loading. Consider using responsive images with srcset. Aim for a Lighthouse performance score of 90+ for better user experience.",
    },
    {
      id: 4,
      title: "Mobile Responsiveness",
      icon: <Smartphone size={16} />,
      tip: "Ensure mobile responsiveness on all pages",
      details:
        "Test your portfolio on multiple devices and screen sizes. Use flexible layouts and appropriate breakpoints. Consider a mobile-first approach to design, ensuring all interactive elements work well on touch screens.",
    },
    {
      id: 5,
      title: "Process Documentation",
      icon: <Code size={16} />,
      tip: "Include your development process, not just final products",
      details:
        "Document your workflow, from planning to implementation. Show sketches, wireframes, or prototypes. Explain your decision-making process and how you handled feedback and iterations.",
    },
    {
      id: 6,
      title: "Clear Call-to-Action",
      icon: <ArrowRight size={16} />,
      tip: "Add a clear call-to-action on the homepage",
      details:
        "Guide visitors on what to do next with prominent buttons or links. Consider CTAs like 'View My Work', 'Contact Me', or 'Download Resume'. Place the most important CTA above the fold for immediate visibility.",
    },
  ],

  relatedSubreddits: [
    {
      name: "r/reactjs",
      members: "291K",
      description: "React ecosystem discussions",
    },
    {
      name: "r/frontend",
      members: "162K",
      description: "Frontend development topics",
    },
    {
      name: "r/web_design",
      members: "723K",
      description: "Web design principles and practices",
    },
    {
      name: "r/learnprogramming",
      members: "2.5M",
      description: "Resources for beginners",
    },
  ],
};

export const awaardssData = {
  portfolioProjects: [
    {
      id: 1,
      title: "Digital Craftsman",
      creator: "Sarah Johnson",
      country: "Sweden",
      designScore: 8.65,
      usabilityScore: 9.12,
      creativityScore: 9.87,
      contentScore: 8.54,
      mobileScore: 9.36,
      type: "Portfolio",
      tags: ["Minimalist", "Interactive", "React", "Three.js"],
      colors: ["#F2C94C", "#2D9CDB", "#121212"],
      awardType: "SOD", // Site of the Day
      pattern: "squares",
      accentColor: "#F2C94C",
    },
    {
      id: 2,
      title: "Creative Vision Studio",
      creator: "Michael Chen",
      country: "Canada",
      designScore: 9.22,
      usabilityScore: 8.85,
      creativityScore: 9.54,
      contentScore: 8.92,
      mobileScore: 8.76,
      type: "Agency",
      tags: ["Experimental", "WebGL", "Animation", "GSAP"],
      colors: ["#EB5757", "#6FCF97", "#232323"],
      awardType: "DEV", // Developer Award
      pattern: "circles",
      accentColor: "#EB5757",
    },
    {
      id: 3,
      title: "Portfolio 2023",
      creator: "Emma Davis",
      country: "Germany",
      designScore: 9.35,
      usabilityScore: 9.41,
      creativityScore: 8.95,
      contentScore: 9.12,
      mobileScore: 9.28,
      type: "Portfolio",
      tags: ["Typography", "Scrolling", "Parallax", "SVG"],
      colors: ["#6B66FF", "#F782C2", "#202020"],
      awardType: "HM", // Honorable Mention
      pattern: "triangles",
      accentColor: "#6B66FF",
    },
    {
      id: 4,
      title: "Interactive Resume",
      creator: "Carlos Rodriguez",
      country: "Spain",
      designScore: 9.18,
      usabilityScore: 9.33,
      creativityScore: 8.89,
      contentScore: 9.47,
      mobileScore: 8.96,
      type: "Resume",
      tags: ["Interactive", "Gamification", "Canvas", "Vue"],
      colors: ["#F8961E", "#90BE6D", "#1B1B1B"],
      awardType: "SOTM", // Site of the Month
      pattern: "mixed",
      accentColor: "#F8961E",
    },
  ],
  trendingElements: [
    { title: "Parallax scrolling effects", icon: <Layers size={16} /> },
    { title: "WebGL animations", icon: <Zap size={16} /> },
    { title: "Glassmorphism UI elements", icon: <Square size={16} /> },
    { title: "Horizontal scroll layouts", icon: <Layout size={16} /> },
    { title: "Page transitions", icon: <Monitor size={16} /> },
    { title: "Customized cursors", icon: <Compass size={16} /> },
    { title: "Interactive 3D elements", icon: <Sparkles size={16} /> },
    { title: "Scroll-triggered animations", icon: <TrendingUp size={16} /> },
  ],
} as const;

export type AwwwardsPortfoliosProject =
  (typeof awaardssData.portfolioProjects)[number];
