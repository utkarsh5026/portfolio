# DevPortfolio

![Portfolio Walkthrough — Full demo of the VS Code-inspired interface, cinematic loading narrative, and integrated terminal in action](/media/portfolio/demo.mp4)

> VS Code-inspired portfolio with cinematic multi-stage storytelling.

## The Problem

Most developer portfolios are indistinguishable. A profile photo, a skills list, a few project cards — the format is so familiar that hiring managers process them on autopilot. Nothing sticks. Nothing signals how someone actually thinks or builds.

Static "About / Projects / Contact" pages tell recruiters _what_ you built, not _how_ you think. Engineering skill, taste, and creativity can't be conveyed through bullet points and screenshots alone.

Standing out in a sea of identical portfolios requires something fundamentally different — an experience that _is_ the demonstration.

![The average developer portfolio versus something that makes an engineer stop scrolling](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

## The Solution

I built a fully functional VS Code interface clone as the portfolio shell — the entire site is navigated through a file explorer, draggable tabs, and a live terminal, just like an IDE. The portfolio isn't a website about an engineer; it _behaves like_ engineering.

Before reaching the main interface, visitors are taken through a **6-stage cinematic narrative**: a chaotic panic scene, a fake prank portfolio, a live code compilation animation, then finally the real thing.

![High-level architecture — six narrative stages flowing into the main VS Code interface shell](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### The 6-Stage Narrative

The loading sequence is a story, not a spinner. Six distinct stages unfold in order: **Realization**, **Panic** (browser tabs, LLM chat, terminal chaos), **Prank Portfolio** (a deliberately bad fake site), **Compilation Loading**, **Code Compilation** (live build animation), and finally the real **Portfolio**.

Each stage is choreographed with **AnimeJS timelines** for 60fps transitions and fragment-based DOM manipulation. Smart state persistence via `localStorage` detects returning visitors and skips the intro automatically.

Mobile users get a shortened version — jumping directly to the chaos stage — since the full narrative requires the screen real estate of a desktop.

### VS Code Interface

The main interface is a pixel-perfect VS Code replica. A collapsible file explorer on the left shows all portfolio sections as navigable tree items. A draggable tab bar at the top mirrors the IDE tab system. A status bar at the bottom shows branch info and active section context.

The integrated terminal at the bottom supports **15+ Linux-like commands**: `cd`, `ls`, `cat`, `pwd`, `mkdir`, `touch`, `rm`, `grep`, `find`, `clear`, `history`, and more — all implemented client-side with no backend.

![VS Code interface clone showing the file explorer, tabbed navigation, markdown content area, and integrated terminal](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/portfolio/utkarsh.me%20-%20Google%20Chrome%2003-03-2026%2003_11_44.png)

### Custom Markdown Renderer

Every portfolio section — projects, about, skills, articles — is rendered through a custom markdown engine. It handles **Prism.js syntax highlighting** for 50+ languages, zoomable image lightboxes, GitHub Flavored Markdown tables, YouTube video embeds, and local video playback.

The renderer uses `react-markdown` with `rehype-highlight` and `remark-gfm` plugins, wrapped in custom React components for each element type.

### Performance Architecture

The build is split into **7 manual Vite chunks**: vendor (React), animations (AnimeJS), UI (Radix), icons (Lucide + React Icons), and home-components. This prevents a monolithic initial download and lets the browser cache stable chunks independently.

Lazy-loaded section components keep the initial bundle small, while Terser minification and aggressive image preloading push **Time to Interactive below 100ms**.

## Key Features

- 6-stage cinematic intro with AnimeJS choreography and 60fps scene transitions
- Pixel-perfect VS Code interface with collapsible file explorer, draggable tabs, and status bar
- Integrated terminal emulator with 15+ Linux-like commands, tab autocomplete, and command history
- Custom markdown renderer with Prism.js syntax highlighting, lightbox zoom, and YouTube/video embeds
- Interactive 8-step guided tour with animated character, emotion states, and spotlight highlighting
- Progressive Web App (PWA) with offline capability via Workbox service worker caching
- Smart intro-skip for returning visitors via localStorage state persistence
- Matrix rain canvas effect as animated section backgrounds at 60fps
- Fully responsive — desktop renders full editor chrome, mobile uses dropdown navigation
- Sub-100ms TTI via manual chunk splitting, lazy-loaded sections, and Terser minification
- Catppuccin Mocha dark theme applied consistently across all 8 portfolio sections
- 276 TypeScript source files with strict type checking and zero ESLint warnings

## Results & Impact

The portfolio doubles as its own strongest project entry — demonstrating React architecture, animation choreography, performance engineering, and product design in a single artifact.

| Metric                      | Value   |
| --------------------------- | ------- |
| Time to Interactive         | < 100ms |
| Initial bundle size         | < 500KB |
| Animation framerate         | 60fps   |
| Narrative loading stages    | 6       |
| Terminal commands supported | 15+     |
| Portfolio content sections  | 8       |
| Source files (TSX/TS)       | 276     |
| Manual Vite code chunks     | 7       |
| Guided tour steps           | 8       |

The cinematic intro alone consistently becomes a talking point in conversations — it signals intentionality and a high bar for craft. Combined with sub-100ms load performance, it shows that creative ambition and technical discipline aren't mutually exclusive.

## Under the Hood — Technical Deep Dive

Building this portfolio meant solving three genuinely hard problems simultaneously: choreographing a complex multi-stage narrative without a framework, emulating a terminal in pure React, and hitting aggressive performance targets with a large, animation-heavy codebase.

### The 6-Stage Loading State Machine

The narrative sequence is not a simple array of steps — it's a state machine with conditional branching. Mobile devices skip stages, returning visitors skip the entire intro, and direct URL navigation bypasses it entirely (e.g., `/skills` goes straight to the skills section).

Each stage renders a distinct component and owns its own AnimeJS timeline. Transitions between stages use fragment-based DOM manipulation to avoid React reconciliation overhead during the most animation-intensive moments. The `localStorage` key `hasSeenPortfolioIntro` persists across sessions.

```
                              ┌────────────┐
                              │ PAGE LOAD  │
                              └─────┬──────┘
         ┌───────────────────┬──────┴──────────────────────┐
         │                   │                              │
    pathname ≠ "/"       isPhone = true               Desktop +
   (direct section)           │                       first visit
         │                    │                              │
         ▼                    ▼                              ▼
  ┌─────────────┐      ┌──────────────┐      ┌──────────────────────────┐
  │  PORTFOLIO  │      │  (see CHAOS  │      │      REALIZATION         │
  │  skip all   │      │  stage below)│      │  working  😌             │
  │  intro=true │      └──────┬───────┘      │    ↓ 1200ms              │
  └─────────────┘             │              │  notice   🧐             │
                              │              │    ↓ 1500ms              │
                              │              │  alarm    😳             │
                              │              │    ↓ 1800ms              │
                              │              │  panic    😱             │
                              │              └────────────┬─────────────┘
                              │                           │ onComplete
                              │                           ▼
                              │              ┌──────────────────────────┐
                              │              │         PANIC            │
                              │              │     macOS Desktop        │
                              │              │  setup   → research  🔍  │
                              │              │            10s browser   │
                              │              │         → assistance 🤖  │
                              │              │            5s LLM chat   │
                              │              │         → coding     💻  │
                              │              │            6s VSCode     │
                              │              │         → commands   🚀  │
                              │              │            10s terminal  │
                              │              └────────────┬─────────────┘
                              │                           │ onComplete
                              │                           ▼
                              │              ┌──────────────────────────┐
                              │              │     CHAOS-LOADING        │
                              │              │   FakePortfolio (2s)     │
                              │              └────────────┬─────────────┘
                              │                           │ onComplete
                              └───────────────────────────┘
                                                          │
                                                          ▼
                                             ┌────────────────────────────┐
                                             │           CHAOS            │
                                             │      PrankPortfolio        │
                                             │  entrance animation  3s    │
                                             │  panic thought bubbles     │
                                             │  layout breaks     +4.2s   │
                                             │  error terminal            │
                                             │  fatal error screen +5.2s  │
                                             │  blackout → complete       │
                                             └────────────┬───────────────┘
                                                          │ onComplete
                                                          ▼
                                             ┌────────────────────────────┐
                                             │     COMPILATION-LOADING    │
                                             │  word flash sequence ~16s  │
                                             │  → countdown transition    │
                                             └────────────┬───────────────┘
                                                          │ onComplete
                                                          ▼
                                             ┌────────────────────────────┐
                                             │        COMPILATION         │
                                             │   code build animation     │
                                             │   localStorage → "true"    │
                                             └────────────┬───────────────┘
                                                          │ onComplete
                                                          ▼
                                             ┌────────────────────────────┐
                                             │        PORTFOLIO  🎉       │
                                             │     EditorProvider         │
                                             │     + CodeEditor           │
                                             └────────────────────────────┘

  ┌────────────────────────────────────────────────────────────────────┐
  │  SKIP INTRO  localStorage "hasSeenPortfolioIntro" = "true"        │
  │  "Skip Intro" button visible at any stage → jumps to PORTFOLIO    │
  └────────────────────────────────────────────────────────────────────┘
```

### Terminal Emulation Without a Backend

The integrated terminal is a pure client-side implementation. A command parser tokenizes input and dispatches to a handler map in `use-terminal.ts`. Each command handler receives the parsed arguments and the current virtual filesystem state, then returns formatted output.

Tab autocomplete scans the command registry and the current directory's virtual contents. History navigation (up/down arrows) is tracked in a ring buffer. Output is accumulated in a typed `CommandOutput[]` array and rendered as styled blocks with Catppuccin color coding for success, error, and info states.

![Terminal architecture — command parser, handler dispatch map, virtual filesystem state, and output renderer](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Bundle Optimization and PWA Strategy

The biggest performance risk was the animation stack. Three animation libraries (Framer Motion, AnimeJS, GSAP), Three.js, and D3 together push well past 1MB uncompressed. Manual chunk splitting isolates these into separately cacheable bundles — a visitor who returns after a code change only re-downloads the changed chunk.

The Vite PWA plugin generates a Workbox service worker that pre-caches all static assets on first load. Subsequent visits serve the entire site from cache, making it fully offline-capable. Critical images (macOS wallpaper, personal photo, certificate assets) are preloaded in the narrative stages to eliminate layout shifts.

![Bundle split diagram — 7 Vite output chunks with sizes, cache lifetimes, and PWA caching strategy overlay](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

## Links

- [GitHub — utkarsh5026/portfolio](https://github.com/utkarsh5026/portfolio)
- [Live Portfolio — utkarsh5026.github.io](https://utkarsh5026.github.io/)
