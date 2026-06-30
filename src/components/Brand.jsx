// ============================================================================
//  Brand.jsx — ЛОГОТИП (значок-якорь + «Капитан Константин»).
//  Используется в шапке и в подвале.
// ============================================================================

// BrandMark — сам рисунок якоря/штурвала (это SVG — «векторная картинка кодом»).
// size — размер в пикселях. Менять рисунок не обязательно.
export function BrandMark({ size = 34, className = "" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      {/* Набор линий, из которых состоит значок. currentColor = берёт цвет из текста рядом */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="16" r="4.5" />
        <path d="M32 20.5 V49" />
        <path d="M22 27 H42" />
        <path d="M16 38 a16 16 0 0 0 32 0" />
        <path d="M16 38 h5 M48 38 h-5" />
        <path d="M16 38 l-3 4 M16 38 l4 2" />
        <path d="M48 38 l3 4 M48 38 l-4 2" />
      </g>
    </svg>
  );
}

// Brand — логотип целиком: значок + две строки текста. Клик ведёт наверх (#hero).
// light=true — светлый вариант (для тёмного фона, напр. поверх фото в hero)
export function Brand({ markSize = 34, onClick, light = false }) {
  return (
    <a
      href="#hero"
      onClick={onClick}
      className="group inline-flex items-center gap-3"
      aria-label="Капитан Константин — на главную"
    >
      {/* Значок-якорь; при наведении слегка поворачивается */}
      <span className={`grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[8deg] ${light ? "text-white" : "text-ice"}`}>
        <BrandMark size={markSize} />
      </span>
      {/* Текст логотипа в две строки */}
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-[1.1rem] font-semibold tracking-tight ${light ? "text-white" : "text-ice"}`}>
          Капитан Константин
        </span>
        <span className={`text-[0.6rem] font-medium uppercase tracking-[0.28em] ${light ? "text-white/75" : "text-mistdim"}`}>
          Петербург с воды
        </span>
      </span>
    </a>
  );
}
