import { FaChrome, FaTerminal } from "react-icons/fa";
import {
  SiGithub,
  SiSlack,
  SiSpotify,
  SiNotion,
  SiOpenai,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { User, Folder, FileText, ListTodo } from "lucide-react";

export const dockApps = [
  { icon: <FaChrome size={28} />, name: "Chrome" },
  { icon: <SiOpenai size={28} />, name: "OpenAI" },
  { icon: <BiLogoVisualStudio size={28} />, name: "VS Code" },
  { icon: <FaTerminal size={28} />, name: "Terminal" },
  { icon: <SiGithub size={28} />, name: "GitHub" },
  { icon: <SiSlack size={28} />, name: "Slack" },
  { icon: <SiSpotify size={28} />, name: "Spotify" },
  { icon: <SiNotion size={28} />, name: "Notion" },
];

// Desktop icons
export const desktopIcons = [
  {
    icon: (
      <div className="w-11 h-11 bg-blue-500 rounded-lg flex items-center justify-center">
        <User size={24} color="white" />
      </div>
    ),
    label: "Profile",
  },
  {
    icon: (
      <div className="w-11 h-11 bg-yellow-500 rounded-lg flex items-center justify-center">
        <Folder size={24} color="white" />
      </div>
    ),
    label: "Projects",
  },
  {
    icon: (
      <div className="w-11 h-11 bg-green-500 rounded-lg flex items-center justify-center">
        <FileText size={24} color="white" />
      </div>
    ),
    label: "Notes",
  },
  {
    icon: (
      <div className="w-11 h-11 bg-red-500 rounded-lg flex items-center justify-center">
        <ListTodo size={24} color="white" />
      </div>
    ),
    label: "Checklist",
  },
];
