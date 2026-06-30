// ============================================================================
//  App.jsx — СБОРКА СТРАНИЦЫ. Здесь перечислены все секции В ПОРЯДКЕ показа.
//  Чтобы ПОМЕНЯТЬ ПОРЯДОК секций — переставьте строки <...> внутри <main>.
//  Чтобы УБРАТЬ секцию — удалите её строку (и, по желанию, импорт сверху).
// ============================================================================

// Импорты — подключаем каждый файл-секцию из папки components:
import Header from "./components/Header.jsx";       // Шапка (меню сверху)
import Hero from "./components/Hero.jsx";           // Главный экран
import Boat from "./components/Boat.jsx";           // Катер
import Captain from "./components/Captain.jsx";     // Капитан
import Routes from "./components/Routes.jsx";       // Маршруты
import Formats from "./components/Formats.jsx";     // Форматы прогулок
import Services from "./components/Services.jsx";   // Услуги (тёмный блок)
import GalleryOverlay from "./components/GalleryOverlay.jsx"; // Галерея (открывается по клику «Галерея»)
import Faq from "./components/Faq.jsx";             // Вопросы и ответы
import Contact from "./components/Contact.jsx";     // Контакты + форма заявки
import Footer from "./components/Footer.jsx";       // Подвал
import FloatingCta from "./components/FloatingCta.jsx"; // Плавающая кнопка «Забронировать»
import RightStripes from "./components/RightStripes.jsx"; // Фирменные полоски справа

// Сам сайт: порядок секций сверху вниз = порядок строк ниже.
export default function App() {
  return (
    <>
      <Header />               {/* Шапка закреплена сверху */}
      <main className="relative z-1"> {/* Основное содержимое (z-1 = поверх фонового свечения) */}
        <Hero />
        <Boat />
        <Captain />
        <Routes />
        <Formats />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />               {/* Подвал */}
      <FloatingCta />          {/* Кнопка, появляется при прокрутке */}
      <RightStripes />         {/* Красно-синие полоски у правого края */}
      <GalleryOverlay />       {/* Полноэкранная галерея (по клику «Галерея») */}
    </>
  );
}
