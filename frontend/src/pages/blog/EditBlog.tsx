import { toast } from "react-toastify";
import { useBlog } from "../../hooks/blog";
import axiosInstance from "../../utils/axios";
import Spinner from "../../components/ui/spinner";
import type { Blog } from "../../utils/types/blog";
import BlogForm from "../../components/blog/blogForm";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { UpdateBlogInput } from "@tigerxinsights/tigerxwrites";

export default function EditBlog() {
    let params = useParams();
    const navigate = useNavigate();
    const { blogData, isLoading } = useBlog(params.blogId || "");
    const handleSubmit = async (formData: UpdateBlogInput) => {
        try {
            const result = await axiosInstance.patch(`/blog/${params.blogId}`, formData);
            const blogData: Blog = result.data.blogData;
            navigate(`/blogs/${blogData.id}`);
            toast.success("Blog updated successfully!!!");
        } catch (error) {
            errorHandle(error);
        }
    };
    return (
        <>
            {
                isLoading ?
                    <Spinner />
                    :
                    <section>
                        <BlogForm
                            handleEditSubmit={handleSubmit}
                            isEdit={true}
                            initialData={{
                                title: blogData.title,
                                content: blogData.content,
                            }}
                        />
                    </section>
            }
        </>
    );
};