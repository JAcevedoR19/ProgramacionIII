const cacheName = 'peliculas-app-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/favorites.html',
    '/description.html',
    '/css/style.css',
    '/js/data.js',
    '/js/info.js',
    '/js/favorites.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    ];

    self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
        return cache.addAll(filesToCache);
        })
    );
    });

    self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((name) => {
            if (name !== cacheName) {
                return caches.delete(name);
            }
            })
        );
        })
    );
    });

    self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
        return response || fetch(event.request);
        })
    );
});
