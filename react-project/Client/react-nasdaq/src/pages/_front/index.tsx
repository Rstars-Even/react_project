import { FrontNavbar } from '@/components/navbar/FrontNavbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <main>
    <FrontNavbar />
  </main>
}
