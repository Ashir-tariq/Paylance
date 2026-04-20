// sw.js — Paylance Service Worker
// PWA ke liye — offline support + caching


// ✅ Naya
const CACHE_NAME = 'paylance-v2';

// Yeh files cache ho jaengi — app offline bhi khulega
// ✅ Naya — script.js hata do
const STATIC_FILES = [
    '/',
    '/index.html',
    '/static/style.css',   // CSS cache theek hai
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

// Install — static files cache karo
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_FILES).catch(err => {
                console.warn('[SW] Some files failed to cache:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate — purana cache saaf karo
self.addEventListener('activate', event => {
    console.log('[SW] Activated!');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // API calls cache mat karo — hamesha network se lo
    if (url.pathname.startsWith('/api/')) {
        return; // Normal network request
    }

    // Static files ke liye: cache first, phir network
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;

            return fetch(request).then(response => {
                // Cache mein save karo for next time
                if (response && response.status === 200 && request.method === 'GET') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, clone);
                    });
                }
                return response;
            }).catch(() => {
                // Offline hai aur cache mein bhi nahi — index.html bhejo
                if (request.destination === 'document') {
                    return caches.match('/index.html');
                }
            });
        })
    );
});
