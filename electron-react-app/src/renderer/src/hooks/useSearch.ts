import { codes } from "@renderer/data"
import { useStore } from "@renderer/store/useStore"
import { ChangeEvent } from "react"

export default () => {
    const { setData } = useStore((s) => s)
    const { search, setSearch } = useStore()
    const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setData(
            codes.filter((code) => code.content.toLowerCase().includes(e.target.value.toLowerCase() || '@@@@@')).splice(0, 7)
        )
    }
    return { search, handleSeach }
}