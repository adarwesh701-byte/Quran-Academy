// Itqan Academy desktop app: opens the live site, so every website update appears instantly.
const { app, BrowserWindow, shell, session } = require("electron");
const SITE = "https://itqan-maqamat-academy.vercel.app";
function create() {
  const w = new BrowserWindow({ width: 1280, height: 820, minWidth: 380, backgroundColor: "#faf7f2", title: "Itqan Academy", autoHideMenuBar: true, icon: __dirname + "/icon.png",
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false } });
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(["media", "fullscreen", "notifications", "clipboard-sanitized-write"].includes(perm)));
  w.webContents.setWindowOpenHandler(({ url }) => { if (!url.startsWith(SITE)) { shell.openExternal(url); return { action: "deny" }; } return { action: "allow" }; });
  w.webContents.on("will-navigate", (e, url) => { if (!url.startsWith(SITE) && !/supabase\.co|accounts\.google\.com|paypal\.com/.test(url)) { e.preventDefault(); shell.openExternal(url); } });
  // بدون نت: يفتح نسخة الموقع الكاملة المتخزنة جوه التطبيق
  w.webContents.on("did-fail-load", (e, code, desc, url, isMain) => { if (isMain && code !== -3) w.loadFile(__dirname + "/site/index.html"); });
  w.loadURL(SITE);
}
app.whenReady().then(create);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) create(); });
