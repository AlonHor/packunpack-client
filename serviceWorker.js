const staticCache = "dev-coffee-site-v1";
const assets = ["/assets/img/favicon.ico"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCache).then((cache) => {
      caches.keys().then((names) => {
        for (let name of names) caches.delete(name);
      });
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
