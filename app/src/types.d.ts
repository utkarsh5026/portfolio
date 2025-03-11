import React from "react";

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

export type Project = {
  name: string;
  description: string;
  githubLink: string;
  liveLink?: string;
  technologies: Technology[];
  features: string[];
  thumbnail?: string;
  highlights?: string[];
  tags?: string[];
};

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
  technologies: string[];
  imageSrc: string;
  companyUrl: string;
  docsUrl?: string;
};
