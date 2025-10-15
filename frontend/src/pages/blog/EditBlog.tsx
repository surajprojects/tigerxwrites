import { toast } from "react-toastify";
import { useBlog } from "../../hooks/blog";
import axiosInstance from "../../utils/axios";
import Spinner from "../../components/ui/spinner";
import type { Blog } from "../../utils/types/blog";
import BackBtn from "../../components/button/backBtn";
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
        } finally {
            return true;
        }
    };
    return (
        <>
            <section className="w-full h-full bg-white py-20">
                <div className="mx-auto w-full xl:max-w-7xl px-4 py-10 md:px-8">
                    <BackBtn linkTo="/blogs" text="Back to blogs" />
                </div>
                <div className="px-4 md:px-8">
                    {isLoading ?
                        <Spinner />
                        :
                        <BlogForm
                            isEdit={true}
                            btnTitle="Update Story"
                            title="Edit Your Story"
                            handleSubmit={handleSubmit}
                            initialData={{
                                title: blogData.title,
                                excerpt: blogData.excerpt,
                                content: blogData.content,
                            }}
                        />
                    }
                </div>
            </section>
        </>
    );
};