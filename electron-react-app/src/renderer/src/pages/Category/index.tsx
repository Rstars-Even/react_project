import { Add, DatabaseSetting } from '@icon-park/react'
import { Outlet } from 'react-router-dom'
import './index.css'

export default function Category() {
    return (
        <main className='category-page'>
            <div className='categories'>vue.js</div>
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