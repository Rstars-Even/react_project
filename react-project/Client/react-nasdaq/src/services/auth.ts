import { useAxios } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export const useLoginMutation = () => {
    const { axiosInstance } = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data: { account: string, password: string }) => {
            const response = await axiosInstance.post('/auth/login', data)
            return response.data
        },
        onSuccess: () => {
            // console.log('登录成功！');
            toast.success('登录成功', { position: 'top-center' })
            navigate({ to: '/' })
        }
    })
}