"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const url = require("node:url");
const Database = require("better-sqlite3");
const node_path = require("node:path");
const ignoreMouseEvents = (win2) => {
  electron.ipcMain.on("setIgnoreMouseEvents", (_enent, ignore, options) => {
    win2.setIgnoreMouseEvents(ignore, options);
  });
};
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow$1() {
  const { width } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new electron.BrowserWindow({
    width: 500,
    height: 500,
    center: true,
    x: width - 500,
    y: 0,
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
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/#config");
  } else {
    mainWindow.loadURL(
      url.format({
        //编译后的文件
        pathname: path.join(__dirname, "../renderer/index.html"),
        //协议
        protocol: "file",
        //protocol 后面需要两个/
        slashes: true,
        //hash 的值
        hash: "config"
      })
    );
  }
  return mainWindow;
}
let win = null;
const createConfigWindow = () => {
  if (!win) win = createWindow$1();
  win.on("closed", () => win = null);
};
const registerIpc = (win2) => {
  electron.ipcMain.on("hideWindow", () => {
    win2.hide();
  });
  electron.ipcMain.on("openCofigWindow", () => {
    createConfigWindow();
  });
};
const config = {
  search: ""
};
const registerShortCut = (win2) => {
  electron.ipcMain.handle("shortCut", (_event, type, shortCut) => {
    if (config.search) electron.globalShortcut.unregister(config.search);
    config.search = shortCut;
    switch (type) {
      case "search":
        return registerSearchShortCut(win2, shortCut);
    }
  });
};
function registerSearchShortCut(win2, shortCut) {
  return electron.globalShortcut.register(shortCut, () => {
    win2.isVisible() ? win2.hide() : win2.show();
  });
}
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
function createWindow() {
  const { width } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new electron.BrowserWindow({
    width: 500,
    height: 350,
    center: true,
    x: width - 500,
    y: 0,
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
  const win2 = createWindow();
  registerIpc(win2);
  registerShortCut(win2);
  ignoreMouseEvents(win2);
});
const file = node_path.resolve(electron.app.getPath("home"), "Desktop", "dq.db");
const db = new Database(file, {});
db.pragma("journal_mode = WAL");
db.exec(`
    create table if not exists categories (
        id integer primary key autoincrement not null,
        name text not null,
        created_at text not null
    );
`);
db.exec(`
    create table if not exists contents (
        id integer primary key autoincrement not null,
        title text not null,
        content text not null,
        category_id integer,
        created_at text not null
    );
`);
const findAll = (sql) => {
  return db.prepare(sql).all();
};
const findOne = (sql) => {
  return db.prepare(sql).get();
};
const insert = (sql) => {
  return db.prepare(sql).run().lastInsertRowid;
};
const update = (sql) => {
  return db.prepare(sql).run().changes;
};
const del = (sql) => {
  return db.prepare(sql).run().changes;
};
const query = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del,
  findAll,
  findOne,
  insert,
  update
}, Symbol.toStringTag, { value: "Module" }));
electron.ipcMain.handle("sql", (_event, sql, type) => {
  return query[type](sql);
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
