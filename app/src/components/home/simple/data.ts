/**
 * Static profile copy for the simple (recruiter) view.
 *
 * Everything else on the page is pulled from the same data files the editor
 * experience uses, so there is a single source of truth for the real content.
 */

export const profile = {
  name: "Utkarsh Priyadarshi",
  role: "Full-Stack Developer & DevOps Engineer",
  location: "India · Open to remote",
  summary:
    "I build scalable web applications and the infrastructure that keeps them running — from React interfaces down to Go services, databases and CI/CD pipelines.",
  highlights: [
    "B.Tech CSE, 9.52 CGPA",
    "DevOps intern at IDeaS (a SAS company)",
    "16+ shipped side projects",
    "Writes about databases & language internals",
  ],
} as const;

export const RESUME_URL =
  "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  color: string;
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "utkarshpriyadarshi5026@gmail.com",
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "text-ctp-blue",
  },
  {
    label: "GitHub",
    value: "github.com/utkarsh5026",
    href: "https://github.com/utkarsh5026",
    color: "text-ctp-mauve",
  },
  {
    label: "LinkedIn",
    value: "in/utkarsh-priyadarshi",
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "text-ctp-sapphire",
  },
  {
    label: "Twitter",
    value: "@UtkarshPriyad10",
    href: "https://x.com/UtkarshPriyad10",
    color: "text-ctp-sky",
  },
];

export type SimpleSectionId =
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "writing"
  | "learning"
  | "about"
  | "contact";

export const simpleSections: { id: SimpleSectionId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "writing", label: "Writing" },
  { id: "learning", label: "Learning" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
