import "../../index.css";
import { rootRoute } from "../../routes/rootRoute";
import { useNewBlogStream } from "../../hooks/newBlogStream";
import { BlogStreamContext } from "../../store/streamContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(rootRoute);

export default function App() {
  const { blogsData, isLoading } = useNewBlogStream();
  return (
    <>
      <BlogStreamContext.Provider value={{ blogs: blogsData, isLoading }}>
        <RouterProvider router={router} />
      </BlogStreamContext.Provider>
    </>
  );
}
