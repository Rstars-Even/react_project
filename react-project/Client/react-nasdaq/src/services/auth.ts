import { useAxios } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
    const { axiosInstance } = useAxios()
    return useMutation({
        mutationFn: async (data: { account: string, password: string }) => {
            const response = await axiosInstance.post('/auth/login', data)
            return response.data
        },
        onSuccess: () => {
            console.log('登录成功！');
        }
    })
}