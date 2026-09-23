
const CACHE='medatlon-33bb088ec10f2399';
const FILES=["./","./_expo/static/js/web/index-3faaef158da723dc81af09ccebd014a3.js","./assets/assets/answer.c431836a9785e54407f348a04e5a78fc.wav","./index.html"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
// Activate a new version after old tabs close, so an update never interrupts a session.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('medatlon-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const saved=await cache.match(event.request);if(saved)return saved;
  try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html');throw error;}
 }));
});
