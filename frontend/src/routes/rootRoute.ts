import Home from "../pages/Home";
import About from "../pages/About";
import { blogRoutes } from "./blog/blogRoutes";
import { userRoutes } from "./user/userRoutes";
import PageNotFound from "../pages/PageNotFound";
import type { RouteObject } from "react-router-dom";
import RootLayout from "../components/home/rootLayout";

export const rootRoute: RouteObject[] = [
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "about", Component: About },
            ...userRoutes,
            blogRoutes,
            { path: "*", Component: PageNotFound },
        ],
    },
];