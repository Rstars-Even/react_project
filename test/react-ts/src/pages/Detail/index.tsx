import { useEffect, useState } from "react"
import { fetchDetailAPI, DetailDataType } from "@/apis/detail";
import { useNavigate, useSearchParams } from "react-router-dom"
import { NavBar } from "antd-mobile";

function Detail() {
    const [detail, setDetail] = useState<DetailDataType | null>(null)
    // 获取路由参数
    const [params] = useSearchParams()
    const id = params.get('id')

    useEffect(() => {
        const getDetail = async () => {
            try {
                const res = await fetchDetailAPI(id!)
                setDetail(res.data.data)
            } catch (err) {
                throw new Error('...')
            }
        }
        getDetail()
    }, [id])

    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }

    if (!detail) {
        return <div>this is loading...</div>
    }

    return (
        <>
            <div>
                <NavBar onBack={back}>{detail?.title}</NavBar>
                <div
                    dangerouslySetInnerHTML={{
                        __html: detail?.content
                    }}></div>
            </div>
        </>
    )
}

export default Detail
