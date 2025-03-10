import { IUser } from "@/type/user"

const data = {
    user: {}
} as { user: IUser }

export const useAuth = () => {
    const user = (field: keyof IUser) => {
        return data.user[field];
    }
    return { user }
}

export type IUserAuth = ReturnType<typeof useAuth>