<div align="center">

# 🧘‍♂️ InPeace

### _Find Peace Through Mindful Browsing_

**A Chrome extension that makes you think twice before accessing distracting websites**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://developer.chrome.com/docs/extensions/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [How It Works](#-how-it-works) • [Development](#-development)

---

</div>

## 🎯 The Intention

**InPeace** isn't just another website blocker. It's a productivity tool with a psychological twist. When you attempt to visit a blocked site, you'll face a multi-stage "shame ritual" designed to make you **genuinely reconsider** your choice.

### The Four Stages of Reflection

<table>
<tr>
<td width="25%" align="center">
  <strong>1️⃣ Disappointment</strong><br/>
  <em>A reminder of what you're doing</em>
</td>
<td width="25%" align="center">
  <strong>2️⃣ Flashlight Hunt</strong><br/>
  <em>Find & click hidden button 10 times</em>
</td>
<td width="25%" align="center">
  <strong>3️⃣ Reflection</strong><br/>
  <em>Confront your choices</em>
</td>
<td width="25%" align="center">
  <strong>4️⃣ Commitment</strong><br/>
  <em>Acknowledge you're wasting time</em>
</td>
</tr>
</table>

> **The Goal:** Add enough friction and self-reflection that you'll often decide it's not worth it.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛡️ **Protection**

- 🚫 Block unlimited distracting websites
- ⏱️ 30-minute temporary whitelist after ritual
- 🔄 Sync settings across Chrome browsers
- 🌐 Modern Declarative Net Request API

</td>
<td width="50%">

### 🎮 **Experience**

- 🎭 Multi-stage psychological ritual
- 🔦 Interactive flashlight search challenge
- 🌓 Beautiful dark mode blocked page
- 📊 Track daily visit attempts per site

</td>
</tr>
</table>

---

## 🎬 Demo

https://github.com/user-attachments/assets/5d544625-89e7-4eec-aeb3-329b3be2f67f

<details>
<summary>📹 <strong>View Demo Video</strong></summary>
<br>
<video src="video/demo.mp4" controls></video>
</details>

---

## 📦 Installation

### 👥 For Users

1. **Download** the [latest release](https://github.com/yourusername/inpeace/releases)
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the `dist` folder from the downloaded release

### 👨‍💻 For Developers

```bash
# Clone the repository
git clone https://github.com/yourusername/inpeace.git
cd inpeace

# Install dependencies
npm install

# Build the extension
npm run build

# The extension is now built in the 'dist' folder
```

**Load in Chrome:**

1. Navigate to `chrome://extensions/`
2. Enable **"Developer mode"**
3. Click **"Load unpacked"**
4. Select the `dist` folder

---

## ⚙️ Development

### 🛠️ Available Scripts

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `npm run build`  | 🏗️ Build production version   |
| `npm run dev`    | 👀 Watch mode for development |
| `npm run clean`  | 🧹 Clean dist folder          |
| `npm run format` | ✨ Format code with Prettier  |
| `npm test`       | 🧪 Run tests                  |

### 🏗️ Tech Stack

<table>
<tr>
<td align="center" width="20%">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
  <br><strong>TypeScript</strong>
  <br><sub>Type-safe code</sub>
</td>
<td align="center" width="20%">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" width="48" height="48" alt="Webpack" />
  <br><strong>Webpack</strong>
  <br><sub>Module bundling</sub>
</td>
<td align="center" width="20%">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind CSS" />
  <br><strong>Tailwind CSS</strong>
  <br><sub>Modern styling</sub>
</td>
<td align="center" width="20%">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" width="48" height="48" alt="Chrome" />
  <br><strong>Manifest V3</strong>
  <br><sub>Latest API</sub>
</td>
<td align="center" width="20%">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-original.svg" width="48" height="48" alt="Vitest" />
  <br><strong>Vitest</strong>
  <br><sub>Unit testing</sub>
</td>
</tr>
</table>

---

## 📁 Project Structure

```
inpeace/
├── 📂 src/
│   ├── 🔧 background.ts     # Background service worker & blocking logic
│   ├── 🎨 popup.ts          # Extension popup UI logic
│   ├── 🎭 blocked.ts        # Shame ritual implementation
│   └── 📘 types.ts          # TypeScript type definitions
├── 📂 public/
│   ├── 🖼️ popup.html        # Extension popup
│   ├── 🚫 blocked.html      # Blocked page view
│   ├── 💅 blocked.css       # Blocked page animations & styles
│   ├── 🎨 styles.css        # Global styles
│   └── ⚙️ manifest.json     # Extension manifest
├── 📂 tests/
│   └── 🧪 unit/             # Unit tests
├── ⚙️ webpack.config.js     # Webpack configuration
├── ⚙️ tailwind.config.js    # Tailwind configuration
└── 📦 package.json          # Dependencies & scripts
```

---

## 🔍 How It Works

<table>
<tr>
<td width="10%" align="center"><strong>1</strong></td>
<td><strong>Blocking</strong> → Uses Chrome's Declarative Net Request API to intercept requests to blocked websites</td>
</tr>
<tr>
<td width="10%" align="center"><strong>2</strong></td>
<td><strong>Redirect</strong> → Automatically redirects to a custom "blocked" page with the shame ritual</td>
</tr>
<tr>
<td width="10%" align="center"><strong>3</strong></td>
<td><strong>Ritual</strong> → User must complete four psychological stages designed to create friction</td>
</tr>
<tr>
<td width="10%" align="center"><strong>4</strong></td>
<td><strong>Whitelist</strong> → After completion, site is temporarily whitelisted for 30 minutes</td>
</tr>
<tr>
<td width="10%" align="center"><strong>5</strong></td>
<td><strong>Statistics</strong> → Tracks daily visit attempts per site to show usage patterns</td>
</tr>
</table>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

> For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the need for mindful technology use
- Built with modern web technologies and Chrome Extension APIs
- Thanks to all contributors who help improve InPeace

---

<div align="center">

**Made with ❤️ and ☕ for a more focused web**

[⬆ Back to Top](#-inpeace)

</div>
