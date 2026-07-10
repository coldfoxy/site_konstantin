// ============================================================================
//  САМОУНИЧТОЖАЮЩИЙСЯ service-worker.
//  Нужен, чтобы убрать старый воркер, оставшийся у посетителей от прежнего сайта
//  на Tilda (он перехватывал загрузку и сайт «висел»). Когда браузер посетителя
//  проверяет обновление воркера по этому адресу — он забирает этот файл, который
//  чистит кэш, снимает свою регистрацию и перезагружает страницу.
//  Новых воркеров сайт не регистрирует. Можно удалить через несколько месяцев.
// ============================================================================
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      try {
        var keys = await caches.keys();
        await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      } catch (e) {}
      await self.registration.unregister();
      var clients = await self.clients.matchAll({ type: "window" });
      clients.forEach(function (c) { c.navigate(c.url); });
    })()
  );
});
