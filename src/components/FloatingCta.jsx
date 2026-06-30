// ============================================================================
//  FloatingCta.jsx — ПЛАВАЮЩАЯ КНОПКА «Забронировать» (в правом нижнем углу).
//  Появляется, когда пользователь пролистал страницу вниз (>800px),
//  и прячется наверху страницы.
// ============================================================================
import { useEffect, useState } from "react";

export default function FloatingCta() {
  const [show, setShow] = useState(false);     // Показывать кнопку или нет

  // Следим за прокруткой: показываем кнопку после 800px прокрутки
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800); // 800 — порог появления (можно менять)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // fixed bottom-5 right-5 = закреплена в правом нижнем углу.
    // show ? видима : спрятана (плавно через opacity/translate).
    <a
      href="#contact"
      aria-label="Забронировать прогулку"
      className={`btn-aqua fixed bottom-5 right-5 z-90 inline-flex items-center rounded-full px-6 py-3.5 text-[0.9rem] font-semibold transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 max-sm:inset-x-4 max-sm:justify-center ${
        show
          ? "translate-y-0 opacity-100"                       // видима
          : "pointer-events-none translate-y-5 opacity-0"     // спрятана (и не кликается)
      }`}
    >
      Забронировать
    </a>
  );
}
