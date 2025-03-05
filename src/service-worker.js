/* eslint-disable no-restricted-globals */

const CACHE_NAME = "verify-earn-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(urlsToCache);
        console.log("Assets cached successfully!");
      } catch (error) {
        console.error("Failed to cache:", error);
      }
    })
  );
  self.skipWaiting();
});

// Activate Service Worker and Clean Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Requests and Serve from Cache with Network Fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match("/index.html"); // Offline fallback
      });
    })
  );
});
