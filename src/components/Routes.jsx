// ============================================================================
//  Routes.jsx — секция «МАРШРУТЫ» (4 карточки с фото).
//  Все 4 карточки берутся из content.js (список ROUTES): номер, заголовок,
//  длительность, фото. Чтобы изменить маршруты — правьте ROUTES, а не этот файл.
//  ВАЖНО: текст здесь лежит ПОВЕРХ тёмных фото, поэтому он СВЕТЛЫЙ (text-white,
//  text-teal-glow) — это специально, чтобы читался на фото.
// ============================================================================
import { Reveal, RevealGroup, RevealItem } from "../lib/Reveal.jsx";
import { ROUTES } from "../data/content.js";

export default function Routes() {
  return (
    <section id="routes" className="relative py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* --- Заголовок секции по центру --- */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal as="p" className="kicker kicker--center justify-center">Маршруты</Reveal>
          <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
            Четыре взгляда на&nbsp;город
          </Reveal>
          <Reveal as="p" delay={0.12} className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist">
            Выберите направление или доверьтесь капитану — он составит маршрут под ваше
            настроение и погоду.
          </Reveal>
        </div>

        {/* Сетка карточек: 1 колонка на телефоне, 2 на планшете, 4 на ПК. Появляются «лесенкой» */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTES.map((r) => (                       // Перебираем маршруты из content.js
            <RevealItem key={r.num}>
              {/* group = чтобы фото увеличивалось при наведении на карточку */}
              <article className="group relative flex min-h-[440px] cursor-pointer items-end overflow-hidden rounded-[1.25rem] border border-line">
                {/* Фото на весь фон карточки; при наведении плавно увеличивается (group-hover:scale) */}
                <img
                  src={r.img}
                  alt={r.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  loading="lazy"
                />
                {/* Затемнение снизу, чтобы текст читался */}
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/95 via-abyss/35 to-transparent" />
                {/* Бирюзовое свечение снизу при наведении */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(70%_50%_at_50%_100%,rgba(255,255,255,0.12),transparent_70%)]" />
                {/* Текст карточки (поверх фото) */}
                <div className="relative z-10 p-6">
                  <span className="font-display text-[1rem] font-semibold tracking-[0.1em] text-teal-glow">{r.num}</span> {/* Номер — яркой бирюзой */}
                  <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-tight text-white">     {/* Заголовок — белым */}
                    {r.title}
                  </h3>
                  {/* Пилюля с длительностью */}
                  <span className="mt-3 inline-block rounded-full border border-white/35 px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.14em] text-[#ece0c6]">
                    {r.meta}
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
