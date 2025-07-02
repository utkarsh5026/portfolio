import type { WorkExperience } from "@/types";

export const experiences: WorkExperience[] = [
  {
    company: "IDeaS - Revenue Management Software & Solutions",
    position: "DevOps Intern",
    duration: "Jan 2024 - June 2024",
    imageSrc: "./ideas.jpeg",
    achievements: [
      {
        title: "Database Migration Pipeline",
        description: [
          "Designed and implemented an automated pipeline for Windows to Linux VM database migration using Golang",
          "Helped in reducing manual errors",
          "Saved time (from 2-3 hrs to 10 mins)",
        ],
        icon: "FaDatabase",
      },
      {
        title: "Production Database Monitoring",
        description: [
          "Established a monitoring system for production database restoration from Commvault using Golang",
          "Reduced the manual effort of checking the database status manually",
          "Automated the process of restoring the database from Commvault",
        ],
        icon: "FaSearchDatabase",
      },
      {
        title: "VM Management Solution",
        description: [
          "Created a VM management solution featuring real-time container monitoring via WebSocket",
          "Implemented Docker resource visualization (images, containers, volumes, networks)",
          "Added interactive file explorer for container filesystem inspection",
          "Developed web-based terminal for direct container interaction using React and FastAPI",
        ],
        icon: "FaDocker",
      },
    ],
    technologies: [
      "linux",
      "golang",
      "powershell",
      "react",
      "fastapi",
      "docker",
      "sqlite",
      "python",
    ],
    companyUrl: "https://www.ideas.com/",
    docsUrl:
      "https://docs.google.com/document/d/1i49PfchVxw91BQUkKSIgXbXLSQ-K-Jk8Snv5-kyN27g/edit?usp=sharing",
  },
];
