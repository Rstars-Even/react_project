import Home from "@renderer/pages/Home";
import Config from "@renderer/pages/Config";
import Category from "@renderer/pages/Category";
import ContentList from "@renderer/pages/ContentList";
import CategoryLoader from "@renderer/pages/Category/CategoryLoader";
import { createHashRouter } from "react-router-dom";
import ContentListLoader from "@renderer/pages/ContentList/ContentListLoader";
import Content from "@renderer/pages/Content";
import ContentLoader from "@renderer/pages/Content/ContentLoader";
import ContentAction from "@renderer/pages/Content/ContentAction";
import Welcome from "@renderer/pages/Welcome";
import ContentListAction from "@renderer/pages/ContentList/ContentListAction";

const router = createHashRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'config',
        element: <Config />,
        children: [
            {
                path: 'Category',
                element: <Category />,
                loader: CategoryLoader,
                children: [
                    {
                        path: 'ContentList/:cid?',
                        element: <ContentList />,
                        loader: ContentListLoader,
                        action: ContentListAction,
                        children: [
                            {
                                index: true,
                                element: <Welcome />
                            },
                            {
                                path: 'Content/:id',
                                element: <Content />,
                                loader: ContentLoader,
                                action: ContentAction
                            }
                        ]
                    }
                ]
            }
        ]
    }
])
export default router