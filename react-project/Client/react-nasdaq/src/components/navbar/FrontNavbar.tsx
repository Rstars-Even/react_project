import { frontMenus } from "@/config/menu"
import { RocketOne } from "@icon-park/react"
import { Link } from "@tanstack/react-router"
import { UserDownMenu } from "../user/UserDownMenu"
// import { Link } from "lucide-react"

export const FrontNavbar = () => {
    return (
        <main>
            <section className="bg-white border-t-2 border-t-primary border-b">
                <div className="m-auto h-16 2xl:w-[1500px] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-primary">
                            <RocketOne theme='outline' size='27' />
                            在线学习平台
                        </div>
                        {frontMenus.map(menu => (
                            <Link to={menu.to}>{menu.title}</Link>
                        ))}
                    </div>
                    <UserDownMenu />
                </div>
            </section>
        </main>
    )
}