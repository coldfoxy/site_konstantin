// ============================================================================
//  galleryImages.js — АВТО-СПИСОК ФОТО ДЛЯ ГАЛЕРЕИ.
//  Берёт ВСЕ изображения из папки src/gallery автоматически.
//  Чтобы ДОБАВИТЬ фото в галерею: положите файл (.jpg/.jpeg/.png/.webp)
//  в папку src/gallery — в том числе прямо на GitHub (Add file → Upload files).
//  После пересборки фото появится в галерее само. Удалить — удалите файл оттуда.
// ============================================================================
const modules = import.meta.glob(
  "./gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
);

// Превращаем в простой список адресов картинок, по порядку имён файлов:
export const GALLERY_IMAGES = Object.keys(modules)
  .sort()
  .map((path) => modules[path]);
