// ============================================================================
//  GalleryOverlay.jsx — ПОЛНОЭКРАННАЯ ГАЛЕРЕЯ.
//  Открывается по клику на «Галерея» в меню (ссылка ведёт на #gallery).
//  Фотографии — плиткой в 2–3 ряда, лента едет ВБОК и зациклена бесконечно:
//  колесо мыши вниз/вверх двигает плитку вправо/влево; есть лёгкий авто-дрейф.
//  Список фото берётся автоматически из src/gallery (см. galleryImages.js).
// ============================================================================
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "../galleryImages.js";

const LOOPS = 3; // сколько раз повторить ленту для бесшовного зацикливания

export default function GalleryOverlay() {
  const [open, setOpen] = useState(false);
  const trackRef = useRef(null);
  const velRef = useRef(0);     // «инерция» от колеса мыши
  const rafRef = useRef(0);

  // --- Открытие по адресу #gallery (любая ссылка «Галерея» ведёт туда) ---
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#gallery") {
        setOpen(true);
        // убираем #gallery из адреса, чтобы по клику можно было открыть снова
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  // --- Блокировка прокрутки фона + закрытие по Esc ---
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // --- Бесконечная горизонтальная прокрутка ---
  useEffect(() => {
    if (!open) return;
    const track = trackRef.current;
    if (!track) return;

    let setWidth = track.scrollWidth / LOOPS;        // ширина одной копии ленты
    const recalc = () => { setWidth = track.scrollWidth / LOOPS; };
    track.scrollLeft = setWidth;                     // стартуем со средней копии

    const tick = () => {
      const base = 0.35;                             // скорость авто-дрейфа (px/кадр)
      track.scrollLeft += base + velRef.current;     // двигаем ленту
      velRef.current *= 0.9;                         // инерция колеса затухает
      // зацикливание: держим прокрутку внутри средней копии
      if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
      else if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // колесо мыши вниз/вверх → лента едет вбок
    const onWheel = (e) => {
      e.preventDefault();
      velRef.current += e.deltaY * 0.25;
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", recalc);
    return () => {
      cancelAnimationFrame(rafRef.current);
      track.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", recalc);
    };
  }, [open]);

  if (!open) return null;

  // повторяем список фото LOOPS раз для бесшовной петли
  const tiles = Array.from({ length: LOOPS }).flatMap(() => GALLERY_IMAGES);

  return (
    <div className="animate-fade fixed inset-0 z-200 flex flex-col bg-[#f4eee1]">
      {/* Шапка галереи */}
      <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[1.6rem] font-semibold text-ice sm:text-[2rem]">Галерея</span>
          <span className="text-[0.8rem] uppercase tracking-[0.2em] text-mistdim">
            {GALLERY_IMAGES.length} фото
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Закрыть галерею"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-line text-ice transition-colors hover:bg-[#edece8]"
        >
          <X size={24} />
        </button>
      </div>

      {/* Подсказка */}
      <p className="shrink-0 px-6 pb-3 text-[0.85rem] text-mist sm:px-10">
      </p>

      {/* Лента-плитка (горизонтальная прокрутка) */}
      <div
        ref={trackRef}
        className="no-scrollbar grow overflow-x-auto overflow-y-hidden"
      >
        <div className="grid h-full grid-flow-col grid-rows-2 gap-3 p-3 [grid-auto-columns:clamp(220px,26vw,360px)] sm:grid-rows-3 sm:gap-4 sm:p-5">
          {tiles.map((src, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-lg border border-line bg-white"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                draggable="false"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
