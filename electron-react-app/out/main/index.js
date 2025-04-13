"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const ignoreMouseEvents = (win) => {
  electron.ipcMain.on("setIgnoreMouseEvents", (_enent, ignore, options) => {
    win.setIgnoreMouseEvents(ignore, options);
  });
};
const registerIpc = (win) => {
  electron.ipcMain.on("hideWindow", () => {
    win.hide();
  });
};
const config = {
  search: ""
};
const registerShortCut = (win) => {
  electron.ipcMain.handle("shortCut", (_event, type, shortCut) => {
    if (config.search) electron.globalShortcut.unregister(config.search);
    config.search = shortCut;
    switch (type) {
      case "search":
        return registerSearchShortCut(win, shortCut);
    }
  });
};
function registerSearchShortCut(win, shortCut) {
  return electron.globalShortcut.register(shortCut, () => {
    win.isVisible() ? win.hide() : win.show();
  });
}
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 500,
    height: 350,
    center: true,
    // x: width - 500,
    // y: 0,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.webContents.openDevTools();
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  return mainWindow;
}
electron.app.whenReady().then(() => {
  const win = createWindow();
  registerIpc(win);
  registerShortCut(win);
  ignoreMouseEvents(win);
});
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
