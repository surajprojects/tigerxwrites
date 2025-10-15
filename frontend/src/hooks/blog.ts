import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import { errorHandle } from "../utils/errors/errorHandle";
import type { Blog, BlogData } from "../utils/types/blog";

export function useBlog(blogId: string) {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [blogData, setBlogData] = useState<BlogData>({
        id: "",
        title: "",
        excerpt: "",
        content: "",
        postedOn: "",
        authorName: "",
        authorBio: "",
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
                        postedOn: blogData.createdAt.split("T")[0],
                        authorName: blogData.author.name,
                        authorBio: blogData.author.bio ? blogData.author.bio : "",
                    };
                });
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        };
        getData();
    }, []);
    return { blogData, isLoading };
};