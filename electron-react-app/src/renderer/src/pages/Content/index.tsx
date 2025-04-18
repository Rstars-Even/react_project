import { Button } from 'antd'
import './Content.css'
import { Form, useLoaderData } from 'react-router-dom'

export default function Content() {
    const content = useLoaderData() as ContentType
    return (
        <Form method='PUT'>
            <main className='content-main'>
                <input className='text-lg outline-none bg-slate-50 p-3' defaultValue={content.title} />
                <textarea className='border-t pt-5 text-sm outline-none text-slate-50 opacity-90 p-3' defaultValue={content.content} />
                <div>
                    <Button type='default' size='small'>保存</Button>
                </div>
            </main>
        </Form>
    )
}