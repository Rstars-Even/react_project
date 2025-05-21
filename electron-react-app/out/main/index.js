"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const Database = require("better-sqlite3");
const node_path = require("node:path");
const node_fs = require("node:fs");
const mockjs = require("mockjs");
const path = require("path");
const url = require("node:url");
const config$2 = {
  databaseDirectory: ""
};
const db = () => {
  let dir = node_path.resolve(electron.app.getPath("home"), "Desktop");
  if (config$2.databaseDirectory && node_fs.existsSync(config$2.databaseDirectory)) {
    dir = config$2.databaseDirectory;
  }
  const db2 = new Database(dir + "/dq.db", {});
  db2.pragma("journal_mode = WAL");
  return db2;
};
const findAll = (sql, params = {}) => {
  return db().prepare(sql).all(params);
};
const findOne = (sql) => {
  return db().prepare(sql).get();
};
const insert = (sql) => {
  return db().prepare(sql).run().lastInsertRowid;
};
const update = (sql, params) => {
  return db().prepare(sql).run(params).changes;
};
const del = (sql, params = {}) => {
  return db().prepare(sql).run(params).changes;
};
const config$1 = () => {
  const res = findOne(`select * from config where id=1`);
  return JSON.parse(res.content);
};
const query = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$1,
  del,
  findAll,
  findOne,
  insert,
  update
}, Symbol.toStringTag, { value: "Module" }));
function initTable() {
  db().exec(`
  create table if not exists categories (
    id integer primary key autoincrement not null,
    name text not null,
    created_at text not null
  );
`);
  db().exec(`
  create table if not exists contents (
    id integer primary key autoincrement not null,
    title text not null,
    content text not null,
    category_id integer,
    created_at text not null
  );
`);
  db().exec(`
  create table if not exists config (
    id integer primary key autoincrement not null,
    content text not null
  );
`);
  initData();
}
function initData() {
  const isInit = findOne("select * from contents");
  if (isInit) return;
  db().exec(`
  INSERT INTO config (content) VALUES('{"shortCut":"Alt+Space","databaseDirectory":""}');
  `);
  for (let i = 1; i <= 10; i++) {
    const name = mockjs.Random.title(5, 10);
    db().exec(`
    INSERT INTO categories (name,created_at) VALUES('${name}',datetime());
  `);
    for (let j = 1; j < 20; j++) {
      const title = mockjs.Random.title(5, 10);
      const content = mockjs.Random.paragraph(5, 10);
      db().exec(`
    INSERT INTO contents (title,content,category_id,created_at) VALUES('${title}','${content}',${i},datetime());
  `);
    }
  }
}
electron.ipcMain.handle("sql", (_event, sql, type, params = {}) => {
  return query[type](sql, params);
});
electron.ipcMain.handle("selectDatabaseDirectory", async () => {
  const res = await electron.dialog.showOpenDialog({
    //对话框窗口的标题
    title: "选择目录",
    //选择文件、目录，并支持多选
    properties: ["openDirectory", "createDirectory"]
  });
  return res.canceled ? "" : res.filePaths[0];
});
electron.ipcMain.on("setDatabaseDirectory", (_event, path2) => {
  config$2.databaseDirectory = path2;
});
electron.ipcMain.on("initTable", () => {
  initTable();
});
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow(options) {
  const win = new electron.BrowserWindow(
    Object.assign(
      {
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
      },
      options
    )
  );
  if (utils.is.dev && options.openDevTools) win.webContents.openDevTools();
  win.on("ready-to-show", () => {
    options.initShow && win.show();
  });
  win.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"] + options.hash);
  } else {
    win.loadURL(
      url.format({
        //编译后的文件
        pathname: path.join(__dirname, "../renderer/index.html"),
        //协议
        protocol: "file",
        //protocol 后面需要两个/
        slashes: true,
        //hash 的值
        hash: options.hash?.substring(1)
      })
    );
  }
  return win;
}
const config = {
  search: {
    id: 0,
    options: {
      initShow: true,
      hash: "",
      openDevTools: false
    }
  },
  code: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: false,
      width: 1e3,
      height: 600,
      frame: true,
      transparent: false,
      hash: "/#config/Category/ContentList"
    }
  },
  config: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: false,
      width: 500,
      height: 350,
      frame: true,
      transparent: false,
      hash: "/#config"
    }
  }
};
const getByNameWindow = (name) => {
  let win = electron.BrowserWindow.fromId(config[name].id);
  if (!win) {
    win = createWindow(config[name].options);
    config[name].id = win.id;
  }
  return win;
};
const getWindowByEvent = (event) => {
  return electron.BrowserWindow.fromWebContents(event.sender);
};
electron.app.whenReady().then(() => {
  getByNameWindow("search");
});
electron.ipcMain.on("openWindow", (_event, name) => {
  getByNameWindow(name).show();
});
electron.ipcMain.on("closeWindow", (_event, name) => {
  getByNameWindow(name).hide();
});
electron.ipcMain.on("setIgnoreMouseEvents", (event, ignore, options) => {
  getWindowByEvent(event).setIgnoreMouseEvents(ignore, options);
});
electron.ipcMain.handle("shortCut", (_event, shortCut) => {
  return registerSearchShortCut(shortCut);
});
function registerSearchShortCut(shortCut) {
  electron.globalShortcut.unregisterAll();
  if (shortCut && electron.globalShortcut.isRegistered(shortCut)) {
    electron.dialog.showErrorBox("温馨提示", "快捷键注册失败，请检查快捷键是否已被占用");
    return false;
  }
  const win = getByNameWindow("search");
  return electron.globalShortcut.register(shortCut, () => {
    win.isVisible() ? win.hide() : win.show();
  });
}
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
const registerAppGlobShortcut = () => {
  const configData = config$1();
  if (configData.shortCut) {
    registerSearchShortCut(configData.shortCut);
  }
};
electron.app.whenReady().then(() => {
  registerAppGlobShortcut();
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.app.on("activate", function() {
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
