import { useMemo } from "react";
import {
  sections,
  type SectionType,
  useEditorContext,
} from "@/components/home/editor/context/explorerContext";
import { useProject } from "@/hooks/use-project";
import { articles } from "@/components/home/articles/articlesdump";
import { experiences } from "@/components/home/work/experienceDump";
import { technologies } from "@/components/base/technologies";
import {
  databases,
  frameworks,
  languages,
  tools,
} from "@/components/home/skills/data";

export type Command = {
  /** The name of the command */
  name: string;

  /** A brief description of what the command does */
  description: string;

  /** The usage syntax for the command */
  usage: string;

  /** A function that returns an array of argument options for the command */
  args: (existingArgs?: string[]) => string[];

  /** A function that executes the command with the provided arguments and returns a string result */
  execute: (args: string[]) => string;
};

/**
 * Custom hook that provides Linux-like terminal commands for navigation and information display.
 *
 * This hook offers familiar commands such as:
 * - cd: Navigate between different sections of the portfolio
 * - ls: List available sections or content within sections
 * - cat: Display details about specific projects, articles, or skills
 * - clear: Clear the terminal screen
 * - whoami: Display basic information about the portfolio owner
 * - pwd: Show the current active section
 *
 * @returns {Record<string, Command>} A collection of command objects that can be executed in the terminal
 */
export const useLinuxCommands = () => {
  const { setActiveSection, activeSection } = useEditorContext();
  const { projects } = useProject();
  return useMemo(() => {
    const cd = {
      name: "cd",
      description: "Change to a different section",
      usage: "cd [section]",
      args: () => sections.map((section) => section.toLowerCase()),
      execute: (args: string[]) => {
        const section = args[0];
        if (!section) return "Please specify a section";

        if (sections.includes(section as SectionType)) {
          setActiveSection(section as SectionType);
          return `Navigated to ${section}`;
        }
        return `Section '${section}' not found`;
      },
    };

    const ls = {
      name: "ls",
      description: "List available sections or content",
      usage: "ls [section]",
      args: () => ["projects", "skills", "articles", "experience"],
      execute: (args: string[]) => {
        if (!args.length) return _arrayJoin([...sections], "  ");

        const section = args[0];
        switch (section) {
          case "projects":
            return projects.map((p) => p.name).join("\n");
          case "skills":
            return Object.keys(technologies).join("  ");
          case "articles":
            return articles.map((a) => a.title).join("\n");
          case "experience":
            return experiences.map((e) => e.company).join("\n");
          default:
            return `Unknown section: ${section}`;
        }
      },
    };

    const clear = {
      name: "clear",
      description: "Clear the terminal",
      usage: "clear",
      args: () => [],
      execute: () => {
        return "CLEAR_TERMINAL";
      },
    };

    const cat = {
      name: "cat",
      description: "Display details of a specific item",
      usage: "cat [type] [name]",
      args: (existingArgs?: string[]) => {
        if (!existingArgs || existingArgs.length === 0) {
          return ["project", "article", "skill"];
        }

        const type = existingArgs[0];
        switch (type) {
          case "project": {
            return projects.map((p) => p.name);
          }
          case "article": {
            return articles.map((a) => a.title);
          }
          case "skill": {
            return Object.keys(technologies);
          }
          default: {
            return [];
          }
        }
      },
      execute: (args: string[]) => {
        const [type, ...nameParts] = args;
        const name = nameParts.join(" ");

        switch (type) {
          case "project": {
            const project = projects.find(
              (p) => p.name.toLowerCase() === name.toLowerCase()
            );
            if (project) {
              return `
Name: ${project.name}
Description: ${project.description}
Tech: ${project.technologies.map((t) => technologies[t].name).join(", ")}
GitHub: ${project.githubLink}
${project.liveLink ? `Live: ${project.liveLink}` : ""}
              `;
            }
            return `Project '${name}' not found`;
          }

          case "article": {
            const article = articles.find((a) =>
              a.title.toLowerCase().includes(name.toLowerCase())
            );
            if (article) {
              return `
Title: ${article.title}
Description: ${article.description}
Link: ${article.link}
              `;
            }
            return `Article '${name}' not found`;
          }

          default:
            return `Unknown type: ${type}`;
        }
      },
    };

    const whoami = {
      name: "whoami",
      description: "Display information about me",
      usage: "whoami",
      args: () => [],
      execute: () => {
        return `
Utkarsh Priyadarshi
=================
Full-Stack Developer & DevOps Engineer

I build web applications with modern technologies and focus on creating elegant, 
performant solutions. My skill set includes JavaScript/TypeScript, React, Node.js, 
Python, and cloud technologies.

Type 'about' for more information or 'contact' to get in touch.
        `;
      },
    };

    const pwd = {
      name: "pwd",
      description: "Print current section",
      usage: "pwd",
      args: () => [],
      execute: () => `Current section: ${activeSection}`,
    };

    const commands: Record<string, Command> = {
      cd,
      ls,
      cat,
      clear,
      whoami,
      pwd,
    } as const;

    return commands;
  }, [setActiveSection, activeSection]);
};

