export type Priority = "low" | "medium" | "high" | "critical";

export type Position = "left" | "right" | "center";

export type Thought = {
  delay: number;
  text: string;
  priority: Priority;
  position: Position;
};

export const thoughtSequence: Thought[] = [
  {
    delay: 1800,
    text: "OH NO! WRONG PORTFOLIO! 😫",
    priority: "critical",
    position: "right",
  },
  {
    delay: 2800,
    text: "WHERE IS THE CSS?! 🤯",
    priority: "critical",
    position: "left",
  },
  {
    delay: 3500,
    text: "THEY CAN SEE THIS RIGHT NOW! 👁️👁️👁️",
    priority: "critical",
    position: "right",
  },
  {
    delay: 4200,
    text: "My career is OVER! 💀",
    priority: "high",
    position: "left",
  },
  {
    delay: 5000,
    text: "Google Analytics shows 5 VISITORS! 📊😰",
    priority: "critical",
    position: "right",
  },
  {
    delay: 5800,
    text: "They're seeing unstyled HTML! 🤮",
    priority: "high",
    position: "left",
  },
  {
    delay: 6500,
    text: "Is this what death feels like? 💔",
    priority: "medium",
    position: "right",
  },
  {
    delay: 7200,
    text: "I should have checked before deploying! 🤦‍♂️",
    priority: "medium",
    position: "left",
  },
  {
    delay: 7800,
    text: "SOMEONE FIX THIS NOW!!!",
    priority: "critical",
    position: "center",
  },
  {
    delay: 8400,
    text: "Images are all broken! 🖼️❌",
    priority: "high",
    position: "right",
  },
  {
    delay: 9000,
    text: "The client is going to KILL me! ☠️",
    priority: "critical",
    position: "left",
  },
  {
    delay: 9600,
    text: "I'm never going to financially recover from this",
    priority: "high",
    position: "right",
  },
  {
    delay: 10200,
    text: "EVERYTHING IS FALLING APART! 😭",
    priority: "critical",
    position: "center",
  },
];

export const errorMessages = [
  "ERROR: Failed to load CSS: style.css not found",
  "WARNING: React encountered an error during rendering",
  "ERROR: Cannot read property 'styles' of undefined",
  "WARN: Layout shift detected - CLS score critical",
  "ERROR: Failed to fetch hero-image.png (404)",
  "FATAL: Uncaught TypeError: Cannot read properties of null",
  "ERROR: Maximum update depth exceeded",
  "ERROR: ChunkLoadError: Loading chunk 5 failed",
  "ERROR: Module parse failed: Unexpected token",
  "CRITICAL: Memory leak detected in component",
  "ERROR: React DevTools disconnected",
];

export const errors = [
  "Error: CSS not found",
  "WARNING: Layout engine crashed",
  "Animation module failed",
  "FATAL ERROR: Design system not responding",
  "404: Style not found",
  "Connection to CDN lost",
  "CRITICAL: Style sheets missing",
  "Alert: Visitor count increasing!",
  "CSS is undefined",
  "TypeError: Cannot read properties of undefined",
  "Framework initialization failed",
  "React Hook 'useStyles' is undefined",
  "CRITICAL: Layout completely broken",
  "Module bundler error #5523",
  "Network request to CDN failed",
  "Process terminated unexpectedly",
  "Server connection timeout",
  "Failed to compile",
  "SYSTEM FAILURE",
  "EMERGENCY STATE DETECTED",
];
