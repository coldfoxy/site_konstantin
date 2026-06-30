// ============================================================================
//  Services.jsx — секция «УСЛУГИ» (крупная стеклянная панель со списком).
//  Слева — заголовок и кнопка, справа — список услуг с ценами.
//  Список услуг берётся из content.js (SERVICES).
// ============================================================================
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../lib/Reveal.jsx";
import { SERVICES } from "../data/content.js";

export default function Services() {
  return (
    <section id="services" className="relative py-[clamp(40px,7vw,90px)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* Большая стеклянная панель (glass-strong), скруглённая, с подсветкой */}
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16">
          {/* Цветное свечение внутри панели (бирюза + золото) */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(800px_500px_at_88%_-10%,rgba(26,26,26,0.035),transparent_60%),radial-gradient(640px_440px_at_-8%_110%,rgba(26,26,26,0.02),transparent_60%)]" />
          {/* Внутри панели — 2 колонки на больших экранах */}
          <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

            {/* --- ЛЕВО: заголовок и кнопка --- */}
            <div>
              <Reveal as="p" className="kicker">Услуги</Reveal>
              <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
                Всё для&nbsp;идеального вечера
              </Reveal>
              <Reveal as="p" delay={0.12} className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-mist">
                Добавьте к прогулке любые детали — мы возьмём организацию на себя.
              </Reveal>
              <Reveal delay={0.16}>
                <a href="#contact" className="btn-aqua group mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.92rem] font-semibold transition-all duration-300 hover:-translate-y-0.5">
                  Обсудить детали
                  <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            {/* --- ПРАВО: список услуг (строки с ценами) --- */}
            <RevealGroup className="flex flex-col">
              {SERVICES.map((s, i) => (               // Перебираем услуги из content.js
                <RevealItem key={s.title}>
                  {/* Строка услуги. У первой строки рамка сверху и снизу (border-y), у остальных — только снизу */}
                  <div className={`group flex items-center justify-between gap-6 py-6 transition-[padding] duration-400 hover:pl-3.5 ${i === 0 ? "border-y" : "border-b"} border-line`}>
                    <div>
                      <h3 className="font-display text-[1.3rem] font-semibold text-ice">{s.title}</h3>
                      <p className="mt-1.5 text-[0.92rem] text-mist">{s.text}</p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-semibold text-gold">{s.price}</span> {/* Цена справа, золотом */}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
