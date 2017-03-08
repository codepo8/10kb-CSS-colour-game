self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('csscolourgame-v10').then(cache => {
      return cache.addAll([
        '/10kb-CSS-colour-game/',
        '/10kb-CSS-colour-game/index.html',
        '/10kb-CSS-colour-game/logo.png',
        '/10kb-CSS-colour-game/csscolournames.js',
        '/10kb-CSS-colour-game/icons/128x128.png',
        '/10kb-CSS-colour-game/icons/256x256.png',
        '/10kb-CSS-colour-game/icons/512x512.png',
        '/10kb-CSS-colour-game/icons/64x64.png',
        '/10kb-CSS-colour-game/icons/90x90.png',
        '/10kb-CSS-colour-game/csscolournames.css'
      ])
      .then(() => self.skipWaiting());
    })
  )
});
 
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['csscolourgame-v10'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
