import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../../utils/types/blog";
import BlogForm from "../../components/blog/blogForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { CreateBlogInput } from "@tigerxinsights/tigerxwrites";

export default function NewBlog() {
    const navigate = useNavigate();
    const handleSubmit = async (formData: CreateBlogInput) => {
        try {
            const result = await axiosInstance.post("/blog", formData);
            const blogData: Blog = result.data.blogData;
            navigate(`/blogs/${blogData.id}`);
            toast.success("Blog created successfully!!!");
        } catch (error) {
            errorHandle(error);
        }
    };
    return (
        <>
            <section>
                <BlogForm handleSubmit={handleSubmit} />
            </section>
        </>
    );
};