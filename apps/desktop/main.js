// Itqan Academy desktop app. External navigation is restricted to explicit HTTPS hosts.
const { app, BrowserWindow, shell } = require("electron");

const SITE = "https://itqan-maqamat-academy.vercel.app";
const { isAllowedInApp, isPermissionAllowed, safeExternalUrl } = require("./security");

function openExternalSafely(raw) {
  const safeUrl = safeExternalUrl(raw);
  if (safeUrl) shell.openExternal(safeUrl);
}

function create() {
  const w = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 380,
    backgroundColor: "#faf7f2",
    title: "Itqan Academy",
    autoHideMenuBar: true,
    icon: __dirname + "/icon.png",
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
    },
  });

  const ses = w.webContents.session;
  ses.setPermissionRequestHandler((webContents, permission, callback, details) => {
    const origin = details && details.requestingOrigin;
    callback(isPermissionAllowed(origin, permission));
  });
  ses.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
    return isPermissionAllowed(requestingOrigin, permission);
  });

  w.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedInApp(url)) return { action: "allow" };
    openExternalSafely(url);
    return { action: "deny" };
  });

  const guardNavigation = (event, url) => {
    if (isAllowedInApp(url)) return;
    event.preventDefault();
    openExternalSafely(url);
  };
  w.webContents.on("will-navigate", guardNavigation);
  w.webContents.on("will-redirect", guardNavigation);
  w.webContents.on("will-attach-webview", (event) => event.preventDefault());

  // Offline fallback is bundled by the desktop build workflow.
  w.webContents.on("did-fail-load", (event, code, description, url, isMainFrame) => {
    if (isMainFrame && code !== -3) {
      w.loadFile(__dirname + "/site/index.html").catch(() => {});
    }
  });

  w.loadURL(SITE);
}

app.whenReady().then(create);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) create();
});
