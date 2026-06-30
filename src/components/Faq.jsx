// ============================================================================
//  Faq.jsx — секция «ВОПРОСЫ И ОТВЕТЫ» (аккордеон: клик раскрывает ответ).
//  Вопросы и ответы берутся из content.js (список FAQ).
//  По умолчанию раскрыт первый вопрос (useState(0)). Поставьте useState(-1),
//  чтобы все были закрыты при загрузке.
// ============================================================================
import { useState } from "react";
import { Plus } from "lucide-react";            // Иконка «плюс» (поворачивается в крестик при открытии)
import { Reveal } from "../lib/Reveal.jsx";
import { FAQ } from "../data/content.js";

export default function Faq() {
  const [open, setOpen] = useState(0);          // Номер открытого вопроса (0 = первый)

  return (
    <section id="faq" className="relative py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* 2 колонки: слева заголовок (липкий), справа список вопросов */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* --- ЛЕВО: заголовок. lg:sticky = «прилипает» при прокрутке списка --- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal as="p" className="kicker">Вопросы и ответы</Reveal>
            <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
              Коротко о&nbsp;главном
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-mist">
              Собрали то, что чаще всего спрашивают перед прогулкой. Не нашли ответ —
              напишите, подскажем лично.
            </Reveal>
          </div>

          {/* --- ПРАВО: аккордеон --- */}
          <Reveal delay={0.1} className="flex flex-col">
            {FAQ.map((item, i) => {                 // Перебираем вопросы из content.js
              const isOpen = open === i;            // Этот вопрос сейчас раскрыт?
              return (
                <div key={item.q} className={`border-b border-line ${i === 0 ? "border-t" : ""}`}>
                  {/* Кнопка-вопрос. Клик: открыть этот / закрыть, если уже открыт */}
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  >
                    {/* Текст вопроса: открытый — бирюзовый, закрытый — тёмный */}
                    <span className={`font-display text-[1.18rem] font-semibold leading-snug transition-colors duration-300 sm:text-[1.3rem] ${isOpen ? "text-teal" : "text-ice group-hover:text-teal"}`}>
                      {item.q}
                    </span>
                    {/* Кружок с плюсом; при открытии поворачивается на 45° (крестик) */}
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-teal bg-teal/10 text-teal" : "border-line text-mist group-hover:border-teal/50 group-hover:text-teal"}`}>
                      <Plus size={18} />
                    </span>
                  </button>
                  {/* Ответ. Хитрость grid-template-rows 1fr/0fr = плавное раскрытие по высоте */}
                  <div className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-[0.98rem] leading-relaxed text-mist">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
