import { app } from "electron";
import { registerIpc } from "./ipc";
import { registerShortCut } from "./shortCut";
import { createWindow } from "./window";

app.whenReady().then(() => {
    const win = createWindow()
    registerIpc(win)
    registerShortCut(win)
})