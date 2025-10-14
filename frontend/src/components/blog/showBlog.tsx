import NameDate from "../ui/nameDate";
import ReadTime from "../ui/readTime";
import UserAvatar from "../ui/userAvatar";
import type { BlogData } from "../../utils/types/blog";

export default function ShowBlog({
    title = "Title",
    content = "Content",
    postedOn = "2025-10-08",
    authorName = "Author Name",
    authorBio = "Author Bio"
}: Partial<BlogData>) {
    return (
        <>
            <div className="w-full md:w-3xl px-4 md:px-8 mx-auto">
                <h1 className="text-5xl md:text-6xl text-[#2a2522] font-bold mb-8">{title}</h1>
                <div className="flex mt-4 items-center text-[#7c706a] text-sm border-b pb-8 border-[#ebe6e0]">
                    <UserAvatar
                        name={authorName}
                        size="NORMAL"
                    />
                    <div className="ml-2 translate-y-0.5">
                        <NameDate
                            name={authorName}
                            date={postedOn}
                            size="NORMAL"
                        />
                    </div>
                    <span className="self-end mr-2">•</span>
                    <div className="self-end">
                        <ReadTime content={content} />
                    </div>
                </div>
                <p className="text-slate-800 leading-7 my-8 mb-10">{content}</p>
                <div className="flex items-center border-t border-[#ebe6e0] pt-8">
                    <UserAvatar
                        name={authorName}
                        size="LARGE"
                    />
                    <div className="mx-4 font-sans">
                        <p className="font-bold text-[#2a2522] text-lg">{authorName}</p>
                        <p className="text-[#7c706a] mt-2">{authorBio}</p>
                    </div>
                </div>
            </div>
        </>
    );
};