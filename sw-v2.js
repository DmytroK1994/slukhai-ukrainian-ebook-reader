const CACHE='slukhai-v52';
const CORE=['./','./index.html','./styles.css?v=52','./updates.css?v=52','./app.js?v=52','./config.js?v=52','./build-version.json?v=52','./manifest.webmanifest?v=52','./icon.svg?v=52','./vendor/epubjs/epub.min.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>event.respondWith(fetch(event.request).then(response=>{if(event.request.method==='GET'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html')))));
