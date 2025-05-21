import { SettingOne } from "@icon-park/react"
import useSearch from "@renderer/hooks/useSearch"
import { Input } from "antd"

export default function Search() {
    const { search, handleSeach } = useSearch()

    return (
        <div className="bg-slate-50 p-3 rounded-lg drag">
            <section className="bg-slate-200 p-3 rounded-lg flex items-center gap-1 nodrag">
                <SettingOne
                    theme='outline'
                    size='22'
                    fill='#34495e'
                    strokeWidth={4}
                    className='cursor-pointer'
                    onClick={() => window.api.openWindow('code')}
                />
                <Input
                    value={search}
                    onChange={handleSeach}
                    placeholder="Search for Snippets..."
                    autoFocus
                />
            </section>
            <section className="text-center text-slate-600 text-xs mt-2 nodrag select-none">
                Atom Snip / Nsdaq
                <span className="text-blue-600 cursor-pointer select-none" onClick={() => window.api.openWindow("config")}> 配置</span>
            </section>
        </div>
    )
}