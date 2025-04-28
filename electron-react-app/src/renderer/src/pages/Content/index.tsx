import './Content.css'
import { Form, useLoaderData, useSubmit } from 'react-router-dom'

export default function Content() {
    const submit = useSubmit()
    const content = useLoaderData() as ContentType
    return (
        <Form method='PUT'>
            <main className='content-main' key={content.id}>
                <input
                    name='title'
                    autoFocus
                    defaultValue={content.title}
                    onChange={(e) => { submit(e.target.form) }}
                    className='text-lg outline-none bg-slate-50 p-3'
                />
                <textarea
                    name='content'
                    placeholder='请输入内容...'
                    defaultValue={content.content}
                    onChange={(e) => { submit(e.target.form) }}
                    className='border-t pt-5 outline-none text-sm bg-slate-50 opacity-90 p-3'
                />
            </main>
        </Form>
    )
}