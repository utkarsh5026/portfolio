import React, { useState, useEffect } from "react";
import FloatingElement from "@/components/animations/FloatingElement";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiPython,
  SiGo,
  SiCss3,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiTerraform,
  SiJson,
} from "react-icons/si";
import { FaFileAlt } from "react-icons/fa";

type FileItem = {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  extension?: string;
  description?: string;
  color: string;
  delay: number;
  depth: number;
};

const projectStructure: FileItem[] = [
  {
    name: "frontend",
    type: "folder",
    color: "#89b4fa",
    delay: 0,
    depth: 0,
    children: [
      {
        name: "components",
        type: "folder",
        color: "#89b4fa",
        delay: 200,
        depth: 1,
        children: [
          {
            name: "App.tsx",
            type: "file",
            extension: "tsx",
            color: "#89b4fa",
            delay: 400,
            depth: 2,
            description:
              "I build dynamic user interfaces with React & TypeScript",
          },
          {
            name: "Button.tsx",
            type: "file",
            extension: "tsx",
            color: "#89b4fa",
            delay: 500,
            depth: 2,
            description: "Reusable components with TypeScript for type safety",
          },
        ],
      },
      {
        name: "styles",
        type: "folder",
        color: "#74c7ec",
        delay: 300,
        depth: 1,
        children: [
          {
            name: "globals.css",
            type: "file",
            extension: "css",
            color: "#74c7ec",
            delay: 600,
            depth: 2,
            description: "Custom CSS for pixel-perfect designs",
          },
          {
            name: "tailwind.config.js",
            type: "file",
            extension: "js",
            color: "#f9e2af",
            delay: 700,
            depth: 2,
            description: "I use Tailwind CSS for rapid UI development",
          },
        ],
      },
    ],
  },
  {
    name: "backend",
    type: "folder",
    color: "#a6e3a1",
    delay: 100,
    depth: 0,
    children: [
      {
        name: "server.js",
        type: "file",
        extension: "js",
        color: "#a6e3a1",
        delay: 800,
        depth: 1,
        description: "I build scalable REST APIs with Node.js & Express",
      },
      {
        name: "api.py",
        type: "file",
        extension: "py",
        color: "#f9e2af",
        delay: 900,
        depth: 1,
        description:
          "I create machine learning backends with Python, FastAPI and libraries like langchain",
      },
      {
        name: "main.go",
        type: "file",
        extension: "go",
        color: "#89b4fa",
        delay: 1000,
        depth: 1,
        description: "High-performance microservices built with Go",
      },
    ],
  },
  {
    name: "devops",
    type: "folder",
    color: "#cba6f7",
    delay: 150,
    depth: 0,
    children: [
      {
        name: "Dockerfile",
        type: "file",
        extension: "docker",
        color: "#74c7ec",
        delay: 1100,
        depth: 1,
        description: "I containerize applications with Docker for deployment",
      },
      {
        name: "k8s-deploy.yaml",
        type: "file",
        extension: "yaml",
        color: "#cba6f7",
        delay: 1200,
        depth: 1,
        description: "I deploy and scale applications using Kubernetes",
      },
      {
        name: ".gitignore",
        type: "file",
        extension: "git",
        color: "#f38ba8",
        delay: 1300,
        depth: 1,
        description:
          "I use Git for version control and collaborative development",
      },
    ],
  },
];

const getFileIcon = (extension?: string) => {
  const iconProps = { size: 16, className: "text-current" };

  switch (extension) {
    case "tsx":
      return <SiReact {...iconProps} className="text-[#61dafb]" />;
    case "js":
      return <SiJavascript {...iconProps} className="text-[#f7df1e]" />;
    case "py":
      return <SiPython {...iconProps} className="text-[#3776ab]" />;
    case "go":
      return <SiGo {...iconProps} className="text-[#00add8]" />;
    case "css":
      return <SiCss3 {...iconProps} className="text-[#1572b6]" />;
    case "docker":
      return <SiDocker {...iconProps} className="text-[#2496ed]" />;
    case "yaml":
      return <SiKubernetes {...iconProps} className="text-[#326ce5]" />;
    case "git":
      return <SiGit {...iconProps} className="text-[#f05032]" />;
    case "tf":
      return <SiTerraform {...iconProps} className="text-[#7b42bc]" />;
    case "json":
      return <SiJson {...iconProps} className="text-[#f9e2af]" />;
    case "txt":
      return <FaFileAlt {...iconProps} className="text-[#6c7086]" />;
    default:
      return <FaFileAlt {...iconProps} className="text-[#6c7086]" />;
  }
};

