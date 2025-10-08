import BlogCard from "../../components/blog/blogCard";

export default function Blogs() {
    return (
        <>
            <section className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </section>
        </>
    );
};