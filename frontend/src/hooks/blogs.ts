import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import type { Blogs } from "../utils/types/blog";
import { errorHandle } from "../utils/errors/errorHandle";

export function useBlogs() {
    const [blogsData, setBlogsData] = useState<Blogs>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const result = await axiosInstance.get("/blog/bulk");
                const blogsData: Blogs = result.data.bulkBlogs;
                setBlogsData(blogsData);
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        };
        getData();
    }, []);
    return { blogsData, isLoading };
};