/* Itqan Academy service worker — app shell cache (network-first for the page, cache-first for static assets) */
const CACHE = "itqan-v176";
const SHELL = ["/", "/index.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== "itqan-off" && k !== "itqan-data").map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // ملفات اتحفظت للاستخدام من غير نت (زرار «احفظ الصفحة دي») — بنقدّمها من النسخة المحفوظة لو النت قاطع
  if (url.origin !== location.origin && /\.(mp3|m4a|webm|ogg|wav|png|jpe?g|webp|svg|pdf)(\?|$)/i.test(url.pathname)) {
    e.respondWith(caches.open("itqan-off").then((c) => c.match(req.url).then((hit) => hit ? fetch(req).catch(() => hit) : fetch(req))));
    return;
  }
  // المحتوى العام (الأقسام والمحتوى والإعدادات والترجمة): الشبكة أولًا، ولو مفيش نت نعرض آخر نسخة
  if (url.hostname.endsWith("supabase.co") && /\/rest\/v1\/(sections|contents|site_settings|tr_en)\b/.test(url.pathname)) {
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open("itqan-data").then((c) => c.put(req.url, cp)); } return r; }).catch(() => caches.open("itqan-data").then((c) => c.match(req.url)).then((h) => h || Response.error())));
    return;
  }
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
