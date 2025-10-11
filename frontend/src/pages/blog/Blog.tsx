import { useBlog } from "../../hooks/blog";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner";
import ShowBlog from "../../components/blog/showBlog";
import BlogAuthor from "../../components/blog/blogAuthor";

export default function Blog() {
    let params = useParams();
    const { blogData, isLoading } = useBlog(params.blogId || "");
    return (
        <>
            {
                isLoading ?
                    <Spinner />
                    :
                    <section className="flex flex-col xl:flex-row mx-6 sm:mx-16 md:mx-28 xl:mx-40 2xl:mx-56">
                        <ShowBlog
                            title={blogData.title}
                            content={blogData.content}
                            postedOn={blogData.postedOn}
                        />
                        <BlogAuthor
                            authorName={blogData.authorName}
                            authorBio={blogData.authorBio}
                        />
                    </section>
            }
        </>
    );
};