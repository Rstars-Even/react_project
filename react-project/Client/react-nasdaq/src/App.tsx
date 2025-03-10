import { useAppRouter } from "@/hooks/useAppRouter"
import { useAppQuery } from "./hooks/useAppQuery"
import { useGetUserInfoQuery } from "./services/user"

function App() {
  const { AppQueryProvider } = useAppQuery()
  return <AppQueryProvider>
    <InItData />
  </AppQueryProvider>

}

function InItData() {
  const { isPending, isError, error, data } = useGetUserInfoQuery()
  const { AppRouterProvider } = useAppRouter()
  if (isPending) return <div>loading....</div>
  if (isError) return <div>{JSON.stringify(error)}</div>
  console.log('-----data------', data);
  return <AppRouterProvider />
}
export default App
