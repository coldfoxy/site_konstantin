// ============================================================================
//  Boat.jsx — секция «КАТЕР» (Nobilis 858).
//  Слева — коллаж из фото, справа — текст, характеристики и список «На борту».
//  Список «На борту» берётся из content.js (AMENITIES). Фото — в папке public/img.
// ============================================================================
import { Check, Award } from "lucide-react";       // Иконки: галочка, медаль
import { Reveal } from "../lib/Reveal.jsx";         // Обёртка для плавного появления
import { AMENITIES } from "../data/content.js";     // Список удобств

export default function Boat() {
  return (
    <section id="boat" className="relative py-[clamp(72px,11vw,140px)]"> {/* py = отступы сверху/снизу */}
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* Сетка в 2 колонки на больших экранах (lg:grid-cols-...), на телефоне — в одну */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">

          {/* --- ЛЕВО: коллаж из фото --- */}
          <Reveal className="flex flex-col gap-4">
            <figure className="relative overflow-hidden rounded-[1.5rem] border border-line shadow-[0_40px_90px_-50px_rgba(32,32,28,0.28)]">
              <img
                src="img/boat-tiser.mp4"
                alt="Катер Nobilis 858 «Капитан Константин» на воде"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />
              {/* Стеклянная плашка-награда поверх фото */}
            </figure>
            {/* Два фото поменьше в ряд */}
            <div className="grid grid-cols-2 gap-4">
              <img src="img/interior-cockpit.jpg" alt="Кокпит и штурвал катера Nobilis 858" className="aspect-[4/3] w-full rounded-2xl border border-line object-cover" loading="lazy" />
              <img src="img/interior-seats.jpg" alt="Кожаные шезлонги и тиковая палуба на борту" className="aspect-[4/3] w-full rounded-2xl border border-line object-cover" loading="lazy" />
            </div>
          </Reveal>

          {/* --- ПРАВО: текст и характеристики --- */}
          <div>
            <Reveal as="p" className="kicker">Катер</Reveal> {/* Метка-надпись (стиль .kicker) */}
            {/* Заголовок секции. delay = задержка появления */}
            <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
              Nobilis 858
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist">
              Премиальный катер с характером: кожаные шезлонги, тёплая каюта и палуба
              из тика. Создан для того, чтобы любоваться Петербургом в комфорте и тишине.
            </Reveal>

            {/* Три характеристики в строку (длина / гости / цена) */}
            <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-6">
              {[
                { num: "8,58 м", cap: "длина" },
                { num: "до 7", cap: "гостей" },
                { num: "20 000 ₽", cap: "за час · от 1 ч" },
              ].map((s) => (                          // Эти три значения заданы прямо тут
                <div key={s.cap} className="flex flex-col">
                  <span className="font-display text-[1.7rem] font-semibold text-ice">{s.num}</span>
                  <span className="mt-0.5 text-[0.72rem] uppercase tracking-[0.1em] text-mistdim">{s.cap}</span>
                </div>
              ))}
            </Reveal>

            {/* Подзаголовок списка удобств */}
            <Reveal as="h3" delay={0.18} className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-teal">
              На борту
            </Reveal>
            {/* Список «На борту» в 2 колонки — берётся из content.js (AMENITIES) */}
            <Reveal delay={0.2} className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {AMENITIES.map((a) => (
                <span key={a} className="flex items-center gap-2.5 text-[0.95rem] text-mist">
                  <Check size={15} className="shrink-0 text-teal" strokeWidth={2.5} /> {/* бирюзовая галочка */}
                  {a}
                </span>
              ))}
            </Reveal>

            {/* Две кнопки внизу */}
            <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="btn-aqua inline-flex cursor-pointer items-center rounded-full px-7 py-3.5 text-[0.92rem] font-semibold transition-all duration-300 hover:-translate-y-0.5">
                Забронировать катер
              </a>
              <a href="#routes" className="btn-aqua inline-flex cursor-pointer items-center rounded-lg px-7 py-3.5 text-[0.92rem] font-semibold transition-all duration-300 hover:-translate-y-0.5">
                Выбрать маршрут
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
