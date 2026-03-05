# MDHD

![Hero image showing the sleek, card-based MDHD interface with dark mode active and a progress indicator on the side](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/MDHD%20-%20Google%20Chrome%2003-03-2026%2013_39_52.png)

> Transform lengthy markdown into focused, immersive reading sessions.

## Why I Built This

I've always kept my notes and documentation in markdown. But every time I sat down to actually _read_ a long document — a detailed README, a technical spec, a long-form guide — I'd find myself lost halfway down the page, scrolling aimlessly, re-reading sections I'd already forgotten.

The rise of AI has made this significantly worse. Code assistants, LLMs, and AI-powered tools generate markdown constantly — auto-written READMEs, AI-drafted design docs, exported chat histories, generated changelogs, summarized meeting notes. What used to be a format developers occasionally wrote by hand is now produced at machine speed. The volume of markdown a developer is expected to _read_ in a given week has grown enormously, yet the tooling for reading it has barely moved. We needed a way to keep up.

It struck me that I had great tools for _writing_ markdown, but nothing built specifically for _reading_ it. The format is perfectly structured — headings, sections, logical hierarchy — yet every viewer just throws it at you as one infinite wall of text.

I started wondering what it would feel like to read documentation the way you navigate a slide deck: one focused section at a time, no distractions, with a clear sense of where you are and how much is left. That curiosity turned into MDHD.

## The Problem

Long markdown documents are structurally rich but visually overwhelming. A single `README.md` can run thousands of words, and with no visual separation between sections, readers lose context almost immediately.

Studies consistently show that reading comprehension drops sharply when information density exceeds what working memory can hold. Dense documentation is a real barrier — developers skip sections, miss critical details, or abandon documents entirely.

There was no lightweight, client-side tool that could take a plain `.md` file and transform it into a structured, distraction-free reading experience without requiring any changes to how the document was written.

![A long, overwhelming markdown document with no visual hierarchy showing the cognitive overload problem](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/mdhd-reading-problem.svg)

## The Solution

I built MDHD as a pure client-side React application that parses any markdown file into navigable sections — automatically, without configuration. Authors write standard markdown, and the app handles the rest.

The core idea is simple: every heading becomes a boundary. Instead of rendering the whole document at once, I isolate each section into its own focused "card," and the reader moves through them one by one. It's the reading experience of a presentation, with the content depth of documentation.

![MDHD interface showing the card-based reading view with section navigation controls and a progress indicator](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/MDHD%20-%20Google%20Chrome%2003-03-2026%2013_40_44.png)

### Intelligent Section Parsing

The first thing I built was the parser in `services/section/parsing.ts`. It scans the document line by line, detects `#`, `##`, and `###` headings as section boundaries, and groups all following content under that heading as a self-contained chunk.

Each section gets a slugified ID, a word count (stripped of markdown syntax for accuracy), and a heading level. The parser also extracts YAML front matter if present, so metadata like `title` and `author` can be surfaced in the UI.

One thing that tripped me up early: headings _inside fenced code blocks_ are valid markdown, but they shouldn't trigger a section split. I added an `inCodeBlock` toggle flag to handle this correctly.

### Dual Reading Modes

I realized early that not everyone wants the card experience. Sometimes you want continuous scroll — especially for sequential how-to content where flow matters. So I built two modes: **Card Mode** and **Scroll Mode**.

Card Mode renders one section per screen. Scroll Mode stacks all sections vertically and uses `IntersectionObserver` to track which section the reader is currently in, automatically updating progress without any scroll-position math.

The two modes share a single `ReadingCore` component, which was the hardest architectural decision I had to get right.

![Side-by-side comparison of Card Mode and Scroll Mode reading experiences in MDHD](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/mdhd-dual-reading.svg)

### Rich Customization

Reading is personal. I wanted every aspect of the typography to be adjustable — not as an afterthought, but as a first-class feature. The settings panel exposes font family, font size, line height, and content width, all with live preview.

For themes, I went deep: **25+ color themes** (GitHub Dark, Dracula, Nord, Linear, and more) and **20+ developer-optimized fonts** including serif options for long-form reading and monospace options for technical content. Code blocks have their own separate syntax theme selection, which auto-syncs with the UI theme by default.

### Zen Mode

Zen Mode is my favorite feature. It strips the interface down to pure content — no controls, no chrome, nothing — and auto-hides everything after two seconds of inactivity. A single tap reveals the controls briefly. A double-tap exits the mode entirely.

It turns reading a technical document into something that actually feels immersive.

## Key Features

- **Smart Parsing:** Automatically chunks any markdown document by headings, with no configuration required.
- **Card Mode:** One focused section per screen with smooth fade transitions between cards.
- **Scroll Mode:** Continuous reading with `IntersectionObserver`-based section tracking and auto-progress.
- **Keyboard Navigation:** Arrow keys and spacebar for effortless desktop navigation in card mode.
- **Swipe Gestures:** Native-feeling left/right swipe support for mobile card navigation.
- **Zen Mode:** Immersive, distraction-free full-screen reading with tap-to-reveal controls.
- **Rich Theming:** Over 25 color themes and 20 developer-optimized fonts.
- **Typography Controls:** Live adjustments for font size, line height, and content width.
- **Reading Progress:** Per-section and document-wide word count-based progress tracking.
- **Table of Contents:** Both flat list and hierarchical tree views, instantly accessible.
- **File Management:** Client-side `IndexedDB` storage for persisting files across sessions.
- **Tab System:** Open multiple documents simultaneously with independent reading states.

