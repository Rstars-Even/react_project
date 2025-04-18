import { IUserAuth } from '@/hooks/useAuth'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
interface RouterContext {
    auth: IUserAuth
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            {/* <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <hr /> */}
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
})