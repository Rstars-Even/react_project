import { Add, DatabaseSetting } from "@icon-park/react"

export const FooterMenu = () => {
    return (
        <div className='nav'>
            <Add theme='outline' size='20' strokeWidth={2} />
            <DatabaseSetting theme='outline' size='20' strokeWidth={2} />
        </div>
    )
}