"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  hideWindow: () => {
    electron.ipcRenderer.send("hideWindow");
  },
  shortCut: (type, shortCut) => {
    return electron.ipcRenderer.invoke("shortCut", type, shortCut);
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
