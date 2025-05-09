import { redirect } from "react-router-dom"

export default async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    await window.api.sql(
        `update contents set title=@title,content=@content,category_id=@category_id where id=@id`,
        'update',
        data
    )
    return redirect(`/config/category/contentList/${data.category_id}/content/${data.id}`)
}