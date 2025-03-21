
self.addEventListener('install', event => {
  console.log('Service Worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
      if (event.request.url.match(/.mp4/i)) {
        console.log('interception worked! for', event.request.url);
      }
});
