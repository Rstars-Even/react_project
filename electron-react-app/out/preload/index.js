"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  shortCut: (shortCut) => {
    return electron.ipcRenderer.invoke("shortCut", shortCut);
  },
  setIgnoreMouseEvents: (ignore, options) => {
    electron.ipcRenderer.send("setIgnoreMouseEvents", ignore, options);
  },
  openCofigWindow: () => {
    electron.ipcRenderer.send("openCofigWindow");
  },
  sql: (sql, type, params = {}) => {
    return electron.ipcRenderer.invoke("sql", sql, type, params);
  },
  openWindow: (name) => {
    electron.ipcRenderer.send("openWindow", name);
  },
  closeWindow: (name) => {
    electron.ipcRenderer.send("closeWindow", name);
  },
  selectDatabaseDirectory: () => {
    return electron.ipcRenderer.invoke("selectDatabaseDirectory");
  },
  setDatabaseDirectory: (path) => {
    electron.ipcRenderer.send("setDatabaseDirectory", path);
  },
  initTable: () => {
    electron.ipcRenderer.send("initTable");
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
