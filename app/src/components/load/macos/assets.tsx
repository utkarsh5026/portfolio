import { FaChrome, FaTerminal } from "react-icons/fa";
import {
  SiGithub,
  SiSlack,
  SiSpotify,
  SiNotion,
  SiOpenai,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

export const dockApps = [
  { icon: <FaChrome size={28} />, name: "Chrome" },
  { icon: <BiLogoVisualStudio size={28} />, name: "VS Code" },
  { icon: <SiOpenai size={28} />, name: "OpenAI" },
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
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
          fill="#4285F4"
        />
        <path
          d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
          fill="white"
        />
        <path
          d="M12 12C9.33 12 4 13.34 4 16V18H20V16C20 13.34 14.67 12 12 12Z"
          fill="white"
        />
      </svg>
    ),
    label: "Profile",
  },
  {
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6Z"
          fill="#FFC107"
        />
      </svg>
    ),
    label: "Projects",
  },
  {
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
          fill="#4CAF50"
        />
        <path
          d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
          fill="#4CAF50"
        />
      </svg>
    ),
    label: "Notes",
  },
  {
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2H18C19.1 2 20 2.9 20 4V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z"
          fill="#FF5722"
        />
        <path
          d="M13 17H17V19H13V17ZM13 13H17V15H13V13ZM13 9H17V11H13V9ZM13 5H17V7H13V5ZM7 17H11V19H7V17ZM7 13H11V15H7V13ZM7 9H11V11H7V9ZM7 5H11V7H7V5Z"
          fill="white"
        />
      </svg>
    ),
    label: "Checklist",
  },
];
