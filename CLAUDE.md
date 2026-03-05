# CLAUDE.md — Portfolio Project

## Overview

VS Code–inspired developer portfolio built with React 18, TypeScript, Vite, and Tailwind CSS. Features an interactive code editor UI, custom terminal, story-driven loading screens, 3D visuals, and data visualizations — all styled with the Catppuccin Mocha color palette.

**Live:** https://utkarsh5026.github.io/
**Branch convention:** `main` for production, feature branches for changes.

---

## Project Structure

```
portfolio/
├── app/                  # All source code lives here
│   ├── src/
│   │   ├── App.tsx       # Routes (all → PortfolioStory)
│   │   ├── types.ts      # Global TypeScript types
│   │   ├── components/
│   │   │   ├── animations/   # Floating elements, Matrix, Reveal effects
│   │   │   ├── base/         # ThemeProvider, TechBadge, tech icon mapping
│   │   │   ├── home/
│   │   │   │   ├── editor/   # VS Code chrome: tabs, explorer, terminal, status bar
│   │   │   │   └── portfolio/ # Content sections: intro, about, skills, projects, work, learning, articles, contact
│   │   │   ├── load/         # Story-driven loading screens
│   │   │   ├── ui/           # shadcn/ui components (13 files)
│   │   │   └── section/      # Shared section layout
│   │   ├── hooks/            # use-project, use-mobile, use-local-storage, use-video
│   │   ├── store/            # Zustand: projects-store.ts
│   │   ├── lib/utils.ts      # cn() helper (tailwind-merge + clsx)
│   │   └── utils/            # ctp-colors.ts, unique-ids.ts
│   ├── public/
│   │   ├── data/             # projects.json, articles.json, work.json (data source)
│   │   └── media/            # Project media/videos
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/
│   ├── PROJECT_RESTRUCTURE_GUIDE.md   # How to format project data
│   └── PROJECT_TEMPLATE.json          # Template for new projects
├── Makefile
└── README.md
```

---

## Commands

All commands run from `app/`:

```bash
npm run dev           # Dev server → http://localhost:5173
npm run build         # tsc -b && vite build
npm run force-build   # Clean rebuild
npm run lint          # ESLint (0 warnings tolerance)
npm run preview       # Preview production build
npm run analyze       # Bundle visualization
```

**Makefile shortcuts** (run from root):
```bash
make dev              # Start dev server
make build            # Production build
make lint             # Run linter
make lint-fix         # Auto-fix lint issues
make type-check       # TypeScript check only
make check            # lint + type-check
make clean            # Remove dist/
make fresh-start      # Clean install → dev
make prod-ready       # Full pre-deploy check
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3 + TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 (Catppuccin Mocha palette) |
| Routing | React Router DOM 7 |
| State | Zustand 5 |
| Headless UI | Radix UI primitives |
| Components | shadcn/ui (style: "new-york") |
| Animations | Framer Motion 12, GSAP 3, AnimeJS 3 |
| 3D | Three.js + three-stdlib |
| Data Viz | D3 7 |
| Icons | Lucide React + React Icons |

---

## Architecture

### Routing
All routes (`/`, `/about`, `/skills`, `/projects`, etc.) render the same `PortfolioStory` component — single-page app with internal section scrolling.

### Loading Flow
`PortfolioStory` orchestrates a narrative sequence:
`Bridge → Compilation → macOS → Panic → Portfolio`

### State Management
- **Zustand store** in `src/store/projects/projects-store.ts` handles project fetching, selection, search, and filtering.
- `use-project.ts` hook wraps store access; components should use this hook, not the store directly.

### Data Flow
Content is **data-driven**, loaded from JSON files in `public/data/`:
- `projects.json` — project array (fetched at runtime)
- Add new projects by following `docs/PROJECT_TEMPLATE.json` and the guide in `docs/PROJECT_RESTRUCTURE_GUIDE.md`

### Component Conventions
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Use `cva()` (Class Variance Authority) for multi-variant components
- Animations via Framer Motion for declarative; GSAP/AnimeJS for timeline/DOM sequences
- Colors: use Catppuccin Mocha tokens defined in `tailwind.config.js` (e.g., `ctp-blue`, `ctp-mauve`, `ctp-pink`)
- Path alias: `@/` resolves to `src/`
- **Text & Headings:** Always use `<Heading>` and `<Text>` from `src/components/ui/text.tsx` for any rendered text. Never use raw `<h1>`–`<h6>` or `<p>` tags directly. Use the `as` prop to control the HTML element and `variant` prop on `<Text>` for styling (`body`, `lead`, `subtitle`, `caption`, `muted`).

### Mobile
- `use-mobile.tsx` hook for responsive branching
- Mobile-specific components exist alongside desktop (e.g., `mobile-editor-dropdown.tsx`)

---

## Key Files

| File | Purpose |
|---|---|
| `app/src/types.ts` | `Project`, `Article`, `WorkExperience`, `ExplainCards` types |
| `app/src/App.tsx` | Route definitions |
| `app/tailwind.config.js` | Catppuccin colors, custom animations, fonts |
| `app/vite.config.ts` | Code splitting, PWA, image tools, alias |
| `app/public/data/projects.json` | All project content (data source of truth) |
| `docs/PROJECT_RESTRUCTURE_GUIDE.md` | How to add/format projects |
| `Makefile` | Dev workflow automation |

---

## No Testing Setup

There are currently no test files or test runner configured. Do not assume tests exist.

---

## Deployment

- **GitHub Pages:** Push to `main` triggers deployment to `https://utkarsh5026.github.io/`
- **Vercel:** Also configured via `vercel.json` (SPA rewrites)
- **PWA:** Service worker enabled via `vite-plugin-pwa`
