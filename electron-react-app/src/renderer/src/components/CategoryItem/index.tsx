import { FolderClose } from "@icon-park/react"
import useCategory from "@renderer/hooks/useCategory"
import { useStore } from "@renderer/store/useStore"
import { NavLink, useFetcher } from "react-router-dom"
import './index.css'

interface Props {
    category: CategoryType
}

export const CategoryItem = ({ category }: Props) => {
    const linkStyls = (isActive: boolean) => {
        return isActive ? 'active-category' : 'link'
    }
    const editCategoryId = useStore((state) => state.editCategoryId)
    const setEditCategoryId = useStore((state) => state.setEditCategoryId)
    const fetcher = useFetcher()
    const { contextMenu, dragHandle } = useCategory(category)

    return (
        <>
            {editCategoryId === category.id ? (
                <div className="w-full px-2 h-[30px]">
                    <input
                        className="h-full w-full rounded-md px-2 border outline-none"
                        defaultValue={category.name}
                        name='name'
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetcher.submit({ id: category.id, name: e.currentTarget.value }, { method: 'PUT' })
                                setEditCategoryId(0)
                            }
                        }}
                    />
                </div>
            ) : (
                <NavLink
                    onDoubleClick={(e) => {
                        setEditCategoryId(category.id)
                    }}
                    to={`/config/category/contentList/${category.id}`}
                    key={category.id}
                    className={({ isActive }) => linkStyls(isActive)}
                    onContextMenu={contextMenu()}
                    {...dragHandle}
                >
                    <div className='flex items-center gap-1'>
                        <FolderClose theme='outline' size='12' strokeWidth={3} />
                        <div className='truncate'>{category.name}</div>
                    </div>
                </NavLink>
            )}
        </>
    )
}