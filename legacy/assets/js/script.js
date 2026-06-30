/* ============================================================
   КАПИТАН КОНСТАНТИН — interactions
   ============================================================ */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const ctaFloating = document.querySelector(".cta-floating");

  /* ---------- header scroll state + floating CTA ---------- */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (ctaFloating) ctaFloating.classList.toggle("show", y > 800);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggleMenu = (open) => {
    const isOpen = open ?? !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", isOpen);
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) toggleMenu(false);
  });

  /* ---------- reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- gallery lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const galleryImgs = Array.from(
    document.querySelectorAll("#galleryGrid .g-item img")
  );
  let current = 0;

  const showImage = (i) => {
    current = (i + galleryImgs.length) % galleryImgs.length;
    const src = galleryImgs[current].getAttribute("src");
    lbImg.setAttribute("src", src);
    lbImg.setAttribute("alt", galleryImgs[current].getAttribute("alt") || "");
  };
  const openLb = (i) => {
    showImage(i);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  galleryImgs.forEach((img, i) => {
    img.parentElement.addEventListener("click", () => openLb(i));
  });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbNext").addEventListener("click", () => showImage(current + 1));
  document.getElementById("lbPrev").addEventListener("click", () => showImage(current - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") showImage(current + 1);
    if (e.key === "ArrowLeft") showImage(current - 1);
  });

  /* ---------- booking form -> WhatsApp ---------- */
  const form = document.getElementById("bookingForm");
  const PHONE = "79119908089";
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();

      if (!name || !phone) {
        form.querySelector(name ? "#bf-phone" : "#bf-name").focus();
        return;
      }

      const lines = [
        "Здравствуйте! Хочу забронировать прогулку.",
        `Имя: ${name}`,
        `Телефон: ${phone}`,
      ];
      const date = (data.get("date") || "").toString().trim();
      const fmt = (data.get("format") || "").toString().trim();
      const msg = (data.get("message") || "").toString().trim();
      if (date) lines.push(`Дата: ${date}`);
      if (fmt) lines.push(`Формат: ${fmt}`);
      if (msg) lines.push(`Комментарий: ${msg}`);

      const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- year in footer (auto) ---------- */
  const yearEl = document.querySelector(".footer-bottom p");
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace("2026", new Date().getFullYear());
  }
})();
