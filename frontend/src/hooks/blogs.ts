import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import type { Blogs } from "../utils/types/blog";
import { errorHandle } from "../utils/errors/errorHandle";

export function useBlogs(page = 1) {
    const [blogsData, setBlogsData] = useState<Blogs>([]);
    const [blogsCount, setBlogsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const totalPages = Math.ceil(blogsCount / 9);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const result = await axiosInstance.get(`/blog/page/${page}`);
                const blogsData: Blogs = result.data.bulkBlogs;
                const blogsCount: number = result.data.blogsCount;
                setBlogsData(blogsData);
                setBlogsCount(blogsCount);
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        };
        getData();
    }, [page]);
    return { blogsData, isLoading, totalPages, blogsCount };
};