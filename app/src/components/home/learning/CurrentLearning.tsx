import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useRef } from "react";
import type { TechnologyLearning } from "@/types";
import { motion } from "framer-motion";
import { Star, Clock, Target, BarChart2, ArrowRight, Zap } from "lucide-react";
import Section from "@/components/section/Section";
import { currentLearningTechnologies } from "../skills/data";

const CurrentLearning: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group technologies by category for better organization
  const categorizedTech = currentLearningTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyLearning[]>);

  // Map categories to Catppuccin colors and icons
  const categoryData: Record<
    string,
    { color: string; icon: React.ReactNode; description: string }
  > = {
    Database: {
      color: "sapphire",
      icon: <Target className="w-5 h-5" />,
      description: "Storage systems and query optimization",
    },
    Backend: {
      color: "blue",
      icon: <BarChart2 className="w-5 h-5" />,
      description: "Server-side development and APIs",
    },
    Frontend: {
      color: "mauve",
      icon: <Zap className="w-5 h-5" />,
      description: "User interfaces and experience design",
    },
    DevOps: {
      color: "teal",
      icon: <Clock className="w-5 h-5" />,
      description: "Deployment and infrastructure automation",
    },
    "AI/ML": {
      color: "pink",
      icon: <Star className="w-5 h-5" />,
      description: "Machine learning and artificial intelligence",
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  // Random particle generation for background
  const generateParticles = (count: number) => {
    const particles = [];
    const colors = ["lavender", "blue", "mauve", "sapphire", "pink", "teal"];

    for (let i = 0; i < count; i++) {
      const size = 2 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 30;

      particles.push(
        <div
          key={i}
          className={`absolute bg-ctp-${color}/20 rounded-full z-0`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
          }}
        />
      );
    }
    return particles;
  };

  // Handle mouse move effect for container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    containerRef.current.style.setProperty("--mouse-x", `${x}`);
    containerRef.current.style.setProperty("--mouse-y", `${y}`);
  };

  return (
    <Section
      id="learning"
      label="Learning Journey"
      icon="magic"
      glowAccent="lavender"
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          {generateParticles(30)}

          {/* Glow effect that follows cursor */}
          <div
            className="absolute pointer-events-none w-[500px] h-[500px] opacity-20 rounded-full z-0"
            style={{
              background:
                "radial-gradient(circle, rgba(180, 190, 254, 0.4) 0%, transparent 70%)",
              left: "calc(var(--mouse-x, 0.5) * 100%)",
              top: "calc(var(--mouse-y, 0.5) * 100%)",
              transform: "translate(-50%, -50%)",
              filter: "blur(50px)",
            }}
          />

          {/* Decorative gradient circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-ctp-lavender/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-ctp-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-ctp-pink/5 rounded-full blur-3xl z-0" />
        </div>

        {/* Main content card */}
        <Card className="border border-ctp-surface0 bg-ctp-crust/95 backdrop-blur-md transition-all duration-500 overflow-hidden relative z-10">
          <CardHeader className="relative border-b border-ctp-surface0 z-10">
            <div className="space-y-4">
              {/* Main title with animated gradient */}
              <div className="flex flex-col space-y-2">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold relative">
                  <span className="bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-pink bg-clip-text text-transparent bg-size-200 animate-gradient-x inline-block">
                    Current Learning Journey
                  </span>

                  {/* Animated underline */}
                  <div className="h-1 w-40 bg-gradient-to-r from-ctp-lavender to-ctp-blue rounded-full mt-1 opacity-70" />
                </CardTitle>

                <p className="text-ctp-subtext1 max-w-2xl">
                  Exploring new technologies and deepening knowledge in various
                  domains through hands-on projects and experimentation.
                </p>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 border flex items-center gap-2
                    ${
                      activeCategory === null
                        ? "bg-ctp-surface0 border-ctp-lavender text-ctp-text"
                        : "bg-ctp-mantle border-ctp-surface0 text-ctp-subtext0 hover:bg-ctp-surface0"
                    }`}
                  onClick={() => setActiveCategory(null)}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>All Categories</span>
                </button>

                {Object.entries(categoryData).map(([category, data]) => (
                  <button
                    key={category}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 border flex items-center gap-2
                      ${
                        activeCategory === category
                          ? `bg-ctp-${data.color}/10 border-ctp-${data.color} text-ctp-${data.color}`
                          : "bg-ctp-mantle border-ctp-surface0 text-ctp-subtext0 hover:bg-ctp-surface0"
                      }`}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category ? null : category
                      )
                    }
                  >
                    {data.icon}
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 relative z-10">
            {/* Categories and their tech cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-12"
            >
              {Object.entries(categorizedTech)
                .filter(
                  ([category]) => !activeCategory || category === activeCategory
                )
                .map(([category, techs]) => (
                  <div key={category} className="space-y-6">
                    {/* Category heading with accent and description */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-ctp-${categoryData[category].color}/10 flex items-center justify-center`}
                        >
                          {categoryData[category].icon}
                        </div>

                        <h3
                          className={`text-ctp-${categoryData[category].color} text-xl font-semibold`}
                        >
                          {category}
                        </h3>

                        <div
                          className={`h-px flex-grow bg-gradient-to-r from-ctp-${categoryData[category].color}/50 to-transparent`}
                        />
                      </div>

                      <p className="text-ctp-subtext0 text-sm ml-10">
                        {categoryData[category].description}
                      </p>
                    </div>

                    {/* Grid of tech cards with staggered appearance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {techs.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          variants={cardVariants}
                          whileHover="hover"
                          onMouseEnter={() => setHoveredCard(tech.name)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className="h-full"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: index * 0.1,
                              duration: 0.4,
                            },
                          }}
                        >
                          <Card
                            className={`group relative h-full overflow-hidden 
                              border border-ctp-surface0
                              transition-all duration-300 
                              bg-gradient-to-br from-ctp-mantle to-ctp-crust
                              hover:shadow-xl hover:border-ctp-${categoryData[category].color}/60
                              hover:shadow-ctp-${categoryData[category].color}/5`}
                          >
                            {/* Tech progress indicator */}
                            <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
                              <div className="relative w-16 h-1.5 bg-ctp-surface0 rounded-full overflow-hidden">
                                <div
                                  className={`absolute top-0 left-0 h-full bg-ctp-${categoryData[category].color} rounded-full`}
                                  style={{
                                    width: `${30 + Math.random() * 60}%`,
                                  }}
                                />
                              </div>
                              <span className="text-[10px] text-ctp-subtext0">
                                In progress
                              </span>
                            </div>

                            {/* Decoration line */}
                            <div
                              className={`absolute top-0 left-0 w-1.5 h-full bg-ctp-${categoryData[category].color}/50`}
                            />

                            <CardContent className="p-6 relative">
                              {/* Tech header with icon */}
                              <div className="flex items-start gap-4 mb-4">
                                <div
                                  className={`w-14 h-14 flex items-center justify-center rounded-lg 
                                    bg-ctp-${categoryData[category].color}/10
                                    border border-ctp-${categoryData[category].color}/20
                                    group-hover:bg-ctp-${categoryData[category].color}/20 
                                    transition-all duration-300 group-hover:scale-110 shrink-0
                                    shadow-md`}
                                >
                                  <div
                                    className={`text-ctp-${categoryData[category].color} text-xl`}
                                  >
                                    {tech.icon}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <h3
                                    className={`font-semibold text-lg 
                                    group-hover:text-ctp-${categoryData[category].color}
                                    transition-colors duration-300`}
                                  >
                                    {tech.name}
                                  </h3>

                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-full 
                                        bg-ctp-${categoryData[category].color}/10 
                                        text-ctp-${categoryData[category].color}`}
                                    >
                                      {category}
                                    </span>

                                    {/* Add an estimated complexity tag */}
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ctp-surface0 text-ctp-subtext1">
                                      {
                                        [
                                          "Beginner",
                                          "Intermediate",
                                          "Advanced",
                                        ][Math.floor(Math.random() * 3)]
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Description with fancy backdrop */}
                              <div className="relative mt-2 mb-10">
                                <div className="absolute -inset-3 bg-ctp-crust rounded-lg -z-10" />
                                <div className="absolute -inset-3 border border-ctp-surface0 rounded-lg -z-10" />

                                <p className="text-sm text-ctp-text leading-relaxed">
                                  {tech.description}
                                </p>

                                {hoveredCard === tech.name && (
                                  <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-px"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div
                                      className={`h-full bg-gradient-to-r from-transparent via-ctp-${categoryData[category].color}/50 to-transparent`}
                                    />
                                  </motion.div>
                                )}
                              </div>

                              {/* Project link with animated arrow */}
                              {tech.repoLink && (
                                <div className="absolute bottom-5 right-5">
                                  <a
                                    href={tech.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center text-xs font-medium 
                                      text-ctp-${categoryData[category].color}
                                      transition-all gap-1.5 group/link
                                      px-4 py-2 rounded-full
                                      border border-ctp-${categoryData[category].color}/30
                                      hover:border-ctp-${categoryData[category].color}/70
                                      bg-ctp-${categoryData[category].color}/5
                                      hover:bg-ctp-${categoryData[category].color}/10
                                      shadow-sm hover:shadow
                                    `}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>View Project</span>
                                    <ArrowRight className="w-3 h-3 transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300" />
                                  </a>
                                </div>
                              )}

                              {/* Learning goal indicator */}
                              <div className="absolute bottom-5 left-5 flex items-center text-[10px] text-ctp-subtext0">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>
                                  Goal:{" "}
                                  {
                                    ["Q1", "Q2", "Q3", "Q4"][
                                      Math.floor(Math.random() * 4)
                                    ]
                                  }{" "}
                                  2025
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>

            {/* Empty state if no categories match filter */}
            {activeCategory &&
              Object.keys(categorizedTech).filter(
                (cat) => cat === activeCategory
              ).length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-ctp-subtext0 text-center space-y-2">
                    <p>No technologies found in this category.</p>
                    <button
                      className="px-4 py-2 rounded-full text-sm bg-ctp-surface0 text-ctp-text mt-4"
                      onClick={() => setActiveCategory(null)}
                    >
                      View all categories
                    </button>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default CurrentLearning;
