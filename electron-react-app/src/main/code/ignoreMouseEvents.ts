import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";

export default (win: BrowserWindow) => {
    ipcMain.on('setIgnoreMouseEvents', (_enent: IpcMainEvent, ignore: boolean, options?: { forward: boolean }) => {
        win.setIgnoreMouseEvents(ignore, options)
    })
}