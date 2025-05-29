import React from "react";
import type { TechName } from "./components/base/technologies";

export type TechnologyLearning = {
  name: string;
  icon: React.ReactNode;
  description: string;
  repoLink?: string;
  category: "Database" | "Backend" | "Frontend" | "DevOps" | "AI/ML";
  learningGoals: string[];
};

export type Technology = {
  name: string;
  aboutLink: string;
  icon?: React.ReactNode;
};

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  alt?: string;
  aspectRatio?: string;
  title: string;
  description: string;
  featured?: boolean;
  tags?: string[];
};

export type ProjectDemoVideo = {
  videoUrl: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  highlights?: string[];
  fileSize?: string;
};
export interface Project {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  githubLink: string;
  liveLink?: string;
  tags?: string[];
  media?: {
    gallery?: MediaItem[];
  };
  techStack?: Record<string, string[]>;
  explain?: string[];

  // New demo video property
  demoVideo?: ProjectDemoVideo;
}

export type Article = {
  title: string;
  description: string;
  link: string;
};

export type WorkExperience = {
  company: string;
  position: string;
  duration: string;
  achievements: {
    title: string;
    description: string[];
    icon?: string;
  }[];
  technologies: TechName[];
  imageSrc: string;
  companyUrl: string;
  docsUrl?: string;
};
