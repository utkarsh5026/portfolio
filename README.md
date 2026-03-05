<div align="center">
  <h1 align="center">Utkarsh Priyadarshi</h1>
  
  <p align="center">
    <em>Software Developer · Open Source Enthusiast</em>
  </p>

  <p align="center">
    <a href="https://utkarsh5026.github.io/">
      <img src="https://img.shields.io/badge/Live%20Site-Visit-6c91c3?style=for-the-badge&logo=github&logoColor=white" alt="Live Site" />
    </a>
    &nbsp;
    <a href="https://github.com/utkarsh5026/portfolio">
      <img src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
    &nbsp;
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    &nbsp;
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    &nbsp;
    <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </p>
</div>

---

<p align="center">
  <strong>A VS Code–inspired developer portfolio built with React, TypeScript, and Tailwind CSS.</strong><br>
  Features a fully interactive code editor UI, custom terminal, smooth animations, and a 3D scene — all wrapped in the beautiful Catppuccin Mocha color palette.
</p>

## ✨ Features

- 💻 **VS Code UI** — Authentic file explorer, draggable tabs, status bar, and a toggleable terminal (<code>Ctrl + \`</code>)
- ⌨️ **Interactive Terminal** — Custom commands supported: `help`, `about`, `projects`, `skills`, `contact`
- 🌌 **3D Visuals** — Immersive Three.js scene integrated seamlessly into the portfolio
- 📊 **Data Visualizations** — Powerful D3-powered charts for skills and tech journey sections
- 💫 **Rich Animations** — Framer Motion, GSAP, and AnimeJS for fluid, layered, and performant transitions
- 🚀 **Project Showcase** — Detailed project cards with descriptions, tech tags, GitHub links, and live demos
- 📝 **Articles Section** — Highlights technical writing, blog posts, and thought leadership
- 📱 **Responsive & Accessible** — Polished experience across all screen sizes, built on Radix UI primitives
- 🎨 **Dark Theme** — Aesthetically pleasing Catppuccin Mocha palette applied throughout
- ⚡ **PWA Ready** — Configured for installability, offline support, and lightning-fast loads

## 🛠️ Tech Stack

### 🏗️ Core Layers

| Layer            | Technology              |
| :--------------- | :---------------------- |
| **UI Framework** | React 18.3 + TypeScript |
| **Build Tool**   | Vite 5                  |
| **Styling**      | Tailwind CSS 3          |
| **Routing**      | React Router DOM 7      |
| **State Mgt**    | Zustand                 |

### 🧩 UI & Components

| Purpose                 | Library                                         |
| :---------------------- | :---------------------------------------------- |
| **Headless Primitives** | Radix UI _(Dialog, Tabs, Tooltip, Dropdown, …)_ |
| **Component System**    | shadcn/ui                                       |
| **Icons**               | Lucide React + React Icons                      |
| **Drawer**              | Vaul                                            |
| **Layouts**             | react-resizable-panels                          |

### 🎬 Animations & 3D

| Purpose                    | Library                 |
| :------------------------- | :---------------------- |
| **Declarative Animations** | Framer Motion 12        |
| **Timeline Animations**    | AnimeJS 3               |
| **DOM Animations**         | GSAP 3                  |
| **3D Rendering**           | Three.js + three-stdlib |
| **Data Viz**               | D3 7                    |

## 📁 Project Structure

```text
app/src/
├── components/
│   ├── base/           # ThemeProvider, global wrappers
│   ├── home/
│   │   ├── about/      # About me section
│   │   ├── articles/   # Technical articles
│   │   ├── contact/    # Contact form & links
│   │   ├── editor/     # VS Code editor chrome (tabs, explorer, terminal)
│   │   ├── intro/      # Hero / introduction
│   │   ├── learning/   # Current learning section
│   │   ├── projects/   # Project cards & modals
│   │   ├── skills/     # Skills & D3 visualizations
│   │   └── work/       # Work experience timeline
│   ├── section/        # Shared section layout components
│   ├── ui/             # shadcn/ui components
│   └── utils/          # Shared utility components
├── lib/                # Helper functions, utilities
├── types/              # Global TypeScript interfaces and types
└── App.tsx             # Main entry point
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/utkarsh5026/portfolio.git
cd portfolio/app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

_The app will be running at `http://localhost:5173`._

## 🌍 Deployment

The portfolio is automatically deployed on **GitHub Pages** and is live at [utkarsh5026.github.io](https://utkarsh5026.github.io/).

## 📫 Contact & Links

Let's connect! Feel free to reach out through any of these platforms:

| Platform           | Link                                                                              |
| :----------------- | :-------------------------------------------------------------------------------- |
| 📧 **Email**       | [utkarshpriyadarshi5026@gmail.com](mailto:utkarshpriyadarshi5026@gmail.com)       |
| 🐙 **GitHub**      | [@utkarsh5026](https://github.com/utkarsh5026)                                    |
| 💼 **LinkedIn**    | [Utkarsh Priyadarshi](https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/) |
| 🐦 **Twitter / X** | [@UtkarshPriyad10](https://x.com/UtkarshPriyad10)                                 |

## 📄 License

Distributed under the **MIT License**. Open source and free to use or learn from!
