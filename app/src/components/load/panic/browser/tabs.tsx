import {
  FaTwitter,
  FaGithub,
  FaReddit,
  FaMedium,
} from "react-icons/fa";
import { SiAwwwards } from "react-icons/si";
export const browserTabs = [
  {
    id: "twitter",
    title: "Twitter - Web Developer Community",
    url: "https://twitter.com/search?q=%23WebDev&src=typed_query",
    icon: <FaTwitter className="text-blue-500" />,
    content: {
      heading: "Latest Web Development Trends on Twitter",
      text: "Connect with the web development community and stay updated on the latest trends, tools, and discussions. Twitter is a great platform to discover new frameworks, best practices, and networking opportunities.",
      examples: [
        "Popular tech influencers sharing insights",
        "Discussions on new framework releases",
        "Code snippets and quick tips",
        "Web development job opportunities",
      ],
      note: "Following the right people could help me stay updated on industry trends and make valuable connections.",
    },
  },
  {
    id: "github-portfolio",
    title: "GitHub - Portfolio Templates",
    icon: <FaGithub className="text-gray-900" />,
    url: "https://github.com/topics/portfolio-template",
    content: {
      heading: "Open Source Portfolio Templates and Frameworks",
      text: "Explore the most starred and forked portfolio templates on GitHub. These repositories offer solid starting points with clean code architecture and optimized performance.",
      code: "git clone https://github.com/example/dev-portfolio\ncd dev-portfolio\nnpm install\nnpm run dev",
      examples: [
        "React-based single-page applications",
        "Next.js templates with server-side rendering",
        "Static site generators optimized for portfolios",
        "Lighthouse-optimized performance templates",
      ],
      note: "Could fork one of these to save time, but I'd need to heavily customize to stand out.",
    },
  },
  {
    id: "awwwards-portfolios",
    title: "Awwwards - Developer Portfolio Collection",
    icon: <SiAwwwards className="text-yellow-500" />,
    url: "https://www.awwwards.com/websites/portfolio/",
    content: {
      heading: "Award-Winning Developer Portfolios of 2023",
      text: "An exclusive collection of the most innovative and visually stunning developer portfolios that have received recognition on Awwwards. These sites push the boundaries of web design and technical implementation.",
      examples: [
        "WebGL and Three.js 3D experiences",
        "Custom cursor effects and animations",
        "Creative storytelling through web design",
        "Experimental UI patterns and interactions",
      ],
      note: "These are on another level! Will need to improve my animation skills to get anywhere close to these examples.",
    },
  },
  {
    id: "reddit-webdev",
    title: "r/webdev - Portfolio Feedback Thread",
    icon: <FaReddit className="text-red-500" />,
    url: "https://www.reddit.com/r/webdev/comments/portfolio_feedback_megathread",
    content: {
      heading: "Community Feedback on Developer Portfolios",
      text: "Read honest feedback from fellow developers on what works and what doesn't in portfolio design. This thread contains valuable insights on how recruiters and clients actually evaluate developer websites.",
      examples: [
        "Prioritize fast loading times over fancy effects",
        "Include detailed case studies, not just screenshots",
        "Make sure your contact form actually works",
        "Keep your GitHub linked and active",
      ],
      note: "Really useful reality check - I should focus on content quality and performance first, then add visual polish.",
    },
  },
  {
    id: "medium-portfolio",
    title: "Medium - Portfolio Building Guide",
    icon: <FaMedium className="text-gray-900" />,
    url: "https://medium.com/better-programming/building-dev-portfolio",
    content: {
      heading:
        "The Complete Guide to Building a Developer Portfolio That Gets You Hired",
      text: "A comprehensive, step-by-step approach to creating a portfolio that effectively showcases your skills and attracts potential employers or clients. This guide covers everything from planning to deployment and promotion.",
      code: "// Example project structure\n/src\n  /components\n    /Header\n    /ProjectCard\n    /Skills\n  /pages\n    /Home\n    /Projects\n    /About\n    /Contact\n  /assets\n  /hooks\n  /utils",
      note: "This structure makes sense - I should organize my codebase like this before it gets too messy.",
    },
  },
] as const;
