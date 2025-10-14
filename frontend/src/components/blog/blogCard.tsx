import NameDate from "../ui/nameDate";
import ReadTime from "../ui/readTime";
import UserAvatar from "../ui/userAvatar";
import { useNavigate } from "react-router-dom";
import type { BlogData } from "../../utils/types/blog";

export default function BlogCard({
    id = "#",
    title = "The Art of Storytelling in the Digital Age",
    excerpt = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates consequuntur quae, perferendis error.",
    content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.",
    postedOn = "2025-10-08",
    authorName = "Sarah Chen",
}: BlogData) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/blogs/${id}`);
    };
    return (
        <>
            <div onClick={handleClick} className="bg-white w-full p-6 rounded-lg border border-[#ebe6e0] hover:shadow-xl hover:shadow-orange-200 hover:cursor-pointer duration-300 ease-out">
                {/* Title & Excerpt */}
                <div className="border-b border-[#ebe6e0]">
                    <h6 className="font-bold text-2xl my-2">{title}</h6>
                    <p className="text-[#7c706a] my-4 line-clamp-3">{excerpt}</p>
                </div>
                {/* Author & Posted On */}
                <div className="flex justify-between mt-4 items-center text-[#7c706a] text-sm">
                    <div className="flex items-center">
                        <UserAvatar name={authorName} size="SMALL" />
                        <NameDate name={authorName} date={postedOn} size="SMALL" />
                    </div>
                    <ReadTime content={content} />
                </div>
            </div>
        </>
    );
};