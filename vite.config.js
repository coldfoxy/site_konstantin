// ============================================================================
//  vite.config.js — настройки сборщика Vite.
//  base: "./" = относительные пути (сайт работает при любом адресе/подпапке).
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";        // Поддержка React (.jsx)
import tailwindcss from "@tailwindcss/vite";     // Поддержка Tailwind (классы оформления)

// Плагин: ВШИВАЕТ основной JS и CSS прямо в index.html (одним файлом),
// вместо отдельных /assets/index-*.js и /assets/index-*.css.
// Зачем: у части пользователей при загрузке страницы рвётся отдельное соединение
// к JS-файлу (белый экран). Если код вшит в саму страницу — отдельного запроса нет,
// вся основа сайта приходит одним ответом. Картинки/видео остаются отдельными файлами.
// Работает в writeBundle — после того, как Vite уже собрал и записал файлы на диск.
function inlineJsCss() {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    name: "inline-js-css",
    writeBundle(options, bundle) {
      const dir = options.dir || "dist";
      const htmlPath = path.join(dir, "index.html");
      if (!fs.existsSync(htmlPath)) return;
      let html = fs.readFileSync(htmlPath, "utf8");
      const toDelete = [];

      for (const file of Object.values(bundle)) {
        const filePath = path.join(dir, file.fileName);
        // Вшиваем главный JS-бандл прямо в <script>
        if (file.type === "chunk" && file.fileName.endsWith(".js")) {
          let code = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : file.code;
          code = code.replace(/<\/script>/gi, "<\\/script>");
          const re = new RegExp(`<script[^>]*src="[^"]*${esc(file.fileName)}"[^>]*></script>`);
          if (re.test(html)) {
            // Функция-замена: чтобы `$&`/`$1` внутри кода не трактовались как спецсимволы
            html = html.replace(re, () => `<script type="module">${code}</script>`);
            toDelete.push(filePath);
          }
        }
        // Вшиваем CSS прямо в <style>
        if (file.type === "asset" && file.fileName.endsWith(".css")) {
          const css = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : String(file.source);
          const re = new RegExp(`<link[^>]*href="[^"]*${esc(file.fileName)}"[^>]*>`);
          if (re.test(html)) {
            html = html.replace(re, () => `<style>${css}</style>`);
            toDelete.push(filePath);
          }
        }
      }

      // Убираем ненужные предзагрузки модулей
      html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, "");
      fs.writeFileSync(htmlPath, html);
      // Удаляем отдельные JS/CSS — они теперь внутри HTML
      for (const f of toDelete) { try { fs.unlinkSync(f); } catch (_) {} }
    },
  };
}

export default defineConfig({
  base: "./",                                    // ← относительные пути
  plugins: [react(), tailwindcss(), inlineJsCss()],
});