/**
 * Custom hook that provides content-related commands for exploring portfolio sections.
 *
 * This hook offers commands to explore different aspects of the portfolio:
 * - skills: Browse technical skills by category (languages, frameworks, databases, tools)
 * - projects: View projects and their details
 * - articles: Read articles written by the portfolio owner
 * - contact: Get contact information
 * - about: Learn more about the portfolio owner's background and experience
 *
 * @returns {Record<string, Command>} A collection of command objects for exploring portfolio content
 */
export const useSectionCommands = () => {
  const { projects } = useProject();
  return useMemo(() => {
    const skillsCMD = {
      name: "skills",
      description: "List my technical skills",
      usage: "skills [category]",
      args: () => ["languages", "frameworks", "databases", "tools"],
      execute: (args: string[]) => {
        const category = args[0]?.toLowerCase();

        if (category) {
          switch (category) {
            case "languages":
              return _arrayJoin([...languages]);
            case "frameworks":
              return Object.entries(frameworks)
                .map(([lang, fws]) => `${lang}: ${_arrayJoin([...fws])}`)
                .join("\n");
            case "databases":
              return _arrayJoin([...databases]);
            case "tools":
              return _arrayJoin([...tools]);
            default:
              return `Unknown category: ${category}`;
          }
        }

        return `
Skills Categories:
-----------------
languages   - Programming languages
frameworks  - Frameworks and libraries
databases   - Database systems
tools       - Development tools

Use "skills [category]" to see specific skills.
        `;
      },
    };

    const projectsCMD = {
      name: "projects",
      description: "Show my projects",
      usage: "projects [name]",
      args: () => projects.map((p) => p.name),
      execute: (args: string[]) => {
        const name = args.join(" ");

        if (name) {
          const project = projects.find(
            (p) => p.name.toLowerCase() === name.toLowerCase()
          );

          if (project) {
            return `
Project: ${project.name}
----------------------------
${project.description}

Technologies: ${project.technologies
              .map((t) => technologies[t].name)
              .join(", ")}

Features:
${project.features.map((f) => `- ${f}`).join("\n")}

Links:
- GitHub: ${project.githubLink}
${project.liveLink ? `- Live Demo: ${project.liveLink}` : ""}
            `;
          }
          return `Project '${name}' not found. Use 'projects' to see all projects.`;
        }

        return `
Projects:
--------
${projects.map((p) => p.name).join("\n")}

Use "projects [name]" to see details of a specific project.
        `;
      },
    };

    const articlesCMD = {
      name: "articles",
      description: "View my articles",
      usage: "articles [number]",
      args: () => articles.map((_, i) => (i + 1).toString()),
      execute: (args: string[]) => {
        const index = parseInt(args[0]);

        if (!isNaN(index) && index > 0 && index <= articles.length) {
          const article = articles[index - 1];
          return `
Article: ${article.title}
------------------------
${article.description}

Link: ${article.link}
          `;
        }

        return `
Articles:
--------
${articles.map((a, i) => `${i + 1}. ${a.title}`).join("\n")}

Use "articles [number]" to see details of a specific article.
        `;
      },
    };

    const contactCMD = {
      name: "contact",
      description: "View my contact information",
      usage: "contact",
      args: () => [],
      execute: () => {
        return `
Contact Information:
------------------
Email: utkarshpriyadarshi5026@gmail.com
GitHub: https://github.com/utkarsh5026
LinkedIn: https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/
Twitter: https://x.com/UtkarshPriyad10
        `;
      },
    };

    const aboutCMD = {
      name: "about",
      description: "Show information about me",
      usage: "about",
      args: () => [],
      execute: () => {
        return `
About Utkarsh:
------------
I'm a passionate developer with a focus on full-stack web development and DevOps. 
I love creating elegant solutions to complex problems and have experience with 
a wide range of technologies.

My journey began with simple HTML pages during college, and over time I've been 
fortunate to learn and work with various web technologies and cloud platforms.

Education:
- B.Tech in Computer Science and Engineering, Dr. Vishwanath Karad MIT World Peace University (2020-2024)
- Graduated with 9.52 CGPA
- Specialized in Web Technologies and Cloud Computing

Type 'projects' to see what I've built, or 'skills' to see my technical expertise.
        `;
      },
    };

    const commands: Record<string, Command> = {
      skills: skillsCMD,
      projects: projectsCMD,
      articles: articlesCMD,
      contact: contactCMD,
      about: aboutCMD,
    };

    return commands;
  }, []);
};

