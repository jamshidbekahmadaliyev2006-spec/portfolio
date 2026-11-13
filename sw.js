const V="ja-v1";
const CORE=["./","index.html","css/style.css","js/app.js","manifest.webmanifest","img/logo.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET")return;
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&(res.type==="basic"||res.type==="cors")){const c=res.clone();caches.open(V).then(x=>x.put(r,c));}
    return res;
  }).catch(()=>caches.match("index.html"))));
});