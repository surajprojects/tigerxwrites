import { useUser } from "../../hooks/user";
import { useBlogs } from "../../hooks/blogs";
import BlogCard from "../../components/blog/blogCard";
import BlogSkeletonCard from "../../components/blog/blogSkeletonCard";
import getPageWindow from "../../utils/pagination/pageWindow";
import { useState } from "react";

export default function Blogs() {
    const { userId } = useUser();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { blogsData, isLoading, totalPages } = useBlogs(currentPage);
    return (
        <>
            <section className="w-full bg-white py-20 pb-10">
                <div className="mx-auto w-full xl:max-w-7xl px-4 py-12 md:px-8">
                    <div>
                        <h2 className="text-5xl font-bold text-[#2a2522]">All Stories</h2>
                        <p className="text-lg text-[#7c706a] my-5">Discover insights and perspectives from our community</p>
                    </div>
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
                                return <BlogCard
                                    key={idx}
                                    id={blog.id}
                                    title={blog.title}
                                    excerpt={blog.excerpt}
                                    content={blog.content}
                                    authorName={blog.author.name}
                                    postedOn={blog.createdAt.split("T")[0]}
                                    showBtns={userId === blog.author.id ? true : false}
                                />
                            })
                                :
                                <p className="text-[#7c706a] my-4 text-base italic">No blogs found!!!</p>
                            }
                        </div>
                    }
                    <div className="mt-8 flex">
                        {currentPage > 1 &&
                            <button
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage((prevData) => prevData - 1)
                                    }
                                }
                                }
                                className="bg-orange-500 font-sans text-white text-sm font-semibold px-4 py-2 rounded-md hover:cursor-pointer hover:bg-orange-500/90 duration-300 ease-out outline-none">
                                Prev
                            </button>
                        }
                        <ul className="flex gap-4 mx-4 items-center">
                            {getPageWindow(currentPage, totalPages).map((num, idx) => {
                                return <li
                                    key={idx}
                                    onClick={() => setCurrentPage(num)}
                                    className={currentPage === num ? "text-white bg-orange-500/90 border-orange-500 border duration-300 ease-out cursor-pointer rounded-md px-3 py-1 font-sans font-semibold text-sm" : "border border-gray-500 hover:border-orange-500 duration-300 ease-out cursor-pointer rounded-md px-3 py-1 font-sans font-semibold text-sm hover:bg-orange-500/90 hover:text-white"}>
                                    {num}
                                </li>
                            })}
                        </ul>
                        {totalPages > 1 && currentPage !== totalPages &&
                            <button
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setCurrentPage((prevData) => prevData + 1)
                                    }
                                }}
                                className="bg-orange-500 font-sans text-white text-sm font-semibold px-4 py-2 rounded-md hover:cursor-pointer hover:bg-orange-500/90 duration-300 ease-out outline-none">
                                Next
                            </button>
                        }
                    </div>
                </div>
            </section >
        </>
    );
};