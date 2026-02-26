import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import type { Blog } from "../utils/types/blog";
import type { DeepPartial } from "../utils/utils";
import { errorHandle } from "../utils/errors/errorHandle";

export function useBlog(blogId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<DeepPartial<Blog>>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    createdAt: "",
    authorId: "",
    author: {
      name: "",
      bio: "",
    },
  });
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get(`/blog/${blogId}`);
        const blogData: Blog = result.data.blogData;
        setBlogData((prevData) => {
          return {
            ...prevData,
            id: blogData.id,
            title: blogData.title,
            excerpt: blogData.excerpt,
            content: blogData.content,
            createdAt: blogData.createdAt.split("T")[0],
            authorId: blogData.authorId,
            author: {
              name: blogData.author.name ? blogData.author.name : "",
              bio: blogData.author.bio ? blogData.author.bio : "",
            },
          };
        });
      } catch (error) {
        errorHandle(error);
      }
      setIsLoading(false);
    };
    getData();
  }, [blogId]);
  return { blogData, isLoading };
}
