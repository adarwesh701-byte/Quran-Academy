// Pure URL/permission policy for Electron. Kept separate so it can be unit-tested without Electron.
const SITE_HOSTS = new Set([
  "itqan-maqamat-academy.vercel.app",
  "quran-itqan.com",
  "www.quran-itqan.com",
]);
const IN_APP_HOSTS = new Set([
  ...SITE_HOSTS,
  "ymycfxmigvvermsdnagm.supabase.co",
  "accounts.google.com",
  "paypal.com",
  "www.paypal.com",
]);
const APP_PERMISSIONS = new Set([
  "media",
  "fullscreen",
  "notifications",
  "clipboard-sanitized-write",
]);

function parseUrl(raw) {
  try {
    if (typeof raw !== "string" || raw.length > 4096) return null;
    return new URL(raw);
  } catch {
    return null;
  }
}
function isAllowedInApp(raw) {
  const u = parseUrl(raw);
  return !!u && u.protocol === "https:" && !u.username && !u.password && IN_APP_HOSTS.has(u.hostname);
}
function isAcademyOrigin(raw) {
  const u = parseUrl(raw);
  return !!u && u.protocol === "https:" && !u.username && !u.password && SITE_HOSTS.has(u.hostname);
}
function isPermissionAllowed(origin, permission) {
  return isAcademyOrigin(origin) && APP_PERMISSIONS.has(permission);
}
function safeExternalUrl(raw) {
  const u = parseUrl(raw);
  if (!u || u.username || u.password) return null;
  if (u.protocol === "https:" || u.protocol === "mailto:") return u.href;
  return null;
}

module.exports = { parseUrl, isAllowedInApp, isAcademyOrigin, isPermissionAllowed, safeExternalUrl };