const FileExplorerItem: React.FC<{
  item: FileItem;
  isVisible: boolean;
  onToggle?: () => void;
  isExpanded?: boolean;
}> = ({ item, isVisible, onToggle, isExpanded = false }) => {
  const paddingLeft = item.depth * 20 + 8;

  return (
    <>
      {/* Main file/folder line */}
      <div
        className={`flex items-center rounded-2xl py-1 px-2 hover:bg-ctp-surface0 cursor-pointer transition-all duration-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
        style={{
          paddingLeft: `${paddingLeft}px`,
          transitionDelay: `${item.delay}ms`,
        }}
        onClick={onToggle}
      >
        {item.type === "folder" && (
          <span className="mr-2 text-ctp-text flex-shrink-0">
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        )}

        <span className="mr-3 flex-shrink-0">
          {item.type === "folder" ? (
            isExpanded ? (
              <FolderOpen size={16} className="text-ctp-blue" />
            ) : (
              <Folder size={16} className="text-ctp-blue" />
            )
          ) : (
            getFileIcon(item.extension)
          )}
        </span>

        <span
          className={`text-sm font-mono flex-shrink-0`}
          style={{ color: item.color }}
        >
          {item.name}
        </span>
      </div>
    </>
  );
};

const FileExplorer: React.FC<{
  items: FileItem[];
  visibleItems: string[];
  expandedFolders: string[];
  onToggleFolder: (path: string) => void;
  parentPath?: string;
}> = ({
  items,
  visibleItems,
  expandedFolders,
  onToggleFolder,
  parentPath = "",
}) => {
  return (
    <>
      {items.map((item) => {
        const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
        const isExpanded = expandedFolders.includes(itemPath);
        const isVisible = visibleItems.includes(itemPath);

        return (
          <div key={itemPath}>
            <FileExplorerItem
              item={item}
              isVisible={isVisible}
              isExpanded={isExpanded}
              onToggle={() =>
                item.type === "folder" && onToggleFolder(itemPath)
              }
            />
            {item.children && isExpanded && (
              <FileExplorer
                items={item.children}
                visibleItems={visibleItems}
                expandedFolders={expandedFolders}
                onToggleFolder={onToggleFolder}
                parentPath={itemPath}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const TechSkillsComponent = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const getAllItems = (
    items: FileItem[],
    parentPath = ""
  ): Array<{ path: string; delay: number }> => {
    const result: Array<{ path: string; delay: number }> = [];
    items.forEach((item) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      result.push({ path: itemPath, delay: item.delay });
      if (item.children) {
        result.push(...getAllItems(item.children, itemPath));
      }
    });
    return result;
  };

  useEffect(() => {
    const allItems = getAllItems(projectStructure);

    allItems.forEach(({ path, delay }) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, path]);
        // Auto-expand folders after they become visible
        if (
          projectStructure.some(
            (item) => item.name === path && item.type === "folder"
          )
        ) {
          setTimeout(() => {
            setExpandedFolders((prev) => [...prev, path]);
          }, 300);
        }
      }, delay);
    });
  }, []);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <div className="w-full  mx-auto">
      <FloatingElement intensity="low" delay={0}>
        <div className="bg-gradient from-ctp-crust/80 to-ctp-mantle/80 backdrop-blur-sm rounded-lg border-none  overflow-hidden shadow-2xl">
          {/* Explorer Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-ctp-crust/80 border-b border-ctp-surface0">
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-ctp-blue" />
              <span className="text-ctp-text text-sm font-mono uppercase tracking-wide">
                Explorer
              </span>
            </div>
            <span className="text-ctp-text text-xs">tech-stack</span>
          </div>

          <div className="py-2 min-h-[400px] max-h-[500px] overflow-y-auto">
            <FileExplorer
              items={projectStructure}
              visibleItems={visibleItems}
              expandedFolders={expandedFolders}
              onToggleFolder={toggleFolder}
            />
          </div>
        </div>
      </FloatingElement>
    </div>
  );
};

const TechSkills = React.memo(TechSkillsComponent);
export default TechSkills;
