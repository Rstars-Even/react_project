import { useAxios } from "@/hooks/useAxios"
import { IUser } from "@/type/user"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetUserInfoQuery = () => {
    const { axiosInstance } = useAxios()
    return useQuery<{ data: IUser }, AxiosError>({
        queryKey: ['useGetUserInfoQuery'],
        queryFn: async () => {
            const response = await axiosInstance.get('/user/current')
            return response.data
        }
    })
}