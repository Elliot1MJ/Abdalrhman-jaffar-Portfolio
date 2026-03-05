const CACHE_NAME = "portfolio-offline-v2";
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = ["/", "/index.html", OFFLINE_URL];
const IS_LOCALHOST =
    self.location.hostname === "localhost" ||
    self.location.hostname === "127.0.0.1" ||
    self.location.hostname === "[::1]";

self.addEventListener("install", (event) => {
    if (IS_LOCALHOST) {
        event.waitUntil(self.skipWaiting());
        return;
    }

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    if (IS_LOCALHOST) {
        event.waitUntil(
            (async () => {
                const keys = await caches.keys();
                await Promise.all(keys.map((key) => caches.delete(key)));
                await self.clients.claim();
            })(),
        );
        return;
    }

    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                    return Promise.resolve();
                }),
            );

            if (self.registration.navigationPreload) {
                await self.registration.navigationPreload.enable();
            }

            await self.clients.claim();
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method !== "GET") {
        return;
    }

    if (IS_LOCALHOST) {
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    return await fetch(request);
                } catch (_error) {
                    const cachedOfflinePage = await caches.match(OFFLINE_URL);
                    if (cachedOfflinePage) {
                        return cachedOfflinePage;
                    }

                    return new Response("Offline", {
                        status: 503,
                        headers: {
                            "Content-Type": "text/plain; charset=utf-8",
                        },
                    });
                }
            })(),
        );
        return;
    }

    const requestUrl = new URL(request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                const networkResponse = await fetch(request);
                const isSuccessful = networkResponse && networkResponse.status === 200;
                if (isSuccessful) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(request, networkResponse.clone());
                }
                return networkResponse;
            } catch (_error) {
                const fallbackImage = await caches.match("/images/project-fallback.svg");
                if (fallbackImage) {
                    return fallbackImage;
                }

                return new Response("", { status: 504 });
            }
        })(),
    );
});
