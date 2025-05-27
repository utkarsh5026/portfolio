import { ProjectTheme } from "./ThemeContext";

const RANDOM_COLORS: ProjectTheme[] = [
  {
    main: "blue",
    secondary: "sapphire",
    accentColor: "sky",
    fromColor: "ctp-blue/20",
    toColor: "ctp-sky/20",
  },
  {
    main: "green",
    secondary: "teal",
    accentColor: "emerald",
    fromColor: "ctp-green/20",
    toColor: "ctp-emerald/20",
  },
  {
    main: "mauve",
    secondary: "lavender",
    accentColor: "pink",
    fromColor: "ctp-mauve/20",
    toColor: "ctp-pink/20",
  },
  {
    main: "peach",
    secondary: "yellow",
    accentColor: "maroon",
    fromColor: "ctp-peach/20",
    toColor: "ctp-maroon/20",
  },
  {
    main: "pink",
    secondary: "rosewater",
    accentColor: "flamingo",
    fromColor: "ctp-pink/20",
    toColor: "ctp-flamingo/20",
  },
  {
    main: "red",
    secondary: "maroon",
    accentColor: "peach",
    fromColor: "ctp-red/20",
    toColor: "ctp-peach/20",
  },
  {
    main: "yellow",
    secondary: "peach",
    accentColor: "maroon",
    fromColor: "ctp-yellow/20",
    toColor: "ctp-maroon/20",
  },
  {
    main: "teal",
    secondary: "green",
    accentColor: "sapphire",
    fromColor: "ctp-teal/20",
    toColor: "ctp-sapphire/20",
  },
  {
    main: "lavender",
    secondary: "blue",
    accentColor: "mauve",
    fromColor: "ctp-lavender/20",
    toColor: "ctp-mauve/20",
  },
  {
    main: "sky",
    secondary: "sapphire",
    accentColor: "blue",
    fromColor: "ctp-sky/20",
    toColor: "ctp-blue/20",
  },
];

// Simple function to get colors by index (cycles through the 10 colors)
const getRandomColors = (index: number): ProjectTheme => {
  return RANDOM_COLORS[index % RANDOM_COLORS.length];
};

export default getRandomColors;
