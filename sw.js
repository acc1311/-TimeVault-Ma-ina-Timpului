/* TimeVault Service Worker — cache app shell, network-first for data */
const CACHE = "timevault-v1";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // App shell -> cache-first with network refresh
  if (e.request.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then((cached) =>
        fetch(e.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("./index.html", copy));
            return res;
          })
          .catch(() => cached || caches.match("./"))
      )
    );
    return;
  }

  // Data APIs (Wikipedia, Google Translate) -> network-first, cache fallback
  if (url.origin.includes("wikipedia.org") || url.hostname === "translate.googleapis.com") {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Static assets -> cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
