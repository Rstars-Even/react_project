import { Delete } from "@icon-park/react";
import { useContextMenu } from "mantine-contextmenu";
import { DragEvent } from "react";
import { useSubmit } from "react-router-dom";
import useContent from "./useContent";

export default (category: CategoryType) => {
    const submit = useSubmit()
    const { showContextMenu } = useContextMenu();
    const { updateContentCategory } = useContent()

    const contextMenu = () => {
        return showContextMenu([
            {
                key: 'remove',
                icon: <Delete theme='outline' size='18' strokeWidth={3} />,
                title: '删除片段',
                onClick: () => { submit({ id: category.id }, { method: 'DELETE' }) },
            }
        ], { className: 'contextMenu' })
    }

    const dragHandle = {
        onDragOver: (e: DragEvent) => {
            e.preventDefault()
            e!.dataTransfer!.dropEffect = 'move'
            const el = e.currentTarget as HTMLDivElement
            el.classList.add('darging')
        },
        onDragLeave: (e: DragEvent) => {
            const el = e.currentTarget as HTMLDivElement
            el.classList.remove('darging')
        },
        onDrop: (e: DragEvent) => {
            const el = e.currentTarget as HTMLDivElement
            el.classList.remove('darging')
            const id = e!.dataTransfer!.getData('id')
            updateContentCategory(Number(id), category.id)
        },
    }

    return { contextMenu, dragHandle }
}