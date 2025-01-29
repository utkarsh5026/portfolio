import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html",
      template: "treemap",
      open: true,
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["animejs"],
          ui: ["@radix-ui/react-avatar", "@radix-ui/react-slot"],
          icons: ["lucide-react", "react-icons"],
          "home-components": [
            "./src/components/home/intro/PersonalHeader",
            "./src/components/home/skills/Skills",
            "./src/components/home/projects/Projects",
            "./src/components/home/articles/Articles",
            "./src/components/home/work/WorkExperience",
            "./src/components/home/contact/ContactMe",
          ],
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
