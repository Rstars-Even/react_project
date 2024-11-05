import { Image, List, InfiniteScroll } from 'antd-mobile'
import { useEffect, useState } from 'react'
// import { users } from './users' //make 数据。
import type { ListRes } from '@/apis/list'
import { fetchListAPI } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
    channelId: string
}

const HomeList = (props: Props) => {
    const { channelId } = props
    // 获取列表数据
    const [ListRes, setListRes] = useState<ListRes>({
        results: [],
        pre_timestamp: "" + new Date().getTime(),
    })

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: '' + new Date().getTime()
                })
                setListRes({
                    results: res.data.data.results,
                    pre_timestamp: res.data.data.pre_timestamp
                })
            } catch (error) {
                throw new Error("fetch list error");
            }
        }
        getList()
    }, [channelId])

    // 是否还有数据
    const [hasMore, setHasMore] = useState(true)
    // 加载下一页函数
    const loadMore = async () => {
        try {
            const res = await fetchListAPI({
                channel_id: channelId,
                timestamp: ListRes.pre_timestamp
            })
            // 新数据和旧数据合并
            setListRes({
                results: [...ListRes.results, ...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })
            // 停止监听
            if (res.data.data.results.length === 0) {
                setHasMore(false)
            }
        } catch (error) {
            throw new Error("fetch list error");
        }
    }

    const navigate = useNavigate()
    const goToDetail = (id: string) => {
        navigate(`/detail?id=${id}`)
    }

    return (
        <>
            <List>
                {ListRes.results.map((item) => (
                    <List.Item
                        onClick={() => goToDetail(item.art_id)}
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit='cover'
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                    >
                        {item.title}

                    </List.Item>
                ))}
            </List>
            <InfiniteScroll hasMore={hasMore} loadMore={loadMore} threshold={10} />
        </>
    )
}

export default HomeList