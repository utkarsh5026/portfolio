import React, { useState } from "react";
import {
  Camera,
  Globe,
  Award,
  Layers,
  Zap,
  Star,
  Code,
  Sparkles,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  BarChart2,
  TrendingUp,
  Layout,
  Monitor,
  Compass,
  Square,
  Triangle,
  Circle,
} from "lucide-react";

export const AwwwardsPortfolios = () => {
  // State for active tabs and hover effects
  const [activeFilter, setActiveFilter] = useState("nominees");
  const [activeSorting, setActiveSorting] = useState("latest");
  const [hoveredProject, setHoveredProject] = useState(null);

  // Portfolio projects data
  const portfolioProjects = [
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
  ];

  // Design elements trending in portfolios
  const trendingElements = [
    { title: "Parallax scrolling effects", icon: <Layers size={16} /> },
    { title: "WebGL animations", icon: <Zap size={16} /> },
    { title: "Glassmorphism UI elements", icon: <Square size={16} /> },
    { title: "Horizontal scroll layouts", icon: <Layout size={16} /> },
    { title: "Page transitions", icon: <Monitor size={16} /> },
    { title: "Customized cursors", icon: <Compass size={16} /> },
    { title: "Interactive 3D elements", icon: <Sparkles size={16} /> },
    { title: "Scroll-triggered animations", icon: <TrendingUp size={16} /> },
  ];

  // Helper function to render abstract pattern based on project type
  const renderAbstractPattern = (project) => {
    const { pattern, accentColor } = project;

    if (pattern === "squares") {
      return (
        <div className="relative w-full h-64 bg-[#151515] overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Square
                size={120}
                stroke={accentColor}
                strokeWidth={1.5}
                className="opacity-20"
              />
              <Square
                size={80}
                stroke={accentColor}
                strokeWidth={1.5}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 rotate-45"
              />
              <Square
                size={40}
                stroke={accentColor}
                strokeWidth={1.5}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-80 text-xs text-white px-2 py-1 rounded">
            <div className="flex items-center">
              <Code size={12} className="mr-1" />
              {project.type}
            </div>
          </div>
        </div>
      );
    } else if (pattern === "circles") {
      return (
        <div className="relative w-full h-64 bg-[#151515] overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Circle
                size={100}
                stroke={accentColor}
                strokeWidth={1.5}
                className="opacity-20"
              />
              <Circle
                size={70}
                stroke={accentColor}
                strokeWidth={1.5}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
              />
              <Circle
                size={40}
                stroke={accentColor}
                strokeWidth={1.5}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"
              />
            </div>
          </div>
          <div className="absolute -top-10 -right-10 opacity-20">
            <Circle size={100} fill={accentColor} className="opacity-20" />
          </div>
          <div className="absolute -bottom-20 -left-10 opacity-10">
            <Circle size={120} fill={accentColor} className="opacity-20" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-80 text-xs text-white px-2 py-1 rounded">
            <div className="flex items-center">
              <Code size={12} className="mr-1" />
              {project.type}
            </div>
          </div>
        </div>
      );
    } else if (pattern === "triangles") {
      return (
        <div className="relative w-full h-64 bg-[#151515] overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Triangle
              size={100}
              stroke={accentColor}
              strokeWidth={1.5}
              className="opacity-30"
            />
            <Triangle
              size={60}
              stroke={accentColor}
              strokeWidth={1.5}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 rotate-180"
            />
            <Triangle
              size={30}
              stroke={accentColor}
              strokeWidth={1.5}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
          </div>
          <div className="absolute top-10 left-10 opacity-20 rotate-45">
            <Triangle size={40} fill={accentColor} className="opacity-20" />
          </div>
          <div className="absolute bottom-15 right-10 opacity-10 -rotate-45">
            <Triangle size={50} fill={accentColor} className="opacity-20" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-80 text-xs text-white px-2 py-1 rounded">
            <div className="flex items-center">
              <Code size={12} className="mr-1" />
              {project.type}
            </div>
          </div>
        </div>
      );
    } else {
      // Mixed pattern
      return (
        <div className="relative w-full h-64 bg-[#151515] overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <Circle
              size={60}
              stroke={accentColor}
              strokeWidth={1.5}
              className="opacity-30"
            />
          </div>
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
            <Square
              size={50}
              stroke={accentColor}
              strokeWidth={1.5}
              className="opacity-30 rotate-45"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Triangle
              size={70}
              stroke={accentColor}
              strokeWidth={1.5}
              className="opacity-40"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-80 text-xs text-white px-2 py-1 rounded">
            <div className="flex items-center">
              <Code size={12} className="mr-1" />
              {project.type}
            </div>
          </div>
        </div>
      );
    }
  };

  // Award badge component
  const AwardBadge = ({ type }) => {
    const getAwardDetails = () => {
      switch (type) {
        case "SOD":
          return {
            text: "SOD",
            color: "bg-yellow-400",
            title: "Site of the Day",
          };
        case "SOTM":
          return {
            text: "SOTM",
            color: "bg-yellow-500",
            title: "Site of the Month",
          };
        case "DEV":
          return {
            text: "DEV",
            color: "bg-blue-500",
            title: "Developer Award",
          };
        case "HM":
          return {
            text: "HM",
            color: "bg-purple-500",
            title: "Honorable Mention",
          };
        default:
          return {
            text: "SOD",
            color: "bg-yellow-400",
            title: "Site of the Day",
          };
      }
    };

    const { text, color, title } = getAwardDetails();

    return (
      <div
        className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-[10px] text-black font-bold`}
        title={title}
      >
        {text}
      </div>
    );
  };

  // Score component
  const ScoreCategory = ({ label, score }) => (
    <div className="flex flex-col items-center mr-4">
      <span className="text-xs text-gray-300">{label}</span>
      <span className="text-yellow-400 font-bold">{score.toFixed(2)}</span>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 font-sans">
      {/* Header section */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="mr-3 text-white bg-black p-1 text-xs font-bold tracking-widest border-2 border-white flex items-center">
              <Award size={12} className="mr-1" />
              AWWWARDS
            </div>
            <h1 className="text-3xl font-bold text-white">
              Developer Portfolio Collection
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-[#1a1a1a] hover:bg-[#252525] transition-colors text-gray-300 px-3 py-1.5 rounded text-sm flex items-center">
              <Users size={14} className="mr-1.5" />
              Submit Site
            </button>
            <button className="bg-[#1a1a1a] hover:bg-[#252525] transition-colors text-gray-300 px-3 py-1.5 rounded text-sm flex items-center">
              <Globe size={14} className="mr-1.5" />
              Discover
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-3 sm:mb-0">
            <span className="px-3 py-1 rounded-full bg-[#2d2e32] text-yellow-400 mr-4 text-xs flex items-center">
              <Star size={12} className="mr-1" />
              SITE OF THE DAY
            </span>
            <span className="text-gray-400 text-sm">Excellence in design</span>
            <span className="mx-2 text-gray-600">•</span>
            <span className="text-gray-400 text-sm">Jury selected</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <div className="flex items-center mr-3">
              <Eye size={14} className="mr-1 text-gray-500" />
              <span>12.5k</span>
            </div>
            <div className="flex items-center">
              <Heart size={14} className="mr-1 text-gray-500" />
              <span>854</span>
            </div>
          </div>
        </div>

        <div className="h-1 w-full bg-[#2d2e32] rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
        </div>
      </header>

      {/* Filters section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex mb-4 sm:mb-0">
          <button
            className={`px-4 py-2 ${
              activeFilter === "nominees"
                ? "bg-[#1a1a1a] border-b-2 border-yellow-400 text-white"
                : "text-gray-400 hover:text-white transition-colors"
            } mr-4`}
            onClick={() => setActiveFilter("nominees")}
          >
            Nominees
          </button>
          <button
            className={`px-4 py-2 ${
              activeFilter === "winners"
                ? "bg-[#1a1a1a] border-b-2 border-yellow-400 text-white"
                : "text-gray-400 hover:text-white transition-colors"
            } mr-4`}
            onClick={() => setActiveFilter("winners")}
          >
            Winners
          </button>
          <button
            className={`px-4 py-2 ${
              activeFilter === "honorable"
                ? "bg-[#1a1a1a] border-b-2 border-yellow-400 text-white"
                : "text-gray-400 hover:text-white transition-colors"
            }`}
            onClick={() => setActiveFilter("honorable")}
          >
            Honorable
          </button>
        </div>

        <div className="flex text-sm">
          <button
            className={`px-3 py-1.5 rounded-l-md ${
              activeSorting === "latest"
                ? "bg-[#1a1a1a] text-white"
                : "bg-[#151515] text-gray-400 hover:text-white transition-colors"
            }`}
            onClick={() => setActiveSorting("latest")}
          >
            Latest
          </button>
          <button
            className={`px-3 py-1.5 rounded-r-md border-l border-[#333] ${
              activeSorting === "popular"
                ? "bg-[#1a1a1a] text-white"
                : "bg-[#151515] text-gray-400 hover:text-white transition-colors"
            }`}
            onClick={() => setActiveSorting("popular")}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {portfolioProjects.map((project) => (
          <div
            key={project.id}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Abstract pattern instead of image */}
            <div className="relative overflow-hidden rounded-lg mb-3 group">
              {renderAbstractPattern(project)}

              <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-end p-4 transition-opacity duration-300 ${
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex w-full">
                  <div className="flex">
                    <ScoreCategory label="DESIGN" score={project.designScore} />
                    <ScoreCategory
                      label="USABILITY"
                      score={project.usabilityScore}
                    />
                    <ScoreCategory
                      label="CREATIVITY"
                      score={project.creativityScore}
                    />
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <button className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors">
                      <Heart size={14} className="text-white" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors">
                      <ExternalLink size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project info */}
            <div className="flex flex-col">
              <h3 className="text-white font-medium mb-2 group-hover:text-yellow-400 transition-colors flex items-center">
                {project.title}
                <div className="w-2 h-2 rounded-full bg-green-500 ml-2 mr-1"></div>
                <span className="text-xs text-gray-400">Online</span>
              </h3>

              <div className="flex items-center text-sm">
                <span className="text-gray-400">by</span>
                <span className="ml-1 text-blue-400 hover:underline">
                  {project.creator}
                </span>
                <span className="mx-1 text-gray-400">from</span>
                <span className="text-gray-300">{project.country}</span>
                <div className="flex ml-auto">
                  <AwardBadge type={project.awardType} />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-400 hover:text-yellow-400 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom section with two columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Trending design elements column */}
        <div className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4 flex items-center">
            <TrendingUp size={16} className="mr-2 text-yellow-400" />
            Design Elements Trending in Portfolios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendingElements.map((element, index) => (
              <div
                key={index}
                className="flex items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#252525] group-hover:bg-yellow-400 transition-colors flex items-center justify-center mr-3">
                  <div className="text-gray-400 group-hover:text-black transition-colors">
                    {element.icon}
                  </div>
                </div>
                <span className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors">
                  {element.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Jury members column */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4 flex items-center">
            <Users size={16} className="mr-2 text-yellow-400" />
            Jury Members
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                    item === 1
                      ? "from-blue-500 to-purple-500"
                      : item === 2
                      ? "from-yellow-400 to-red-500"
                      : "from-green-400 to-blue-500"
                  } flex items-center justify-center text-white font-medium`}
                >
                  {item === 1 ? "JD" : item === 2 ? "AM" : "RK"}
                </div>
                <div className="ml-3">
                  <div className="text-white text-sm">
                    {item === 1
                      ? "John Doe"
                      : item === 2
                      ? "Alicia Martinez"
                      : "Robert Kim"}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {item === 1
                      ? "Creative Director"
                      : item === 2
                      ? "UX Specialist"
                      : "Frontend Expert"}
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="text-xs text-gray-400">
                    {item === 1 ? "124" : item === 2 ? "98" : "76"} reviews
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-[#252525] hover:bg-[#333] transition-colors text-sm text-white py-2 rounded-md flex items-center justify-center">
            <Users size={14} className="mr-2" />
            View All Jury Members
          </button>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="mt-10 p-6 bg-gradient-to-r from-[#252525] to-[#1a1a1a] rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white font-medium mb-1 flex items-center">
              <Award size={16} className="mr-2 text-yellow-400" />
              Get notified about award-winning portfolios
            </h3>
            <p className="text-gray-400 text-sm">
              Weekly inspiration and portfolio design trends
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-[#151515] border border-[#333] rounded-l-md px-4 py-2 text-sm text-white w-full md:w-64 focus:outline-none focus:border-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-4 py-2 rounded-r-md text-black text-sm font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
