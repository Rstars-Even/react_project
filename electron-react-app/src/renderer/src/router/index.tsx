import Home from "@renderer/pages/Home";
import Config from "@renderer/pages/Config";
import Category from "@renderer/pages/Category";
import ContentList from "@renderer/pages/ContentList";
import CategoryLoader from "@renderer/pages/Category/CategoryLoader";
import { createHashRouter } from "react-router-dom";

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
                        path: 'ContentList/:cid',
                        element: <ContentList />
                    }
                ]
            }
        ]
    }
])
export default router