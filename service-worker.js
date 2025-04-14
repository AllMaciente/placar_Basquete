const CACHE_NAME = "placar-cache-v1";
const URLS_TO_CACHE = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
