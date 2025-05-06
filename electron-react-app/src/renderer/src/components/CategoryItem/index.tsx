import { Delete, FolderClose } from "@icon-park/react"
import { useContextMenu } from "mantine-contextmenu"
import { NavLink, useSubmit } from "react-router-dom"
import './index.css'

interface Props {
    category: CategoryType
}
export const CategoryItem = ({ category }: Props) => {
    const linkStyls = (isActive: boolean) => {
        return isActive ? 'active-category' : 'link'
    }
    const { showContextMenu } = useContextMenu();
    const submit = useSubmit()
    return (
        <NavLink
            to={`/config/category/contentList/${category.id}`}
            key={category.id}
            className={({ isActive }) => linkStyls(isActive)}
            onContextMenu={showContextMenu([
                {
                    key: 'remove',
                    icon: <Delete theme='outline' size='18' strokeWidth={3} />,
                    title: '删除片段',
                    onClick: () => { submit({ id: category.id }, { method: 'DELETE' }) },
                }
            ], { className: 'contextMenu' })}
        >
            <div className='flex items-center gap-1'>
                <FolderClose theme='outline' size='12' strokeWidth={3} />
                <div className='truncate'>{category.name}</div>
            </div>
        </NavLink>
    )
}