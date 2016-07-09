self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('csscolourgame').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo.png',
        '/csscolournames.js',
        '/icons/128x128.png',
        '/icons/256x256.png',
        '/icons/512x512.png',
        '/icons/64x64.png',
        '/icons/90x90.png',
        '/csscolournames.css'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});