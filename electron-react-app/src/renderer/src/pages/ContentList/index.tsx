import { Outlet, useLoaderData } from 'react-router-dom'
import './ContentList.css'

import { ContentSearch } from '@renderer/components/ContentSearch';
import { ContentItem } from '@renderer/components/ContentItem';

export default function ContentList() {
    const contents = useLoaderData() as ContentType[]
    return (
        <main className='content-page'>
            <div className='list'>
                <ContentSearch />
                {contents.map((content) => (
                    <ContentItem content={content} key={content.id} />
                ))}
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </main>
    )
}