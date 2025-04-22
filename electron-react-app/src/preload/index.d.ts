import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: 'search', shortCut: string) => Promise<boolean>
      setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => void
      openCofigWindow: () => void
      sql: <T>(sql: string, type: SqlActionType, params?: Record<string, any>) => Promise<T>
    }
  }
}
