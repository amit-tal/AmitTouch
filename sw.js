const CACHE = 'amit-touch-dev-v3';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() => caches.match(req))
    );
    return;
  }

  if (/\.(?:js|css|html|json|webmanifest|svg|png|jpg|jpeg|webp|woff2?|otf|ttf)$/i.test(url.pathname)) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(fetch(req, { cache: 'no-store' }));
});
