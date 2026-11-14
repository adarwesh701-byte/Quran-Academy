/* Itqan Academy service worker — app shell cache (network-first for the page, cache-first for static assets) */
const CACHE = "itqan-v99";
const SHELL = ["/", "/index.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // never cache API / auth / realtime calls
  if (url.hostname.endsWith("supabase.co") || url.hostname.includes("translate") || url.hostname.includes("mymemory")) return;
  if (req.mode === "navigate" || (url.origin === location.origin && (url.pathname === "/" || url.pathname.endsWith(".html")))) {
    // الشبكة أولًا (أحدث نسخة دايمًا)، ولو مفيش نت أو اتأخر أكتر من ٤ ثواني نفتح المحفوظة
    const net = fetch(req, { cache: "no-store" }).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put("/index.html", cp)); } return r; });
    const slow = new Promise((res) => setTimeout(() => caches.match("/index.html").then((h) => h && res(h)), 4000));
    e.respondWith(Promise.race([net, slow]).catch(() => caches.match("/index.html")));
    return;
  }
  if (url.origin === location.origin || /cdn\.jsdelivr|cdnjs|fonts\.(googleapis|gstatic)/.test(url.hostname)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; })));
  }
});
