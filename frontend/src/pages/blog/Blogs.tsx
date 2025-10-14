import { useBlogs } from "../../hooks/blogs";
import Spinner from "../../components/ui/spinner";
import BlogCard from "../../components/blog/blogCard";

export default function Blogs() {
    const { blogsData, isLoading } = useBlogs();
    return (
        <>
            <section className="w-full bg-white py-20 pb-10">
                <div className="mx-auto w-full xl:max-w-7xl px-4 py-12 md:px-8">
                    <div>
                        <h2 className="text-5xl font-bold text-[#2a2522]">All Stories</h2>
                        <p className="text-lg text-[#7c706a] my-5">Discover insights and perspectives from our community</p>
                    </div>
                    {isLoading ?
                        <Spinner />
                        :
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogsData.length > 0 ? blogsData.map((blog, idx) => {
                                return <BlogCard
                                    key={idx}
                                    id={blog.id}
                                    title={blog.title}
                                    excerpt={blog.excerpt}
                                    content={blog.content}
                                    authorName={blog.author.name}
                                    postedOn={blog.createdAt.split("T")[0]}
                                />
                            })
                                :
                                <p>No blogs found!!!</p>
                            }
                        </div>
                    }
                </div>
            </section>
        </>
    );
};