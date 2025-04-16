import Home from "@renderer/pages/Home";
import Config from "@renderer/pages/Config";
import Category from "@renderer/pages/Category";
import Content from "@renderer/pages/Content";
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
                // loader: CategoryLoader,
                children: [
                    {
                        index: true,
                        element: <Content />
                    }
                ]
            }
        ]
    }
])
export default router