/**
 * Custom hook that provides utility commands for searching and external navigation.
 *
 * This hook offers helpful utility commands:
 * - find: Search across all portfolio content (projects, articles, skills)
 * - open: Open external links in a new browser tab (GitHub, LinkedIn, Twitter, projects, articles)
 *
 * These commands help users discover content and access external resources related to the portfolio.
 *
 * @returns {Record<string, Command>} A collection of utility command objects
 */
export const useUtilityCommands = () => {
  const { projects } = useProject();
  return useMemo(() => {
    const findCMD = {
      name: "find",
      description: "Search across all content",
      usage: "find [query]",
      args: () => [],
      execute: (args: string[]) => {
        const query = args.join(" ").toLowerCase();
        if (!query) return "Please provide a search term";

        const results = [];

        // Search projects
        const matchedProjects = projects.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.technologies.some((t) =>
              technologies[t].name.toLowerCase().includes(query)
            )
        );

        if (matchedProjects.length) {
          results.push(`Projects (${matchedProjects.length}):`);
          matchedProjects.forEach((p) => results.push(`  - ${p.name}`));
        }

        // Search articles
        const matchedArticles = articles.filter(
          (a) =>
            a.title.toLowerCase().includes(query) ||
            a.description.toLowerCase().includes(query)
        );

        if (matchedArticles.length) {
          results.push(`Articles (${matchedArticles.length}):`);
          matchedArticles.forEach((a) => results.push(`  - ${a.title}`));
        }

        // Search skills
        const matchedSkills = Object.keys(technologies).filter((t) =>
          t.toLowerCase().includes(query)
        );

        if (matchedSkills.length) {
          results.push(`Skills (${matchedSkills.length}):`);
          results.push(`  - ${matchedSkills.join(", ")}`);
        }

        return results.length ? results.join("\n") : "No results found";
      },
    };

    const openCMD = {
      name: "open",
      description: "Open a link in a new tab",
      usage: "open [type] [name]",
      args: (existingArgs?: string[]) => {
        if (!existingArgs || existingArgs.length === 0) {
          return ["github", "linkedin", "twitter", "project", "article"];
        }

        const type = existingArgs[0];
        if (type === "project") return projects.map((p) => p.name);
        else if (type === "article") return articles.map((a) => a.title);
        return [];
      },
      execute: (args: string[]) => {
        const [type, ...nameParts] = args;
        const name = nameParts.join(" ");

        switch (type) {
          case "github":
            window.open("https://github.com/utkarsh5026", "_blank");
            return "Opening GitHub profile...";

          case "linkedin":
            window.open(
              "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
              "_blank"
            );
            return "Opening LinkedIn profile...";

          case "twitter":
            window.open("https://x.com/UtkarshPriyad10", "_blank");
            return "Opening Twitter profile...";

          case "project": {
            const project = projects.find(
              (p) => p.name.toLowerCase() === name.toLowerCase()
            );
            if (project) {
              window.open(project.githubLink, "_blank");
              return `Opening project: ${project.name}`;
            }
            return `Project '${name}' not found`;
          }

          case "article": {
            const article = articles.find((a) =>
              a.title.toLowerCase().includes(name.toLowerCase())
            );
            if (article) {
              window.open(article.link, "_blank");
              return `Opening article: ${article.title}`;
            }
            return `Article '${name}' not found`;
          }
          default:
            return `Unknown type: ${type}`;
        }
      },
    };

    const commands: Record<string, Command> = {
      find: findCMD,
      open: openCMD,
    } as const;

    return commands;
  }, []);
};

/**
 * Helper function to join array elements with a delimiter.
 *
 * @param {string[]} arr - The array of strings to join
 * @param {string} delimiter - The delimiter to use between elements (default: ", ")
 * @returns {string} The joined string
 */
const _arrayJoin = (arr: string[], delimiter: string = ", ") => {
  return arr.join(delimiter);
};