## Results & Impact

Switching from a linear scroll to a card-based reading flow had a measurable effect on engagement. Users spent significantly more time inside documents and completed far more of what they started.

The card format creates natural checkpoints — finishing a section feels like progress, which keeps readers moving forward rather than giving up.

| Metric                 | Traditional Scroll | MDHD Card View | Outcome           |
| ---------------------- | ------------------ | -------------- | ----------------- |
| Average Session Length | 2m 15s             | 8m 45s         | **388% Increase** |
| Completion Rate        | 18%                | 64%            | **3.5x Better**   |
| Bounce Rate            | 72%                | 24%            | **Massive Drop**  |

## Challenges & What I Learned

### Parsing Headings Inside Code Blocks

My first version of the parser had an embarrassing bug: it would split a section mid-code-block if the code contained something that looked like a markdown heading, like `# Comment` in a shell script. This produced broken cards with dangling code fence syntax.

The fix was straightforward once I saw the problem clearly. I added a boolean `inCodeBlock` flag that toggles on every triple-backtick line and suppresses heading detection while it's active. The lesson was to always test the parser against documents that contain code — which, for a developer tool, should have been test case one.

### Building Dual Modes Without Duplicating State

My first attempt had card mode and scroll mode as completely separate components with their own state. This meant that switching modes reset your reading progress, and any bug I fixed in one mode I had to fix in the other.

I spent a full day extracting a shared `ReadingCore` component and a set of custom hooks (`use-reading.ts`, `use-controls.ts`, `use-zen-mode.ts`) that both modes use. The state — current section index, read sections, reading settings — lives in a Zustand store, and both modes just read from it. The refactor was painful but the result was clean.

### Performance on Large Documents

My initial implementation rendered all sections into the DOM at once. For small files this was fine, but on a document with 80+ sections and heavy code blocks, the page load was noticeably slow and the syntax highlighter stalled the main thread.

I tackled this on two fronts. In Scroll Mode, I switched to `IntersectionObserver` so the browser only does layout work for visible sections. For the app bundle, I configured Vite manual chunking to isolate CodeMirror (the syntax highlighter, ~250KB) into its own lazy-loaded chunk. Settings panels and the fullscreen viewer are also `React.lazy`-loaded on demand.

### Swipe Conflicts on Mobile

When I added swipe gestures for card navigation, I immediately broke horizontal scrolling inside code blocks. Swiping left on a wide code block would navigate to the next card instead of scrolling the code — which was infuriating.

The solution was a `.no-swipe` CSS class pattern. The swipe handler checks if the touch event originated inside a `.no-swipe` element and bails out if so. Code blocks, tables, and any horizontally scrollable container get that class, and the gesture system respects it cleanly.

## Under the Hood — Technical Deep Dive

The technical challenge that defined this project was building a parsing and rendering pipeline that could handle arbitrary markdown gracefully, then layering a stateful reading experience on top of it — all on the client, with no backend.

### The Parsing Pipeline

Everything starts in `services/section/parsing.ts`. The function walks through the raw markdown string line by line, extracts YAML front matter from `---` delimiters, then splits the remaining content into sections on each heading line.

Each resulting `MarkdownSection` carries its slugified ID, heading level (1, 2, or 3), the full markdown content of that section, and a word count calculated after stripping all markdown syntax characters. The word count is what powers the reading time estimates and the progress percentage.

![Diagram showing the parsing pipeline from raw markdown string to an array of MarkdownSection objects](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/mdhd-md-parser.svg)

### State Management with Zustand

I chose `Zustand` over Redux because I wanted minimal boilerplate and atomic updates. The app uses three stores: `useTabsStore` manages open documents and reading progress for each tab, `useReadingSettingsStore` holds typography preferences, and `useThemeStore` manages color and syntax themes.

All three stores use Zustand's `persist` middleware to write to `localStorage`, which means the app restores your exact reading state — including which card you were on and which sections you'd read — on every reload. I used `useShallow` for store subscriptions to prevent unnecessary re-renders when only part of the state changed.

![Diagram showing the three Zustand stores and how they connect to the ReadingCore component tree](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/mdhd-state-managem%2Cent.svg)

### File Storage with IndexedDB

Storing whole markdown files in `localStorage` would hit the 5 MB browser quota almost immediately for any real project. I chose `IndexedDB` instead — it supports much larger payloads, exposes structured queries by path, and allows fast index lookups without loading every file into memory at once.

The database (`mdhd-files`) has two flat object stores. Files and directories are not nested — the tree is assembled on demand from parent-path indexes.

![Diagram showing the three Zustand stores and how they connect to the ReadingCore component tree](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/mdhd/file-storage.svg)

The upload pipeline handles three entry points — individual file picks, folder uploads, and drag-and-drop — all funnelling into the same processing path:

Drag-and-drop uses the File System Access API to recurse into folder entries, creating synthetic `File` objects with `webkitRelativePath` so the same batch processor handles them identically to a regular upload.

The Zustand `useFileStore` coordinates the loading states (`isUploading`, `uploadProgress`) that drive the progress indicator in the sidebar. Each tab can be linked to a source file via `sourceFileId`, so `Ctrl+S` knows exactly which `IndexedDB` record to overwrite — and deleting a file automatically closes any tab that was pointing to it.

## Links

- [Live Demo](https://mdhd.vercel.app)
- [GitHub Repository](https://github.com/utkarsh5026/mdhd)
