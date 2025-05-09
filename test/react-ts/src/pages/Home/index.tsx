import "./style.css"
import { Tabs } from "antd-mobile"
import { useTabs } from "./useTabs"
import HomeList from "./HomeList";

function Home() {
    const { channels } = useTabs()

    return (
        <div>
            <div className="tabContainer">
                <Tabs defaultActiveKey={'0'}>
                    {channels.map((item) => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            <div className="listContainer">
                                <HomeList channelId={'' + item.id} />
                            </div>
                        </Tabs.Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default Home
