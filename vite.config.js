// ============================================================================
//  vite.config.js — настройки сборщика Vite.
//  base: "./" = относительные пути. Нужно, чтобы сайт работал на GitHub Pages
//  (по адресу вида имя.github.io/репозиторий/) при ЛЮБОМ имени репозитория.
// ============================================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";        // Поддержка React (.jsx)
import tailwindcss from "@tailwindcss/vite";     // Поддержка Tailwind (классы оформления)

export default defineConfig({
  base: "./",                                    // ← относительные пути (для GitHub Pages)
  plugins: [react(), tailwindcss()],
});
