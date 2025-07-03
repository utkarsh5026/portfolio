import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { FileItem } from "./project-structure";
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

interface FileExplorerItemProps {
  item: FileItem;
  isVisible: boolean;
  onToggle?: () => void;
  isExpanded?: boolean;
}

export const FileExplorerItem: React.FC<FileExplorerItemProps> = ({
  item,
  isVisible,
  onToggle,
  isExpanded = false,
}) => {
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

interface FileExplorerProps {
  items: FileItem[];
  visibleItems: string[];
  expandedFolders: string[];
  onToggleFolder: (path: string) => void;
  parentPath?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
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

export default FileExplorer;
