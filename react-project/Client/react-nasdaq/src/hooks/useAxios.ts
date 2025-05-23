import { useValidateStore } from "@/store/useValidateStore";
import axios, { AxiosError } from "axios"

export const useAxios = () => {
    const setErrors = useValidateStore(s => s.setErrors)
    const axiosInstance = axios.create({
        baseURL: '/dq',
        timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    });

    // 添加请求拦截器
    axiosInstance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    }, function (error: AxiosError) {

        switch (error.status) {
            case 422: {
                setErrors(error.response?.data.errors)
                break;
            }
        }
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    return { axiosInstance }
}