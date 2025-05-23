import { Delete } from "@icon-park/react"
import { NavLink, useSubmit } from "react-router-dom"
import { useContextMenu } from 'mantine-contextmenu';
import dayjs from "dayjs";
import "./index.css"

interface Props {
    content: ContentType
}
export const ContentItem = ({ content }: Props) => {
    const submit = useSubmit()
    const { showContextMenu } = useContextMenu();
    return (
        <NavLink
            key={content.id}
            to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
            className={({ isActive }) => {
                return [isActive ? 'active' : '', 'link-contentList'].join(' ')
            }}
            onDragStart={(e) => {
                e.dataTransfer.setData('id', String(content.id))
            }}
            onContextMenu={showContextMenu([
                {
                    key: 'remove',
                    icon: <Delete theme='outline' size='18' strokeWidth={3} />,
                    title: '删除片段',
                    onClick: () => { submit({ id: content.id }, { method: 'DELETE' }) },
                }
            ], { className: 'contextMenu' })}
        >
            <div className='truncate'>{content.title}</div>
            <div className='text-[10px] opacity-80'>
                {dayjs(content.created_at).format('YYYY/MM/DD')}
            </div>
        </NavLink>
    )
}