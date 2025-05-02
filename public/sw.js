const cacheName = "appV1";
const assetsToCache = [
  "/",
  "/index.html",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/static/css/main.chunk.css",
  "/bootstrap.min.css",
  "/users", // May not cache properly if it's a dynamic route
];

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[ServiceWorker] Caching app shell...");
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate event - clean up old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        // Optional: Fallback content or offline page
        // return caches.match('/offline.html');
      })
    );
  } else {
    // Online behavior (optional): update cache from network
    // event.respondWith(
    //   fetch(event.request).catch(() => caches.match(event.request))
    // );
  }
});
