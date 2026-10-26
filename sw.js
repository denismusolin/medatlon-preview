
const CACHE='medatlon-1beaa55fe29032f4';
const FILES=["./","./sw-register.js","./_expo/static/js/web/index-812d5ff5f87fe43b74000a9908ab7396.js","./assets/assets/answer.c431836a9785e54407f348a04e5a78fc.wav","./assets/assets/brand/dna.e2183f0f1c5c46939d90a269ffb61b59.png","./assets/assets/brand/flask.dc2839ce87089f6f9778bb67d56b7fed.png","./assets/assets/brand/loop-a.6fd0dbc71be5f7cfd67b70ba4907fef9.png","./assets/assets/brand/stethoscope.16e0716d0faceef234f61a6e8542212c.png","./assets/assets/fonts/Onest_400Regular.0bbf189d1297afd036a5efa3da1ed7ff.woff2","./assets/assets/fonts/Onest_600SemiBold.fed527a8b71ab4efbf5652f3c66d4c42.woff2","./assets/assets/fonts/Onest_800ExtraBold.c8291d479d199e174b918f6bdca26bfa.woff2","./assets/assets/fonts/Onest_900Black.f079bc21f41697fae3b357a3f01cc930.woff2","./favicon.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];
// 'reload' bypasses the browser's HTTP cache, so a new version never stores a stale page.
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(file=>new Request(file,{cache:'reload'}))))));
// A new version takes over when the learner taps "Aktualisieren" (sw-register.js) or once all old tabs are closed.
self.addEventListener('message',event=>{if(event.data==='skipWaiting')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('medatlon-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const saved=await cache.match(event.request);if(saved)return saved;
  try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html');throw error;}
 }));
});
