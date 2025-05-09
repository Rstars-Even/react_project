import { ipcMain } from "electron"
import { IpcMainInvokeEvent } from "electron/main"
import * as query from './query'

ipcMain.handle('sql', (_event: IpcMainInvokeEvent, sql: string, type: SqlActionType, params = {}) => {
    return query[type](sql, params)
})