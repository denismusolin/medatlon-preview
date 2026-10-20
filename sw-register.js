(function(){
if(!('serviceWorker' in navigator))return;
var base="/medatlon-preview/",reloading=false;
function words(de,ru){return document.documentElement.lang==='ru'?ru:de;}
// A new version waits until the learner chooses to switch, so it never interrupts a running exercise.
function offer(worker){
 if(document.getElementById('medatlon-update'))return;
 var bar=document.createElement('div');bar.id='medatlon-update';bar.setAttribute('role','status');
 bar.style.cssText='position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:1000;display:flex;align-items:center;gap:10px;max-width:calc(100% - 32px);box-sizing:border-box;padding:10px 12px 10px 16px;border-radius:18px;background:#232323;color:#fff;font:600 14px/1.3 system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25)';
 var text=document.createElement('span');text.textContent=words('Neue Version verfügbar.','Доступна новая версия.');
 var update=document.createElement('button');update.type='button';update.textContent=words('Aktualisieren','Обновить');
 update.style.cssText='min-height:44px;padding:0 16px;border:0;border-radius:14px;background:#A8C866;color:#232323;font:800 14px system-ui,sans-serif;cursor:pointer';
 var later=document.createElement('button');later.type='button';later.textContent='×';later.setAttribute('aria-label',words('Später','Позже'));
 later.style.cssText='min-width:44px;min-height:44px;border:0;background:none;color:#fff;font:400 22px system-ui,sans-serif;cursor:pointer';
 update.onclick=function(){reloading=true;worker.postMessage('skipWaiting');};
 later.onclick=function(){bar.remove();};
 bar.append(text,update,later);document.body.appendChild(bar);
}
window.addEventListener('load',function(){
 navigator.serviceWorker.register(base+'sw.js',{scope:base}).then(function(reg){
  if(reg.waiting&&navigator.serviceWorker.controller)offer(reg.waiting);
  reg.addEventListener('updatefound',function(){var w=reg.installing;if(w)w.addEventListener('statechange',function(){if(w.state==='installed'&&navigator.serviceWorker.controller)offer(w);});});
  // Look for a new version when the tab is shown again and every 30 minutes.
  document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')reg.update().catch(function(){});});
  setInterval(function(){reg.update().catch(function(){});},1800000);
 }).catch(function(){/* Online preview remains usable when offline caching is unavailable. */});
 navigator.serviceWorker.addEventListener('controllerchange',function(){if(reloading)location.reload();});
});
})();
