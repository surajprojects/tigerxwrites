import Blog from "../../pages/blog/Blog";
import Blogs from "../../pages/blog/Blogs";
import NewBlog from "../../pages/blog/NewBlog";
import EditBlog from "../../pages/blog/EditBlog";
import type { RouteObject } from "react-router-dom";
import BlogLayout from "../../pages/blog/BlogLayout";

export const blogRoutes: RouteObject = {
    path: "blogs",
    Component: BlogLayout,
    children: [
        { index: true, Component: Blogs },
        { path: "new", Component: NewBlog },
        { path: "edit", Component: EditBlog },
        { path: ":blogId", Component: Blog },
    ],
};