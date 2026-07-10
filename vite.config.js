// ============================================================================
//  vite.config.js — настройки сборщика Vite.
//  base: "./" = относительные пути (сайт работает при любом адресе/подпапке).
// ============================================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";        // Поддержка React (.jsx)
import tailwindcss from "@tailwindcss/vite";     // Поддержка Tailwind (классы оформления)

// Плагин: убирает атрибут crossorigin у подключаемых JS/CSS.
// Зачем: если страница открыта на www.kapitankonstantin.ru, а файлы отдаются с
// kapitankonstantin.ru (без www) — атрибут crossorigin превращает это в CORS-ошибку
// и сайт остаётся пустым (белый экран). Без crossorigin файлы грузятся с любого
// адреса без блокировки. Для этого сайта дополнительная защита CORS не нужна.
function stripCrossorigin() {
  return {
    name: "strip-crossorigin",
    transformIndexHtml: {
      order: "post",
      handler: (html) => html.replace(/ crossorigin/g, ""),
    },
  };
}

export default defineConfig({
  base: "./",                                    // ← относительные пути
  plugins: [react(), tailwindcss(), stripCrossorigin()],
});
