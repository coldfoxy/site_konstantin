// ============================================================================
//  Captain.jsx — секция «КАПИТАН».
//  Слева — текст о капитане и цитата, справа — вертикальное фото.
//  Весь текст написан прямо здесь. Номер лицензии берётся из content.js (CONTACT).
// ============================================================================
import { Reveal } from "../lib/Reveal.jsx";
import { CONTACT } from "../data/content.js";

export default function Captain() {
  return (
    <section id="captain" className="relative py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* 2 колонки на больших экранах: слева текст, справа фото */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">

          {/* --- ЛЕВО: текст --- */}
          <div>
            <Reveal as="p" className="kicker">Капитан</Reveal>
            <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
              Константин — капитан и&nbsp;фотохудожник
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist">
              Я вырос на воде и знаю Петербург с той стороны, которую не видно с набережных.
              Каждая прогулка — это не просто маршрут, а история города, рассказанная между
              мостов, на закате и в отражениях Невы.
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-mist">
              Я провожу вас по любимым местам, подскажу лучший ракурс для кадра и сниму вас
              так, чтобы вечер на воде остался с вами надолго. Тихо, внимательно
              и по-настоящему.
            </Reveal>

            {/* Цитата с бирюзовой полоской слева (border-l) и градиентным текстом */}
            <Reveal delay={0.2}>
              <blockquote className="my-9 border-l-2 border-teal pl-6 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-medium italic leading-[1.4] text-aqua-gradient">
                «Петербург открывается тем, кто смотрит на него с воды.»
                <cite className="mt-3 block text-[0.95rem] font-normal not-italic tracking-wide text-mist">
                  — Константин
                </cite>
              </blockquote>
            </Reveal>

            {/* Строка про лицензию — номер подставляется из content.js */}
            <Reveal as="p" delay={0.24} className="text-[0.82rem] tracking-wide text-mistdim">
              Лицензированный судоводитель · {CONTACT.license}
            </Reveal>
          </div>

          {/* --- ПРАВО: фото. order-first/lg:order-last = на телефоне фото сверху, на ПК справа --- */}
          <Reveal delay={0.12} className="relative order-first lg:order-last">
            {/* Мягкое бирюзовое свечение за фото */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#2a3550]/10 blur-3xl" />
            <figure className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border border-line shadow-[0_40px_90px_-50px_rgba(32,32,28,0.3)]">
              <img
                src="img/kapitan-tiser.jpg"
                alt="Башня Лахта-центра сквозь капли дождя на стекле катера"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              {/* Стеклянная подпись на фото */}
              <figcaption className="glass absolute inset-x-4 bottom-4 flex items-baseline gap-2.5 rounded-xl px-4 py-3">
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-mist">Константин Нефедов</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
