// ============================================================================
//  Contact.jsx — секция «КОНТАКТЫ» + ФОРМА ЗАЯВКИ.
//  Слева — способы связи и «Этикет на борту», справа — форма.
//  Данные (телефон, телеграм, адрес, этикет, варианты формата) — из content.js.
//  ВАЖНО: форма НЕ отправляет почту. Она копирует текст заявки в буфер обмена
//  и открывает чат капитана в Telegram (CONTACT.telegram) — текст останется вставить.
// ============================================================================
import { useState } from "react";
import { Phone, Send, MapPin } from "lucide-react"; // Иконки: телефон, самолётик, метка
import { Reveal } from "../lib/Reveal.jsx";
import { CONTACT, ETIQUETTE, FORMAT_OPTIONS } from "../data/content.js";

export default function Contact() {
  // Состояние формы — что ввёл пользователь в каждое поле:
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    format: FORMAT_OPTIONS[0],   // По умолчанию — первый вариант формата
    message: "",
  });
  const [touched, setTouched] = useState(false); // Пытались ли отправить (для подсветки ошибок)

  // Обновление одного поля формы при вводе:
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Отправка: собираем текст заявки, копируем его в буфер и открываем Telegram капитана
  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!form.name.trim() || !form.phone.trim()) return; // Имя и телефон обязательны

    const lines = [
      "Здравствуйте! Хочу забронировать прогулку.",
      `Имя: ${form.name.trim()}`,
      `Телефон: ${form.phone.trim()}`,
    ];
    if (form.date) lines.push(`Дата: ${form.date}`);
    if (form.format) lines.push(`Формат: ${form.format}`);
    if (form.message.trim()) lines.push(`Комментарий: ${form.message.trim()}`);

    // Telegram не умеет подставлять текст в личный чат по ссылке, поэтому копируем
    // заявку в буфер обмена (вставить Ctrl/Cmd+V) и открываем чат капитана в Telegram:
    const text = lines.join("\n");
    try { navigator.clipboard?.writeText(text); } catch (_) {}
    window.open(`https://t.me/${CONTACT.telegram}`, "_blank", "noopener");
  };

  // Три способа связи (телефон / телеграм / карта):
  const methods = [
    { icon: Phone, label: "Телефон · WhatsApp", value: CONTACT.phone, href: `tel:${CONTACT.phoneRaw}` },
    { icon: Send, label: "Telegram-канал", value: `@${CONTACT.telegramChannel}`, href: `https://t.me/${CONTACT.telegramChannel}` },
    { icon: MapPin, label: "Причал", value: CONTACT.address, href: CONTACT.mapUrl },
  ];

  // Общие классы для всех полей ввода (чтобы не повторять). Светлый фон, бирюзовая рамка при фокусе.
  const inputCls =
    "w-full rounded-xl border border-line bg-black/[0.03] px-4 py-3.5 text-[0.95rem] text-ice transition-colors placeholder:text-mistdim focus:border-teal focus:bg-teal/5 focus:outline-none [color-scheme:light]";

  return (
    <section id="contact" className="relative py-[clamp(80px,12vw,150px)]">
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* 2 колонки: слева инфо, справа форма */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">

          {/* --- ЛЕВО: текст, способы связи, этикет --- */}
          <div>
            <Reveal as="p" className="kicker">Бронирование</Reveal>
            <Reveal as="h2" delay={0.06} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-ice">
              Забронируйте свой идеальный&nbsp;вечер на&nbsp;воде
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist">
              Напишите или позвоните — подберём дату, маршрут и формат. Стоимость
              прогулки — {CONTACT.priceHour} в&nbsp;час, минимум один час.
            </Reveal>

            {/* Карточки способов связи */}
            <Reveal delay={0.16} className="mt-8 flex flex-col gap-3">
              {methods.map((m) => {
                const Icon = m.icon;
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:translate-x-1.5 hover:border-teal/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-teal">
                      <Icon size={20} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.72rem] uppercase tracking-[0.14em] text-mistdim">{m.label}</span>
                      <span className="text-[1.02rem] font-semibold text-ice">{m.value}</span>
                    </span>
                  </a>
                );
              })}
            </Reveal>

            {/* Интерактивная карта Яндекс: где причал (можно двигать и приближать колёсиком/кнопками).
                Точка причала — координаты в ссылке ниже: ll=ЦЕНТР и pt=ОТМЕТКА (долгота,широта).
                Чтобы сдвинуть точку — поменяйте оба числа (и то же в CONTACT.mapUrl в content.js).
                z=16 — масштаб (больше число = ближе). */}
            <Reveal delay={0.18} className="mt-3 overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Причал «Капитан Константин» на карте — Петровский пр., 5к1"
                src="https://yandex.ru/map-widget/v1/?ll=30.274740%2C59.959780&z=16&pt=30.274740%2C59.959780%2Cpm2rdm"
                className="block h-64 w-full sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>

          </div>

          {/* --- ПРАВО: форма заявки --- */}
          <Reveal delay={0.12}>
            <div className="glass-strong rounded-[1.5rem] p-7 sm:p-9">
              <h3 className="font-display text-[1.6rem] font-semibold text-ice">Оставить заявку</h3>
              <p className="mt-1.5 text-[0.92rem] text-mist">Ответим в течение дня и поможем выбрать формат.</p>

              {/* onSubmit={submit} = при отправке вызывается функция submit выше */}
              <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-4">
                {/* Поле «Имя» (обязательное — краснеет, если пусто после попытки отправки) */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="bf-name" className="text-[0.74rem] uppercase tracking-[0.1em] text-mist">Ваше имя</label>
                  <input id="bf-name" type="text" value={form.name} onChange={update("name")} placeholder="Как к вам обращаться" className={`${inputCls} ${touched && !form.name.trim() ? "border-red-400" : ""}`} />
                </div>
                {/* Поле «Телефон» (обязательное) */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="bf-phone" className="text-[0.74rem] uppercase tracking-[0.1em] text-mist">Телефон</label>
                  <input id="bf-phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+7 ___ ___ __ __" className={`${inputCls} ${touched && !form.phone.trim() ? "border-red-400" : ""}`} />
                </div>
                {/* Дата и формат в одну строку (2 колонки) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="bf-date" className="text-[0.74rem] uppercase tracking-[0.1em] text-mist">Желаемая дата</label>
                    <input id="bf-date" type="date" value={form.date} onChange={update("date")} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="bf-format" className="text-[0.74rem] uppercase tracking-[0.1em] text-mist">Формат</label>
                    {/* Выпадающий список — варианты из content.js (FORMAT_OPTIONS) */}
                    <select id="bf-format" value={form.format} onChange={update("format")} className={inputCls}>
                      {FORMAT_OPTIONS.map((o) => (
                        <option key={o} className="bg-deep text-ice">{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Комментарий */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="bf-msg" className="text-[0.74rem] uppercase tracking-[0.1em] text-mist">Комментарий</label>
                  <textarea id="bf-msg" rows={2} value={form.message} onChange={update("message")} placeholder="Сколько гостей, пожелания по маршруту…" className={`${inputCls} resize-y`} />
                </div>
                {/* Кнопка отправки (копирует заявку и открывает Telegram) */}
                <button type="submit" className="btn-aqua mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg px-7 py-4 font-semibold transition-all duration-300 hover:-translate-y-0.5">
                  <Send size={18} /> Отправить в Telegram
                </button>
                <p className="text-center text-[0.74rem] text-mistdim">
                  Текст заявки скопируется, откроется чат в Telegram — вставьте его и отправьте.
                </p>
              </form>
            </div>

            {/* Этикет на борту — под формой (перенесён из левой колонки) */}
            <div className="glass mt-6 rounded-2xl p-6">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-teal">Этикет на борту</h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {ETIQUETTE.map((e) => (
                  <li key={e} className="relative pl-4 text-[0.88rem] text-mist before:absolute before:left-0 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-teal">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
