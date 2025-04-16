import { Outlet } from 'react-router-dom'
import './index.css'
export default function Config() {
    return (
        <main className='container'>
            <Outlet />
        </main>
    )
}