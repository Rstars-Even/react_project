import Result from "./components/Result"
import Search from "./components/Search"
import Error from "./components/Error"
import useShortCut from "./hooks/useShortCut"
import useIgnoreMouseEvents from "./hooks/useIgnoreMouseEvents"
import { MutableRefObject, useEffect, useRef } from "react"
// import { CodeProvider } from "./context/CodeContext"

function App(): JSX.Element {
  const mainRef = useRef<HTMLElement | null>(null)
  const { setIgnoreMouseEvents } = useIgnoreMouseEvents()
  useEffect(() => {
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
  }, [])

  const { register } = useShortCut()
  register('search', 'CommandOrControl+shift+]')
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

export default App
