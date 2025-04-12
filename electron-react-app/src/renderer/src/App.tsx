import Result from "./components/Result"
import Search from "./components/Search"
import Error from "./components/Error"
import useShortCut from "./hooks/useShortCut"
// import { CodeProvider } from "./context/CodeContext"

function App(): JSX.Element {
  const { register } = useShortCut()
  register('search', 'CommandOrControl+shift+]')
  return (
    <main className="relative">
      {/* <CodeProvider> */}
      <Error />
      <Search></Search>
      <Result></Result>
      {/* </CodeProvider> */}
    </main>
  )
}

export default App
