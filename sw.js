const CACHE = 'amit-touch-v2';
const APP_SHELL = ['/', '/manifest.webmanifest', '/assets/amit-touch-logo.svg', '/assets/amit-touch-heart.svg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
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
      fetch(req).then(async res => {
        let html = await res.text();
        html = html
          .replace('יופי מתחיל<br>בפרטים הקטנים', 'הטאץ׳ הקטן שעושה את כל ההבדל')
          .replace('<div class="splash-heart">♡</div>', '<div class="splash-heart"><img src="/assets/amit-touch-heart.svg" alt="" style="width:44px;height:48px;object-fit:contain;display:block;margin:0 auto"></div>');
        return new Response(html, {status: res.status, statusText: res.statusText, headers: {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'}});
      }).catch(() => caches.match('/'))
    );
    return;
  }

  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req))
  );
});
