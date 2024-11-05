import axios from "axios";

const httpInstance = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 5000,
})

// 拦截器
httpInstance.interceptors.request.use(
    (config: any) => {
        return config
    },
    (err: any) => {
        return Promise.reject(err);
    }
)
httpInstance.interceptors.response.use(
    (response: any) => {
        return response
    },
    (err: any) => {
        return Promise.reject(err);
    }
)
export { httpInstance }