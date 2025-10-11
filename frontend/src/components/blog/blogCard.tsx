import Dot from "../ui/dot";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateAndTime";
import type { BlogData } from "../../utils/types/blog";

export default function BlogCard({
    id = "",
    authorName = "Peter V.",
    postedOn = "2025-12-02",
    title = "How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing",
    content = "No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for man No need to create a fancy and modern website with hundreds of pages to make money online. Making money online is the dream for man",
}: Partial<BlogData>) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/blogs/${id}`);
    };
    return (
        <>
            <div onClick={handleClick} className="m-6 border-b border-gray-300 hover:cursor-pointer rounded-md px-4 py-2 hover:shadow">
                <div className="flex items-center text-sm mb-3">
                    <Dot />
                    <p className="mx-2">{authorName}</p>
                    <p className="text-gray-500">{formatDate(postedOn) ? formatDate(postedOn, "MONTHFIRST") : postedOn}</p>
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-extrabold">{title}</h4>
                    <p className="my-2 text-gray-700 leading-6 line-clamp-3">{content}</p>
                </div>
            </div>
        </>
    );
};