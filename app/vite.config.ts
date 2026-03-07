import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "18", // React 18 compatibility via react-compiler-runtime shim
            },
          ],
        ],
      },
    }),
    visualizer({
      filename: "stats.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
      sourcemap: true,
    }),
    visualizer({
      filename: "stats.json",
      json: true,
      gzipSize: true,
      brotliSize: true,
    }),
    imagetools(),
    checker({ typescript: true }),
    compression({ algorithm: "gzip", ext: ".gz" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  build: {
    sourcemap: process.env.NODE_ENV === "development",
    chunkSizeWarningLimit: 500,
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: false, // Keep console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }
          if (id.includes("node_modules/animejs")) {
            return "vendor-animations";
          }
          if (id.includes("node_modules/react-syntax-highlighter/")) {
            return "vendor-syntax";
          }
          if (
            id.includes("node_modules/@radix-ui") ||
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/react-icons")
          ) {
            return "vendor-ui";
          }
          if (id.includes("node_modules/zustand/")) {
            return "vendor-state";
          }
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: true,
    port: 5173,
    strictPort: true,
  },
});
