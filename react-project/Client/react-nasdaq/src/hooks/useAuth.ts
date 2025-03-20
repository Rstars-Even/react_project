import { IUser } from "@/type/user"

const data = {
    user: {}
} as { user: IUser }

export const useAuth = () => {
    const user = (field: keyof IUser) => {
        return data.user[field];
    }
    const setUser = (user: IUser) => {
        data.user = user
    }
    return { user, setUser }
}

export type IUserAuth = ReturnType<typeof useAuth>