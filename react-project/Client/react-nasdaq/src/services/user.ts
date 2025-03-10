import { useAxios } from "@/hooks/useAxios"
import { IUser } from "@/type/user"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetUserInfoQuery = () => {
    const { axiosInstance } = useAxios()
    return useQuery<IUser, AxiosError>({
        queryKey: ['useGetUserInfoQuery'],
        queryFn: async () => {
            return await axiosInstance.get('/user/current')
        }
    })
}