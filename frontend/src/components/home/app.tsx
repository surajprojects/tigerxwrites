import "../../index.css";
import { rootRoute } from "../../routes/rootRoute";
import { useNewBlogStream } from "../../hooks/newBlogStream";
import { BlogStreamContext } from "../../utils/store/streamContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(rootRoute);

export default function App() {
  const { blogsData } = useNewBlogStream();
  return (
    <>
      <BlogStreamContext.Provider value={blogsData}>
        <RouterProvider router={router} />
      </BlogStreamContext.Provider>
    </>
  );
}
