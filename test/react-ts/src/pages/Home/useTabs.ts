import { fetchChannelAPI } from "@/apis/list"
import type { ChannelItem } from "@/apis/list"
import { useEffect, useState } from "react"

const useTabs = () => {
    const [channels, setChannels] = useState<ChannelItem[]>([])

    useEffect(() => {
        const getChannels = async () => {
            try {
                const result = await fetchChannelAPI()
                setChannels(result.data.data.channels)
            } catch (error) {
                throw new Error('fetch channel error')
            }
        }
        getChannels()
    }, [])

    return {
        channels
    }
}
export { useTabs }