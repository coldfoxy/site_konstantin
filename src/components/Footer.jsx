// ============================================================================
//  Footer.jsx — ПОДВАЛ сайта (нижняя часть).
//  Логотип + описание, разделы меню, контакты и иконки соцсетей.
//  Данные берутся из content.js (NAV — разделы, CONTACT — контакты/соцсети).
//  Год в копирайте подставляется автоматически (new Date().getFullYear()).
// ============================================================================
import { Send, Instagram } from "lucide-react";   // Иконки Telegram (самолётик) и Instagram
import { Brand } from "./Brand.jsx";
import { NAV, CONTACT } from "../data/content.js";

// У набора lucide нет иконки ВКонтакте — рисуем её сами (SVG ниже).
function VkIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12.8 16.3c-5 0-8.2-3.5-8.4-9.3h2.6c.1 4.3 2.1 6.1 3.6 6.5V7h2.4v3.7c1.5-.2 3-1.8 3.6-3.7h2.4c-.4 2.3-2 3.9-3.1 4.6 1.1.6 2.9 2 3.6 4.7h-2.6c-.5-1.8-1.9-3.2-3.5-3.4v3.4h-.2Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();           // Текущий год — для копирайта
  // Список соцсетей: иконка, подпись и ссылка (адреса собираются из content.js)
  const socials = [
    { Icon: Send, label: "Telegram-канал", href: `https://t.me/${CONTACT.telegramChannel}` },
    { Icon: Instagram, label: "Instagram", href: `https://instagram.com/${CONTACT.instagram}` },
    { Icon: VkIcon, label: "ВКонтакте", href: `https://vk.com/${CONTACT.vk}` },
  ];

  return (
    <footer className="relative z-10 border-t border-line bg-deep-2 pt-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-7">
        {/* Три колонки: бренд / разделы / контакты */}
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">

          {/* Колонка 1: логотип и описание */}
          <div>
            <Brand markSize={30} />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-mist">
              Премиальные прогулки по Санкт-Петербургу на катере Nobilis 858 — лодка года
              2025–2026.
            </p>
          </div>

          {/* Колонка 2: разделы меню (первые 5 пунктов NAV) */}
          <nav className="flex flex-col gap-2.5" aria-label="Навигация в подвале">
            <h4 className="mb-1 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-teal">Разделы</h4>
            {NAV.slice(0, 5).map((n) => (
              <a key={n.href} href={n.href} className="w-fit text-[0.95rem] text-mist transition-colors hover:text-teal">
                {n.label}
              </a>
            ))}
          </nav>

          {/* Колонка 3: контакты и соцсети */}
          <div className="flex flex-col gap-2.5">
            <h4 className="mb-1 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-teal">Контакты</h4>
            <a href={`tel:${CONTACT.phoneRaw}`} className="font-display text-[1.4rem] font-semibold text-ice transition-colors hover:text-teal">
              {CONTACT.phone}
            </a>
            <p className="text-[0.92rem] text-mist">
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </p>
            {/* Кружки соцсетей */}
            <div className="mt-2 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:text-teal">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя строка: копирайт и подпись */}
        <div className="flex flex-wrap justify-between gap-4 border-t border-line-soft py-6">
          <p className="text-[0.8rem] text-mistdim">
            © {year} Капитан Константин · Лицензия {CONTACT.license}
          </p>
          <p className="text-[0.8rem] text-mistdim">Сделано с любовью к Петербургу</p>
        </div>
      </div>
    </footer>
  );
}
