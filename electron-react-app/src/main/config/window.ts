import { shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'

export function createWindow(): BrowserWindow {
    const { width } = screen.getPrimaryDisplay().workAreaSize
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 350,
        center: true,
        x: width - 500,
        y: 0,
        show: true,
        frame: true,
        transparent: false,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })
    mainWindow.webContents.openDevTools()
    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#config')
    } else {
        mainWindow.loadURL(
            url.format({
                //编译后的文件
                pathname: join(__dirname, '../renderer/index.html'),
                //协议
                protocol: 'file',
                //protocol 后面需要两个/
                slashes: true,
                //hash 的值
                hash: 'config'
            })
        )
    }
    return mainWindow
}
