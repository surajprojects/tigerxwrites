import Blog from "../../pages/blog/Blog";
import Blogs from "../../pages/blog/Blogs";
import NewBlog from "../../pages/blog/NewBlog";
import EditBlog from "../../pages/blog/EditBlog";
import type { RouteObject } from "react-router-dom";

export const blogRoutes: RouteObject = {
    path: "blogs",
    children: [
        { index: true, Component: Blogs },
        { path: "new", Component: NewBlog },
        { path: ":blogId", Component: Blog },
        { path: ":blogId/edit", Component: EditBlog },
    ],
};