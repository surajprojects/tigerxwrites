import { useBlog } from "../../hooks/blog";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner";
import BackBtn from "../../components/button/backBtn";
import ShowBlog from "../../components/blog/showBlog";

export default function Blog() {
    let params = useParams();
    const { blogData, isLoading } = useBlog(params.blogId || "");
    return (
        <>
            <section className="w-full h-full bg-white py-20 pb-16">
                <div className="mx-auto w-full xl:max-w-7xl px-4 py-12 md:px-8">
                    <BackBtn linkTo="/blogs" text="Back to blogs" />
                </div>
                {isLoading ?
                    <Spinner />
                    :
                    <ShowBlog
                        title={blogData.title}
                        excerpt={blogData.excerpt}
                        content={blogData.content}
                        postedOn={blogData.postedOn}
                        authorBio={blogData.authorBio}
                        authorName={blogData.authorName}
                    />
                }
            </section>
        </>
    );
};