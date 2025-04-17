import { Add, DatabaseSetting } from '@icon-park/react'
import { Outlet, useLoaderData } from 'react-router-dom'
import './index.css'

export default function Category() {
    const categories = useLoaderData() as CategoryType
    return (
        <main className='category-page'>
            <div className='categories'>

            </div>
            <div className='nav'>
                <Add theme='outline' size='20' strokeWidth={2} />
                <DatabaseSetting theme='outline' size='20' strokeWidth={2} />
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </main>
    )
}