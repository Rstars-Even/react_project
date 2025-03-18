import { create } from "zustand"

interface ValidateState {
    errors: Record<string, string[]>
    setErrors: (errors: Record<string, string[]>) => void
}

export const useValidateStore = create<ValidateState>()((set) => ({
    errors: {},
    setErrors: (errors) => set((state) => {
        return { errors: { ...state.errors, ...errors } }
    })
}))