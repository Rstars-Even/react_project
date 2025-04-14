import Home from "@renderer/pages/Home";
import Cofig from "@renderer/pages/Cofig";
import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'config',
        element: <Cofig />
    }
])
export default router