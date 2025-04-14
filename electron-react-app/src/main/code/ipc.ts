import { BrowserWindow, ipcMain } from "electron";
import { createConfigWindow } from "../config";

export const registerIpc = (win: BrowserWindow) => {
    ipcMain.on('hideWindow', () => {
        win.hide()
    })
    ipcMain.on('openCofigWindow', () => {
        createConfigWindow()
    })
}