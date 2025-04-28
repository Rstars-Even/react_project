import { Add } from '@icon-park/react'
import dayjs from 'dayjs'
import { Form, NavLink, Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import './ContentList.css'

export default function ContentList() {
    const contents = useLoaderData() as ContentType[]
    const submit = useSubmit()
    return (
        <main className='content-page'>
            <div className='list'>
                <Form>
                    <div className='border-b px-3 flex justify-between items-center'>
                        <input
                            type="text"
                            name='searchWord'
                            placeholder='搜索...'
                            className='outline-none text-sm font-bold py-2 w-full'
                            onChange={(e) => submit(e.target.form)}
                        />
                        <Add
                            theme='outline'
                            size='18'
                            fill='#000'
                            strokeWidth={2}
                            onClick={() => { submit({ action: 'add' }, { method: 'POST' }) }}
                        />
                    </div>
                </Form>
                {contents.map((content) => (
                    <NavLink
                        key={content.id}
                        to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
                        className='flex justify-between items-center'
                    >
                        <div className='truncate'>{content.title}</div>
                        <div className='text-[10px] opacity-80'>
                            {dayjs(content.created_at).format('YYYY/MM/DD')}
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </main>
    )
}