// ============================================================================
//  Header.jsx — ШАПКА САЙТА (закреплена сверху).
//  Содержит: логотип, меню, телефон, кнопку «Забронировать» и мобильное меню.
//  Наверху страницы шапка ПРОЗРАЧНАЯ и текст БЕЛЫЙ (поверх фото в hero);
//  после прокрутки — кремовый фон и тёмный текст. Пункты меню — из content.js (NAV).
// ============================================================================
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Brand } from "./Brand.jsx";
import { NAV, CONTACT } from "../data/content.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false); // Прокрутили ли страницу
  const [open, setOpen] = useState(false);         // Открыто ли мобильное меню

  // Шапка «поверх фото» (светлый текст) — только наверху и при закрытом меню
  const onPhoto = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-line bg-deep/70 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 sm:px-7">
        <Brand markSize={scrolled ? 30 : 34} light={onPhoto} /> {/* Логотип (светлый поверх фото) */}

        {/* Меню по центру */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`link-underline py-1.5 text-[0.9rem] font-medium transition-colors ${
                onPhoto ? "text-white/85 hover:text-white" : "text-mist hover:text-ice"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Правая часть: телефон + кнопка + бургер */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className={`hidden whitespace-nowrap text-[0.92rem] font-semibold transition-colors xl:block ${
              onPhoto ? "text-white hover:text-white/80" : "text-ice hover:text-teal"
            }`}
          >
            {CONTACT.phone}
          </a>
          {/* Главная кнопка: контурная (btn-aqua). Поверх фото — со светлой рамкой */}
          <a
            href="#contact"
            className={`hidden cursor-pointer rounded-lg px-5 py-2.5 text-[0.85rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              onPhoto
                ? "border border-white/60 text-white hover:bg-white/10"
                : "btn-aqua"
            }`}
          >
            Забронировать
          </a>
          {/* Бургер (только на телефоне) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className={`flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border lg:hidden ${
              onPhoto ? "border-white/40 text-white" : "border-line text-ice"
            }`}
          >
            <span className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ — выезжает справа (кремовый фон, тёмный текст) */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-99 flex flex-col justify-center gap-10 bg-deep/95 px-8 pb-12 pt-24 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-2 font-display text-3xl font-semibold text-ice transition-all hover:pl-2.5 hover:text-teal"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <a href={`tel:${CONTACT.phoneRaw}`} className="text-2xl font-semibold text-teal">
            {CONTACT.phone}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-aqua inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-7 py-4 font-semibold"
          >
            <Phone size={18} /> Забронировать прогулку
          </a>
        </div>
      </div>
    </header>
  );
}
