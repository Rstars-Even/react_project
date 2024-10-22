import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// import Publish from "@/pages/Publish";
// import Article from "@/pages/Article";
// import Home from "@/pages/Home";
import { AuthRoute } from "@/components/AuthRoute";

import { createHashRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

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
        element: <Suspense fallback={'加载中'}><Home /></Suspense>,
      },
      {
        path: "article",
        element: <Suspense fallback={'加载中'}><Article /></Suspense>,
      },
      {
        path: "publish",
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);
export default router;
