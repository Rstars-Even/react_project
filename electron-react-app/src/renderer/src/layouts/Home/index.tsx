import Result from "@renderer/components/Result"
import Search from "@renderer/components/Search"
import Error from "@renderer/components/Error"
// import useShortCut from "@renderer/hooks/useShortCut"
import useIgnoreMouseEvents from "@renderer/hooks/useIgnoreMouseEvents"
import { MutableRefObject, useEffect, useRef } from "react"
import { useStore } from "@renderer/store/useStore"
// import { CodeProvider } from "@renderer/context/CodeContext"

function Home(): JSX.Element {
    const mainRef = useRef<HTMLElement | null>(null)
    const { setIgnoreMouseEvents } = useIgnoreMouseEvents()
    useEffect(() => {
        setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
    }, [])

    const config = useStore((s) => s.config)
    window.api.shortCut(config.shortCut)
    window.api.setDatabaseDirectory(config.databaseDirectory)
    window.api.initTable()
    return (
        <main className="relative p-2" ref={mainRef}>
            {/* <CodeProvider> */}
            <Error />
            <Search></Search>
            <Result></Result>
            {/* </CodeProvider> */}
        </main>
    )
}

export default Home
