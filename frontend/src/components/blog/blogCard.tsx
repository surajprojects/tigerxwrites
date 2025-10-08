import { formatDate } from "../../utils/dateAndTime";
import Dot from "../ui/dot";

export default function BlogCard({
    authorName = "Name",
    postedOn = "2025-12-02",
}: {
    authorName?: string,
    postedOn?: string,
}) {
    return (
        <>
            <div className="m-6 border-b border-gray-300 hover:cursor-pointer rounded-md px-4 py-2 hover:shadow">
                <div className="flex items-center text-sm mb-3">
                    <Dot />
                    <p className="mx-2">Peter V. {authorName}</p>
                    <p className="text-gray-500">{formatDate(postedOn) ? formatDate(postedOn, "MONTHFIRST") : postedOn}</p>
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-extrabold">How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing</h4>
                    <p className="my-2 text-gray-700 leading-6 line-clamp-3">No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for man No need to create a fancy and modern website with hundreds of pages to make money online. Making money online is the dream for man</p>
                </div>
            </div>
        </>
    );
};