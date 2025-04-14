import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: 'search', shortCut: string) => Promise<boolean>
      setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => void
      openCofigWindow: () => void
      spl: <T>(sql: string, type: 'findAll' | 'findOne' | 'insert' | 'update' | 'del') => Promise<T>
    }
  }
}
