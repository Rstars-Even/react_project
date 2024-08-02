import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import { AuthRoute } from "@/components/AuthRoute";

import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);
export default router;
