import { Bytedance } from "@icon-park/react"

export const Navbar = () => {
    return (
        <main className="bg-white">
            <section className="container py-3">
                <div className="flex items-center text-rose-600 gap-1">
                    <Bytedance theme="outline" size="35" strokeWidth={4} />
                    <div className="text-xl uppercase font-bold">nasdaq</div>
                </div>
            </section>
        </main>
    )
}
