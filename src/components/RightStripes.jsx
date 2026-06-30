// ============================================================================
//  RightStripes.jsx — фирменные ВЕРТИКАЛЬНЫЕ ПОЛОСКИ справа (как у J.K. Place).
//  Закреплены у правого края, на всю высоту, ПОД контентом (z-0): главное фото
//  в hero их перекрывает сверху, а в секциях (прозрачный фон) они проступают.
//  Показываются на широких экранах (от 1380px), чтобы не залезать на текст.
//  Цвета — в src/index.css (--color-stripe-red / --color-stripe-blue).
//  Размеры: w-5 = красная (20px), w-3.5 = синяя (14px), gap-3 = промежуток,
//  pr-7 = отступ от края. Видеть на всех экранах: min-[1380px]:flex → flex.
// ============================================================================
export default function RightStripes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden items-stretch gap-3 pr-7 min-[1380px]:flex"
    >
      <span className="w-5 bg-[var(--color-stripe-red)]" />    {/* красная полоса (20px) */}
      <span className="w-5 bg-[var(--color-stripe-blue)]" /> {/* синяя полоса (14px) */}
    </div>
  );
}
