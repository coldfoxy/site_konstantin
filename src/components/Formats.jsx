// ============================================================================
//  Formats.jsx — секция «ФОРМАТЫ ПРОГУЛОК» (6 стеклянных карточек с иконками).
//  Карточки берутся из content.js (список FORMATS).
//  В каждой карточке поле icon — это название иконки из таблицы ICONS ниже.
//  Доступные значения icon: compass, heart, camera, glass, star, users.
//  Чтобы добавить новую иконку — импортируйте её из "lucide-react" и впишите в ICONS.
// ============================================================================
import { Compass, Heart, Camera, Wine, Star, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../lib/Reveal.jsx";
import { FORMATS } from "../data/content.js";

// Таблица: какое слово в content.js → какая иконка-картинка
const ICONS = { compass: Compass, heart: Heart, camera: Camera, glass: Wine, star: Star, users: Users };

export default function Formats() {
  return (
    <section id="formats" className="relative py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* Заголовок секции по центру */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal as="p" className="kicker kicker--center justify-center">Форматы прогулок</Reveal>
          <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
            Вечер на&nbsp;воде под&nbsp;ваше настроение
          </Reveal>
        </div>

        {/* Сетка карточек: 1 / 2 / 3 колонки в зависимости от ширины экрана */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((f) => {                      // Перебираем форматы из content.js
            const Icon = ICONS[f.icon] || Compass;   // Берём нужную иконку (если нет — компас)
            return (
              <RevealItem key={f.title}>
                {/* Карточка: glass = стекло, glow-border = светящаяся рамка при наведении,
                    hover:-translate-y-1.5 = слегка приподнимается */}
                <article className="glass glow-border group relative h-full overflow-hidden rounded-[1.25rem] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
                  {/* Бирюзовая подсветка внутри карточки при наведении */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(460px_220px_at_0%_0%,rgba(26,26,26,0.05),transparent_70%)]" />
                  {/* Квадрат с иконкой */}
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line text-teal transition-all duration-500 group-hover:border-teal/50 group-hover:bg-teal/5 group-hover:shadow-[0_0_22px_-6px_rgba(26,26,26,0.22)]">
                    <Icon size={26} strokeWidth={1.6} />
                  </span>
                  <h3 className="relative mt-6 font-display text-[1.32rem] font-semibold text-ice">{f.title}</h3>
                  <p className="relative mt-3 text-[0.96rem] leading-relaxed text-mist">{f.text}</p>
                  {/* Цена показывается, только если она задана в content.js (поле price) */}
                  {f.price && (
                    <span className="relative mt-4 inline-block font-semibold tracking-wide text-gold">
                      {f.price}
                    </span>
                  )}
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
