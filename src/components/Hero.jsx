// ============================================================================
//  Hero.jsx — ГЛАВНЫЙ ЭКРАН (первое, что видит посетитель).
//  Фон — ВИДЕО или ФОТО на весь экран (определяется автоматически):
//    • если в public/img есть файл hero.mp4 — играет видео (без звука, зациклено);
//    • если видео нет — показывается фото (poster = img/boatphoto.jpg).
//  Хотите видео → загрузите hero.mp4 в public/img. Хотите обратно фото → удалите hero.mp4.
//  Сменить фото: замените boatphoto.jpg или поменяйте poster ниже. Текст — БЕЛЫЙ.
// ============================================================================
import { ArrowRight, Anchor, Award } from "lucide-react";
import { STATS } from "../data/content.js";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* --- ФОНОВОЕ ВИДЕО ИЛИ ФОТО на весь экран --- */}
      <div className="absolute inset-0 -z-0">
        {/* <video> играет hero.mp4, если он есть в public/img. Пока видео нет —
            показывается poster (фото). Видео — без звука (muted), зациклено (loop),
            автозапуск (autoPlay), без перехода в полноэкранный режим на телефоне (playsInline). */}
        <video
          className="h-full w-full animate-kenburns object-cover"
          poster="img/boatphoto.jpg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="img/hero.mp4" type="video/mp4" />
        </video>
        {/* Лёгкое равномерное затемнение — чтобы белый текст читался. Сильнее/слабее: black/30…/50 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- КОНТЕНТ поверх фото (белый) --- */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pt-28 pb-20 sm:px-7 sm:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          {/* Бейдж «лодка года» — прозрачная плашка со светлой рамкой */}
          <a
            href="#boat"
            className="rise inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.78rem] font-medium text-white backdrop-blur-md"
            style={{ animationDelay: "0s" }}
          >
            <Award size={15} className="text-white" />
            Nobilis 858 — лодка года 2025–2026
          </a>

          {/* ГЛАВНЫЙ ЗАГОЛОВОК — белый. Менять текст — прямо здесь. */}
          <h1
            className="rise mt-7 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "0.08s" }}
          >
            Искусство присутствия.
            <br className="hidden sm:block" />{" "}
            <span className="text-white">Капитан Константин</span>
          </h1>

          {/* Подзаголовок — белый */}
          <p
            className="rise mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]"
            style={{ animationDelay: "0.18s" }}
          >
            Новый премиальный катер Nobilis 858 и авторский взгляд на город,
            который чувствуется глубже обычного.
          </p>

          {/* Две кнопки: главная — контурная (как везде), вторая — со светлой рамкой под фото */}
          <div
            className="rise mt-9 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "0.26s" }}
          >
            <a
              href="#contact"
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/60 px-8 py-4 text-[0.98rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Забронировать прогулку
            </a>
            <a
              href="#boat"
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/60 px-8 py-4 text-[0.98rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Смотреть катер
            </a>
          </div>

          {/* Три цифры — белый текст на прозрачной плашке */}
          <div
            className="rise mx-auto mt-12 max-w-2xl"
            style={{ animationDelay: "0.34s" }}
          >
            <ul className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-black/25 px-3 py-4 backdrop-blur-md sm:px-7 sm:py-5">
              {STATS.map((s, i) => (
                <li
                  key={s.label}
                  className={`flex flex-col items-center text-center ${
                    i > 0 ? "border-l border-white/15" : ""
                  }`}
                >
                  <span className="font-display text-[clamp(1.25rem,2.6vw,2rem)] font-semibold text-white">
                    {s.num}
                  </span>
                  <span className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-white/70 sm:text-[0.72rem]">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Цитата — вверху справа, сразу под кнопкой «Забронировать», с линией-акцентом справа.
          hidden lg:block = видна на широких экранах. Положение — классы top и right; размер —
          text-[clamp(...)]. Текст менять — прямо здесь. */}
      <figure
        className="rise absolute right-8 top-20 z-20 hidden max-w-[19rem] border-r border-white/35 pr-5 text-right lg:block xl:right-12"
        style={{ animationDelay: "0.5s" }}
      >
        <blockquote className="font-display text-[clamp(1.05rem,1.15vw,1.28rem)] italic leading-snug text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.65)]">
          «И вот вся жизнь, круженье, пенье<br />
          Моря, пустыни, города,<br />
          Мелькающее отраженье<br />
          Потерянного навсегда»
        </blockquote>
        <figcaption className="mt-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/60">
          Николай Гумилёв
        </figcaption>
      </figure>
    </section>
  );
}
