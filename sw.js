/* Itqan Academy service worker — app shell cache (network-first for the page, cache-first for static assets) */
const CACHE = "itqan-v306";
// Match only the configured Supabase project; suffix checks also accept attacker-controlled domains.
const SUPABASE_HOST = "ymycfxmigvvermsdnagm.supabase.co";
const isSupabaseRequest = (url) => url.hostname === SUPABASE_HOST;
// Only persist REST content fetched with the public anon key. A logged-in user's
// JWT may receive RLS-filtered rows, so it must never enter the shared Cache API.
const isAnonymousSupabaseRead = (request) => {
  const apiKey = request.headers && request.headers.get("apikey");
  const authorization = request.headers && request.headers.get("authorization");
  return !!apiKey && authorization === `Bearer ${apiKey}`;
};
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
  if (isSupabaseRequest(url) && /\/rest\/v1\/(sections|contents|site_settings|tr_en)\b/.test(url.pathname)) {
    // Authenticated/RLS-scoped responses always go straight to the network and
    // are never read from or written to the shared offline cache.
    if (!isAnonymousSupabaseRead(req)) return;
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open("itqan-data").then((c) => c.put(req.url, cp)); } return r; }).catch(() => caches.open("itqan-data").then((c) => c.match(req.url)).then((h) => h || Response.error())));
    return;
  }
  // حماية من الزحمة: أي طلب قراءة من قاعدة البيانات لو رجع «مشغول» (429/503/502/504) بنعيده تلقائي بعد شوية بدل ما المستخدم يشوف خطأ
  if (isSupabaseRequest(url) && /\/rest\/v1\//.test(url.pathname)) {
    e.respondWith((async () => { let last; for (let i = 0; i < 4; i++) { try { const r = await fetch(req.clone()); if (![429, 502, 503, 504].includes(r.status)) return r; last = r; } catch (er) { last = null; } await new Promise((ok) => setTimeout(ok, 400 * (i + 1) + Math.random() * 600)); } return last || fetch(req); })());
    return;
  }
  // never cache API / auth / realtime calls
  if (isSupabaseRequest(url) || url.hostname.includes("translate") || url.hostname.includes("mymemory")) return;
  if (req.mode === "navigate" || (url.origin === location.origin && (url.pathname === "/" || url.pathname.endsWith(".html")))) {
    // الشبكة أولًا (أحدث نسخة دايمًا)، ولو مفيش نت أو اتأخر أكتر من ٤ ثواني نفتح المحفوظة
    const isMain = url.pathname === "/" || url.pathname === "/index.html";
    if (url.pathname.startsWith("/archive/")) { e.respondWith(fetch(req).catch(() => caches.match("/index.html"))); return; }
    const net = fetch(req, { cache: "no-store" }).then((r) => { if (r.ok && isMain) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put("/index.html", cp)); } return r; });
    const slow = isMain ? new Promise((res) => setTimeout(() => caches.match("/index.html").then((h) => h && res(h)), 6000)) : new Promise(() => {});
    e.respondWith(Promise.race([net, slow]).catch(() => (isMain || (req.mode === "navigate" && !/\.[a-z0-9]+$/i.test(url.pathname))) ? caches.match("/index.html") : caches.match(req)));
    return;
  }
  if (url.origin === location.origin || /cdn\.jsdelivr|cdnjs|fonts\.(googleapis|gstatic)/.test(url.hostname)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; })));
  }
});
