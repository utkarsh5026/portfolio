/**
 * Static profile copy for the simple (recruiter) view.
 *
 * Everything else on the page is pulled from the same data files the editor
 * experience uses, so there is a single source of truth for the real content.
 */

export const profile = {
  name: "Utkarsh Priyadarshi",
  role: "Full-stack developer, DevOps engineer",
  summary:
    "I like systems work. I've written a relational database, a Git implementation and a programming language from scratch — in Go and TypeScript — and spent six months at IDeaS automating the database migration and monitoring nobody wanted to do by hand.",
} as const;

export const RESUME_URL =
  "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "utkarshpriyadarshi5026@gmail.com",
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
  },
  {
    label: "GitHub",
    value: "utkarsh5026",
    href: "https://github.com/utkarsh5026",
  },
  {
    label: "LinkedIn",
    value: "utkarsh-priyadarshi",
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
  },
  {
    label: "Twitter",
    value: "UtkarshPriyad10",
    href: "https://x.com/UtkarshPriyad10",
  },
  {
    label: "Résumé",
    value: "PDF",
    href: RESUME_URL,
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
