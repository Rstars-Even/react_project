import { codes } from "@renderer/data"
import { ChangeEvent, useState } from "react"
import useCode from "./useCode"

export default () => {
    const { setData } = useCode()
    const [search, setSearch] = useState('')
    const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setData(
            codes.filter((code) => code.content.toLowerCase().includes(e.target.value.toLowerCase() || '@@@@@')).splice(0, 7)
        )
    }
    return { search, handleSeach }
}