// ============================================================================
//  vite.config.js — настройки сборщика Vite.
//  base: "./" = относительные пути (сайт работает при любом адресе/подпапке,
//  в т.ч. на GitHub Pages по адресу вида имя.github.io/репозиторий/).
// ============================================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";        // Поддержка React (.jsx)
import tailwindcss from "@tailwindcss/vite";     // Поддержка Tailwind (классы оформления)

export default defineConfig({
  base: "./",                                    // ← относительные пути
  plugins: [react(), tailwindcss()],
});
