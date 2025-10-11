import { useBlogs } from "../../hooks/blogs";
import Spinner from "../../components/ui/spinner";
import BlogCard from "../../components/blog/blogCard";

export default function Blogs() {
    const { blogsData, isLoading } = useBlogs();
    return (
        <>
            {
                isLoading ?
                    <Spinner />
                    :
                    <section className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                        {blogsData.length > 0 ? blogsData.map((blog, idx) => {
                            return <BlogCard
                                key={idx}
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                authorName={blog.author.name}
                            />
                        })
                            :
                            <p>No blogs found!!!</p>
                        }
                    </section>
            }
        </>
    );
};