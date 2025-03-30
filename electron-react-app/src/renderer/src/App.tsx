import Result from "./components/Result"
import Search from "./components/Search"
import { CodeProvider } from "./context/CodeContext"

function App(): JSX.Element {

  return (
    <CodeProvider>
      <Search></Search>
      <Result></Result>
    </CodeProvider>
  )
}

export default App
