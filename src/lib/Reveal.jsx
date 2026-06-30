// ============================================================================
//  Reveal.jsx — ПЛАВНОЕ ПОЯВЛЕНИЕ блоков при прокрутке.
//  Оборачиваете любой кусок в <Reveal>...</Reveal> — и он мягко «всплывает»,
//  когда пользователь до него долистал. Сами стили появления — в index.css
//  (классы .reveal / .is-visible). Этот файл решает КОГДА показать.
//  Менять тут обычно не нужно.
// ============================================================================
import { useEffect, useRef, useState } from "react";

/**
 * useReveal — следит, попал ли элемент в зону видимости.
 * offset 0.88 = показать, когда верх элемента поднялся выше 88% высоты экрана.
 */
function useReveal(offset = 0.88) {
  const ref = useRef(null);            // Ссылка на DOM-элемент, за которым следим
  const [visible, setVisible] = useState(false); // Видим он уже или нет

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;                  // Чтобы сработать только один раз

    const check = () => {              // Проверка положения элемента на экране
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * offset) { // Элемент достаточно поднялся?
        done = true;
        setVisible(true);              // Показать (добавится класс is-visible)
        cleanup();
      }
    };

    const cleanup = () => {            // Убрать слушатели после показа
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    window.addEventListener("scroll", check, { passive: true }); // Проверять при прокрутке
    window.addEventListener("resize", check);                    // ...и при изменении размера окна
    check();                                                     // И сразу при загрузке
    const t1 = setTimeout(check, 250);  // Подстраховка-проверки по таймеру
    const t2 = setTimeout(check, 900);

    return () => {                      // Уборка при удалении элемента
      cleanup();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [offset]);

  return [ref, visible];
}

/** <Reveal> — один блок, который появляется снизу вверх.
 *  Параметры: as="тег" (по умолч. div), delay=задержка в секундах, className=классы. */
export function Reveal({ children, delay = 0, as = "div", className = "", style, ...rest }) {
  const [ref, visible] = useReveal();
  const Tag = as;                       // Можно отрисовать как p, h2, section и т.д.
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`} // is-visible включает появление
      style={{ transitionDelay: visible ? `${delay}s` : "0s", ...style }} // delay — задержка анимации
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** <RevealGroup> — контейнер, дети которого (<RevealItem>) появляются «лесенкой». */
export function RevealGroup({ children, as = "div", className = "" }) {
  const [ref, visible] = useReveal(0.9);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal-group ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/** <RevealItem> — один элемент внутри RevealGroup (карточка и т.п.). */
export function RevealItem({ children, as = "div", className = "" }) {
  const Tag = as;
  return <Tag className={`reveal-item ${className}`}>{children}</Tag>;
}
