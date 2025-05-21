import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'

interface StateProps {
    config: ConfigDataType
    setConfig: (config: ConfigDataType) => void
    data: ContentType[]
    setData: (data: ContentType[]) => void
    search: string
    setSearch: (search: string) => void
    error: string
    setError: (message: string) => void
    id: number
    setId: (id: number) => void
    editCategoryId: number
    setEditCategoryId: (id: number) => void
}
export const useStore = create<StateProps>()(
    persist(
        (set) => ({
            config: { databaseDirectory: '', shortCut: '' },
            setConfig: (config) => set({ config }),
            data: [],
            setData: (data) => set({ data }),
            search: '',
            setSearch: (content) => set({ search: content }),
            error: '',
            setError: (message) => set({ error: message }),
            id: 0,
            setId: (id) => set({ id }),
            editCategoryId: 0,
            setEditCategoryId: (editCategoryId) => set({ editCategoryId }),
        }),
        {
            name: 'nasdaq-storage',
            storage: createJSONStorage(() => localStorage),
            // 只持久化 config 和 setConfig，其他状态不存储
            partialize: (state) => ({
                config: state.config,
                setConfig: state.setConfig,
            }),
        }
    )
);