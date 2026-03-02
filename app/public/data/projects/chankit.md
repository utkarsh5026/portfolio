<div align="center">

<img src="icons/icon128.png" alt="Image Favicon Preview" width="100">

# Image Favicon Preview

**Preview any image as your browser favicon on hover**

[![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)](https://github.com/prtk-87/favorite)
[![Manifest](https://img.shields.io/badge/manifest-v3-green?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-orange?style=flat-square)](LICENSE)

<br>

[Features](#features) · [Installation](#installation) · [How It Works](#how-it-works) · [Development](#development)

</div>

<br>

## About

A lightweight Chrome extension that lets you preview any image on any website as your browser's favicon simply by hovering over it. Perfect for designers, developers, and anyone curious about how an image would look in their browser tab.

<br>

## Features

|     | Feature               | Description                                                         |
| :-: | :-------------------- | :------------------------------------------------------------------ |
| 🌐  | **Universal Support** | Works on any website                                                |
| 🖼️  | **Multiple Formats**  | Supports `<img>`, `<svg>`, `<picture>`, `<canvas>`, CSS backgrounds |
| ⚡  | **Instant Preview**   | See the favicon change in real-time                                 |
| 🔄  | **Auto Restore**      | Original favicon returns when you move away                         |
| 🔒  | **Lock & Download**   | Lock favicons with keyboard shortcuts and download as ZIP           |
| 🎯  | **Smart Filtering**   | Ignores tiny images like tracking pixels                            |
| 📦  | **Zero Config**       | Just install and start browsing                                     |

<br>

## Supported Image Types

| Type                   | Status | Notes                             |
| :--------------------- | :----: | :-------------------------------- |
| `<img>`                |   ✅   | Including srcset and lazy-loaded  |
| `<svg>`                |   ✅   | Inline SVGs converted to data URL |
| `<picture>`            |   ✅   | Respects source selection         |
| `<canvas>`             |   ⚠️   | Fails on cross-origin canvases    |
| CSS `background-image` |   ✅   | Excludes gradients                |

<br>

## How It Works

```
1. Browse any website
2. Hover over any image (≥16x16 pixels)
3. Watch your browser tab favicon change
```

### Keyboard Shortcuts

| Shortcut       | Action                                    |
| :------------- | :---------------------------------------- |
| `Ctrl+Shift+.` | Lock the current hovered image as favicon |
| `Ctrl+Shift+,` | Unlock and restore the original favicon   |

**Note:** On Mac, use `Cmd` instead of `Ctrl`. These punctuation-based shortcuts are highly unique and won't conflict with browser or website shortcuts.

<br>

## Installation

```bash
# Clone the repository
git clone https://github.com/prtk-87/favorite.git
cd favorite

# Install dependencies and build
npm install
npm run build
```

Then in Chrome:

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `dist` folder

<br>

## Development

```bash
npm install      # Install dependencies
npm run build    # Build the extension
npm run watch    # Watch for changes
npm run clean    # Clean build files
npm run dev      # Full dev workflow
```

<br>

## Technical Details

<details>
<summary><b>Cross-Origin Behavior</b></summary>
<br>

- Same-origin images work fully
- Cross-origin `<img>` elements work if server allows
- Cross-origin `<canvas>` may throw SecurityError
- Inline SVGs always work

</details>

<details>
<summary><b>Performance</b></summary>
<br>

- Event delegation (single document listener)
- Debounced hover detection (100ms)
- Minimum size filter for tiny elements

</details>

<br>

## Tech Stack

- **Language:** TypeScript
- **Platform:** Chrome Extension Manifest V3

<br>

---

<div align="center">

**[Apache 2.0 License](LICENSE)**

</div>
