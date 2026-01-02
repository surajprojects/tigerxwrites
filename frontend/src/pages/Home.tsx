import { useEffect, useRef } from "react";
import { useBlogs } from "../hooks/blogs";
import BlogCard from "../components/blog/blogCard";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import BlogSkeletonCard from "../components/blog/blogSkeletonCard";

export default function Home() {
    const { blogsData, isLoading } = useBlogs();
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        if (window.location.hash === "#featured") {
            setTimeout(() => {
                scrollToAbout();
            }, 200);
        }
    }, []);
    return (
        <>
            <section className="w-full pt-[3.8rem]">
                {/* Hero Section */}
                <div className="relative w-full">
                    {/* Background Image */}
                    <img
                        src="/images/tiger-hero-page.jpg"
                        alt="hero-section"
                        className="w-full h-[38rem] object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/100 to-white/25"></div>
                    {/* Content */}
                    <div className="absolute inset-0 mx-auto w-full xl:max-w-7xl px-4 md:px-8 flex flex-col justify-center">
                        <div>
                            <h1 className="text-7xl font-bold flex flex-col">
                                <span className="text-[#2a2522]">Where words</span>
                                <span className="text-orange-500 mt-1">roar to life</span>
                            </h1>
                            <p className="text-[#7c706a] my-8 text-2xl max-w-xl">Discover stories, thinking, and expertise from writers on any topic that matters to you.</p>
                            {/* CTA */}
                            <button onClick={scrollToAbout} type="button" className="text-white text-sm bg-orange-500 py-3 px-8 rounded-md flex justify-center items-center font-medium hover:cursor-pointer hover:bg-orange-600 duration-300 ease-out">Start Reading<ArrowRightIcon className="w-4 h-4 ml-2" /></button>
                        </div>
                    </div>
                </div>
                {/* Featured Stories */}
                <div id="featured" ref={aboutRef} className="mx-auto w-full xl:max-w-7xl px-4 py-12 md:px-8 scroll-mt-8">
                    <h3 className="text-4xl font-bold">Featured Stories</h3>
                    <p className="text-[#7c706a] mt-4 text-lg">Curated reads from our community of passionate writers</p>
                    {isLoading ?
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <BlogSkeletonCard key={1} />
                            <BlogSkeletonCard key={2} />
                            <BlogSkeletonCard key={3} />
                            <BlogSkeletonCard key={4} />
                            <BlogSkeletonCard key={5} />
                            <BlogSkeletonCard key={6} />
                        </div>
                        :
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogsData.length > 0 ? blogsData.map((blog, idx) => {
                                if (idx < 6) {
                                    return <BlogCard
                                        key={idx}
                                        id={blog.id}
                                        title={blog.title}
                                        excerpt={blog.excerpt}
                                        content={blog.content}
                                        authorName={blog.author.name}
                                        postedOn={blog.createdAt.split("T")[0]}
                                    />
                                }
                            })
                                :
                                <p className="text-[#7c706a] my-4 italic text-base">No blogs found!!!</p>
                            }
                        </div>
                    }
                </div>
            </section>
        </>
    );
};