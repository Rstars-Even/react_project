import useCodeSelect from "@renderer/hooks/useCodeSelect"
import classNames from "classnames"
// import "./styles.scss"

export default function Result() {
    const { data, id } = useCodeSelect()

    return (
        <main className='bg-slate-50 px-3 rounded-bl-lg rounded-br-lg -mt-[7px] pb-2'>
            {
                data.map((item) => (
                    <div key={item.id} className={classNames("text-slate-700 truncate px-2 py-1 rounded-lg", { 'bg-orange-400 text-white': item.id === id })}>
                        {item.content}
                    </div>
                ))
            }
        </main>
    )
}