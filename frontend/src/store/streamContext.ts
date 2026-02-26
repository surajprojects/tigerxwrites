import { createContext } from "react";
import type { Blogs } from "../utils/types/blog";

interface BlogStreamContextType {
  blogs: Blogs;
  isLoading: boolean;
}

export const BlogStreamContext = createContext<BlogStreamContextType>({
  blogs: [],
  isLoading: true,
});
