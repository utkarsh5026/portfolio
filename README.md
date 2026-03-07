# Utkarsh Priyadarshi — Developer Portfolio

**_A VS Code–inspired developer portfolio. Built to impress. Crafted to perform._**

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-6c91c3?style=for-the-badge&logo=github-pages&logoColor=white)](https://utkarsh5026.github.io/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/utkarsh5026/portfolio/pulls)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage & Examples](#-usage--examples)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🧠 About The Project

This is not your average developer portfolio. It's a fully interactive, VS Code–inspired single-page application that reimagines the traditional portfolio format as a living code editor — complete with a file explorer, draggable tabs, an embedded terminal, breadcrumb navigation, and a Git commits panel.

**Why this exists:**

Most portfolios are static pages. This one behaves like an IDE. Every section of the portfolio maps to a "file" inside the editor. Visitors navigate the way developers do — through files and tabs — making the experience memorable, immersive, and uniquely on-brand for a software developer.

**Problems it solves:**

- 🎯 Stands out in a sea of template-based portfolios
- 🎨 Communicates personality through the UI itself, not just text
- ⚡ Delivers exceptional performance via code splitting, PWA caching, image optimization, compression, and lazy loading
- 📱 Works beautifully on both desktop and mobile, with swipe navigation on touch devices

---

## ✨ Key Features

- 💻 **VS Code Editor UI** — Authentic file explorer, draggable/closeable tabs, breadcrumbs, status bar, and outline panel
- ⌨️ **Interactive Terminal** — A real-feeling terminal with custom commands: `help`, `about`, `projects`, `skills`, `contact`, and more
- 📊 **D3 Data Visualizations** — Dynamic, animated charts for skills and learning journey sections
- 💫 **CSS Module Animations** — Performant, zero-runtime-cost animations via CSS modules + AnimeJS for complex sequences
- 🎬 **Narrative Loading Screen** — A story-driven boot sequence (`Bridge → Compilation → macOS → Panic → Portfolio`) before the main UI appears
- 🚀 **Project Showcase** — Filterable, searchable project cards with descriptions, tech tags, GitHub links, and demo videos
- 📝 **Articles Section** — Highlights technical writing, blog posts, and dev content
- 🔥 **Git Commit Heatmap** — Visual GitHub-style contribution heatmap powered by real commit data
- 📱 **Swipe Navigation** — Mobile-first swipe gestures (via `react-swipeable`) for navigating sections and projects
- 🎨 **Catppuccin Mocha Theme** — A cohesive, aesthetically pleasing dark color palette applied system-wide
- ⚡ **PWA Ready** — Installable, offline-capable, and lightning-fast with Vite's service worker plugin
- 🔬 **React Compiler** — Powered by the React 19 compiler beta for automatic memoization and optimized re-renders

---

## 🛠️ Tech Stack

### 🏗️ Core

| Layer | Technology |
| :--- | :--- |
| **UI Framework** | React 18.3 + TypeScript 5 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 (Catppuccin Mocha palette) + CSS Modules |
| **Routing** | React Router DOM 7 |
| **State Mgt** | Zustand 5 |
| **Pkg Manager** | Bun |
| **Compiler** | React Compiler (beta) |

### 🧩 UI & Components

| Purpose | Library |
| :--- | :--- |
| **Headless Primitives** | Radix UI _(Dialog, Tabs, Tooltip, Dropdown, Avatar, …)_ |
| **Component System** | shadcn/ui (style: `new-york`) |
| **Icons** | Lucide React + React Icons |
| **Drawer** | Vaul |
| **Resizable Layouts** | react-resizable-panels |
| **Swipe Gestures** | react-swipeable |
| **Scroll Observers** | react-intersection-observer |
| **Code Highlighting** | PrismJS + react-syntax-highlighter |
| **Markdown Rendering** | react-markdown + rehype-highlight + rehype-raw + remark-gfm |

### 🎬 Animations

| Purpose                    | Library                        |
| :------------------------- | :----------------------------- |
| **Complex Sequences**      | AnimeJS 3                      |
| **Transition Animations**  | CSS Modules + tailwindcss-animate |
| **Data Visualization**     | D3 7                           |

### ⚙️ Build & DX

| Purpose               | Tool                                                        |
| :-------------------- | :---------------------------------------------------------- |
| **Bundler**           | Vite 5 + Rollup                                             |
| **Type Checking**     | TypeScript 5 + vite-plugin-checker                          |
| **Linting**           | ESLint 8 + typescript-eslint + react-hooks + simple-import-sort |
| **Formatting**        | Prettier 3                                                  |
| **Git Hooks**         | Husky 9                                                     |
| **Bundle Analysis**   | rollup-plugin-visualizer                                    |
| **Image Optimization**| vite-imagetools + sharp                                     |
| **Compression**       | vite-plugin-compression (gzip/brotli)                       |
| **PWA**               | vite-plugin-pwa                                             |

---

## 📁 Project Structure

```text
portfolio/
├── app/                        # All source code lives here
│   ├── src/
│   │   ├── App.tsx             # Routes (all → PortfolioStory)
│   │   ├── types.ts            # Global TypeScript types
│   │   ├── components/
│   │   │   ├── animations/     # Floating elements, Matrix rain, Reveal effects
│   │   │   ├── base/           # ThemeProvider, TechBadge, icon mapping
│   │   │   ├── home/
│   │   │   │   ├── editor/     # VS Code chrome: tabs, explorer, terminal, status bar
│   │   │   │   └── portfolio/  # Content sections: intro, about, skills, projects, work, …
│   │   │   ├── load/           # Story-driven loading screens
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   └── section/        # Shared section layout wrappers
│   │   ├── hooks/              # use-project, use-mobile, use-local-storage, use-video
│   │   ├── store/              # Zustand: projects-store.ts
│   │   ├── lib/utils.ts        # cn() helper (tailwind-merge + clsx)
│   │   └── utils/              # ctp-colors.ts, unique-ids.ts
│   ├── public/
│   │   ├── data/               # projects.json, articles.json, work.json
│   │   └── media/              # Project media & videos
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/
│   ├── PROJECT_RESTRUCTURE_GUIDE.md  # How to format project data
│   └── PROJECT_TEMPLATE.json         # Template for adding new projects
├── scripts/                    # Git stats generation scripts
├── Makefile                    # Dev workflow automation
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** `>= 1.0` — used as the package manager and runtime
- **[Git](https://git-scm.com/)**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/utkarsh5026/portfolio.git
cd portfolio

# 2. Navigate to the app directory
cd app

# 3. Install dependencies
bun install

# 4. Start the development server
bun run dev
```

The dev server will be available at **<http://localhost:5173>**.

### Available Commands

Run from the `app/` directory:

```bash
bun run dev              # Start development server
bun run build            # Type-check + production build
bun run force-build      # Clean rebuild (clears Vite/TS cache)
bun run lint             # ESLint (zero-warnings policy)
bun run preview          # Preview the production build locally
bun run analyze          # Visualize bundle composition
bun run format:check     # Check formatting with Prettier
bun run format:write     # Auto-fix formatting with Prettier
bun run gen:git-stats    # Regenerate contribution heatmap data
bun run gen:git-commits  # Regenerate recent commits panel data
```

Or use the **Makefile** from the project root:

```bash
make dev              # Start dev server
make build            # Production build
make lint             # Run linter
make lint-fix         # Auto-fix lint issues
make type-check       # TypeScript check only
make check            # lint + type-check together
make clean            # Remove dist/
make fresh-start      # Clean install → start dev
make prod-ready       # Full pre-deploy check (lint + type-check + build)
```

### Adding a New Project

Follow the template in [`docs/PROJECT_TEMPLATE.json`](docs/PROJECT_TEMPLATE.json) and read the full guide in [`docs/PROJECT_RESTRUCTURE_GUIDE.md`](docs/PROJECT_RESTRUCTURE_GUIDE.md).

Projects are data-driven — add an entry to `app/public/data/projects.json` and it automatically appears in the portfolio without any component changes.

---

## 💡 Usage & Examples

### Terminal Commands

Once the portfolio loads, open the terminal with **Ctrl + `` ` ``** and try:

```text
> help       — Lists all available commands
> about      — Shows a quick bio
> projects   — Lists all projects with descriptions
> skills     — Displays your tech stack
> contact    — Shows contact info and social links
> clear      — Clears the terminal output
```

### Navigating Sections

- **Desktop:** Use the file explorer on the left sidebar or click tabs at the top to switch sections
- **Mobile:** Swipe left/right to navigate between sections; a swipe hint appears on first load

### Customizing Content

All portfolio content lives in `app/public/data/`:

```text
app/public/data/
├── projects.json   # Project cards (source of truth)
├── articles.json   # Blog posts / technical articles
└── work.json       # Work experience entries
```

Edit these JSON files to update content — no component changes needed.

---

## 🗺️ Roadmap

- [x] VS Code editor UI with tabs, explorer, and status bar
- [x] Interactive terminal with custom commands
- [x] D3-powered skills visualization
- [x] Git contribution heatmap panel
- [x] PWA support (offline, installable)
- [x] Mobile swipe navigation
- [x] Story-driven loading sequence
- [x] Replace Framer Motion with CSS modules for zero-runtime animations
- [x] React Compiler beta integration for automatic memoization
- [ ] Dark/light theme toggle (Catppuccin Latte as light variant)
- [ ] Keyboard shortcut palette (Ctrl+P command palette simulation)
- [ ] Guestbook / visitor message feature
- [ ] Blog/article detail pages with full markdown rendering
- [ ] Full WCAG 2.1 AA accessibility audit

> Have an idea? [Open an issue](https://github.com/utkarsh5026/portfolio/issues) or [start a discussion](https://github.com/utkarsh5026/portfolio/discussions)!

---

## 🤝 Contributing

Contributions are greatly appreciated. Any improvements, bug fixes, or ideas are welcome.

### How to Contribute

1. **Fork** the repository

2. **Create your feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and ensure they follow the project conventions below

4. **Lint and type-check before committing**

   ```bash
   make check
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

6. **Push to your branch**

   ```bash
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request** targeting the `main` branch

### Conventions

- Use `bun` — not npm or yarn
- ESLint zero-warnings policy must pass: `bun run lint`
- Use Catppuccin Mocha color tokens from `tailwind.config.js` for any new UI (`ctp-blue`, `ctp-mauve`, `ctp-pink`, etc.)
- Use `<Heading>` and `<Text>` from `src/components/ui/text.tsx` — no raw `<h1>`–`<h6>` or `<p>` tags
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Prefer CSS modules or `tailwindcss-animate` for animations — do not add Framer Motion
- Keep components focused; prefer editing existing files over creating new ones

---

## 📄 License

Distributed under the **MIT License**. Free to use, fork, and learn from.

See [`LICENSE`](LICENSE) for full details.

---

## 📬 Contact

**Utkarsh Priyadarshi** — Software Developer & Open Source Enthusiast

| Platform          | Link                                                                              |
| :---------------- | :-------------------------------------------------------------------------------- |
| 🌐 **Portfolio**  | [utkarsh5026.github.io](https://utkarsh5026.github.io/)                           |
| 🐙 **GitHub**     | [@utkarsh5026](https://github.com/utkarsh5026)                                    |
| 💼 **LinkedIn**   | [Utkarsh Priyadarshi](https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/) |
| 🐦 **Twitter / X**| [@UtkarshPriyad10](https://x.com/UtkarshPriyad10)                                 |
| 📧 **Email**      | [utkarshpriyadarshi5026@gmail.com](mailto:utkarshpriyadarshi5026@gmail.com)        |

> Found a bug or have a suggestion? [Open an issue](https://github.com/utkarsh5026/portfolio/issues) — I'd love to hear from you.

---

Made with ❤️ and a lot of ☕ by [Utkarsh Priyadarshi](https://github.com/utkarsh5026)

⭐ **Star this repo if you found it useful or inspiring!**
