import react, { reactCompilerPreset } from "@vitejs/plugin-react";

import babel from "@rolldown/plugin-babel";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
});
